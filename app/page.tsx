"use client";

import {
    Badge,
    Button,
    Container,
    Divider,
    Group,
    Modal,
    Paper,
    Stack,
    Title,
    Image,
    Input,
    Text,
} from "@mantine/core";
import Hello from "../components/Hello";
import WhyUs from "../components/WhyUs";
import Catalog, { Item, ItemDisplayMobile } from "../components/Catalog";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import CallUs from "../components/CallUs";
import { useDisclosure } from "@mantine/hooks";
import { IMaskInput } from "react-imask";
import { useState } from "react";

const CART_PLACEHOLDER: Item[] = [
    {
        id: 1,
        title: "Вино",
        price: 1500,
        image: "https://placehold.co/150",
        category: 1,
    },
    {
        id: 2,
        title: "Сок",
        price: 300,
        image: "https://placehold.co/150",
        category: 2,
    },
    {
        id: 3,
        title: "Пиво",
        price: 250,
        image: "https://placehold.co/150",
        category: 3,
    },
];

export default function HomePage() {
    const [opened, { open, close }] = useDisclosure(false);
    const [cart, setCart] = useState<Item[]>(CART_PLACEHOLDER);
    return (
        <>
            <Modal opened={opened} onClose={close} title="Корзина" centered>
                <Stack key="c">
                    {cart.map((item, i) => (
                        <>
                            <ItemDisplayCart key={"e" + i} item={item} />
                            <Divider key={"d" + i} />
                        </>
                    ))}
                    <Input
                        component={IMaskInput}
                        mask="+7 (900) 000-00-00"
                        placeholder="+7 (9XX) XXX-XX-XX"
                    />
                    <Input placeholder="Как вас зовут?" />
                    <Input placeholder="Дополнительная информация" />
                    <Divider />
                    <Stack gap="0">
                        <Text size="md">
                            Итого:{" "}
                            {cart.map((x) => x.price).reduce((a, b) => a + b)}{" "}
                            руб.
                        </Text>
                        <Text size="sm" c="dimmed">
                            Доставка по СПб: 500 руб.
                        </Text>
                    </Stack>
                    <Button variant="gradient" fullWidth>
                        Оформить заказ
                    </Button>
                </Stack>
            </Modal>
            <Stack align="center" pos="relative">
                <Hello />
                <WhyUs />
                <Catalog />
                <CallUs />
                <Button
                    pos="fixed"
                    variant="outline"
                    size="md"
                    radius="xl"
                    style={{
                        right: 30,
                        bottom: 30,
                        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.75)",
                        backgroundColor: "#151515",
                    }}
                    onClick={open}
                >
                    <IconShoppingCart />
                    <Badge
                        pos="absolute"
                        top="4px"
                        right="16px"
                        bg="red"
                        size="xs"
                        circle
                        style={{
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                    >
                        4
                    </Badge>
                </Button>
            </Stack>
        </>
    );
}

export function ItemDisplayCart({
    item,
    onClick,
}: {
    item: Item;
    onClick?: () => any;
}) {
    return (
        <Paper key={"i" + item.id} px="md" py="lg">
            <Group gap="md" align="center" ta="left">
                <Image src={item.image} alt={item.title} w={75} />
                <Stack gap="xs">
                    <Title size="lg" fw={300}>
                        {item.title}
                    </Title>
                    <Title size="xs" c="dimmed">
                        {item.price} руб.
                    </Title>
                </Stack>
                <div style={{ flex: 1 }} />
                <Button variant="subtle">
                    <IconX />
                </Button>
            </Group>
        </Paper>
    );
}
