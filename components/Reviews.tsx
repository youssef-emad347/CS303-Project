import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Image,
} from "react-native";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { app, db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { mainColor } from "@/utils/constants";
import del from "@/assets/del.png";

interface ReviewProps {
  id?: string;
  user: string;
  comment: string;
  bookId: string;
  rating: number;
  userId: string;
}

export default function Review({ bookId }: { bookId: string }) {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0); // ⭐ new
  const [currentUid, setCurrentUid] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const reviewRef = collection(db, "reviews");
      const q = query(reviewRef, where("bookId", "==", bookId));
      const reviewSnap = await getDocs(q);
      const reviewsData: ReviewProps[] = [];

      reviewSnap.forEach((docSnap) => {
        const data = docSnap.data();
        reviewsData.push({
          id: docSnap.id,
          user: data.user,
          comment: data.comment,
          bookId: data.bookId,
          rating: data.rating || 0, 
          userId: data.userId,
        });
      });

      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      Alert.alert("Validation", "Comment cannot be empty.");
      return;
    }
    if (rating < 1 || rating > 5) {
      Alert.alert("Validation", "Please select a rating from 1 to 5 stars.");
      return;
    }

    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) return;

    const newReview: ReviewProps = {
      user: user.displayName || "Anonymous",
      comment,
      bookId,
      rating,
      userId: currentUid || user.uid,
    };

    try {
      await addDoc(collection(db, "reviews"), newReview);
      setComment("");
      setRating(0);
      await fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
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
    const user = auth.currentUser;
    if (user) {
      setCurrentUid(user.uid);
    }
    fetchReviews();
    // console.log(currentUid);     //for debugging
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reviews</Text>

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        reviews.map(({ id, user, comment, rating,userId }) => {
          if (!id) return null;
          return (
            <View key={id} style={styles.reviewCard}>
              <Text style={styles.name}>{user || "Unknown"}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Text key={i} style={{ fontSize: 18, color: i <= rating ? "#FFD700" : "#ccc" }}>
                    ★
                  </Text>
                ))}
              </View>
              <Text style={styles.review}>{comment}</Text>
              {userId === currentUid && (
              <Pressable onPress={() => handleDeleteReview(id)}>
                <Image source={del} style={styles.bin} />
              </Pressable>)}
            </View>
          );
        })
      )}

      <Text style={styles.header}>Add a Review</Text>

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => setRating(star)}>
            <Text style={{ fontSize: 24, color: star <= rating ? "#FFD700" : "#ccc" }}>★</Text>
          </Pressable>
        ))}
      </View>

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
  starsRow: {
    flexDirection: "row",
    marginBottom: 10,
    right: 3,
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
  bin: {
    width: 20,
    height: 20,
    opacity: 0.3,
    alignSelf: "flex-end",
  },
});
