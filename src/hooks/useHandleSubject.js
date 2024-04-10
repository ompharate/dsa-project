import {
  addDoc,
  collection,
  deleteDoc,
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
      ("subject created successfully");
    } catch (error) {
      (error);
    }
  };

  const fetchSubject = async (uid) => {
    try {
      const newDataArr = [];
      const querySnapshot = await getDocs(
        query(collection(db, "subjects"), where("teacherId", "==", uid))
      );
      querySnapshot.forEach((doc) => {
        ("doc data is", doc.data());
        newDataArr.push(doc.data());
      });
      return newDataArr;
    } catch (error) {
      (error);
    }
  };

  const AddAttendance = async (roll, date, isPresent, subjectId, teacherId,activeSubject) => {
    try {
      const customId = uuidv4();
      const docRef = doc(db, "attendance", customId);
      await setDoc(docRef, {
        attendanceId: customId,
        roll,
        date,
        isPresent,
        subjectId,
        teacherId,
        activeSubject
      });
      ("attendance added successfully");
      return "Attendance added successfully";
    } catch (error) {
      (error);
    }
    return false;
  };

  const AddMarks = async (
    label,
    roll,
    outof,
    received,
    subjectId,
    teacherId,
    activeSubject
  ) => {
    try {
      const customId = uuidv4();
    
      const docRef = doc(db, "marks", customId);
      await setDoc(docRef, {
        marksId: customId,
        label,
        roll,
        outof,
        received,
        subjectId,
        teacherId,
        activeSubject
      });
      ("marks added successfully");
      return "marks added successfully";
    } catch (error) {
      (error);
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
        (doc);
        if (doc) newDataArr.push(doc.data());
      });
      return newDataArr;
    } catch (error) {
      (error);
    }
  };
  const fetchAttendance = async (teacherId, subjectId) => {
    try {
      const newDataArr = [];
      const querySnapshot = await getDocs(
        query(
          collection(db, "attendance"),
          where("teacherId", "==", teacherId),
          where("subjectId", "==", subjectId)
          // orderBy("roll"),
        )
      );
      querySnapshot.forEach((doc) => {
        (doc);
        if (doc) newDataArr.push(doc.data());
      });
      return newDataArr;
    } catch (error) {
      (error);
    }
  };
  const deleteAttendance = async (attendanceId) => {
    try {
      await deleteDoc(doc(db, "attendance", attendanceId));
      return "Attendance Deleted Successfully";
    } catch (error) {
      (error);
    }
  };
  const deleteMarks = async (marksId) => {
    (marksId)
    try {
      await deleteDoc(doc(db, "marks", marksId));
      return "Marks Deleted Successfully";
    } catch (error) {
      (error);
    }
  };

  return {
    addSubject,
    fetchSubject,
    AddAttendance,
    AddMarks,
    fetchMarks,
    fetchAttendance,
    deleteAttendance,
    deleteMarks,
  };
};
