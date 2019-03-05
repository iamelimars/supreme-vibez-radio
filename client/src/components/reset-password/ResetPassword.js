import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/resetPasswordActions'
import queryString from 'query-string';

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
            <div className="container">
                <div className="row">
                    <div className="col 28 offset-s2">
                        {errors.response ? 
                            <p className="red-text">Something went wrong... {errors.response.data.message}.</p>
                            :
                            null
                        }

                        {resetPass.response.status === 200 ?
                            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                                <h4>
                                    <b>Success</b>!!!
                                </h4>
                                <p className="grey-text text-darken-1">
                                    Go back to the login page.
                                    <Link to="/login">Log in</Link>
                                </p>
                                <p>{resetPass.response.data.message}</p>
                            </div>
                        :

                        <div>
                        <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                            <h4>
                                <b>Reset</b> Password
                            </h4>
                            <p className="grey-text text-darken-1">
                                Remember your password?
                                <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form onSubmit={this.onSubmit} noValidate>
                            <div className="input-field col s12">
                                <input 
                                    type="password"
                                    onChange={this.onChange}
                                    value={this.state.newPassword}
                                    id="newPassword"/>
                                <label htmlFor="newPassword">New Password</label>
                            </div>
                            <div className="input-field col s12">
                                <input 
                                    type="password"
                                    onChange={this.onChange}
                                    value={this.state.verifyPassword}
                                    id="verifyPassword"/>
                                <label htmlFor="verifyPassword">Verify Password</label>
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
                                    Submit
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

const mapStateToProps = state => ({
    resetPass: state.resetPass,
    errors: state.resetPass.errors
})

export default connect(mapStateToProps, { resetPassword })(withRouter(ResetPassword))