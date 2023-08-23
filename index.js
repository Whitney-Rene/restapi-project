//app framework (can come in the form of a package, but not all packages are frameworks) for backend
const express = require('express')
const app = express()

//arbitrary number for port, can be any number
const port = 2023

console.log('Whitney-Rene');

//below are 2 routes (specific endpoints), if I enter anything else (localhost:2023/tech =>"Cannot GET/techtonica")
//request handler, if someone visits the home of my app, answer them with "hello world"
//"get" is just showing information
//"req" ask the server for things, if someone visits the "/", do something
//"res" if this happens, do this
app.get('/', (req, res) => {
    res.send('Hello World!')
})



//this should be the last function of your server, it tells computer which port to use
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})