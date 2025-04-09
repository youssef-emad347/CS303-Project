import { useLocalSearchParams } from "expo-router";
import BookDetails from "@/components/BookDetails"; 

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams(); 

  return <BookDetails id={id as string} />;
}
