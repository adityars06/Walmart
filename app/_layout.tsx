import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    
    
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="userInfo" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="tailoredSection" options={{ headerShown: false }} />
    
    <Stack.Screen name="productSummary" options={{ headerShown: false }} />
    <Stack.Screen name="commsub" options={{ headerShown: false }} />
    
    
    {/* Add any additional screens here */}
    </Stack>
    
  
}



