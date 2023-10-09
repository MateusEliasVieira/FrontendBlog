import React, {useRef, useState} from "react";
import JoditEditor from "jodit-react";
import "./Editor.css"
import MyInput from "../myinput/MyInput.tsx";

const Editor:React.FC = ()=>{
    const editor = useRef(null);
    const[content,setContent]=useState("")
	const config = {
		readonly: false,
		height:500
	}
	const handlerUpdate = (event)=>{
		const editorContent = event.target.value;
		setContent(editorContent)
	}

    return(
		<div id="box-editor">
			<MyInput typeInput="text" classGroup="mb-3" textLabel="Title" valueInput="" fun={()=>{}}/>
			<JoditEditor
				ref={editor}
				value={content}
				config={config}
				onBlur={handlerUpdate} // preferred to use only this option to update the content for performance reasons
				onChange={(newContent)=>{}}
			/>
			<MyInput typeInput="file" classGroup="mb-3" textLabel="Cover" valueInput="" fun={()=>{}}/>
			<button className="btn btn-dark">Save</button>
		</div>
    )
}

export default Editor;
