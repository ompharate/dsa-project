import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import HandleUser from "./components/privateRoutes/HandleUser";
import UserDashboard from "./pages/UserDashboard";
import { UserAuth } from "./context/AuthContex";
import Loader from "./components/Loader";

function App() {
  const { isLoading } = UserAuth();
  return (
    <>
      <Header />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-96">
          <Loader />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<Error />} />

          <Route path="/teacher" element={<HandleUser />}>
            <Route path="dashboard" element={<UserDashboard />}></Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
