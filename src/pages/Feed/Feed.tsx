import React, {useEffect, useState} from "react";
import Post from "../../components/post/Post.tsx";
import "./Feed.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import {ENDPOINT_PAGINATION_POSTS} from "../../global/Global.ts";

const Feed:React.FC = ()=>{

    const[data,setData]=useState([])
    const[numberPage,setNumberPage]=useState(0)
    const[qtdPages,setQtdPages]=useState(0)
    const[qtdPosts,setQtdPosts]=useState(0)

    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/";
        }else{
            findAllPosts()
        }
    }, [numberPage]);

    const findAllPosts = async ()=>{
        try {
            // Resolve()
            const response = await fetch(`${ENDPOINT_PAGINATION_POSTS}${numberPage}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
                method:"GET"
            })
            const json = await response.json()
            setData(json.listPostsOutput)
            setQtdPages(json.qtdPages)
            setQtdPosts(json.qtdPosts)
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
            <Pagination qtdPages={qtdPages} qtdPosts={qtdPosts} setNumberPage={setNumberPage}/>
        </section>
        </>
    )
}

export default Feed;