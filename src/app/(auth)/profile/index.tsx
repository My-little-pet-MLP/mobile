import { useAuth, useUser } from "@clerk/clerk-expo";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useState } from "react";
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons"
interface Pet {
    id: string;
    name: string;
    imageUrl: string;
    birthDay: string;
    breed: string;
    size: "pequeno" | "medio" | "grande"
}

export default function ProfileScreen() {
    const [pets, setPets] = useState<Pet[]>([
        {
            id: "2312ed1",
            name: "Luck",
            imageUrl: "https://fbi.cults3d.com/uploaders/27426506/illustration-file/21f32467-674d-43f0-995d-5d3beefbc8fe/shi-tzu.png",
            birthDay: "09/02/2004",
            breed: "shitzu",
            size: "pequeno"
        },
        {
            id: "hjbjbo8",
            name: "Luck",
            imageUrl: "https://fbi.cults3d.com/uploaders/27426506/illustration-file/21f32467-674d-43f0-995d-5d3beefbc8fe/shi-tzu.png",
            birthDay: "09/02/2004",
            breed: "shitzu",
            size: "pequeno"
        }
    ])
    const { signOut } = useAuth()
    const { user } = useUser()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
            <ScrollView>
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
                <View className="bg-blue-theme rounded-lg px-4 py-4 flex flex-col gap-2 mb-6">
                    <Text className="font-roboto font-bold text-white text-2xl">Descrição</Text>
                    <Text className="font-roboto font-normal text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum dolor dicta dolores ducimus, atque vel aspernatur consectetur? Repellat, quo? Recusandae facilis fugit illum molestiae quos, aliquid minus rerum eos ut?</Text>
                </View>
                <View className="bg-blue-theme rounded-2xl px-4 py-4 flex flex-col gap-6 min-h-64 mb-6">
                    <Text className="font-roboto font-bold text-white text-2xl">Pets</Text>
                    <View >
                            {pets.map((pet) => (
                                <View key={pet.id} className="flex flex-row gap-6 bg-white p-6 rounded-lg mb-6">
                                    <Image
                                        source={{ uri: pet.imageUrl }}
                                        className="w-24 h-24 rounded-lg"
                                    />
                                    <View className="">
                                        <Text className="text-lg ">nome: {pet.name}</Text>
                                        <Text className="text-lg ">raça: {pet.breed}</Text>
                                        <Text className="text-lg ">porte: {pet.size}</Text>
                                        <Text className="text-lg font-roboto ">data de nascimento:<Text className="text-base">{pet.birthDay}</Text></Text>
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>
                <View className="bg-blue-theme rounded  px-4 py-4 flex flex-col gap-2 mb-6">

                    <TouchableOpacity onPress={()=> signOut()} style={{backgroundColor:"#ef4444", height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,flexDirection:"row",gap:8,padding:8}}>
                       <Ionicons color="#fff" name="log-out" size={28}/>
                        <Text className="text-white font-roboto text-lg">Sair</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
