//app framework
import express from 'express';
//import these before the creation of the "app"
import cors from 'cors'; //makes sure nothing else in comp is using this port #
import path from 'path'; //will tell express the pwd
import BOOKS from './books.js'; //THIS ALLOWS BOOKS TO BE ACCESSED BY INDEX.JS?
import bodyParser from 'body-parser';

const app = express()
const port = 2023 //arbitrary number for port


app.use(cors()); //Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const __dirname = path.resolve(); //similiar to pwd

console.log('Whitney-Rene');

//home route, user will see message
//http://localhost:2023/
app.get('/', (req, res) => {
    console.log("Someone is visiting my HOME page")
    res.send('Welcome! You are visiting my home server!')
})

//if user goes here and the status code is 200, show this message, still a get request
// http://localhost:2023/user
app.get('/user', (req, res) => {
    console.log("Someone is visiting my USER page.")
    if(res.statusCode === 200) {
        res.send("Hello user, nice to see you!")
    }
})

//user will see list of books
// http://localhost:2023/books
app.get('/books', (req, res) => {
    console.log("Someone is visiting my BOOKS page.")
    // console.log(req);
    //filter books array according to this para, if format is empty, show all books
    res.json(BOOKS);
})

//get/list book in a particular position in the array
//avoid indexes in the front and end
//you will not likely use indexes, unless you are 100% sure the db will not change
//http://localhost:2023/books/atInd
app.get('/books/atInd', /* DO I NEED A SLASH? = /booksatInd */(req, res) => {
    res.send(BOOKS[0]);
    //res.send([BOOKS[1], BOOKS[2]]);
    //res.json(BOOKS[0]); DOES THE SAME THING NO?
})

//what if we want to go to a book with a specific id
//req params = what appears after /books/:id, req params grabs that
//an object that has whatever is in url that matches wild card
// :id = wild card for id, this is the route of the url-not books.js, shows thing after colon, :id-making this parameter*/
app.get('/books/:id', (req, res) => {
    const { id } = req.params; //ID COMES FROM THE URL? at this moment it does not know about ids in books.js
    //find()-JS array method
    const book = BOOKS.find(book => book.id === id);
    // console.log(book);
    if(!book){
        res.status(404).send("I don't have that book!")
    }  else {
        res.json(book);
        }
    // res.json({"book1": BOOKS[id],
    // "book2": BOOKS[id]})
})

//DID I MEET THE GUIDELINES?
//WHY IS THE POST NOT WORKING?
app.post('/books/newBook', (req, res) => {
    console.log("Got a POST request for the homepage");
    let data = req.body;

    // console.log(req.body);
    // res.send("Test Correct" + JSON.stringify(data));
    const newBook = {
        id: 5,
        title: "Becomming",
        author: "Michelle Obama",
        format: "paperback"
    };
    BOOKS.push(newBook);
    res.send(BOOKS);
 })

 //http://localhost:2023/books/delete
 app.delete("/books/delete", (req, res) => {
    console.log("This is a delete request");
    BOOKS.pop();
    res.send(BOOKS)
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