//app framework
import express from 'express';
//import these before the creation of the "app"
import cors from 'cors'; //makes sure nothing else in comp is using this port #
import path from 'path'; //will tell express the pwd
import BOOKS from './books.js'; //THIS ALLOWS BOOKS TO BE ACCESSED BY INDEX.JS?

const app = express()
const port = 2023 //arbitrary number for port


app.use(cors()); //Middleware

const __dirname = path.resolve(); //similiar to pwd

console.log('Whitney-Rene');

//user will see message
app.get('/', (req, res) => {
    console.log("Someone is visiting my page :)")
    res.send('Hola mundo! You are visiting my server!')
})

//user will see list of books
app.get('/books', (req, res) => {
    res.json(BOOKS);
})

//get/list the book in position 2 of the array
app.get('/books/id1', (req, res) => {
    res.json(BOOKS[1]);
    // res.json(BOOKS[]) CAN I ONLY HAVE 1 RES?
})

//a rule for when the request is not understood
//"use" is a function that takes a response
app.use((req, res) => {
    res.status(404).send("Sorry, I can't find that!")
})

//this should be the last function of your server, it tells computer which port to use
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



//example of if user goes here and the status code is 200, show this message, still a get request
// app.get('/user', (req, res) => {
//     if(res.statusCode === 200) {
//         res.send("Hello user, nice to see you!")
//     }
// })