import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse, { collapseClasses } from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom"
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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

function Post(props) { 
    const {text,title,userName,userId, postId} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComment();
        console.log(commentList);
      }
    const handleLike = () => {
      setLiked(!liked);
    }

    
    const refreshComment = () => {
      fetch("/comments?postId="+ postId)
          .then(res => res.json())
          .then(
              (result) => {
                  setIsLoaded(true);
                  setCommentList(result);
              },
              (error) => {
                  console.log(error);
                  setIsLoaded(true);
                  setError(error);
              }
          )
  }

  useEffect(
    () => {
      if(isInitialMount.current)
        isInitialMount.current =false;
      else
        refreshComment();
    }, [commentList] )




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
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked? {color :'red'} : null} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error? "error" :
            isLoaded? commentList.map(comment => (
              <Comment userId = {1} userName={"USER"} text = {comment.text}></Comment>
            )) : "Loading" }
          <CommentForm userId = {1} userName={"USER"} postId= {postId}></CommentForm>
          </Container>
        </Collapse>
      </Card>
    );
  }

export default Post;