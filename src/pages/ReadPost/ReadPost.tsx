import React, { useEffect, useState } from "react"
import "./ReadPost.css"
import MyNavbar from "../../components/mynavbar/MyNavbar.tsx";
import { useParams } from "react-router-dom";
import { ENDPOINT_SEARCH_POST } from "../../global/URLs.ts";
import { HTTP_STATUS_BAD_REQUEST } from "../../global/HTTP_STATUS.ts";
import { Link } from "react-router-dom";

const ReadPost: React.FC = () => {

    const { idPost } = useParams(); // pega o novo valor do parametro da url de forma automatica quando muda
    const [loading, setLoading] = useState(false)
    const [tokenIsValid, setTokenIsValid] = useState(true)
    const [data, setData] = useState({
        title: "",
        content: "",
        datePublish: "",
        user: {
            name: ""
        }
    })

    const searchPost = async () => {
        const response = await fetch(`${ENDPOINT_SEARCH_POST}${idPost}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "GET"
        });

        if (response.status !== HTTP_STATUS_BAD_REQUEST) {
            const json = await response.json();
            setData({ ...json })
            setLoading(false)
            setTokenIsValid(true)
        } else {
            setTokenIsValid(false)
            setLoading(false)
        }
    }

    useEffect(() => {
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

    return (

        <section id="section-read-post">
            <MyNavbar />
            {loading ? (<div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>) : null}
            {tokenIsValid ? (
                <div>
                    <h1>{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    <p><b>Autor</b>: {data.user?.name}</p>
                    <p><b>Publicado</b>: {formatDate(data.datePublish)}</p>
                </div>
            ) : (<h1 className="h1-token-expired">Ops, sessão expirada! <Link to={"/"}>Login</Link> </h1>)
            }
        </section>
    )
}

export default ReadPost;