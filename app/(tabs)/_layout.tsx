import { Tabs} from "expo-router";
import { StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return <Tabs screenOptions={{
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'black',
    tabBarStyle:{
      backgroundColor: "#ffc220",
    }
  }}>
    <Tabs.Screen name="home" options={{ headerShown: false, tabBarLabel:'Home',
 tabBarIcon: ({focused }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'}  size={26} color="black" /> }} />
    <Tabs.Screen name="camera" options={{ headerShown: false, tabBarLabel:'Scan',
      tabBarIcon:({focused})=> <Ionicons name={focused ? 'camera-sharp' : 'camera-outline'} size={26} color="black" />
     }} />
    <Tabs.Screen name="profile" options={{ headerShown: false, tabBarLabel:'Profile',
      tabBarIcon:({focused})=> <Ionicons name={focused ? 'person-sharp' : 'person-outline'} size={26} color="black" />
     }} />
     
    </Tabs>;
}


const style= StyleSheet.create({
  container:{
    backgroundColor: "#6cace4",
  }
})