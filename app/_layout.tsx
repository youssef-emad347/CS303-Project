import { Stack } from "expo-router";
import Header from "@/components/Header";
export default function Layout() {

  return (
    <Stack>
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/forgetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ header : () => <Header/> }} /> 
      
    </Stack>  
  );
}
