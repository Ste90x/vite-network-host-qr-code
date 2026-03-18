import qrcodeTerminal from 'qrcode-terminal'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'

export interface NetworkQrOptions {
  enabled?: boolean
  label?: string
  printAll?: boolean
  selectUrl?: (urls: string[]) => string
  small?: boolean
}

type HookResult = void | (() => void) | Promise<void | (() => void)>

export interface NetworkQrPlugin {
  name: string
  apply?: 'serve' | 'build'
  configureServer?: (server: unknown) => HookResult
  configurePreviewServer?: (server: unknown) => HookResult
}

type PrintableServer = Pick<
  ViteDevServer | PreviewServer,
  'config' | 'printUrls' | 'resolvedUrls'
>

const PATCHED_SERVER = Symbol('vite-plugin-network-qr/patched-server')

const defaultOptions: Required<
  Pick<NetworkQrOptions, 'enabled' | 'label' | 'printAll' | 'small'>
> = {
  enabled: true,
  label: 'Scan on your phone',
  printAll: false,
  small: true,
}

export default function networkQr(
  options: NetworkQrOptions = {},
): NetworkQrPlugin {
  const resolvedOptions = {
    ...defaultOptions,
    ...options,
  }

  const plugin = {
    name: 'vite-plugin-network-qr',
    apply: 'serve',
    configureServer(server) {
      patchPrintUrls(server, resolvedOptions)
    },
    configurePreviewServer(server) {
      patchPrintUrls(server, resolvedOptions)
    },
  } satisfies Plugin

  return plugin as unknown as NetworkQrPlugin
}

function patchPrintUrls(
  server: PrintableServer,
  options: typeof defaultOptions & NetworkQrOptions,
) {
  const patchedServer = server as PrintableServer & { [PATCHED_SERVER]?: boolean }

  if (patchedServer[PATCHED_SERVER] || !options.enabled) {
    return
  }

  patchedServer[PATCHED_SERVER] = true

  const originalPrintUrls = server.printUrls.bind(server)

  server.printUrls = () => {
    originalPrintUrls()

    const networkUrls = server.resolvedUrls?.network ?? []
    const urlsToPrint = getUrlsToPrint(networkUrls, options)

    if (urlsToPrint.length === 0) {
      return
    }

    server.config.logger.info('')

    for (const url of urlsToPrint) {
      server.config.logger.info(`${options.label}: ${url}`)
      server.config.logger.info(renderQrCode(url, options.small))
    }
  }
}

function getUrlsToPrint(
  urls: string[],
  options: typeof defaultOptions & NetworkQrOptions,
): string[] {
  if (urls.length === 0) {
    return []
  }

  if (options.printAll) {
    return urls
  }

  if (options.selectUrl) {
    const selectedUrl = options.selectUrl(urls)
    return selectedUrl ? [selectedUrl] : []
  }

  return [urls[0]!]
}

function renderQrCode(url: string, small: boolean): string {
  let output = ''

  qrcodeTerminal.generate(url, { small }, (qr: string) => {
    output = qr
  })

  return output.trimEnd()
}

export { networkQr }
