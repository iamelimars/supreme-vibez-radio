import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";
import TextField from '@material-ui/core/TextField';
import BackgroundImg from './../../assets/trianglify2.svg';
import './Register.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();


        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history)

        console.log(newUser);
    }

    render() {
        const { errors } = this.state;

        return (
            <div style={styles.container} >
                <div style={styles.leftContainer} className="leftContainer">
                    <h1>Welcome!</h1>
                    <h3 style={{padding: '30px'}}>Enter your personal data to start your journey with us.</h3>
                    <div style={{paddingLeft: '11.250px'}}>
                        <p className="grey-text text-darken-1">
                            Already have an account? 
                            <Link style={styles.link} to="/login"> Log in</Link>
                        </p>
                    </div>
                    <Link to="/" style={styles.homeButton}>            
                        Back to home        
                    </Link>
                </div>
                <div style={styles.rightContainer} className="rightContainer">
                        <div className="col s12" style={{paddingLeft: '11.250px'}}>
                            <h4 style={styles.registerHeader}>
                                <b>Create</b> Account
                            </h4>
                        </div>
                        <form style={styles.form} noValidate onSubmit={this.onSubmit}>
                            <TextField
                                label="Name"
                                value={this.state.name}
                                error={errors.name}
                                id="name" 
                                onChange={this.onChange}
                                margin="normal"
                                fullWidth
                                color="#fff"
                            />
                            <TextField
                                label="Username"
                                value={this.state.username}
                                error={errors.username}
                                id="username" 
                                onChange={this.onChange}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                value={this.state.email}
                                error={errors.email}
                                id="email" 
                                onChange={this.onChange}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                value={this.state.password}
                                error={errors.password}
                                id="password" 
                                type="password"
                                onChange={this.onChange}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Confirm Password"
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2" 
                                type="password"
                                onChange={this.onChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    style: {
                                        color: "red"
                                    }
                                }} 
                            />
                            <button
                                style={styles.submitButton} 
                                type="submit">
                                SIGN UP
                            </button>
                        </form>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: '10'
    },
    leftContainer: {
        width: '50%',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url("${BackgroundImg}")`,
        color: 'white'
    },
    rightContainer: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
    },
    homeButton: {
        backgroundColor: 'white',
        // border: '2px solid white',
        padding: '15px 20px',
        borderRadius: '30px',
        textDecoration: 'none',
        color: '#FA5100',
        // color: 'white',
        fontWeight: '500'
    },
    submitButton: {
        backgroundColor: '#FA5100',
        padding: '15px 40px',
        borderRadius: '30px',
        border: 'none',
        textDecoration: 'none',
        color: 'white',
        fontWeight: '500',
        marginTop: '20px',
        cursor: 'pointer'
    },
    registerHeader: {
        fontSize: '2rem',
        color: '#FA5100'
    },
    link: {
        color: '#403d3d',
        textDecoration: 'none'
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))