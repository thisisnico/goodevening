"use client";

import { Stack, Title, Text, Divider, Button } from "@mantine/core";

export default function Hello() {
    return (
        <Stack justify="center" align="center" w={"75%"}>
            <Title ta="center" mt={"15%"} size="3em" ff={"Segoe UI Bold"}>
                <Text inherit variant="gradient" component="span">
                    Good Evening Service
                </Text>
                <br />
                <Text
                    inherit
                    visibleFrom="md"
                    variant="gradient"
                    component="span"
                >
                    Все для идеального вечера
                </Text>
            </Title>
            <Divider color="#fff" size="xs" w="40%" />
            <Text size="lg" ta="center" maw="600px">
                Создаем настроение с доставкой за 60 минут по всему городу!
                Оперативный сервис в любое время суток - оставьте контакты, и мы
                организуем ваш идеальный вечер через 10 минут
            </Text>
            <Button
                variant="gradient"
                px="10%"
                size="md"
                mt={20}
                fw={100}
                mb={"15%"}
                onClick={() => {
                    document.getElementById("cat")?.scrollIntoView({
                        behavior: "smooth",
                    });
                }}
            >
                Заказать
            </Button>
        </Stack>
    );
}
