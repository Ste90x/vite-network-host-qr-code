# vite-plugin-network-qr

Show Vite network URLs as terminal QR codes when the dev or preview server is started with `--host`.

## Usage

```ts
import { defineConfig } from 'vite'
import networkQr from 'vite-plugin-network-qr'

export default defineConfig({
  plugins: [networkQr()],
})
```

Run Vite with `--host`:

```sh
bunx vite --host
```

Without `--host`, Vite usually has no network URL to display, so the plugin prints nothing extra.

## Options

```ts
networkQr({
  enabled: true,
  label: 'Scan on your phone',
  printAll: false,
  small: true,
  selectUrl: (urls) => urls[0],
})
```

- `enabled`: disable the plugin without removing it from your config.
- `label`: text shown above the QR code.
- `printAll`: when `true`, print a QR code for every network URL Vite exposes.
- `small`: render a smaller terminal QR code.
- `selectUrl`: choose which URL to print when `printAll` is `false`.

## Examples

Print one QR code by default:

```ts
networkQr()
```

Print a QR code for every network interface:

```ts
networkQr({
  printAll: true,
})
```

Choose a specific URL when multiple are available:

```ts
networkQr({
  selectUrl: (urls) => urls.find((url) => url.includes('192.168.')) ?? urls[0],
})
```
