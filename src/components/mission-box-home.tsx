import { useListMissions } from "@/libs/react-query/missions-queries-and-mutations";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MissionCard } from "./mission-component";
import { useGrantCupom } from "@/libs/react-query/cupom-queries-and-mutations";
import { useEffect, useState } from "react";
import { isCupomGeneratedToday, setCupomGeneratedToday } from "@/utils/storageService"; // Importação das funções de armazenamento

export function MissionBoxHome() {
    const { user } = useUser();
    const { data: listMissions = [], error: errorListMissions, isLoading: isLoadingListMissions } = useListMissions(user?.id ?? "");
    const { mutateAsync: GrantCupomAsyncFunction, error, isPending, data } = useGrantCupom();
    const [rewardClaimedToday, setRewardClaimedToday] = useState(false); // Estado para verificar se a recompensa foi resgatada

    function HandlerMissionScreen() {
        router.push("/(auth)/challangers");
    }
    function HandlerCuponsScreen() {
        router.push(`/(auth)/cart`);
    }

    useEffect(() => {
        // Função para checar se o cupom já foi gerado hoje
        async function checkRewardStatus() {
            const isGenerated = await isCupomGeneratedToday();
            setRewardClaimedToday(isGenerated); // Define o estado baseado no retorno da função de verificação
        }
        checkRewardStatus();
    }, []);

    async function GetCupomHandler() {
        await GrantCupomAsyncFunction(user?.id ?? "");
        await setCupomGeneratedToday(); // Define a data atual como a última data de geração do cupom
        setRewardClaimedToday(true); // Atualiza o estado para esconder o botão e mostrar a mensagem
    }

    const allMissionsCompleted = listMissions.length > 0 && listMissions.every((mission) => mission.concluido);

    return (
        <>
            {isLoadingListMissions ? (
                <View className="w-full h-fit bg-blue-theme p-6 rounded-lg mt-20">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold text-white text-2xl">Missões</Text>
                        <TouchableOpacity style={{ width: "50%" }} onPress={HandlerMissionScreen}>
                            <View className="h-auto w-full items-end justify-center flex">
                                <Text className="text-white font-bold text-lg">Saiba mais</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full min-h-48 flex items-center justify-center">
                        <ActivityIndicator size="large" color="#FFB800" />
                    </View>
                </View>
            ) : (
                <View className="w-full h-fit bg-blue-theme p-6 rounded-lg mt-20">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold text-white text-2xl">Missões</Text>
                        <TouchableOpacity style={{ width: "50%" }} onPress={HandlerMissionScreen}>
                            <View className="h-auto w-full items-end justify-center flex">
                                <Text className="text-white font-bold text-lg">Saiba mais</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full min-h-48 flex flex-col items-center justify-center mt-4">
                        {allMissionsCompleted ? (
                            <>
                                <Text className="text-white font-bold text-lg text-center">
                                    Você completou todas as missões do dia, Parabéns!!
                                </Text>
                                {rewardClaimedToday ? (
                                    <>
                                        <Text className="text-white font-bold text-xl text-center mt-4">
                                            Recompensa já resgatada hoje!
                                        </Text>
                                        <TouchableOpacity onPress={() => HandlerCuponsScreen()} style={{
                                            marginTop: 16,
                                            padding: 24,
                                            backgroundColor: "#0CCBFF",
                                            borderRadius: 8,
                                        }}>
                                            <Text className="text-white font-bold text-xl text-center">Veja no seu carrinho de compra</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <TouchableOpacity
                                        onPress={GetCupomHandler}
                                        style={{
                                            marginTop: 16,
                                            padding: 24,
                                            backgroundColor: "#0AA9CC", // Cor levemente mais escura para destacar
                                            borderRadius: 8,
                                            shadowColor: "#000",
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 4,
                                            elevation: 5, // Para Android
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Camada transparente sobreposta para efeito de brilho */}
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                borderRadius: 8,
                                            }}
                                        />
                                        {/* Conteúdo do botão */}
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
                                            Pegar Recompensa
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            listMissions.map((mission) => (
                                <MissionCard key={mission.id} mission={mission} />
                            ))
                        )}
                        {errorListMissions && <Text className="text-red-500 text-center mt-2">Erro ao carregar as missões. Tente novamente.</Text>}
                    </View>
                </View>
            )}
        </>
    );
}
