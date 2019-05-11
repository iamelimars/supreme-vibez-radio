import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import BackgroundImg from './../../assets/trianglify2.svg';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')//push user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData); //since we handle the redirect within our commponent, we dont need to pass in the props.history as a paramater

        console.log(userData);
    };


    render() {
        const { errors } = this.state;
        return (
            <div className="container" style={styles.container}>
                <div style={styles.leftContainer} className="leftContainer">
                    <h1>Welcome Back!</h1>
                    <h3 style={{padding: '30px', textAlign: 'center'}}>To keep connected with us please <br/> login with your personal info</h3>
                    <div style={{paddingLeft: '11.250px'}}>
                        <p className="grey-text text-darken-1">
                            Don't have an account? <Link style={styles.rightLink} to="/register"> Register</Link>
                        </p>
                    </div>
                    <Link to="/" style={styles.homeButton}>            
                        Back to home        
                    </Link>
                </div>
                <div style={styles.rightContainer} className="rightContainer">
                        <div className="col s12" style={{paddingLeft: '11.250px'}}>
                            <h4 style={styles.registerHeader}>
                                <b>Login</b> below
                            </h4>
                        </div>
                        <form style={styles.form} noValidate onSubmit={this.onSubmit}>
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
                            <span className="red-text">
                                <FormHelperText style={{color: 'red'}}>{errors.password}</FormHelperText>
                                <FormHelperText style={{color: 'red'}}>{errors.passwordincorrect}</FormHelperText>
                            </span>
                            <div style={{paddingLeft: '11.250px'}}>
                                <p >
                                    <Link style={styles.link} to="/forgot_password">Forgot your password?</Link>
                                </p>
                            </div>
                            <button
                                style={styles.submitButton} 
                                type="submit">
                                LOGIN
                            </button>
                        </form>
                </div>
                
            </div>
        );
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
        color: 'grey',
        textDecoration: 'none'
    },
    rightLink: {
        color: '#403d3d',
        textDecoration: 'none'
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);