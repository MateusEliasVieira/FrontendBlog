import React, {useEffect, useState} from "react"
import "./ReadPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import {useParams} from "react-router-dom";

const ReadPost:React.FC = ()=>{

    const { idPost } = useParams(); // pega o novo valor do parametro da url de forma automatica quando muda

    const[data,setData]=useState({
        title:"",
        content:"",
        datePublish:"",
        user:{
            name:""
        }
    })

    const searchPost = async ()=>{
        const response = await fetch(`http://localhost:8080/posts/read-post/${idPost}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "GET"
        });
        const json = await response.json();
        setData({...json})
    }

    useEffect(  () => {
        searchPost()
    }, []);

    return(
        <section id="section-read-post">
            <MyNavbar/>
            <div>
                <h1>{data.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                <p><b>Author</b>: {data.user.name}</p>
                <p><b>Publish</b>: {data.datePublish}</p>
            </div>
        </section>
    )
}

export default ReadPost;