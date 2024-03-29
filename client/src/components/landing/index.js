import React, { Component } from 'react';
import JoinSection from './JoinSection';
import Hero from './Hero';
import SocialSection from './SocialSection';
import Footer from './Footer';
import Events from './Events';

class Landing extends Component {

    render() {
        return (
            <div style={{ height: '75vh' }}
                className="container valign-wrapper"
            >
                <div className="row">
                    <div className="col s12 center-align">
                        <Hero />
                        <JoinSection />
                        <Events />
                        <SocialSection />
                        <Footer />
                        {/* <br/> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;