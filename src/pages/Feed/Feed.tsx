import React, {useEffect, useState} from "react";
import Post from "../../components/post/Post.tsx";
import "./Feed.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import {ENDPOINT_PAGINATION_POSTS} from "../../global/URLs.ts";
import {EMPTY_POST} from "../../global/Text.ts";
import {HTTP_STATUS_FORBIDDEN} from "../../global/HTTP_STATUS.ts";
import {Link} from "react-router-dom";

const Feed:React.FC = ()=>{

    const[data,setData]=useState([])
    const[numberPage,setNumberPage]=useState(0)
    const[qtdPages,setQtdPages]=useState(0)
    const[qtdPosts,setQtdPosts]=useState(0)
    const[loading,setLoading]=useState(false)
    const[existPosts,setExistPosts]=useState(false)
    const[tokenIsValid,setTokenIsValid]=useState(true)

    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/";
        }else{
            findAllPosts()
        }
    }, [numberPage]);

    const findAllPosts = async ()=>{
        setLoading(true)
        try {
            // Resolve()
            const response = await fetch(`${ENDPOINT_PAGINATION_POSTS}${numberPage}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
                method:"GET"
            })
            if(response.status !== HTTP_STATUS_FORBIDDEN){
                const json = await response.json()
                setData(json.listPostsOutput)
                setQtdPages(json.qtdPages)
                setQtdPosts(json.qtdPosts)
                setLoading(false)
                setExistPosts(qtdPosts != 0)
                setTokenIsValid(true)
            }else{
                setTokenIsValid(false)
                setLoading(false)
            }
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
            { tokenIsValid ? (
            <section id="section-posts">
                {
                    loading ? (<div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                               </div>) : null
                }
                {
                    existPosts ? (<h2 id="h2-empty-posts">{EMPTY_POST}</h2>) : null
                }
                {
                    data.length != 0 ?
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
                    :
                    null
                }
            </section>):(<h1 className="h1-token-expired">Ops, session expired! <Link to={"/"}>Login</Link> </h1>)}
            { data.length != 0 ? <Pagination qtdPages={qtdPages} qtdPosts={qtdPosts} setNumberPage={setNumberPage}/> : null }
        </section>
        </>
    )
}

export default Feed;