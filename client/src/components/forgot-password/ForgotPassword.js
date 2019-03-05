import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/forgotPasswordActions'

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
                    <div className="col s8 offset-s2">
                        <Link to="/login" className="btn-flat waves-effect">
                            <i className="material-icons left">
                                keyboard_backspace
                            </i>
                            Back to Login
                        </Link>
                        {errors.response ? 
                            <p className="red-text">Something went wrong... {errors.response.data.message}.</p>
                            :
                            null
                        }
 
                        {forgotPass.response.status === 200 ?
                            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                                <h4>
                                    <b>Email</b> sent!!!
                                </h4>
                                <p className="grey-text text-darken-1">
                                    Remember your password?
                                    <Link to="/login">Log in</Link>
                                </p>
                                <p>{forgotPass.response.data.message}</p>
                            </div>
                            :
                            <div>
                                <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                                    <h4>
                                        <b>Forgot</b> password?
                                </h4>
                                    <p className="grey-text text-darken-1">
                                        Remember your password?
                                    <Link to="/login">Log in</Link>
                                    </p>
                                    <p>Enter the email associated with your account</p>
                                </div>

                                <form onSubmit={this.onSubmit} noValidate>
                                    <div className="input-field col s12">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            type="text"
                                            id="email"
                                        />
                                        <label htmlFor="email">Email</label>
                                        {/* <span className="red-text">{errors.name}</span> */}
                                    </div>
                                    <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                                        <button
                                            style={{
                                                width: '150px',
                                                borderRadius: '3px',
                                                letterSpacing: '1.5px',
                                                marginTop: '1rem'
                                            }}
                                            type="submit"
                                            className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                            Send password reset email
                                        </button>
                                    </div>
                                </form>
                            </div>
                        }


                    </div>
                </div>
            </div>
        )
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