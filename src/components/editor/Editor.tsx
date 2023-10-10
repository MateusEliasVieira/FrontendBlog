import React, {useEffect, useRef, useState} from "react";
import JoditEditor from "jodit-react";
import "./Editor.css"
import MyInput from "../myinput/MyInput.tsx";
import Alert from "../alerts/Alert.tsx";
import imageToBase64 from "../../utils/imageToBase64.ts";

const Editor:React.FC = ()=>{

    const editor = useRef(null);
	const[enabled,setEnabled]=useState(false)
	const[msgAlert,setMsgAlert]=useState("")
	const[classAlert,setClassAlert]=useState("")
	const[token,setToken]=useState("")
	const[title,setTitle]=useState("")
	const[content,setContent]=useState("")
	const[image,setImage]=useState(null)

	const config = {
		readonly: false,
		height:500,
		buttons: "image", // Habilitar o botão de inserção de imagens
		uploader: {
			insertImageAsBase64URI: true, // Inserir imagens como URIs base64
		},
	}

	useEffect(() => {
		let tk: string = localStorage.getItem("token");
		setToken(tk);
	}, []);

	const alertMessage = (enabledAlert:boolean,classAlert:string,json:string)=>{
		setMsgAlert(json)
		setEnabled(enabledAlert)
		setClassAlert(classAlert)
		setTimeout(() => {
			setClassAlert("disabled-alert")
			setEnabled(false)
		}, 5000)
	}
	const dataValidate = async () => {
		let accepted:boolean = false;
		if(content === ""  || title === "" || image === null){
			accepted = false;
		}else{
			accepted = true;
		}
		if (!accepted) {
			alertMessage(true,"alert alert-warning","Enter all fields")
		} else {
			try{
				// Resolve()
				const base64 = await imageToBase64(image);
				sendData(base64);
			}catch(error){
				// Reject()
				console.log(error)
			}

		}
	}

	const sendData = async (base64: unknown) => {
		let data = { "title": title, "content": content, "image": base64,user:{idUser:localStorage.getItem("idUser")} }; // Passa o base64 para a função sendData
		const response = await fetch("http://localhost:8080/posts/new", {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			method: "POST",
			body: JSON.stringify(data)
		});
		const json = await response.json();
		alertMessage(true,"alert alert-success",json)
	};

	return(
		<div id="box-editor">
			{enabled?<Alert typeAlert={classAlert} message={msgAlert} />:null}
			<MyInput typeInput="text" classGroup="mb-3" textLabel="Title" valueInput={title} fun={setTitle}/>
			<div>
				<JoditEditor
					ref={editor}
					value={content}
					config={config}
					onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
					onChange={newContent => {}}/>
			</div>
			<input type="file" className="mb-3 form-control" onChange={event => { setImage(event.target.files[0]) }} />
			<button className="btn btn-dark" onClick={()=>{dataValidate()}}>Save</button>
		</div>
    )
}

export default Editor;
