import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAddUsers = () => {
  const addToDb = async ({ formData, CollectionName }) => {
    const { uid } = { ...formData };
    try {
      await setDoc(doc(db, CollectionName, uid), {
        ...formData,
      });
      console.log("data added successfully");
     
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  return { addToDb };
};
