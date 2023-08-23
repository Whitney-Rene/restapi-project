//app framework (can come in the form of a package, but not all packages are frameworks) for backend
const express = require('express')
//import these before the creation of the "app"
const cors = require('cors'); //makes sure nothing else in comp is using this port #
const path = require('path'); //will tell express we are working directory and the dir of the books.js, express on its own does not know
const BOOKS = require('./books.js');

const app = express()
const port = 2023 //arbitrary number for port, can be any number


app.use(cors()); //Middleware

const __dirname = path.resolve(); //similiar to pwd

console.log('Whitney-Rene');

//below are 2 routes (specific endpoints), if I enter anything else (localhost:2023/tech =>"Cannot GET/techtonica")
//request handler, if someone visits the home of my app, answer them with "hello world"
//"get" is just showing information
//"req" ask the server for things, if someone visits the "/", do something
//"res" if this happens, do this
app.get('/', (req, res) => {
    console.log("Someone is visiting my page :)")
    res.send('Hola mundo! You are visiting my server!')
})

//get is a function that takes 2 parameters
//first is the route
//second anonymous function
app.get('/user', (req, res) => {
//request - anything that we are asking the server, the server answers my request
//response - what we want the have once the server responds, I handle the response, server is not more intelligent than me
// res.send("Hello user, nice to see you")
    if(res.statusCode === 200) {
        res.send("Hello user, nice to see you!")
    }
})

//let's put a rule for when I don't know what is happening, don't understand the request
//has to be the LAST router, and BEFORE the listen
//we are not using get/put/post/delete b/c we are not doing something in favor of the user, just telling user I don't know what you are doing
//"use" is a function that takes a response
app.use((req, res) => {
    res.status(404).send("Sorry, I can't find that!")
})

//this should be the last function of your server, it tells computer which port to use
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})