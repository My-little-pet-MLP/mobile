import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function LayoutApp() {
  const router = usePathname();
  const navigate = useRouter();
  const [isProductPage, setIsProductPage] = useState(false);

  useEffect(() => {
    const pathname = router;
    // Verifica se a rota atual é a página do produto
    setIsProductPage(pathname.startsWith("/shopping/product"));
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F7AB2A",
        tabBarStyle: isProductPage ? { display: "none" } : { height: 96 },
        headerStyle: {
          height: isProductPage ? 0 : 144,
          backgroundColor: "#F7AB2A",
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name="home" color={color} size={size} />;
            }
            return <Ionicons name="home-outline" color={color} size={size} />;
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate.push("/cart")}>
              {/* Ícone de carrinho no header */}
              <MaterialCommunityIcons 
                name="cart" 
                size={32} 
                color="white" 
                style={{ marginRight: 24 }} 
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="shopping"
        options={{
          title: "Shopping",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <MaterialCommunityIcons name="shopping" color={color} size={size} />
              );
            }
            return (
              <MaterialCommunityIcons
                name="shopping-outline"
                color={color}
                size={size}
              />
            );
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate.push("/cart")}>
              {/* Ícone de carrinho no header */}
              <MaterialCommunityIcons 
                name="cart" 
                size={32} 
                color="white" 
                style={{ marginRight: 24 }} 
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="challangers/index"
        options={{
          title: "Desafios",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <MaterialCommunityIcons name="gift" color={color} size={size} />;
            }
            return <MaterialCommunityIcons name="gift-outline" color={color} size={size} />;
          },
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name="person" color={color} size={size} />;
            }
            return <Ionicons name="person-outline" color={color} size={size} />;
          },
        }}
      />

      <Tabs.Screen
      
        name="cart/index"
        options={{
          title:"CardShop",
          tabBarButton: () => null, // Esconde o botão da aba
        }}
      />
          <Tabs.Screen
      
      name="challangers/mission/[missionid]"
      options={{
        title:"Detalhes da Missão",
        tabBarButton: () => null, // Esconde o botão da aba
      }}
    />
    </Tabs>
    
  );
}
