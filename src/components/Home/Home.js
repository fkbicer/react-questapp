import Post from "../Post/Post";
import React, {useState, useEffect} from "react";
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostForm from "../Post/PostForm";



const useStyles = makeStyles((theme) => ({
    container: {
        display : 'flex',
        flexWrap : 'wrap',
        direction:"column",
        alignItems:"center",
        justifyContent:"center",
        height: '100vh',
        backgroundColor: '#cfe8fc'
    }
  }));




function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(
        () => {
            refreshPosts()
        }, [postList] )


        if(error) {
            return <div> Error !! </div>
        }else if (!isLoaded) {
            <div> Loading ...</div>
        }else {
            return (
             

                <React.Fragment>
                <CssBaseline />
                <Container fixed>

                  <Box >
                <div className = {classes.container}>
                <PostForm userId ={1} userName={"f-test"} refreshPosts = {refreshPosts} ></PostForm> 
                {postList.map(post => (
                    <Post userId ={post.userId} userName={post.userName} title={post.title} text = {post.text}></Post>    
             ))}</div>   
                  </Box>
                 
                </Container>
              </React.Fragment>
                
            )
        }
}

export default Home;