import React from "react";
import "./Post.css"
import {Link} from "react-router-dom";
import ReadPost from "../../pages/ReadPost/ReadPost.tsx";
interface Props{
    key:number;
    idPost:number;
    titlePost:string;
    datePublishPost:string;
    srcImage:string;
    nameUserPost:string;
    widthImage:string;
    heightImage:string;
    contentPost:string;
}
const Post:React.FC<Props> = (props)=>{
    return(
        <div key={props.key} className="box-post">
            <div>
                <h5 className="title-post">{props.titlePost}</h5>
                <div className="box-date-user">
                    <p>Date: {props.datePublishPost}</p>
                    <p>Author: {props.nameUserPost}</p>
                </div>
            </div>
            <img src={props.srcImage} width={props.widthImage} height={props.heightImage}/>
            <Link className="link-continue-reading" to={`/read-post/${props.idPost}`}>Continue reading...</Link>
        </div>
    )
}

export default Post;