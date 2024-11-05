// utils/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CUPOM_DATE_KEY = 'lastCupomDate';

// Função para verificar se a recompensa já foi gerada hoje
export async function isCupomGeneratedToday() {
    const today = new Date().toISOString().split('T')[0];
    const lastCupomDate = await AsyncStorage.getItem(CUPOM_DATE_KEY);
    return lastCupomDate === today;
}

// Função para definir a data de hoje como a data de geração do cupom
export async function setCupomGeneratedToday() {
    const today = new Date().toISOString().split('T')[0];
    await AsyncStorage.setItem(CUPOM_DATE_KEY, today);
}
