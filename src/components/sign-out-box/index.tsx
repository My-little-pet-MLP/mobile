import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";

export function SignOutBox() {
    const { signOut } = useAuth()
    return (


        <View className="bg-blue-theme rounded  px-4 py-4 flex flex-col gap-2 mb-6">

            <TouchableOpacity onPress={() => signOut()} style={{ backgroundColor: "#ef4444", height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, flexDirection: "row", gap: 8, padding: 8 }}>
                <Ionicons color="#fff" name="log-out" size={28} />
                <Text className="text-white font-roboto text-lg">Sair</Text>
            </TouchableOpacity>
        </View>
    )
}