import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Flyer1 from './../../assets/flyer1.jpg';
import Flyer2 from './../../assets/flyer2.jpg';
import Flyer3 from './../../assets/flyer3.jpg';
import './Events.css';

const Events = ({classes}) => {

    return (
        <div className="events-container">
            <h1>Upcoming Events</h1>
            <div className="img-container">
                <img  className="event-img" src={Flyer1} alt="Supreme Vibez Radio"/>
                <img className="event-img" src={Flyer2} alt="Supreme Vibez Radio"/>
                <img className="event-img" src={Flyer3} alt="Supreme Vibez Radio"/>
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
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-evenly',
        // alignItems: 'center'

    },
    img: {
        width: '450px',
        height: '750px',
        margin: '30px'
    },
    imgContainer: {
        width: '100vw',
        display: 'flex',
        flexWrap: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        
    }
}
export default withStyles(styles)(Events)