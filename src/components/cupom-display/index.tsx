import { View ,Text} from "react-native";

export function CupomDisplay({ cupomId }: { cupomId: string }) {
    return (
        <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 14, color: "#2D7A2E" }}>Cupom ID: {cupomId}</Text>
            {/* Adicione outras informações do cupom, se necessário */}
        </View>
    );
}