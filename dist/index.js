import qrcodeTerminal from 'qrcode-terminal';
const PATCHED_SERVER = Symbol('vite-plugin-network-qr/patched-server');
const defaultOptions = {
    enabled: true,
    label: 'Scan on your phone',
    printAll: false,
    small: true,
};
export default function networkQr(options = {}) {
    const resolvedOptions = {
        ...defaultOptions,
        ...options,
    };
    const plugin = {
        name: 'vite-plugin-network-qr',
        apply: 'serve',
        configureServer(server) {
            patchPrintUrls(server, resolvedOptions);
        },
        configurePreviewServer(server) {
            patchPrintUrls(server, resolvedOptions);
        },
    };
    return plugin;
}
function patchPrintUrls(server, options) {
    const patchedServer = server;
    if (patchedServer[PATCHED_SERVER] || !options.enabled) {
        return;
    }
    patchedServer[PATCHED_SERVER] = true;
    const originalPrintUrls = server.printUrls.bind(server);
    server.printUrls = () => {
        originalPrintUrls();
        const networkUrls = server.resolvedUrls?.network ?? [];
        const urlsToPrint = getUrlsToPrint(networkUrls, options);
        if (urlsToPrint.length === 0) {
            return;
        }
        server.config.logger.info('');
        for (const url of urlsToPrint) {
            server.config.logger.info(`${options.label}: ${url}`);
            server.config.logger.info(renderQrCode(url, options.small));
        }
    };
}
function getUrlsToPrint(urls, options) {
    if (urls.length === 0) {
        return [];
    }
    if (options.printAll) {
        return urls;
    }
    if (options.selectUrl) {
        const selectedUrl = options.selectUrl(urls);
        return selectedUrl ? [selectedUrl] : [];
    }
    return [urls[0]];
}
function renderQrCode(url, small) {
    let output = '';
    qrcodeTerminal.generate(url, { small }, (qr) => {
        output = qr;
    });
    return output.trimEnd();
}
export { networkQr };
