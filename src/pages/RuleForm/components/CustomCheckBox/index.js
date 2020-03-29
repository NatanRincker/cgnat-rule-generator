import React, {useEffect, useState} from 'react';

import './styles.css'

function CustomCheckBox({label, checked, parentCallback}){
    return(
        <div className="">
            <div className="my-cbox bg-dark border border-success">
                <input 
                type="checkbox" 
                onChange={event => handleChange(event)}
                defaultChecked = {isChecked()}
                aria-label="Checkbox for following text input"/>

                <label type="text"
                className="lbl-protocol"
                >{label}</label>
            </div>  
        </div>
    )
    
    function isChecked(){
        return (checked==='true')? true:false
    }

    function handleChange(event){
        let useProtocol=(event.target.checked)? 'true':'false'
        parentCallback({protocol: label, use:useProtocol})
    }
    
}

export default CustomCheckBox;