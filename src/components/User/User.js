import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    root : {
      display: 'flex'
    }

}));

function User() {
    const classes = useStyles();
    const {userId} = useParams();
    return (
        <div className={classes.root}>
            <Avatar avatarId = {1}/>
            <UserActivity userId={userId}/>
        </div>
    )

}

export default User;