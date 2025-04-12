import { useLocalSearchParams } from "expo-router";
import AuthorDetails from "@/components/AuthorDetails"; 

export default function BookDetailsScreen() {
  const { name } = useLocalSearchParams(); 

  return <AuthorDetails name={name as string} />;
}
