import '../src/App.css';
import Feed from "./pages/Feed/Feed.tsx";
import Login from "./pages/Login/Login.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register.tsx";
import NewPost from "./pages/NewPost/NewPost.tsx";
import ReadPost from "./pages/ReadPost/ReadPost.tsx";
import ConfirmationAccount from "./pages/ConfirmationAccount/ConfirmationAccount.tsx";
import NewPassword from './pages/NewPassword/NewPassword.tsx';
import RecoverAccount from './pages/RecoverAccount/RecoverAccount.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/recover-account" element={<RecoverAccount />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/logoff" element={<Login />} />
                <Route path="/create-account" element={<Register />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/read-post/:idPost" element={<ReadPost />} />
                <Route path="/confirmation/*" element={<ConfirmationAccount />} />
                <Route path="/new-password/*" element={<NewPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
