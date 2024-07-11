import { MaterialCommunityIcons ,Ionicons} from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function LayoutApp(){
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor:"#F7AB2A",
            tabBarStyle:{
                height:96,
            },
            headerStyle:{
                height:144
            }
        }}>
            <Tabs.Screen name="index" options={{title:"Home" , tabBarIcon:({focused,color,size}) => {
                if(focused){
                    return <Ionicons name="home" color={color} size={size}/>
                }
                return <Ionicons name="home-outline" color={color} size={size}/>
            } }}/>
            <Tabs.Screen name="shopping" options={{title:"Shopping", tabBarIcon:({focused,color,size}) =>{
                if(focused){
                    return <MaterialCommunityIcons name="shopping" color={color} size={size}/>
                }
                return <MaterialCommunityIcons name="shopping-outline" color={color} size={size}/>
            }}}/>
            <Tabs.Screen name="challangers" options={{title:"Challangers" ,tabBarIcon:({focused,color,size}) =>{
                if(focused){
                    return <MaterialCommunityIcons name="gift" color={color} size={size}/>
                }
                return <MaterialCommunityIcons name="gift-outline" color={color} size={size}/>
            }}}/>
            <Tabs.Screen name="profile" options={{title:"Profile" ,tabBarIcon:({focused,color,size}) => {
                if(focused){
                    return <Ionicons name="person" color={color} size={size}/>
                }
                return <Ionicons name="person-outline" color={color} size={size}/>
            }}}/>
        </Tabs>
    )
}