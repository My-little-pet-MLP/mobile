import { Stack } from "expo-router";

export default function CardLayout() {
    return (
        <Stack>
            {/* Tela inicial de Card */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="cupom-screen/[storeId]/[orderId]" options={{ headerShown: false }} />
            <Stack.Screen
                name="finalize-order/[orderId]"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}