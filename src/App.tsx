 import '../src/App.css';
 import Feed from "./pages/feed/Feed.tsx";
 import Login from "./pages/Login/Login.tsx";
 import {BrowserRouter, Routes, Route} from "react-router-dom";

 function App() {
  return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/feed" element={<Feed/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App
