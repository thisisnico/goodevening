import { Stack, Text } from "@mantine/core";

export default function CallUs() {
    return (
        <Stack maw="75%" gap="xl" pos="relative" mt={100}>
            <Text ta="center" ff="Segoe UI Bold">
                Остались вопросы? Позвоните нам и мы поможем
            </Text>
            <Text ta="center" ff="Segoe UI Bold">
                +7 (999) 205-34-70
            </Text>
        </Stack>
    );
}
