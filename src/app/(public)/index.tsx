import { Button } from "@/components/Button"
import { Image, Text, View } from "react-native"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"
import { useEffect, useState } from "react"
import { useOAuth } from "@clerk/clerk-expo"

WebBrowser.maybeCompleteAuthSession()
export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const googleOAuth = useOAuth({ strategy: "oauth_google" })
    async function onGoogleSignIn() {
        try {
            setIsLoading(true)
            const redirectUrl = Linking.createURL("/")
            const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl })

            if (oAuthFlow.authSessionResult?.type === "success") {
                if (oAuthFlow.setActive) {
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
                }
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, [])
    return (
        <View className="flex-1 bg-blue-theme">
            <View className="w-full h-2/6 items-center justify-center">
                <Image source={require("@/assets/LOGO-MY-LITTLE-PET.png")} className="w-72 h-72 rounded-xl" />
            </View>
            <View className="w-full h-4/6 px-6 bg-white bottom-0 rounded-t-md flex flex-col items-center gap-8 py-8">

                <View className="w-full flex flex-col gap-1 h-1/3">
                    <Text className="font-crimson font-bold text-3xl text-start w-full">
                        Bem vindo ao My Little Pet
                    </Text>
                    <Text className="w-full font-crimson font-normal text-lg text-start">
                        Complete missões com seu companheiro e ganhe recompensa
                    </Text>
                </View>
                <View className="w-full h-2/3">
                    <Button icon="logo-google" title="Entrar com Google" isLoading={isLoading} onPress={onGoogleSignIn} />
                </View>
            </View>
        </View>
    )
}

