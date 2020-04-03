import React from 'react';
import './styles.css'
import logoRBT from '../../assets/logos/logorbt.png'
import fbIcon from '../../assets/logos/fb-icon.png'
import igIcon from '../../assets/logos/ig-icon.png'
export default function Footer(){
    return(
        <div id='footer-container' className='column-item'>
            <div className='row-container space-between'>
                <div className='row-container'>
                    <div className='item'>
                        <a href='https://www.rbt.psi.br/'target = "_blank"><img src={logoRBT}/></a>
                    </div>
                    <div className='item'>
                        <a href='https://www.facebook.com/rbtinternet/'target = "_blank"><img className='media' src={fbIcon}/></a>
                    </div>
                    <div className='item'>
                        <a href='https://www.instagram.com/rbt_internet/'target = "_blank"><img className='media' src={igIcon}/></a>
                    </div>
                </div>
                
                <div className='item'>
                    
                </div>
                <div className='item'></div>
            </div>
            <div className='row-container space-around credits'>
                Developed by Natan Rincker
            </div>
        </div>
    )
}