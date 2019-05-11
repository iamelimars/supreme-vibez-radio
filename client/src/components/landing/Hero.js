import React from 'react';
import HeroImg from '../../assets/hero-3.jpg';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    heroContainer: {
        maxWidth: '100%',
        padding: '1rem 2rem',
        backgroundImage: `url(${HeroImg})`,
        height: '75vh',
        backgroundPosition: 'center ',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    },
    heroImg: {
        width: '100%',
    }
}

const Hero = (props) => {
    const { classes } = props;


    return (
        <div className={classes.heroContainer}>
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={6}>
                    <Grid
                        container
                        // alignItems="center"
                        justify="center"
                        direction="column"
                        style={{ height: '100%', padding: 20 }}>
                        <h4 style={{margin: '0' ,color: 'white', fontSize: '3.9rem', fontWeight: '800'}} variant="h4" align="left">
                            Supreme Vibez Radio
                        </h4>
                        <h6 style={{margin: '10px 0', color: 'orange', fontSize: '1.6rem', fontWeight: '700'}} variant="h6" align="left">
                            24/7 Online Radio
                        </h6>
                        <p style={{margin: '0', color: 'white', fontSize: '1.2rem', fontWeight: '700'}} variant="p" align="left">
                            Radio with no exceptions
                        </p>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Hero)