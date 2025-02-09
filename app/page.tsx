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
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { API_BASE } from "../components/Constants";

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
    const [cart, setCart] = useState<Item[]>([]);

    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(false);

    async function getCartId() {
        const cartId = localStorage.getItem("cart");
        if (cartId == null) {
            const newCartId = await (await fetch(`${API_BASE}/cart`)).json();
            localStorage.setItem("cart", newCartId.id);
            return newCartId.id;
        }
        return cartId;
    }
    async function fetchCart() {
        const cartId = await getCartId();
        const cart = await (await fetch(`${API_BASE}/cart/${cartId}`)).json();
        setCart(cart);
    }
    async function addToCart(item: Item) {
        const cartId = await getCartId();
        await fetch(`${API_BASE}/cart/${cartId}/add/${item.id}`);
        showNotification({
            title: "Товар добавлен в корзину",
            message: `${item.title} (${item.price} руб.)`,
        });
        fetchCart();
    }
    function removeFromCart(item: Item) {
        return async () => {
            const cartId = await getCartId();
            await fetch(`${API_BASE}/cart/${cartId}/remove/${item.id}`);
            fetchCart();
        };
    }
    async function order() {
        if (cart.length == 0)
            return showNotification({
                title: "Корзина пуста",
                message: "Добавьте товары в корзину, чтобы оформить заказ",
                color: "red",
            });
        if (phone.length != "+7 (9XX) XXX-XX-XX".length || name.length == 0)
            return setOrderError(true);

        setOrderLoading(true);

        localStorage.setItem("phone", phone);
        localStorage.setItem("name", name);
        localStorage.setItem("info", info);

        const cartId = await getCartId();
        const res = await fetch(`${API_BASE}/cart/${cartId}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone,
                name,
                info,
            }),
        });
        const data = await res.json();

        showNotification({
            title: "Заказ оформлен",
            message: `Номер заказа: ${data.id}`,
            color: "green",
            autoClose: 10000,
        });

        await fetchCart();

        setOrderLoading(false);
    }

    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        fetchCart();
        setPhone(localStorage.getItem("phone") || "");
        setName(localStorage.getItem("name") || "");
        setInfo(localStorage.getItem("info") || "");
    }, []);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Корзина" centered>
                <Stack key="c">
                    {cart.map((item, i) => (
                        <>
                            <ItemDisplayCart
                                key={"e" + i}
                                item={item}
                                onItemRemove={removeFromCart(item)}
                            />
                            <Divider key={"d" + i} />
                        </>
                    ))}
                    <Input
                        component={IMaskInput}
                        mask="+7 (900) 000-00-00"
                        placeholder="+7 (9XX) XXX-XX-XX"
                        value={phone}
                        error={orderError}
                        onAccept={(val) => {
                            setPhone(val);
                            setOrderError(false);
                        }}
                    />
                    <Input
                        placeholder="Как вас зовут?"
                        value={name}
                        error={orderError}
                        onChange={(e) => {
                            setName(e.target.value);
                            setOrderError(false);
                        }}
                    />
                    <Input
                        placeholder="Дополнительная информация"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <Divider />
                    <Stack gap="0">
                        <Text size="md">
                            Итого:{" "}
                            {(cart.length != 0 &&
                                cart
                                    .map((x) => x.price)
                                    .reduce((a, b) => a + b)) ||
                                "0"}{" "}
                            руб.
                        </Text>
                        <Text size="sm" c="dimmed">
                            Доставка по СПб: 500 руб.
                        </Text>
                    </Stack>
                    <Button
                        loading={orderLoading}
                        variant="gradient"
                        fullWidth
                        onClick={order}
                    >
                        Оформить заказ
                    </Button>
                </Stack>
            </Modal>
            <Stack align="center" pos="relative">
                <Hello />
                <WhyUs />
                <Catalog onCartAdd={addToCart} />
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
                    {cart.length != 0 && (
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
                            {cart.length}
                        </Badge>
                    )}
                </Button>
            </Stack>
        </>
    );
}

function ItemDisplayCart({
    item,
    onItemRemove,
}: {
    item: Item;
    onItemRemove?: () => any;
}) {
    return (
        <Paper key={"i" + item.id} px="md" py="lg">
            <Group gap="md" align="center" ta="left">
                <Image
                    key={"img" + item.id}
                    src={item.image}
                    alt={item.title}
                    maw={75}
                    miw={75}
                    mah={75}
                    mih={75}
                    fit="contain"
                />
                <Stack gap="xs" align="center" justify="center">
                    <Title visibleFrom="md" size="lg" fw={300}>
                        {item.title}
                    </Title>
                    <Title hiddenFrom="md" size="md" fw={300}>
                        {item.title}
                    </Title>
                    <Title size="xs" c="dimmed">
                        {item.price} руб.
                    </Title>
                    <Button
                        hiddenFrom="md"
                        variant="subtle"
                        onClick={onItemRemove}
                    >
                        <IconX />
                        Удалить
                    </Button>
                </Stack>
                <div style={{ flex: 1 }} />
                <Button
                    visibleFrom="md"
                    variant="subtle"
                    onClick={onItemRemove}
                >
                    <IconX />
                </Button>
            </Group>
        </Paper>
    );
}
