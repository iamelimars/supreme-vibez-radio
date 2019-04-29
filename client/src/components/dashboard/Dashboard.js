import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './Dashboard.css';
import Chat from './Chat';
import GroupChatImg from './../../assets/group_chat.svg';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    console.log(user);
    const name = user.name.split(" ")[0];
return (
      <div style={{ minHeight: "75vh" }} className="dash-container">
          <div className="dash-left">
            <h4>
              Hey there, <b>{name}</b>
            </h4>
            <p>
              You are logged into Supreme Vibez Radio. <br/> You are currently in the dashboard, <br/> where you can chat with other the Djs and other users.
            </p>
            <button onClick={this.onLogoutClick}>
              LOGOUT
            </button>
            <img src={GroupChatImg} alt="" className="chat-img"/>
          </div>
          <div className="dash-right">
            <Chat name={name} username={user.username}/>
          </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);