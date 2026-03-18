(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.querySelector(`#app`).innerHTML=`
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
`;