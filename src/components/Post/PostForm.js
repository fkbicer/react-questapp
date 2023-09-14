import React from "react";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom"
import { InputAdornment, OutlinedInput } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const useStyles = makeStyles((theme) => ({
  root: {
      width: 800,
      textAlign: 'left'
  },
  link : {
    textDecoration: 'none',
    boxShadow:'none',
    color:'white'
  }
}));


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function PostForm(props) { 
    const {userName,userId, refreshPosts} = props;
    const classes = useStyles();
    const [text, SetText] = useState("");
    const [title, SetTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",
        {
            method: "POST",
            headers: {"Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("tokenKey")},
            body : JSON.stringify({
                title:title,
                userId: localStorage.getItem("currentUser"),
                text : text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        SetTitle("");
        SetText("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        SetTitle(value);
        setIsSent(false);
    }

    
    const handleText = (value) => {
        SetText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setIsSent(false);
    }

    
 



    return (
        <div>
        <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Your post is sent!
        </Alert>
        </Snackbar>

        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Link className={classes.link} to={{pathname : '/users/' + userId}}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
              
            </Avatar>
            </Link>
          }
          title= {<OutlinedInput
          id="outlined-adorment-amount"
          multiline
          placeholder= "Title"
          inputProps={{maxLength :25}}
          fullWidth
          value = {title}
          onChange={ (i) => handleTitle(i.target.value)}
          >

          </OutlinedInput>}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {<OutlinedInput
          id="outlined-adorment-amount"
          multiline
          placeholder= "Text"
          inputProps={{maxLength :250}}
          fullWidth
          value = {text}
          onChange={ (i) => handleText(i.target.value)}
          endAdornment = {
            <InputAdornment position = "end">
                <Button
                variant = "contained"
                onClick= {handleSubmit}
                
                > Post </Button>
            </InputAdornment>
          }
          >

          </OutlinedInput>}
          </Typography>
        </CardContent>
      </Card>

        </div>
     
    );
  }

export default PostForm;