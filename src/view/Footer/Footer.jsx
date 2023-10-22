import React from 'react'
import classes from './Footer.module.scss'
import HeaderLogo from '../../assets/images/header/header__logo.svg';
import { Link } from 'react-router-dom';
 import SocialVk from '../../assets/images/footer/vk.png'; 
import SocialTg from '../../assets/images/footer/tg.png';

function Footer() {
    return (
        <div>
            <div className={classes.footerblock}>
                <Link to="/" className={classes.HeaderLogo}>
                    <img src={HeaderLogo} alt="" />
                </Link>
                <div className={classes.footerСonnection}>
                    <span>Связь с нами</span>
                    <a href="https://vk.com/areelav"><img src={SocialVk} alt="" /></a>
                    <a href="https://vk.com/areelav"><img src={SocialTg} alt="" /></a>
                    
                </div>
                <div className={classes.footerProtect}>
                    Все права защищены
                </div>
            </div>
        </div>
    )
}

export default Footer