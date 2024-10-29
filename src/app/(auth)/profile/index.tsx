import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PetBoxComponent } from "@/components/pet-box-componet";
import { SignOutBox } from "@/components/sign-out-box";
import { ProfileBox } from "@/components/profile-box";

export default function ProfileScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
            <ScrollView>
                <ProfileBox />
                <PetBoxComponent />
                <SignOutBox />
            </ScrollView>
        </SafeAreaView>
    )
}
