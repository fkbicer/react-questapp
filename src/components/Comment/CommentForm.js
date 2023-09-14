import React, { useState } from "react";
import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';


const useStyles = makeStyles((theme) => ({

    comment : {
        display:"flex",
        flexWrap:"wrap",
        justifyContent :"flex-start",
        alignItems:"center"
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color: "white"
    }

}));

function CommentForm(props) {
    const {userId, userName, postId} = props;
    const classess = useStyles();
    const [text, setText] = useState("");

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

    const saveComment = () => {
        fetch("/comments",
        {
            method: "POST",
            headers: {"Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("tokenKey")},
            body : JSON.stringify({
                postId:postId,
                userId: localStorage.getItem("currentUser"),
                text : text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))
    }

    return(
        <CardContent className = {classess.comment}>
            <OutlinedInput
            id="outlined-adorment-amount"
            multiline
            placeholder= "Title"
            inputProps={{maxLength :250}}
            fullWidth
            onChange = {(i) => handleChange(i.target.value)}
            value = {text}
            startAdornment = {
                <InputAdornment position = "start">
                    <Link className={classess.link} to={{pathname:'/users' + userId}} >
                        <Avatar aria-label ="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>

                </InputAdornment>
            }
            endAdornment = {
                <InputAdornment position = "end">
                    <Button 
                    variant ="contained"
                    onClick={handleSubmit}
                    >
                        Comment
                    </Button>
                </InputAdornment>

            }></OutlinedInput>

        </CardContent>
    )
}

export default CommentForm;