import React from 'react'
import './footerRolling.css'
import { Link } from 'react-router-dom';
import {socialLinks} from '../../constants/constFooter';
import { svgLogo } from '../../constants/constLogo';

export const FooterRolling = () => {
    return (
        <div className='footerR row justify-content-around align-items-center m-0'>
            <div className='col-lg-4 text-center'>
                <div className='logo'>
                    <svg className='svgFooter' width='137pt' height='15pt' viewBox='0 0 137 15' xmlns='http://www.w3.org/2000/svg'>
                        <g stroke-linecap='round' fill-rule='evenodd' fill='#faebd7'>
                            <path d={svgLogo} vector-effect='non-scaling-stroke'/>
                        </g>
                    </svg>
                </div>
            </div>
            <div className='col-lg-4 text-center'>
                <p>Copyright © 2022 RollingFood Theme. All rights reserved.</p>
            </div>
            <div className='col-lg-4 text-center'>
                <ul>
                    {
                        socialLinks.map(({key,title, path, icon}) => {
                            return (
                                <li key={key}>
                                    <i className={'bi mx-1 bi-' + icon}></i>
                                    <Link to={path}>
                                        {title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
