import React from "react";
import "./Post.css"
import { Link } from "react-router-dom";
interface Props {
    key: number;
    idPost: number;
    titlePost: string;
    datePublishPost: string;
    srcImage: string;
    nameUserPost: string;
    widthImage: string;
    heightImage: string;
    contentPost: string;
}
const Post: React.FC<Props> = (props) => {
    return (
        <div key={props.idPost} className="box-post">
            <div>
                <h5 className="title-post">{props.titlePost}</h5>
                <div className="box-date-user">
                    <p>Data: {props.datePublishPost}</p>
                    <p>Autor: {props.nameUserPost}</p>
                </div>
            </div>
            <img src={props.srcImage} width={props.widthImage} height={props.heightImage} />
            <Link className="link-continue-reading" to={`/read-post/${props.idPost}`}>Continuar lendo...</Link>
        </div>
    )
}

export default Post;