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
    res.send('Welcome! You are visiting my HOME server!')
})

//if user goes here and the status code is 200, show this message, still a get request
// http://localhost:2023/user
app.get('/user', (req, res) => {
    console.log("Someone is visiting my USER page.")
    if(res.statusCode === 200) {
        res.send("Hello USER, nice to see you!")
    }
})

//user will see list of books
// http://localhost:2023/books
app.get('/books', (req, res) => {
    console.log("Someone is visiting my BOOKS page.")
    res.json(BOOKS);
})

//list book in a particular position in the array
//http://localhost:2023/books/atInd
app.get('/books/atInd', (req, res) => {
    console.log("Someone is visiting my BOOKS.INDEX page.")
    res.send(BOOKS[0]);
    //res.send([BOOKS[1], BOOKS[2]]);
    //res.json({"book1": BOOKS[1], "book2": BOOKS[3]})
    //res.json(BOOKS[0]); 
})
//avoid indexes in the frontend and backend
//you will not likely use indexes, unless you are 100% sure the db will not change


//list a book with a specific id
// http://localhost:2023/books/1 
app.get('/books/:id', (req, res) => {
    console.log("Someone is visiting my ID.BOOKS page.")
    const { id } = req.params; 
    //find()-JS array method
    const book = BOOKS.find(book => book.id === id);
    console.log(book);
    if(!book){
        res.status(404).send("I don't have that book!")
    }  else {
        res.json(book);
        }
})

//post request to add a new book
//Change to "POST" in postman
// http://localhost:2023/books/createBook *Needed to grab the body
app.post('/books/createBook', (req, res) => {
    console.log("Got a POST request");
    //*Needed to grab the body
    let data = req.body;
    const newBook = {
        id: 5,
        title: "Becomming",
        author: "Michelle Obama",
        format: "paperback"
    };
    BOOKS.push(newBook);
    res.send(BOOKS);
 })

 //put request
app.put('books/editBook')


 //delete request for LAST book 
 //Change to "DELETE" in postman *What if I click send 4 times?
 //http://localhost:2023/books/deleteBook 
 app.delete("/books/deleteBook", (req, res) => {
    console.log("This is a DELETE request");
    BOOKS.pop();
    res.send(BOOKS)
 })


 //???
 //delete request for specific book
 //http://localhost:2023/books/deleteIdBook/1 
 app.delete("/books/deleteIdBook/:id", (req, res) => {
    console.log("Got a DELETEID request");
    const { id } = req.params; 
    //find()-JS array method
    const book = BOOKS.find(book => book.id === id);
    if(!book){
        res.status(404).send("I don't have that book!")
    }  else {
        BOOKS.splice(id, 1);
        res.send(BOOKS);
        }
 }) 

//a rule for when the request is not understood
 //http://localhost:2023/books/whitney-rene 
app.use((req, res) => {
    res.status(404).send("Sorry, I can't find that!")
})

//this should be the last function of your server, it tells computer which port to use
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//Challenge:
//filter books array according to this para, if format is empty, show all books
//  // res.json({"book1": BOOKS[id],
    // "book2": BOOKS[id]})