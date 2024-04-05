import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>          
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Error/>}/>          
      </Routes>
    </BrowserRouter>
  )
}

export default App
