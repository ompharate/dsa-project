import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { v4 as uuidv4 } from 'uuid';

export const useHandleSubject = () => {
  const addSubject = async (uid, formData) => {
    try {
      const customId = uuidv4();
      const docRef = doc(db, "subjects", customId);
      await setDoc(docRef, {
        subjectId:customId,
        teacherId: uid,
        subjectName: formData,
      });
      console.log("subject created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubject = async (uid) => {
    try {
      const newDataArr = [];
      const querySnapshot = await getDocs(
        query(collection(db, "subjects"), where("teacherId", "==", uid))
      );
      querySnapshot.forEach((doc) => {
        console.log("doc data is", doc.data());
        newDataArr.push(doc.data());
      });
      return newDataArr;
    } catch (error) {
      console.log(error);
    }
  };

  return { addSubject, fetchSubject };
};
