import { useUser } from "@clerk/clerk-expo";
import { View, Image, Text } from "react-native";

export function ProfileBox() {
    const { user } = useUser()
    return (
        <>
            <View className="bg-blue-theme rounded-lg px-4 py-4 flex flex-row gap-2 mb-6">
                <Image
                    source={{ uri: user?.imageUrl }}
                    className="w-14 h-14"
                />
                <View className="flex-grow">
                    <Text className="font-roboto font-bold text-lg text-white">{user?.fullName}</Text>
                    <Text className="text-white">20 anos</Text>
                </View>

            </View>
            {/* <View className="bg-blue-theme rounded-lg px-4 py-4 flex flex-col gap-2 mb-6">
                <Text className="font-roboto font-bold text-white text-2xl">Descrição</Text>
                <Text className="font-roboto font-normal text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum dolor dicta dolores ducimus, atque vel aspernatur consectetur? Repellat, quo? Recusandae facilis fugit illum molestiae quos, aliquid minus rerum eos ut?</Text>
            </View> */}
        </>
    )
}