import React, {useState} from 'react';
import './styles.css'


function NumSelector({id, parentCallback}){

    const [number, setNumber] = useState('1')
    function sendToParent(){
        parentCallback(Number.parseInt(number))
    }

    return(
        <div className='input-group ip-form'>
                <div className="input-group-prepend">
                    <button 
                        className="my-btn btn btn-dark btn-outline-success" 
                        type="button"
                        onClick={decrement}
                        onBlur={onFocusLost}
                    >-</button>
                </div>
                <input
                    id={id}
                    className={'form-control p-3  bg-secondary text-white num-input border border-success'}
                    required
                    value={number}
                    placeholder='iptype'
                    onChange={handleChange}
                    onBlur={onFocusLost}
                />
                <div className="input-group-append">
                    <button 
                        className="my-btn btn btn-dark btn-outline-success" 
                        type="button"
                        onClick={increment}
                        onBlur={onFocusLost}
                    >+</button>
                </div>
        </div>
    )
    function handleChange(event){
        let inputValue = event.target.value
        const lastInput = Number.parseInt(inputValue.substring(inputValue.length-1))
        if(Number.isNaN(lastInput)){
            inputValue=1
        }
        if(Number.isInteger(lastInput) || lastInput===''){
            setNumber(inputValue)
        }

    }
    function onFocusLost(event){
        sendToParent()
    }
    function increment(){
        let integer = Number.parseInt(number)
        setNumber(++integer)
    }
    function decrement(){
        let integer = Number.parseInt(number)
        if(integer>1){
            --integer
        }
        setNumber(integer)
    }
}

export default NumSelector