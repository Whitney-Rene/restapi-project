//app framework (can come in the form of a package, but not all packages are frameworks) for backend
const express = require('express')
const app = express()

//arbitrary number for port, can be any number
const port = 2023

console.log('Whitney-Rene');

//this should be the last function of your server, it tells computer which port to use
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})