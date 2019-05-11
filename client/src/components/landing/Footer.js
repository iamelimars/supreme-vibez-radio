import React from 'react';

const Footer = () => (
    <div style={styles.container}>
        <h6 style={styles.text}>Copyright © 2019 Supreme Vibez Radio & Entertainment. All Rights Reserved.</h6>
    </div>
)

const styles = {
    container: {
        height: '60px',
        marginBottom: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    text: {
        textAlign: 'center',
        color: '#FA5100',
        fontSize: '0.8rem'
    }
}

export default Footer