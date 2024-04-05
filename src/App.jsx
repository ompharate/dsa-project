import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

function App() {
  
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>          
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="*" element={<Error/>}/>          
      </Routes>
    </BrowserRouter>
  )
}

export default App
