import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();
export const UserAuth = () => {
  return useContext(UserContext);
};

export default function AuthContextProvider({ children }) {
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  // const [isStudent, setIsStudent] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "teacher", user.uid), (doc) => {
          setUser(doc.data());
          setIsLoggedOut(false);
          console.log("it ran again teacher");
        });
      } else {
        setUser(null);
        setIsLoggedOut(true);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedOut, user }}>
      {children}
    </UserContext.Provider>
  );
}
