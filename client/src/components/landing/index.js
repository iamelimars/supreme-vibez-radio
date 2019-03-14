import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../../assets/hero-2.jpg';
import Hero from './Hero'


const styles = {
    
}

class Landing extends Component {
    render() {
        return (
            <div style={{ height: '75vh' }}
                className="container valign-wrapper"
            >
                <div className="row">
                    <div className="col s12 center-align">
                    <Hero />
                        <br/>
                        <Link 
                            to="/register"
                            style={{
                                marginLeft: '2rem',
                                width: '150px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px'
                            }} 
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Register
                        </Link>
                        <Link
                            to="/login"
                            style={{
                                marginLeft: "2rem",
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect white hoverable black-text"
                            >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;