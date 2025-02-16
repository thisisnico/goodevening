import "@mantine/core/styles.css";
import React from "react";
import {
    MantineProvider,
    ColorSchemeScript,
    mantineHtmlProps,
    Text,
} from "@mantine/core";
import { theme } from "../theme";

import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "./global.css";

export const metadata = {
    title: "Good Evening Service",
    description: "Сделаем ваш вечер лучше!",
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="ru" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.png" />
                <link rel="icon" href="/favicon.png" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body
                style={{
                    backgroundColor: "#151515",
                }}
            >
                {/* Google Metrics */}

                <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TJF3PRW4');`}</script>

                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-TJF3PRW4"
                        height="0"
                        width="0"
                        style={{
                            display: "none",
                            visibility: "hidden",
                        }}
                    ></iframe>
                </noscript>

                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-HNS0X5CHBJ"
                ></script>
                <script>
                    {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HNS0X5CHBJ');`}
                </script>

                {/* End Google Metrics */}

                {/* Yandex Metrics */}

                <script type="text/javascript">
                    {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(99851128, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });`}
                </script>
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/99851128"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=""
                        />
                    </div>
                </noscript>

                {/* End Yandex Metrics */}

                <MantineProvider theme={theme} forceColorScheme="dark">
                    <Notifications autoClose={2000} position="bottom-center" />
                    <ModalsProvider>
                        {children}
                        <Text mt={60} mb={20} c="dimmed" ta="center" size="xs">
                            stardust studios. 2025
                        </Text>
                    </ModalsProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
