import { useListMissions } from "@/libs/react-query/missions-queries-and-mutations";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Mission } from "../../@types/mission";
import { useState } from "react";

export function MissionBoxHome() {
    const { user } = useUser();
    const [activeTimers, setActiveTimers] = useState({});
    const { data: listMissions, error: errorListMissions, isLoading: isLoadingListMissions } = useListMissions(user?.id ?? "");
    //console.log(listMissions)
    function HandlerMissionScreen() {
        router.push("/(auth)/challangers")
    }
    function MissionCard({ mission }: { mission: Mission }) {
        const [isTimerRunning, setIsTimerRunning] = useState(false);
        const [remainingTime, setRemainingTime] = useState(mission.timer! * 60);

        function startTimer() {
            setIsTimerRunning(true);
            const timerInterval = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerInterval);
                        setIsTimerRunning(false);
                        logMissionCompletion(mission.id);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return (
            <View className="w-full h-fit bg-white p-4 rounded-lg mt-4 shadow-md">
                <Text className="text-black text-xl font-bold mb-2">{mission.descricao}</Text>
                {mission.timer && (
                    <View className="mb-2">
                        {isTimerRunning ? (
                            <Text className="text-gray-500">Tempo Restante: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}</Text>
                        ) : (
                            <TouchableOpacity className="p-2 bg-green-500 rounded-md" onPress={startTimer}>
                                <Text className="text-white text-center">Iniciar Temporizador</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                {!mission.timer && (
                    <TouchableOpacity className="mt-2 p-2 bg-blue-500 rounded-md" onPress={() => logMissionCompletion(mission.id)}>
                        <Text className="text-white text-center">Concluir Missão</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    function logMissionCompletion(missionId: string) {
        console.log(`Missão ${missionId} concluída.`);
    }


    return (
        <>
            {
                isLoadingListMissions ? (
                    <View className="w-full h-fit bg-blue-theme p-6 rounded-lg mt-20">
                        <View className="flex flex-row justify-between">
                            <Text className="font-bold text-white text-2xl">Missões</Text>
                            <TouchableOpacity style={{ width: "50%" }} onPress={() => HandlerMissionScreen()}>
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
                            <TouchableOpacity style={{ width: "50%" }} onPress={() => HandlerMissionScreen()}>
                                <View className="h-auto w-full items-end justify-center flex">
                                    <Text className="text-white font-bold text-lg">Saiba mais</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className="w-full min-h-48 flex flex-col items-center justify-center mt-4">
                            {listMissions && listMissions.length > 0 ? (
                                listMissions.map((mission) => (
                                    <MissionCard key={mission.id} mission={mission} />
                                ))
                            ) : (
                                <Text className="text-lg text-white font-bold text-center break-words w-64">Você completou todas as suas missões</Text>
                            )}
                        </View>
                    </View>
                )
            }
        </>
    )
}