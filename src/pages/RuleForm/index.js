import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import './styles.css'
import '../../global.css'
import IpForm from './components/IPForm'
import CustomCheckBox from './components/CustomCheckBox'

import CGNATRule from './../RuleGenerator/CGNATRule'

function RuleForm() {
    const DESTINATION_OPTIONS=[
        {label:'1 to 8', iPAmount:8},
        {label:'1 to 16', iPAmount:16},
        {label:'1 to 32', iPAmount:32},
    ]
    let numeration=()=>{
        let num=[]
        for(let i=1;i<=50;i++){
            num.push(i);
        }
        return num
    }
    const [privateIP, setPrivateIP]=useState()
    const [publicIP, setPublicIP]=useState()       
    const [destination, setDestination]=useState(DESTINATION_OPTIONS[0].label)
    const [ruleNumber, setRuleNumber]=useState(numeration()[0])
    const [addresList, setAddresList]=useState('')
    const [disableAddresListInput, setDisableAddresListInput]=useState('disabled')
    const [showModal, setShowModal] = useState(false)
    const [generatedRule, setGeneratedRule] = useState('')
    const [protocolsCheckBox, setProtocolsCheckBox] = useState(
        CGNATRule.standartProtocols.map(p =>{
            return {protocol:p.toUpperCase(), use:'true'}
        })
    )
    return(
        <div className='row d-flex justify-content-center'>
            <div id='rule-form-container' className='col-xl-4 col-lg-6col-lg-6 col-md-6 col-sm-8 col-xs-6 shadow-lg p-3 mb-5'>
                
                <form>
                    <div className='input-group'>
                        <IpForm id='privateIP' title='Private IP' parentCallback={callbackPrivateIPFromIPForm}/>
                        <IpForm id='publicIP' title='Public IP' parentCallback={callbackPublicIPFromIPForm}/>

                        <div className='input-group rule-form'>
                            <label htmlFor="destination-select" className="text-white col-sm-2 col-form-label col-form-label-sm">Destination</label>    
                            <div className='input-block'>
                                <select 
                                id='destination-select'
                                value={destination}
                                onChange={event => setDestination(event.target.value)}
                                className="local-select form-control col-form-label col-form-label-sm  bg-secondary text-white border border-success">
                                        {DESTINATION_OPTIONS.map(destination =>(
                                            <option key={destination.label} value={destination.label}>{destination.label}</option>
                                        ))}
                                </select>     
                            </div>
                            <label htmlFor="enum-select" className="text-white col-sm-2 col-form-label col-form-label-sm center-label">Nº</label>    
                            <div className='input-block'>
                            <select 
                            id='enum-select' 
                            value={ruleNumber}
                            onChange={event => setRuleNumber(event.target.value)}
                            className="local-select form-control bg-secondary text-white border border-success">
                                    {numeration().map(num =>(
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                            </select>   
                            </div>
                        </div>

                        <div className='input-group rule-form'>
                            <label htmlFor="destination-select" className="text-white col-sm-2 col-form-label col-form-label-sm">Adress List</label>    
                            <div className="input-group col-sm-6  nopadding col-form-label-sm mb-2">    
                                <div className="input-group-prepend bg-dark">
                                    <div className="input-group-text bg-dark border border-success">
                                        <input 
                                        type="checkbox" 
                                        onChange={event => {
                                            setDisableAddresListInput((event.target.checked)? '':'disabled')
                                            if(!event.target.checked){
                                                setAddresList('')
                                            }
                                        }}
                                        aria-label="Checkbox for following text input"/>
                                    </div>
                                </div>
                                <input type="text"
                                value={addresList}
                                onChange={event => setAddresList(event.target.value)}
                                disabled={disableAddresListInput}
                                className="form-control col-sm-8 col-xl-6 bg-secondary text-white border border-success"
                                />
                            </div>
                        </div>

                        <div className='input-group rule-form'>
                            {protocolsCheckBox.map(protocolInfo =>{
                                return(
                                    <CustomCheckBox
                                        key={protocolInfo.protocol}
                                        label={protocolInfo.protocol} 
                                        checked={protocolInfo.use} 
                                        parentCallback={changeCheck}>
                                    </CustomCheckBox>
                                )
                            })}  
                        </div>
                    </div>

                    <button type="button" onClick={generateRule} className="btn btn-dark btn-outline-success btn-lg btn-block">Generate Rule</button>
                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        dialogClassName="modal-90w"
                        centered
                        size='xl'
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton='true'
                        className='bg-rule-modal border-success text-white'
                        >
                        <Modal.Title id="example-custom-modal-styling-title">
                            CGNAT Rule
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='bg-rule-modal'>
                            <textarea 
                                id='rule-textarea' 
                                onChange={event => setGeneratedRule(event.target.value)}
                                value={generatedRule}
                                className='form-control bg-dark border border-success'>
                            </textarea>
                        </Modal.Body>
                        <Modal.Footer className='bg-rule-modal'>
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setShowModal(false)}>Close
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={copyTextAreaContent}>Copy
                            </button>
                        </Modal.Footer>
                    </Modal>
                </form>
                
            </div>
        </div>
    )
    
    function callbackPrivateIPFromIPForm(IP){
        setPrivateIP(IP)
    }
    function callbackPublicIPFromIPForm (IP){
        setPublicIP(IP)
    }
    async function generateRule(){
        let cgnatRule = new CGNATRule(
            privateIP,
            publicIP,
            DESTINATION_OPTIONS.find(destinationOption => destination === destinationOption.label),
            ruleNumber,
            addresList,
            getUsedProtocols(),
        )
        await cgnatRule.buildRule()
        setGeneratedRule(cgnatRule.rule)
        setShowModal(true)
    }

    function changeCheck(protocolUsability){
        let protocolList = protocolsCheckBox.map(p => {
            if(p.protocol===protocolUsability.protocol){
                return protocolUsability
            }
            return p
        })
        setProtocolsCheckBox(protocolList)
    }
             

    function copyTextAreaContent(){
        let ruleTextArea = document.getElementById("rule-textarea");
        ruleTextArea .select();
        console.log(generatedRule)
        ruleTextArea.setSelectionRange(0, generatedRule.length)
        document.execCommand("copy");
    }

    function getUsedProtocols(){
        return protocolsCheckBox.filter(p => {
            if(p.use==='true'){
                return p
            }   
        }).map(p=>p.protocol)
    }

}

export default RuleForm;
