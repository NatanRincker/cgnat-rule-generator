import React, {useState} from 'react';

import regEx from '../../../../tools/RegEx'
import IPV4Utils from '../../../RuleGenerator/IPV4Utils'
import './styles.css'
import '../../../../global.css'
import IPV4Adress from '../../../RuleGenerator/IPV4Adress';


function IPForm({title, id, parentCallback}){
    let IPV4Ranges = ()=>{
        let ranges=[]
        for(let i=16;i<=32;i++){
            ranges.push(i);
        }
        return ranges
    }

    const [IPInputValue, setIPInputValue]=useState('')
    const [inputBorder, setInputBorder]=useState('success')
    const [selectedRange, setSelectedRange]=useState(IPV4Ranges()[8])
    const [validateInput=true, setValidateInput]=useState('')

    function sendToParent(){
        if(regEx.IPV4_ADDRESS.test(IPInputValue)){
            let IPAddres = new IPV4Adress(IPInputValue, selectedRange)
            parentCallback(IPAddres)
        }
    }
    return(
        <div className='input-group ip-form'>
            <label htmlFor={id} className="text-white col-sm-2 col-form-label col-form-label-sm">{title}</label>    
            <div className='input-block'>
                
                <input
                id={id}
                className={'form-control p-3  bg-secondary text-white ip-input border border-'+inputBorder}
                required
                value={IPInputValue}
                placeholder='iptype'
                onChange={handleIPInputChange}
                onKeyDown={handleKeyDown}
                onBlur={onFocusLost}
                />
            </div>
            <div className="input-group-prepend blend-left">
                <div className="input-group-text bg-dark text-white border border-success">/</div>
            </div>
            <select 
            value={selectedRange} 
            className="range-select blend-right bg-secondary text-white border border-success"
            onChange={handleRangeChange}
            onBlur={onFocusLost}>
                {IPV4Ranges().map(range =>(
                    <option key={id+range} value={range}>{range}</option>
                ))}   
            </select>
        </div>
    )

    function handleKeyDown(event){
        const SPACE=' '
        const BACKSPACE='Backspace'
        if(event.key===SPACE){
            event.preventDefault()
        }
        if(event.key===BACKSPACE){
            setValidateInput(false)
        }else{
            setValidateInput(true)
        }
    }

    function handleIPInputChange(event){
        let  inputValue = event.target.value
        const lastInput = inputValue.substring(inputValue.length-1)
        if(validateInput){
            if (isValidInput()) {
                let byteAsStringList = splitByDots(inputValue)
                if(Number.isInteger(parseInt(lastInput))){
                    handleNumberInput(byteAsStringList)
                }else{
                    handleDotInput(byteAsStringList)
                }
            }else{
                cancelInput()
            }
        }
        setIPInputValue(inputValue)     
        function isValidInput(){
            return regEx.NUMBERS_AND_DOTS.test(lastInput)
        }
        function cancelInput(){
            inputValue=inputValue.substring(0,inputValue.length-1)
        }
        function splitByDots(str){
            return str = inputValue.split('.').filter(piece => {
                if(piece!==''){
                    return piece
                }
            })
        }
        function handleNumberInput(byteAsStringList){
            let lastByte = byteAsStringList[byteAsStringList.length-1]

            if(parseInt(lastByte)>255 && byteAsStringList.length<=3){
                let previousValue = inputValue.substring(0,inputValue.length-1)
                inputValue= previousValue+'.'+lastInput
                event.target.value=inputValue
                handleIPInputChange(event)
            }else if(lastByte.length===3 && byteAsStringList.length<4){
                inputValue+='.'
            }else if(parseInt(lastByte)>255 && byteAsStringList.length===4){
                cancelInput()
            } 
        }
        function handleDotInput(byteAsStringList){
            let previousInput = inputValue.substring(inputValue.length-2,inputValue.length-1)

            if(previousInput==='.' || byteAsStringList.length===4){
                cancelInput()
            }
        }
    }
    
    function handleRangeChange(event){
        let updatedRange = parseInt(event.target.value)
        setSelectedRange(updatedRange)
    }
    function onFocusLost(event){
        if(isFormOK()){
            setInputBorder('success')
            sendToParent()
        }else{
            setInputBorder('danger')
        }
    }
    function isFormOK(){
        return IPV4Utils.isValidIPV4(IPInputValue)
    }
}


export default IPForm;