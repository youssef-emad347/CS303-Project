import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function Layout() {

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ header : () => <Header/> }} /> 
      
    </Stack>  
  );
}
