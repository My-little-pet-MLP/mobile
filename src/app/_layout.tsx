import "../../global.css"
import { router, Slot } from "expo-router"
import { useEffect } from "react"
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { CrimsonText_400Regular } from '@expo-google-fonts/crimson-text';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo"
import { ActivityIndicator } from "react-native"
import { tockeCache } from "./storage/tokenCache"
import axios from "axios"
import { SplashScreen } from "./(public)/splash-screen";
const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

interface UserProps {
    id: string 
    fullname: string
    imageUrl: string
    email:string
    phone: string
}
function InitialLayout() {
 
    const { isSignedIn, isLoaded } = useAuth()
    const {user} = useUser()
    useEffect(() => {
        if (!isLoaded) return
        if (isSignedIn ) {

            // const userinfos: UserProps = {
            //     id: user.id,
            //     fullname: user.fullName || "",
            //     imageUrl: user.imageUrl || "",
            //     email: user.emailAddresses[0]?.emailAddress || "",
            //     phone: user.phoneNumbers[0]?.phoneNumber || "",
            // };
            //  axios.post('http://192.168.3.103:8080/users',userinfos).then(()=>{
            //     router.replace("(auth)")
            // })
            //  .catch(error => {
            //      console.error("Error posting user data: ",error);
            //  });
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
        CrimsonText_400Regular,
        Poppins_400Regular,
      });
    if (!fontsLoaded) {
        return <SplashScreen />;
      }
    return (
        <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tockeCache}>
            <InitialLayout />
        </ClerkProvider>
    )
}