import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { Credit } from "../utils/models/Credit";
export const addCredit = async (credit: Credit): Promise<void> => {
    try {
      const docRef = await addDoc(collection(db, "credits"), credit);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }