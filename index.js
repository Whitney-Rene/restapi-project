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

//home route, user will see message
app.get('/', (req, res) => {
    console.log("Someone is visiting my page :)")
    res.send('Welcome! You are visiting my server/website!')
})

//if user goes here and the status code is 200, show this message, still a get request
app.get('/user', (req, res) => {
    if(res.statusCode === 200) {
        res.send("Hello user, nice to see you!")
    }
})

//user will see list of books
app.get('/books', (req, res) => {
    res.json(BOOKS);
})

//get/list the book in position 2 of the array
app.get('/books/secbook' /* DO I NEED A SLASH? /bookssecbook */, (req, res) => {
    res.json(BOOKS[1]);
    // res.json(BOOKS[]) CAN I ONLY HAVE 1 RES?
})

//pick up at minute 51
//https://www.dropbox.com/scl/fi/d66uv3noii87bk937p8pp/video1922996227.mp4?dl=0&rlkey=u0l3ogv2res5vlig4ntz1hbca
app.get('/books/:id' /* wild card for id, this is the route of the url, shows thing after colon */, (req, res) => {
    const { id } = req.params;  //ID COMES FROM THE URL?
    console.log(req.params)
    console.log(id);
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