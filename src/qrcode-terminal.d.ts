declare module 'qrcode-terminal' {
  interface GenerateOptions {
    small?: boolean
  }

  interface QrCodeTerminal {
    generate(
      input: string,
      callback?: (qrcode: string) => void,
    ): void
    generate(
      input: string,
      options: GenerateOptions,
      callback?: (qrcode: string) => void,
    ): void
  }

  const qrcodeTerminal: QrCodeTerminal

  export default qrcodeTerminal
}
