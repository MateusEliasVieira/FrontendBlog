import React, {useEffect, useState} from "react"
import "./ReadPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import {useParams} from "react-router-dom";
import {ENDPOINT_SEARCH_POST} from "../../global/URLs.ts";

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
        const response = await fetch(`${ENDPOINT_SEARCH_POST}${idPost}`, {
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

    const formatDate = (date: string): string => {
        if (date !== "") {
            const dateObj = new Date(date);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // Os meses são baseados em zero (janeiro = 0)
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        } else {
            return "Invalid date";
        }
    }

    return(
        <section id="section-read-post">
            <MyNavbar/>
            <div>
                <h1>{data.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                <p><b>Author</b>: {data.user.name}</p>
                <p><b>Publish</b>: {formatDate(data.datePublish)}</p>
            </div>
        </section>
    )
}

export default ReadPost;