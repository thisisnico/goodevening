import { Group, Stack, Title, Text } from "@mantine/core";
import { IconBolt, IconClock, IconStar } from "@tabler/icons-react";

export default function WhyUs() {
    return (
        <Stack maw="75%" gap="xl" pos="relative">
            <div
                className="mantine-visible-from-md"
                style={{
                    position: "absolute",
                    top: "-80px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100dvw",
                    height: "500px",
                    background:
                        "linear-gradient(180deg, #151515 0%, rgba(62, 18, 73, 50) 50%, #151515 100%)",
                    zIndex: -1,
                }}
            />
            <Title order={2} ta="center" ff="Segoe UI Bold">
                Почему именно мы?
            </Title>
            <Group align="center" visibleFrom="md">
                <IconClock size="3em" color="#A020F0" />
                <Text size="2rem">Круглосуточный сервис</Text>
            </Group>
            <Group align="center" visibleFrom="md">
                <IconBolt size="3em" color="#A020F0" />
                <Text size="2rem">Экспресс-доставка за 60 минут</Text>
            </Group>
            <Group align="center" visibleFrom="md">
                <IconStar size="3em" color="#A020F0" />
                <Text size="2rem">Премиальное качество продукции</Text>
            </Group>
            <Stack
                style={{
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    borderRadius: "16px",
                }}
                p="xl"
                align="center"
                justify="center"
                hiddenFrom="md"
            >
                <IconClock size="3em" color="#A020F0" />
                <Text ta="center" size="2rem">
                    Круглосуточный сервис
                </Text>
            </Stack>
            <Stack
                style={{
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    borderRadius: "16px",
                }}
                p="xl"
                align="center"
                justify="center"
                hiddenFrom="md"
            >
                <IconBolt size="3em" color="#A020F0" />
                <Text ta="center" size="2rem">
                    Экспресс-доставка за 60 минут
                </Text>
            </Stack>
            <Stack
                style={{
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    borderRadius: "16px",
                }}
                p="xl"
                align="center"
                justify="center"
                hiddenFrom="md"
            >
                <IconStar size="3em" color="#A020F0" />
                <Text ta="center" size="2rem">
                    Премиальное качество продукции
                </Text>
            </Stack>
        </Stack>
    );
}
