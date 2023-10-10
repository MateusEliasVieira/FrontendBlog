import React, {useEffect} from "react"
import Editor from "../../components/editor/Editor.tsx";
import "./NewPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";

const NewPost:React.FC = ()=>{
    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/";
        }
    }, []);
    return(
        <section id="section-new-post">
            <MyNavbar/>
            <Editor/>
        </section>
    )
}

export default NewPost;