import React from "react";
import './Textbox.css'


function Textbox ({text}){
    return(
        <>
            <div className="box">
                <h1>{text}</h1>
            </div>
        </>
    )
}
export default Textbox