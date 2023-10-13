 import '../src/App.css';
 import Feed from "./pages/Feed/Feed.tsx";
 import Login from "./pages/Login/Login.tsx";
 import {BrowserRouter, Routes, Route} from "react-router-dom";
 import Register from "./pages/Register/Register.tsx";
 import NewPost from "./pages/NewPost/NewPost.tsx";
 import ReadPost from "./pages/ReadPost/ReadPost.tsx";

 function App() {
  return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/create-account" element={<Register/>}/>
                <Route path="/new-post" element={<NewPost/>}/>
                <Route path="/read-post/:idPost" element={<ReadPost/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App
