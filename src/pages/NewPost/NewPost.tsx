import React from "react"
import Editor from "../../components/editor/Editor.tsx";
import "./NewPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";

const NewPost:React.FC = ()=>{
    return(
        <section id="section-new-post">
            <MyNavbar/>
            <Editor/>
        </section>
    )
}

export default NewPost;