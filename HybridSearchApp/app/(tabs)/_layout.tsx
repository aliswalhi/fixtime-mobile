import { Stack } from 'expo-router';
import { OrderProvider } from './OrderContext';

export default function Layout() {
    return (
        <OrderProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </OrderProvider>
    );
}