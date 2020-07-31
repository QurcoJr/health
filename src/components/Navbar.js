import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ logout, session, currentUser }) => {
  const classes = useStyles();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            component={Link}
            to='/'
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'>
            <HomeIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Health
          </Typography>
          {!session && (
            <>
              <Button component={Link} to='/login' color='inherit'>
                Login
              </Button>
              <Button component={Link} to='/signup' color='inherit'>
                Signup
              </Button>
            </>
          )}
          {session && (
            <>
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'>
                  <Typography
                    className={classes.title}
                    style={{ marginRight: '3px' }}>
                    {currentUser.fname}
                  </Typography>
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}>
                  <MenuItem
                    component={Link}
                    to={`/profile/${currentUser.id}`}
                    onClick={handleClose}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/dashboard/${currentUser.id}`}
                    onClick={handleClose}>
                    Dashbord
                  </MenuItem>
                </Menu>
              </div>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { session, currentUser } = state;
  return { session, currentUser };
};

export default connect(mapStateToProps, { logout })(Header);
