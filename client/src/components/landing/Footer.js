import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div style={styles.container}>
        <h6 style={styles.text}>Copyright © 2019 Supreme Vibez Radio & Entertainment. All Rights Reserved.</h6>
        <Link style={styles.link} to="/terms">Terms & Conditions</Link>
    </div>
)

const styles = {
    container: {
        height: '60px',
        width: '100%',
        marginBottom: '60px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '10px 0px',
        flexWrap: 'wrap'
    },
    text: {
        textAlign: 'center',
        color: '#FA5100',
        fontSize: '0.8rem'
    },
    link: {
        textDecoration: 'none',
        color: '#FA5100'
    }
}

export default Footer