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
  const [isLoading, setIsLoading] = useState(true);
  // const [isStudent, setIsStudent] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "teacher", user.uid), (doc) => {
          setUser(doc.data());
          setIsLoggedOut(false);
         
        });
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoggedOut(true);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedOut, user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
