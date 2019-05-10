import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'
// import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Logo from '../../assets/logo.png'


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    links: {
        padding: '20px',
        textDecoration: 'none'
    },
    logo: {
        height: '200px',
    },
};

class NavBar extends Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.setState({ anchorEl: null });
    };

    handleChange = event => { 
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, auth } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);


        return (
            <div className={classes.root}>
                <AppBar style={{boxShadow: 'none'}} color="inherit" position="static">
                    <Toolbar>
                        <Link component={RouterLink} to="/">
                            <img className={classes.logo} src={Logo} alt={Logo}/>
                        </Link>
                        <div className={classes.grow} />
                        {auth.isAuthenticated ? (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <Link component={RouterLink} to="/">
                                            Home
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleClose}>
                                        <Link component={RouterLink} to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.onLogoutClick}>
                                        <Link component={RouterLink} to="/login">
                                            Logout
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )
                            :
                            (
                                <div>
                                    <Link className={classes.links} component={RouterLink} to="/register">
                                        Register
                                    </Link>
                                    <Link className={classes.links} component={RouterLink} to="/login">
                                        Login
                                    </Link>
                                    {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                        <MenuIcon />
                                    </IconButton> */}
                                </div>
                            )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(NavBar));


