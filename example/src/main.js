import './styles.css'

document.querySelector('#app').innerHTML = `
  <main class="shell">
    <section class="card">
      <p class="eyebrow">Local plugin demo</p>
      <h1>Open Vite with <code>--host</code></h1>
      <p class="lede">
        This example app uses the local <code>vite-plugin-network-qr</code>
        package from the parent folder.
      </p>
      <ol class="steps">
        <li>Run <code>npm run dev -- --host</code></li>
        <li>Look for the QR code in the terminal</li>
        <li>Scan it from your phone on the same network</li>
      </ol>
    </section>
  </main>
`
