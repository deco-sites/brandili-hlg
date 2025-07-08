import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
import { useScript } from "@deco/deco/hooks";

const neoAssistScript = () =>
  addEventListener(
  "load",
  () => {
    window.NeoAssistTag = {};
    NeoAssistTag.querystring = true;
    NeoAssistTag.pageid = '';
    NeoAssistTag.clientdomain = 'socials.neoassist.com';
    NeoAssistTag.initialize = {
    fields: {
    client: 'Brandilli'
    }
    };
    var na = document.createElement('script');
    na.type = 'text/javascript';
    na.async = true;
    na.src = 'https://cdn.atendimen.to/n.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(na, s);
  }
);
const sw = () => addEventListener("load", () => navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));
export default defineApp(async (_req, ctx) => {
    const revision = await Context.active().release?.revision();
    return (<>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin"/>

        {/* Tailwind v3 CSS file */}
        <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet"/>
        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")}/>
        {/* <!-- Google Tag Manager --> */}
        <script type="module" dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5GQ3ZBH');
          ` }}/>
        {/* <!-- End Google Tag Manager --> */}
      </Head>


      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GQ3ZBH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script type="module" dangerouslySetInnerHTML={{ __html: `(${sw})();` }}/>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(neoAssistScript) }}
      />
      
    </>);
});
