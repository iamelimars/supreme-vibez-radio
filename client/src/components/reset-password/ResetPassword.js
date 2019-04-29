import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/resetPasswordActions'
import queryString from 'query-string';
import authImg from '../../assets/authentication.svg';
import TextField from '@material-ui/core/TextField';

class ResetPassword extends Component {

    constructor() {
        super();

        this.state = {
            newPassword: '',
            verifyPassword: '',
            token: ''
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({ token: values.token })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { token, newPassword, verifyPassword } = this.state;
        
        const data = {
            token: token,
            newPassword: newPassword,
            verifyPassword: verifyPassword
        }
        this.props.resetPassword(data, this.props.history)
        console.log(data);
        
    }

    componentDidUpdate() {
        console.log(this.props);
        
    }
    
    render() {

        const { resetPass, errors } = this.props;

        return (
            <div style={styles.container}>
                {errors.response && 
                    <p className="red-text">Something went wrong... {errors.response.data.message}.</p>
                }

                {resetPass.response.status === 200 ?
                    <div className="leftContainer" style={styles.leftContainer}>
                        <h4>
                            <b>Success</b>!!!
                        </h4>
                        <p>
                            Go back to the login page.
                            <Link style={{color: 'grey'}} to="/login">Log in</Link>
                        </p>
                        <p>{resetPass.response.data.message}</p>
                    </div>
                :

                    <div className="leftContainer" style={styles.leftContainer}>
                        <h4>
                            <b>Reset</b> Password
                        </h4>
                        <p>
                            Remember your password?
                            <Link style={{color: 'grey'}} to="/login">Log in</Link>
                        </p>
                        <form style={styles.form} noValidate onSubmit={this.onSubmit}>
                            <TextField
                                label="New Password"
                                value={this.state.newPassword}
                                error={errors.newPassword}
                                id="newPassword" 
                                onChange={this.onChange}
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                            <TextField
                                label="Verify Password"
                                value={this.state.verifyPassword}
                                error={errors.verifyPassword}
                                id="verifyPassword" 
                                onChange={this.onChange}
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                            <button
                                style={styles.submitButton} 
                                type="submit">
                                Reset Password
                            </button>
                        </form>
                    </div>
                }
                <div className="rightContainer" style={styles.rightContainer}>
                    <img src={authImg} alt="" style={{width: '70%'}}/>
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

const mapStateToProps = state => ({
    resetPass: state.resetPass,
    errors: state.resetPass.errors
})

export default connect(mapStateToProps, { resetPassword })(withRouter(ResetPassword))