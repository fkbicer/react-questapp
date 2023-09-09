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
import { Button } from "@mui/material";

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
    const {userName,userId} = props;
    const classes = useStyles();
    const [text, SetText] = useState("");
    const [title, SetTitle] = useState("");

    const savePost = () => {
        fetch("/posts",
        {
            method: "POST",
            headers: {"Content-Type" : "application/json",},
            body : JSON.stringify({
                title:title,
                userId: userId,
                text : text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
    }

    const handleTitle = (value) => {
        SetTitle(value);
    }

    
    const handleText = (value) => {
        SetText(value);
    }

    
 



    return (
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
    );
  }

export default PostForm;