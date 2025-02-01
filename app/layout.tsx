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
                <link rel="shortcut icon" href="/favicon.svg" />
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
