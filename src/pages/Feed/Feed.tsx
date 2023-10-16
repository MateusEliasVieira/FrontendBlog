import React, {useEffect, useState} from "react";
import Post from "../../components/post/Post.tsx";
import "./Feed.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";

const Feed:React.FC = ()=>{

    const[data,setData]=useState([])

    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/";
        }else{
            findAllPosts()
        }
    }, []);

    const findAllPosts = async ()=>{
        console.log("TOken "+localStorage.getItem("token"))
        try {
            // Resolve()
            const response = await fetch("http://localhost:8080/posts/all",{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
                method:"GET"
            })
            const json = await response.json()
            console.log(json)
            setData(json)
        }catch (e) {
            // Reject()
            console.log(e)
        }
    }

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
        <>
        <MyNavbar/>
        <section id="section-feed">
            <section id="section-posts">
                {
                    data.map((post)=>(
                        <Post key={post.idPost}
                            idPost={post.idPost}
                            titlePost={post.title}
                            srcImage={post.image}
                            nameUserPost={post.user.name}
                            datePublishPost={formatDate(post.datePublish)}
                            widthImage="100%"
                            heightImage="200"
                            contentPost={post.content}
                        />
                    ))
                }
            </section>
        </section>
        </>
    )
}

export default Feed;