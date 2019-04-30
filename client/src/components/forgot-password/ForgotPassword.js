import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/forgotPasswordActions'
import authImg from '../../assets/authentication.svg';
import TextField from '@material-ui/core/TextField';

class ForgotPassword extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            errors: {}
        }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const forgotEmail = {
            email: this.state.email
        }

        this.props.forgotPassword(forgotEmail, this.props.history)
        console.log(forgotEmail);
        console.log(this.props);
        

    }


    render() {
        // const { errors } = this.state;
        const { forgotPass, errors } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2" style={styles.container}>
                        {errors.response && 
                            <p className="red-text">Something went wrong... 
                            {/* {errors.response.data.message}. */}
                            </p>
                        }
                            {forgotPass.response.status === 200 ?
                                <div className="leftContainer" style={styles.leftContainer}>
                                    <h4>
                                        <b>Email</b> sent!!!
                                    </h4>
                                    <p className="grey-text text-darken-1">
                                        Remember your password?
                                        <Link style={{color: 'grey'}} to="/login">Log in</Link>
                                    </p>
                                    <p>{forgotPass.response.data.message}</p>
                                </div>
                            :
                                <div className="leftContainer" style={styles.leftContainer}>
                                    <h1>Forgot Password?</h1>
                                    <div>
                                        <p className="grey-text text-darken-1">
                                            Remember your password?
                                            <Link style={{color: 'grey'}} to="/login">Log in</Link>
                                        </p>
                                    </div>
                                    <h3>Enter the email associated with your account</h3>
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
                                        <button
                                            style={styles.submitButton} 
                                            type="submit">
                                            Send Password Reset Email
                                        </button>
                                    </form>
                                </div>
                            }
                        <div className="rightContainer" style={styles.rightContainer}>
                            <img src={authImg} alt="" style={{width: '70%'}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // height: '100vh',
        // position: 'absolute',
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
        // backgroundImage: `url("${BackgroundImg}")`,
        color: 'black',
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    rightContainer: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: '50px',

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

// ForgotPassword.propTypes = {
//     resetPassword: PropTypes.func.isRequired,
//     response: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
    forgotPass: state.forgotPass,
    errors: state.forgotPass.errors
})

export default connect(mapStateToProps, { forgotPassword })(withRouter(ForgotPassword));