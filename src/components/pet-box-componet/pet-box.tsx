import { View, Image, Text } from "react-native";

interface Props {
    id: string;
    name: string;
    breed: string;
    size: "mini" | "pequeno" | "medio" | "grande" | "gigante";
    imageUrl: string;
    age: number;
}
export function PetBox(pet: Props) {
    return (
        <View key={pet.id} className="flex flex-row gap-6 bg-white p-6 rounded-lg mb-6">
            <Image
                source={{ uri: pet.imageUrl }}
                className="w-24 h-24 rounded-lg"
            />
            <View className="">
                <Text className="text-lg ">nome: {pet.name}</Text>
                <Text className="text-lg ">raça: {pet.breed}</Text>
                <Text className="text-lg ">porte: {pet.size}</Text>
                <Text className="text-lg font-roboto ">Idade:<Text className="text-base">{pet.age}</Text></Text>
            </View>
        </View>
    )
}