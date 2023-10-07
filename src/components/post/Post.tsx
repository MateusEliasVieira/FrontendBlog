import React from "react";
import "./Post.css"
interface Props{
    titlePost:string
    datePublishPost:string
    srcImage:string;
    nameUserPost:string;
    widthImage:string;
    heightImage:string;
    contentPost:string;
}
const Post:React.FC<Props> = (props)=>{
    return(
        <div className="box-post">
            <div>
                <h5 className="title-post">{props.titlePost}</h5>
                <div className="box-date-user">
                    <p>Date: {props.datePublishPost}</p>
                    <p>Author: {props.nameUserPost}</p>
                </div>
            </div>
            <img src={props.srcImage} width={props.widthImage} height={props.heightImage}/>
            <a className="link-continue-reading" href="#">Continue reading...</a>
        </div>
    )
}

export default Post;