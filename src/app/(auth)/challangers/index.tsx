import { MissionBoxHome } from "@/components/mission-box-home";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChallangerScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24, marginBottom: 12 }}>
            <ScrollView>
                <MissionBoxHome />
            </ScrollView>
        </SafeAreaView>

    )
}