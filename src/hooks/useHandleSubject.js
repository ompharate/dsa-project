import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";

export const useHandleSubject = () => {
  const addSubject = async (uid, formData) => {
    try {
      const customId = uuidv4();
      const docRef = doc(db, "subjects", customId);
      await setDoc(docRef, {
        subjectId: customId,
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

  const AddAttendance = async (roll, date, isPresent, subjectId, teacherId) => {
    try {
      const docRef = collection(db, "attendance");
      await addDoc(docRef, {
        roll,
        date,
        isPresent,
        subjectId,
        teacherId,
      });
      console.log("attendance added successfully");
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const AddMarks = async (
    label,
    roll,
    outof,
    received,
    subjectId,
    teacherId
  ) => {
    try {
      const rollNumber = parseInt(roll);
      const docRef = collection(db, "marks");
      await addDoc(docRef, {
        label,
        roll: rollNumber,
        outof,
        received,
        subjectId,
        teacherId,
      });
      console.log("marks added successfully");
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const fetchMarks = async (teacherId, subjectId) => {
    try {
      const newDataArr = [];
      const querySnapshot = await getDocs(
        query(
          collection(db, "marks"),
          where("teacherId", "==", teacherId),
          where("subjectId", "==", subjectId)
          // orderBy("roll"),
        )
      );
      querySnapshot.forEach((doc) => {
        console.log(doc);
       if (doc) newDataArr.push(doc.data());     
      });
      return newDataArr;
    } catch (error) {
      console.log(error);
    }
  };

  return { addSubject, fetchSubject, AddAttendance, AddMarks, fetchMarks };
};
