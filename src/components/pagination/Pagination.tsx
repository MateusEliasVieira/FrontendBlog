import React, {useState} from "react"
import "./Pagination.css"

interface Props{
    qtdPages:number,
    qtdPosts:number,
    setNumberPage:(numberPage: number) => void
}

const Pagination:React.FC<Props> = (props:Props) =>{
    const pages = [];
    const[page,setPage]=useState(0)
    const maxShowLi = 3

    for (let i = 0; i < maxShowLi; i++) {
        pages.push(
            <li key={i} className="page-item">
                <button
                    className="page-link"
                    onClick={(event)=>{
                        event.preventDefault(); props.setNumberPage(i); setPage(i);
                    }}>
                    {i}
                </button>
            </li>
        );
    }

    return(
        <div id="box-pagination">
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={(event)=>{
                            event.preventDefault();
                            setPage(page - 1 >= 0 ? page - 1 : page)
                            props.setNumberPage(page)
                        }}>Previous</button>
                    </li>

                    {pages.map((li)=>(li))}

                    <li className="page-item">
                        <button className="page-link" onClick={(event)=>{
                            event.preventDefault();
                            setPage(page + 1 <= props.qtdPages - 1 ? page + 1 : page)
                            props.setNumberPage(page)
                        }}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default Pagination