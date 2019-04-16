import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';


const JoinSection = (props) => {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <h2 className={classes.header}>Welcome to Supreme Vibez Radio!</h2>
            <p className={classes.subheader}>The top online radio station for reggae and other playlists. <br/> We are all about positive vibez and conscious music. </p>
            <h3 className={classes.secondaryHeader}>Join the community and chat while listening!</h3>
            <div className={classes.btnContainer}>
                <Link to="/register" className={classes.btn}>
                    Register
                </Link>
                <Link to="/login" className={classes.btn}>
                    Log In
                </Link>
            </div>
            
        </div>
    )
}

const styles = {
    container: {
        minHeight: '500px',
        padding: '50px'
    },
    header: {
        textAlign: 'center',
        margin: '40px',
        color: '#FA5100',
        fontSize: '1.4em'
    },
    secondaryHeader: {
        textAlign: 'center',
        margin: '40px',
        color: '#FA5100',
        fontSize: '1.2em'
    },
    subheader: {
        textAlign: 'center',
        fontSize: '1.3rem',
        margin: '40px',
        color: 'grey',
    },
    btnContainer: {
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: '70px',
    },
    btn: {
        height: '30px',
        background: '#FA5100',
        borderRadius: "3px",
        letterSpacing: "1.5px",
        padding: '9px 30px',
        textDecoration: 'none',
        color: 'white',
        transition: '0.4s',
        '&:hover': {
            boxShadow: ' 3px 6px 15px -5px rgba(148,148,148,1)',
        },

    }
}

export default withStyles(styles)(JoinSection)