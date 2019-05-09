import React from 'react';
import HeroImg from '../../assets/hero-3.jpg';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HeroBck from '../../assets/mic.jpg'


const styles = {
    heroContainer: {
        maxWidth: '100%',
        padding: '1rem 2rem',
        backgroundImage: `url(${HeroImg})`,
        height: '75vh',
        backgroundPosition: 'center ',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // '&:before': {

        // }

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
                        <Typography style={{color: 'white', fontSize: '3.5rem', fontWeight: '800'}} variant="h4" align="left">
                            Supreme Vibez Radio
                        </Typography>
                        <Typography style={{color: 'orange', fontSize: '1.4rem', fontWeight: '700'}} variant="h6" align="left">
                            24/7 Online Radio
                        </Typography>
                        <Typography style={{color: 'white', fontSize: '1rem', fontWeight: '700'}} variant="p" align="left">
                            Radio with no exceptions
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Hero)