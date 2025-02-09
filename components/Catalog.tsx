"use client";

import {
    Stack,
    Tabs,
    Title,
    Image,
    Paper,
    Button,
    Flex,
    Group,
    SegmentedControl,
    Container,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { API_BASE } from "./Constants";

const ITEM_CATEGORIES = [
    {
        id: 1,
        title: "Вино",
    },
    {
        id: 2,
        title: "Сок",
    },
    {
        id: 3,
        title: "Пиво",
    },
    {
        id: 4,
        title: "Водка",
    },
    {
        id: 5,
        title: "Коньяк",
    },
    {
        id: 6,
        title: "Виски",
    },
    {
        id: 7,
        title: "Ром",
    },
    {
        id: 8,
        title: "Вермут",
    },
    {
        id: 9,
        title: "Джин",
    },
    {
        id: 10,
        title: "Игристое",
    },
];

const ITEMS_PLACEHOLDER: Item[] = [
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
    {
        id: 4,
        title: "Водка",
        price: 500,
        image: "https://placehold.co/150",
        category: 4,
    },
    {
        id: 5,
        title: "Коньяк",
        price: 1000,
        image: "https://placehold.co/150",
        category: 5,
    },
    {
        id: 6,
        title: "Виски",
        price: 2000,
        image: "https://placehold.co/150",
        category: 6,
    },
    {
        id: 7,
        title: "Ром",
        price: 800,
        image: "https://placehold.co/150",
        category: 7,
    },
    {
        id: 8,
        title: "Вермут",
        price: 700,
        image: "https://placehold.co/150",
        category: 8,
    },
    {
        id: 9,
        title: "Джин",
        price: 1200,
        image: "https://placehold.co/150",
        category: 9,
    },
    {
        id: 10,
        title: "Игристое",
        price: 600,
        image: "https://placehold.co/150",
        category: 10,
    },
];

export default function Catalog({
    onCartAdd,
}: {
    onCartAdd: (item: Item) => any;
}) {
    const [items, setItems] = useState<Item[]>([]);
    const [mobileControl, setMobileControl] = useState("all");

    function addToCart(item: Item) {
        return () => {
            onCartAdd(item);
        };
    }

    function fetchCatalog() {
        fetch(`${API_BASE}/items`)
            .then((res) => res.json())
            .then((data) => setItems(data));
    }
    useEffect(fetchCatalog, []);

    return (
        <Stack maw="75%" gap="xl" align="center">
            <Title id="cat" mt="15%" ta="center" ff="Segoe UI Bold">
                Попробуйте наш тщательно подобранный ассортимент
            </Title>
            <Tabs
                defaultValue="all"
                orientation="horizontal"
                variant="pills"
                px="1rem"
                visibleFrom="md"
            >
                <Tabs.List mb="lg" justify="center">
                    <Tabs.Tab value="all">Все</Tabs.Tab>
                    {ITEM_CATEGORIES.map((category) => (
                        <Tabs.Tab
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.title}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>

                <Tabs.Panel value="all">
                    <Flex gap="xl" align="center" wrap="wrap" justify="center">
                        {items.map((item) => (
                            <ItemDisplay
                                onClick={addToCart(item)}
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </Flex>
                </Tabs.Panel>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Tabs.Panel key={index} value={(index + 1).toString()}>
                        <Flex
                            gap="xl"
                            align="center"
                            wrap="wrap"
                            justify="center"
                        >
                            {items
                                .filter((item) => item.category === index + 1)
                                .map((item) => (
                                    <ItemDisplay
                                        onClick={addToCart(item)}
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                        </Flex>
                    </Tabs.Panel>
                ))}
            </Tabs>
            <Stack hiddenFrom="sm" gap="xl" align="center">
                <Container
                    maw="100dvw"
                    style={{
                        overflow: "scroll",
                        scrollbarWidth: "thin",
                    }}
                >
                    <SegmentedControl
                        value={mobileControl}
                        onChange={setMobileControl}
                        data={[
                            { value: "all", label: "Все" },
                            ...ITEM_CATEGORIES.map((category) => ({
                                value: category.id.toString(),
                                label: category.title,
                            })),
                        ]}
                    />
                </Container>
                <Flex gap="xl" align="center" wrap="wrap" justify="center">
                    {items
                        .filter((item) => {
                            if (mobileControl === "all") return true;
                            return item.category === parseInt(mobileControl);
                        })
                        .map((item) => (
                            <ItemDisplayMobile
                                onClick={addToCart(item)}
                                key={item.id}
                                item={item}
                            />
                        ))}
                </Flex>
            </Stack>
        </Stack>
    );
}

export function ItemDisplay({
    item,
    onClick,
}: {
    item: Item;
    onClick?: () => any;
}) {
    return (
        <Paper key={item.id} px="md" py="lg">
            <Stack gap="2px" align="center">
                <Image
                    src={item.image}
                    alt={item.title}
                    maw={150}
                    mah={150}
                    fit="contain"
                />
                <Title size="lg" fw={300} mt="xs">
                    {item.title}
                </Title>
                <Title size="xs" c="dimmed">
                    {item.price} руб.
                </Title>
                {onClick && (
                    <Button
                        variant="gradient"
                        mt="md"
                        fw={400}
                        justify="center"
                        onClick={onClick}
                    >
                        <IconPlus /> Добавить
                    </Button>
                )}
            </Stack>
        </Paper>
    );
}

export function ItemDisplayMobile({
    item,
    onClick,
}: {
    item: Item;
    onClick?: () => any;
}) {
    return (
        <Paper key={item.id} px="md" py="lg">
            <Group gap="md" align="center" ta="center">
                <Image
                    src={item.image}
                    alt={item.title}
                    miw={150}
                    maw={150}
                    h={150}
                    fit="contain"
                />
                <Stack gap="xs">
                    <Title size="lg" fw={300}>
                        {item.title}
                    </Title>
                    <Title size="xs" c="dimmed">
                        {item.price} руб.
                    </Title>
                    {onClick && (
                        <Button
                            variant="gradient"
                            mt="md"
                            fw={400}
                            justify="center"
                            onClick={onClick}
                        >
                            <IconPlus /> Добавить
                        </Button>
                    )}
                </Stack>
            </Group>
        </Paper>
    );
}

export interface Item {
    id: number;
    title: string;
    price: number;
    image: string;
    category: number;
}
