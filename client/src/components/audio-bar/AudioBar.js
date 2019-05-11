import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    paper: {
        paddingBottom: 50,
    },
    grow: {
        flexGrow: 1,
      },
    list: {
        marginBottom: theme.spacing.unit * 2,
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        zIndex: 9
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    sliderContainer: {
        flexGrow: 1,
        padding: '0 30px'
    },
    slider:{
        border: 'none !important',
        webkitAppearance: 'none',
        height: '6px !important',
        borderRadius: '5px !important',
        background: 'rgb(196,196,196) !important',
        color: 'transparent',
        outline: 'none'
    },
    volumeContainer: {
        display: 'flex'
    },
    volumeIcon: {
        marginRight: '10px',
        marginTop: '4px'
    }
});

class AudioBar extends Component {

    constructor() {
        super();

        this.state = {
            playing: false,
            seeking: 0,
        }

        this.url = "http://162.244.80.52:8704/stream"
        // this.url = "http://cast1.servcast.net:2199/tunein/supremevibez.pls"

        this.audio = new Audio(this.url)
    }

    toggleRadio = () => {
        const seekValue = this.state.playing ? 0 : 100;
        this.setState({ playing: !this.state.playing, seeking: seekValue }, () => {
            this.state.playing ? this.audio.play() : this.audio.pause()
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div>
                        {this.state.playing ? 
                        <IconButton color="primary" onClick={this.toggleRadio}>
                            <PauseIcon />
                        </IconButton>
                        :
                        <IconButton color="primary" onClick={this.toggleRadio}>
                            <PlayArrowIcon />
                        </IconButton>
                        }
                        
                        
                    </div>

                    <div className={classes.sliderContainer}>
                        <input type="range"
                            onChange={(e) => console.log(this.audio)}
                            // className={classes.slider}
                            className="range-slider__range"
                            value={this.state.seeking}
                            />
                    </div>
                    <div className={classes.volumeContainer}>
                        <VolumeUpIcon color='primary' className={classes.volumeIcon} />
                        <input type="range"
                            onChange={(e) => this.audio.volume = e.target.value / 100}
                            min="0"
                            max="100"
                            className="range-slider__range"
                            style={{margin: 'auto'}}
                            />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(AudioBar)