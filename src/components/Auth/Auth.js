import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handelPassword = (value) => {
        setPassword(value);
    }

    const handleButton = (path) => {
        sendRequest(path);
        setUsername("");
        setPassword("");
        navigate(0);
       
    }

    const sendRequest  = (path) => {
        fetch("/auth/" + path,
        {
            method: "POST",
            headers: {"Content-Type" : "application/json",},
            body : JSON.stringify({
               userName : username,
               password : password
            }),
        })
        .then((res) => res.json())
        .then((result) =>{localStorage.setItem("tokenKey", result.accessToken);
                         localStorage.setItem("currentUser", result.userId);
                         localStorage.setItem("userName", username);})
        .catch((err) => console.log("error"))

    }

    return(
        <div>
            <FormControl>

            <InputLabel>UserName</InputLabel>
            <Input onChange={(i) => handleUsername(i.target.value)} />
            <InputLabel style={{top: 80}}>Password</InputLabel>
            <Input onChange={(i) => handelPassword(i.target.value)} style={{top: 40}}/>
            <Button variant ='contained' 
            style={{marginTop : 60}}
            onClick ={() => handleButton("register")}>Register</Button>
            <FormHelperText style={{marginTop : 10}}>Are you already registered?</FormHelperText>
            <Button variant ='contained' 
            style={{marginTop : 10}}
            onClick ={() => handleButton("login")}>Login</Button>

            </FormControl>
            
        </div>
    )
}

export default Auth;