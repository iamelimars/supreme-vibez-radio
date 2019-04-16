import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import appleLogo from './../../assets/apple.svg';
import googleLogo from './../../assets/google-play-badge.png';
import android from './../../assets/android.svg';


const SocialSection = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <h1>Want to listen on the go?</h1>
            <img className={classes.img} src={android} alt=""/>
            <div>
                <img src={appleLogo} alt=""/>
                <img src={googleLogo} alt="" height="47px"/>
            </div>
            
        </div>
    )
}

const styles = {
    container: {
        minHeight: '400px',
        background: 'rgba(145, 184, 195, 0.08)',
        color: '#FA5100',
        padding: '40px',
        paddingBottom: '64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    img: {
        width: '100%',
        maxWidth: '300px',
        margin: '30px'
    }
}

export default withStyles(styles)(SocialSection)