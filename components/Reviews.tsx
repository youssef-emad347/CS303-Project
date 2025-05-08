import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import {
  doc,
  deleteDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app, db } from "@/firebase/firebase";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { getAuth } from "firebase/auth";
import { mainColor } from "@/utils/constants";

interface ReviewProps {
  id: string;
  user: string;
  comment: string;
  bookId: string;
}

export default function Review({ bookId }: { bookId: string }) {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const reviewRef = collection(db, "reviews");
      const q = query(reviewRef, where("bookId", "==", bookId));
      const reviewSnap = await getDocs(q);
      const reviewsData: ReviewProps[] = [];

      reviewSnap.forEach((doc) => {
        reviewsData.push(doc.data() as ReviewProps);
      });

      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!user.trim() || !comment.trim()) {
      Alert.alert("Validation", "User and comment fields cannot be empty.");
      return;
    }

    const id = uuidv4();
    const newReview: ReviewProps = { id, user, comment, bookId };

    try {
      await setDoc(doc(db, "reviews", id), newReview);
      setUser("");
      setComment("");
      await fetchReviews();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      await fetchReviews();
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser.displayName || "Anonymous");
    }
    fetchReviews();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reviews</Text>

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        reviews.map(({ id, user, comment }) => (
          <View key={id} style={styles.reviewCard}>
            <Text style={styles.name}>{user}</Text>
            <Text style={styles.review}>{comment}</Text>
            <Pressable onPress={() => handleDeleteReview(id)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        ))
      )}

      <Text style={styles.header}>Add a Review</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your comment"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <Pressable style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  input: {
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: mainColor,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  loading: {
    fontSize: 14,
    color: "#888",
  },
  reviewCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },
  review: {
    fontSize: 14,
    marginBottom: 8,
  },
  delete: {
    color: "red",
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
