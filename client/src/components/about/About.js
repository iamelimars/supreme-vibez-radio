import React from 'react';
import Footer from '../landing/Footer';
import Logo from '../../assets/logo.png';

const About  = () => (
        <div style={styles.wrapper}>
            <img src={Logo} alt=""/>
            <div style={styles.container}>
                <h1 style={styles.title}>About Us</h1>
                <p style={styles.p}>Supreme Vibez Radio & Entertainment is an owned and operated online radio station formed in 2019.    It is a diverse radio station that offers online music infinity and beyond, across the globe. Whether it's on your smartphone, tablet, desktop or other multimedia devices, our radio station will enhance your musical journey, ensuring taking you through all the genres of music that's pleasing to your listening ear.  The radio station's multitalented DJ's will be your guide through these various genres of music on a daily basis, as they are not only talented but aim to please all listeners, thus giving life to our motto "Providing the best music and services to our listeners throughout the globe".</p>
                <h2 style={styles.subheader}>Services:</h2>
                <h3>We offer several services which include:</h3>
                <ul style={styles.ul}>
                    <li >Advertising</li>
                    <li>Promotions </li>
                    <li>Marketing</li>
                    <li>Radio program recording.</li>
                </ul>
                <p>If interested in any of our services, you may contact us at any time.</p>
                <p>Contact us at: <a href="mailto:supremeVibezRadio@gmail.com">SupremeVibezRadio@gmail.com</a></p>
                <Footer />
            </div>
            
        </div>
)

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw'
    },
    container: {
        padding: '45px',
        maxWidth: '900px',
        width: '100%'
    },
    title: {
        color: '#F95000',
        textAlign: 'center',
        fontSize: '2.3rem'
    },
    subheader: {
        color: '#F95000'
    },
    ul: {
        fontSize: '22px'
    },
    p: {
        fontSize: '1.2rem',
    }
}

export default About