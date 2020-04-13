import React from 'react';
import corona from './corona.png'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className = {styles.logo}>
            <h1>C
            <img src ={corona} />
            VID-19</h1>
        </div>
    )
}

export default Header