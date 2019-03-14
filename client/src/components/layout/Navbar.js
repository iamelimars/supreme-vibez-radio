import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'
import { Link } from 'react-router-dom';

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
};

class MenuAppBar extends Component {
    state = {
        auth: true,
        anchorEl: null,
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

        console.log(this.props.auth.isAuthenticated);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Photos
                        </Typography>
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
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )
                            :
                            (
                                <div>
                                    <Link
                                        to="/register"
                                        style={{
                                            padding: '20px',
                                            textDecoration: 'none'
                                        }}
                                        // className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >
                                        Register
                                    </Link>
                                    <Link
                                        to="/login"
                                        style={{
                                            padding: '20px',
                                            textDecoration: 'none'
                                        }}
                                        // className="btn btn-large waves-effect white hoverable black-text"
                                    >
                                        Log In
                                    </Link>
                                </div>
                            )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(MenuAppBar));



// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// class Navbar extends Component {
//     render() {
//         return (
//             <div className="navbar-fixed">
//                 <nav className="z-depth-0">
//                     <div className="nav-wrapper white">
//                         <Link
//                             to="/"
//                             style={{
//                                 fontFamily: "monospace"
//                             }}
//                             className="col s5 brand-logo center black-text"
//                         >
//                             <i className="material-icons">code</i>
//                         </Link>                  
//                     </div>
//                 </nav>
//             </div>
//         )
//     }
// }

// export default Navbar;