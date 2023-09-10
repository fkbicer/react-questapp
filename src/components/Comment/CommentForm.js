import React from "react";
import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

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
    const {text, userId, userName} = props;
    const classess = useStyles();

    return(
        <CardContent className = {classess.comment}>
            <OutlinedInput
            id="outlined-adorment-amount"
            multiline
            placeholder= "Title"
            inputProps={{maxLength :25}}
            fullWidth
            startAdornment = {
                <InputAdornment position = "start">
                    <Link className={classess.link} to={{pathname:'/users' + userId}} >
                        <Avatar aria-label ="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>

                </InputAdornment>
            }>

            </OutlinedInput>

        </CardContent>
    )
}

export default CommentForm;