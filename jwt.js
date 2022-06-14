const express= require('express'); //import express by requiring the express library 
const jwt = require('jsonwebtoken') //importing jsonwebtoken

const app = express(); //express server to call the express function, excecuting express

app.get("/api", (req , res) => { //App and get a rout api, the callback gets request and response with the =>
    res.json({ //make a response to the user with a json messaje using the json function
        mensaje: 'Nodejs and JWT' //go to the app and after / write api 
    });
});

app.post("/api/login", (req , res) => { //user logges into the app 
    const user = { //we send the info to the server 
        id:0,
        email: 'email',
        password: 'password'
    }

    jwt.sign({user: user}, 'secretkey', {expiresIn: '32s'}, (err, token) =>{ //when the user enters into his account we need to create a token, we passs the object user passing the value user, any string "secretkey" and the function with parameters as an error and the token we creater with jwt to identify the logged user
        res.json({ //we send the object, token sent to the clientside, the browser stores the token like localstorage or cookies
            token //if the value of the property is the same as its value it should be the same name token: token
        })
    });
});

app.post("/api/posts", verifyToken, (req , res) => {  //token to access the route creating the function verifyToken, to access the route we send the token and verify it's valid
    //to acces the route we use the verify token to verify if the user is sending a token. 
    jwt.verify(req.token, 'secretkey', (error, authData) =>{ //token+ cad+ for errors, the user info auth
        if(error){ 
            res.sendStatus(403); //response with status num, forbidden in POSTMAN bc we need to send the token, in headers, key autho value bearer and token
        }else{
            res.json({
                message: "Post has been created",
                authData
            });
        }

    });
});

//Authorization: Bearer <token> verify the token
function verifyToken(req, res, next){ //function+f.name+r,r,function next that is excecuted when success
    const bearerHeader = req.headers['authorization']; //obtaining info from the client stored in a var

    if(typeof bearerHeader !== 'undefined'){ //if it exist we have access to the token
        const bearerToken = bearerHeader.split(" ")[1]; //to only get access to the token not to all the variable, the 1 is the second element "token", the 0 is the Bearer
        req.token = bearerToken;
        next(); //excecute if token is right
    } else{
        res.sendStatus(403) //prohibited access
    }

}


app.listen(5000, function(){ //until we want to listen on port 3000, we have an app running on 3000, to run=app.get, to listen our app on 3000 port
    console.log('nodejs app running'); //devstart npm run devstart to see the app running, open the app in the console (via index)
});