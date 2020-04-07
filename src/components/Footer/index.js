import React from 'react';
import './styles.css'
import logoRBT from '../../assets/logos/logorbt.png'
import logoRBTHover from '../../assets/logos/logorbt_hover.png'
import fbIcon from '../../assets/logos/fb-icon.png'
import fbIconHover from '../../assets/logos/fb-icon_hover.png'
import igIcon from '../../assets/logos/ig-icon.png'
import igIconHover from '../../assets/logos/ig-icon_hover.png'
import ghIcon from '../../assets/logos/gh-icon.png'
import ghIconHover from '../../assets/logos/gh-icon_hover.png'
import inIcon from '../../assets/logos/in-icon.png'
import inIconHover from '../../assets/logos/in-icon_hover.png'

export default function Footer(){
    return(
        <div id='footer-container' className='column-item'>
            <div className='row-container space-between'>
                <div className='item'></div>
                <div className='row-container'>
                    <div className='item'>
                        <a href='https://www.rbt.psi.br/'target = "_blank">
                            <img src={logoRBT} className='main-img' alt='rbt'/>
                            <img src={logoRBTHover} className='hover-img' alt='rbt-colored'/>
                        </a>
                    </div>
                    <div className='item'>
                        <a href='https://www.facebook.com/rbtinternet/'target = "_blank">
                            <img src={fbIcon} className='main-img media' alt='facebook'/>
                            <img src={fbIconHover} className='hover-img media' alt='facebook-colored'/>
                        </a>
                    </div>
                    <div className='item'>
                        <a href='https://www.instagram.com/rbt_internet/'target = "_blank">
                            <img src={igIcon} className='main-img media' alt='instagram'/>
                            <img src={igIconHover} className='hover-img media' alt='instagram-colored'/>
                        </a>
                    </div>
                </div>
                
                <div className='item'></div>

                <div className='item pos-left'>
                    <b className='gray-title pos-left'>PROJECT INFO</b>
                    <div className='row-container pos-left'>
                        <div className='item'>
                            <a href='https://github.com/NatanRincker/cgnat-rule-generator'target = "_blank">
                                <img src={ghIcon} className='main-img about' alt='github'/>
                                <img src={ghIconHover} className='hover-img about' alt='github-colored'/>
                            </a>
                        </div>
                        <div className='item'>
                            <a href='https://www.linkedin.com/in/natan-rincker/'target = "_blank">
                                <img src={inIcon} className='main-img about' alt='linkedin'/>
                                <img src={inIconHover} className='hover-img about' alt='linkedin-colored'/>
                            </a>
                        </div>   
                    </div>
                    
                </div>
                <div className='item'></div>
            </div>
        </div>
    )
}