import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Harsh - Open source maintainer and software engineer." />
        <meta property="og:site_name" content="harsh" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thisisharsh7" />
        <meta name="twitter:creator" content="@thisisharsh7" />

        {/* Sonarly Session Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var initOpts = {
                projectKey: "6cyU2CEvFrw3B7zQ1HHL",
                ingestPoint: "https://sonarly.dev/ingest",
                __DISABLE_SECURE_MODE: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
              };
              var startOpts = {};

              (function(A,s,a,y,e,r){
                r=window.Sonarly=[e,r,y,[s-1, e]];
                s=document.createElement('script');s.src=A;s.async=!a;
                document.getElementsByTagName('head')[0].appendChild(s);
                r.start=function(v){r.push([0])};
                r.stop=function(v){r.push([1])};
                r.setUserID=function(id){r.push([2,id])};
                r.setUserAnonymousID=function(id){r.push([3,id])};
                r.setMetadata=function(k,v){r.push([4,k,v])};
                r.event=function(k,p,i){r.push([5,k,p,i])};
                r.issue=function(k,p){r.push([6,k,p])};
                r.isActive=function(){return false};
                r.getSessionToken=function(){};
              })("https://sonarly.dev/static/tracker.js",1,0,initOpts,startOpts);
            `
          }}
        />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon.png" />
        <link rel="icon" type="image/png" href="/icon1.png" sizes="16x16" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
