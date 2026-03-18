export interface NetworkQrOptions {
    enabled?: boolean;
    label?: string;
    printAll?: boolean;
    selectUrl?: (urls: string[]) => string;
    small?: boolean;
}
type HookResult = void | (() => void) | Promise<void | (() => void)>;
export interface NetworkQrPlugin {
    name: string;
    apply?: 'serve' | 'build';
    configureServer?: (server: unknown) => HookResult;
    configurePreviewServer?: (server: unknown) => HookResult;
}
export default function networkQr(options?: NetworkQrOptions): NetworkQrPlugin;
export { networkQr };
