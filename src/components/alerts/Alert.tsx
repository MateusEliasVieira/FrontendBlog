import React from "react"

interface Props{
    typeAlert:string;
    message:string;
}
const Alert:React.FC<Props> = (props:Props)=>{
    return(
        <div className={props.typeAlert}>
            {props.message}
        </div>
    )
}

export default Alert;
