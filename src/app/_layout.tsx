import "../../global.css"
import { router, Slot } from "expo-router"
import { useEffect } from "react"
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar } from "react-native";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo"
import { ActivityIndicator } from "react-native"
import { tockeCache } from "./storage/tokenCache"
import { SplashScreen } from "./(public)/splash-screen";
import { env } from "@/env";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

function InitialLayout() {
    const { isSignedIn, isLoaded } = useAuth()
    const {user} = useUser()
    useEffect(() => {
        if (!isLoaded) return
        if (isSignedIn && user) {
                 router.replace("(auth)")
        } else {
            router.replace("(public)")
        }
    }, [isSignedIn])
    return isLoaded ? <Slot /> : (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    )
}
export default function Layout() {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold
      });
    if (!fontsLoaded) {
        return <SplashScreen />;
      }
    return (
        <>
        <StatusBar barStyle="light-content" />
        <ClerkProvider publishableKey={env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tockeCache}>
            <InitialLayout />
        </ClerkProvider>
        </>
    )
}