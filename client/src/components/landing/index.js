import React, { Component } from 'react';
import JoinSection from './JoinSection';
import Hero from './Hero';
import io from 'socket.io-client';


class Landing extends Component {
    
    constructor(props) {
        super(props);

    
    }

    render() {
        return (
            <div style={{ height: '75vh' }}
                className="container valign-wrapper"
            >
                <div className="row">
                    <div className="col s12 center-align">
                        <Hero />
                        <JoinSection />
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;