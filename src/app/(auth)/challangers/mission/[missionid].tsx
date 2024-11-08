import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompleteMission, useFindByIdMission } from '@/libs/react-query/missions-queries-and-mutations';
import { router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function MissionScreen() {
    const { missionid } = useLocalSearchParams();
    const missionidFetch = Array.isArray(missionid) ? missionid[0] : missionid;

    const { data: missionData, error, isLoading, refetch } = useFindByIdMission(missionidFetch ?? "");
    const { mutateAsync: CompleteMissionFunction, isPending: isPendingCompleteMission } = useCompleteMission();

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const [isMissionCompleteEnabled, setIsMissionCompleteEnabled] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
            return () => {
                setImageUri(null);
                setTimeLeft(null);
                setIsTimerRunning(false);
                setIsMissionCompleteEnabled(false);
            };
        }, [missionidFetch])
    );

    useEffect(() => {
        if (missionData?.timer) {
            setTimeLeft(missionData.timer * 60); // Converte minutos para segundos
        }
    }, [missionData?.timer]);

    useEffect(() => {
        if (!isTimerRunning || timeLeft === null || timeLeft <= 0) return;

        const timerInterval = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev !== null ? prev - 1 : null;
                if (newTime === 0) {
                    setIsMissionCompleteEnabled(true);
                    setIsTimerRunning(false);
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [isTimerRunning, timeLeft]);

    const formatTimeLeft = () => {
        if (timeLeft === null) return "00:00";
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissão para acessar a galeria!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setImageUri(result.assets[0].uri);
            setIsMissionCompleteEnabled(true);
        }
    };

    const startTimer = () => {
        setIsTimerRunning(true);
    };

    const handleCompleteMission = async () => {
        if (missionid) {
            await CompleteMissionFunction(missionidFetch);
            router.push("/(auth)/challangers");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View className="flex-1 flex justify-center items-center bg-white">
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text className="text-lg mt-2 text-green-600">Carregando dados da missão...</Text>
                </View>
            ) : error ? (
                <View style={styles.container}>
                    <Text className="text-lg text-red-600">Erro ao carregar dados da missão.</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
                    <Text className="text-2xl font-bold text-green-600 mb-2">{missionData?.descricao}</Text>
                    
                    {missionData?.imageUrl && (
                        <Image source={{ uri: missionData.imageUrl }} className="w-48 h-48 rounded-lg mb-4" />
                    )}
                    
                    {missionData?.timer ? (
                        <View className="flex justify-center items-center mb-5 p-5 bg-gray-100 rounded-lg shadow-md">
                            <Text className="text-xl font-bold text-yellow-600 mb-2">⏰</Text>
                            <View className="w-32 h-24 bg-green-500 rounded-xl flex justify-center items-center mb-5">
                                <Text className="text-3xl font-bold text-white">{formatTimeLeft()}</Text>
                            </View>
                            {!isTimerRunning && (
                                <TouchableOpacity onPress={startTimer} style={styles.startButton}>
                                    <Text className="text-white font-bold text-lg">Iniciar Temporizador</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                onPress={handleCompleteMission}
                                style={[
                                    styles.completeButton,
                                    !isMissionCompleteEnabled ? styles.disabledButton : {},
                                ]}
                                disabled={!isMissionCompleteEnabled || isPendingCompleteMission}
                            >
                                {isPendingCompleteMission ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">Completar Missão</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCompleteMission}
                                style={styles.secondaryButton}
                            >
                                <Text className="text-orange-500 font-bold text-lg">Já fiz isso hoje</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity onPress={pickImage} style={styles.button}>
                                <Text className="text-white font-bold text-lg">Selecionar Imagem da Galeria</Text>
                            </TouchableOpacity>
                            {imageUri && (
                                <TouchableOpacity
                                    onPress={handleCompleteMission}
                                    style={[styles.completeButton, { marginTop: 10 }]}
                                    disabled={isPendingCompleteMission}
                                >
                                    {isPendingCompleteMission ? (
                                        <ActivityIndicator color="#FFF" />
                                    ) : (
                                        <Text className="text-white font-bold text-lg">Completar Missão</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                    {imageUri && (
                        <View className="mt-5 items-center">
                            <Text className="text-lg font-bold">Imagem Selecionada:</Text>
                            <Image source={{ uri: imageUri }} className="w-48 h-48 rounded-lg" />
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    startButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    completeButton: {
        backgroundColor: '#FF9800',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    secondaryButton: {
        marginTop: 15,
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FF9800',
        alignItems: 'center',
    },
});
