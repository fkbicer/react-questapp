import React from "react";
import {Link} from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    home: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      textDecoration :'none',
    },
    user: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 20,
        padding: '0 30px',
        textDecoration :'none',
      },
      title : {
        textAlign : 'left',
        flexGrow : 1
    }
  });


function Navbar() {
    const classes = useStyles();
    let userId=5;
        return (
            <div>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={classes.title}>
          <Link className={classes.home} to="/">Home</Link>
          </Typography>
          <Typography variant="h6" component="div" >
          <Link className={classes.user} to={{pathname : '/users/' + userId}}>User</Link>
          </Typography>
        </Toolbar>
      </AppBar>

            
            </div>


        )
}

export default Navbar;