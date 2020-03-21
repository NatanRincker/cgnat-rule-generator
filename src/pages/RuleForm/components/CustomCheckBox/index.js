import React, {useEffect, useState} from 'react';

function CustomCheckBox({label}){
    return(
        <div className="">
            <div className="my-cbox bg-dark border border-success">
                <input 
                type="checkbox" 
                onChange={event => {console.log(label)}}
                checked
                aria-label="Checkbox for following text input"/>

                <label type="text"
                className="lbl-protocol"
                >{label}</label>
            </div>  
        </div>
    )
}

export default CustomCheckBox;