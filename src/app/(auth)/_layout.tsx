import { Tabs } from "expo-router";

export function LayoutApp(){
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{title:"Home"}}/>
        </Tabs>
    )
}