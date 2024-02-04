//app framework
import express from 'express';
//import these before the creation of the "app"
import cors from 'cors'; //makes sure nothing else in comp is using this port #
import path from 'path'; //will tell express the pwd
import BOOKS from './books.js'; //THIS ALLOWS BOOKS TO BE ACCESSED BY INDEX.JS?
import bodyParser from 'body-parser'; //allow put & post requests
import fetch from 'node-fetch';

const app = express() //holds a new express app, each time it is called
const port = 2023


app.use(cors()); //Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const __dirname = path.resolve();

console.log('Whitney-Rene');

//home route, user will see message
// http://localhost:2023/
app.get('/', (req, res) => {
    console.log("Someone is visiting my HOME page")
    res.send('Welcome! You are visiting my HOME server!')
})

//if user goes here and the status code is 200, show this message
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
// http://localhost:2023/books/atInd
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
// http://localhost:2023/books/4 
//https://api.openweathermap.org/data/2.5/weather?q=fremont
app.get('/books/:id/:title', (req, res) => {
    console.log("Someone is visiting my ID.BOOKS page.")
    const { id, title } = req.params; 
    console.log(req.params)
    //find()-JS array method
    const book = BOOKS.find(book => {
        if(book.id === id && book.title === title){
            return book}
        return
    console.log(book);
    if(!book){
        res.status(404).send("I don't have that book!")
        } else {
            res.json(book);
            }
    })
    });

app.get('/weather/:cityName/:APIkey', (req, res) => {
    console.log("Someone is visiting my weather site.");
    const {cityName, APIkey} = req.params;
    console.log(req.params);
    //string literal ``
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
    fetch(url) 
        .then(response => {
            // Code to handle the response
            // The response might contain data or information about the request status
            return response.json(); // For example, parsing response as JSON
        })
        .then(data => {
            // Code to handle the parsed data
            console.log(data);
            res.send(data);
        })
        .catch(error => {
            // Code to handle errors during the fetch request
            console.error('Error:', error);
        });
})

//Challenges: 
//?everything after is a query param
//instead of api on line 79 * 81, tweak 84 =>, get it working with dotenv file
//req.params vs req.query, look up express documentation for req.query, chatgpt has examples


//post request to add a new book
//Change to "POST" in postman
// http://localhost:2023/books/createBook
app.post('/books/createBook', (req, res) => {
    console.log("Got a POST request");
    const newBook = {
        id: 5,
        title: "Becomming",
        author: "Michelle Obama",
        format: "paperback"
    };
    BOOKS.push(newBook);
    res.send(BOOKS);
})

//change author of 3rd book
////Change to "PUT" in postman
//http://localhost:2023/books/editBook
// app.put('/books/editBook', (req, res) => {
//     console.log("Got a PUT request");
//     BOOKS[2].author="Whitney-Rene";
//     res.send(BOOKS)
// })

//change author of 3rd book
////Change to "PUT" in postman
// http://localhost:2023/books/editBook
app.put('/books/editBook', (req, res) => {
    console.log("Got a PUT request");
    let data = req.body;
    //should see {} in terminal
    console.log(req.body);
    data.name = "Whitney-Rene"
    //should see {name: "Whitney-Rene"}
    console.log(req.body);
    BOOKS[2].author=data.name;
    res.send(BOOKS)
})

 //delete request for LAST book 
 //Change to "DELETE" in postman *What if I click send 4 times?
 // http://localhost:2023/books/deleteBook 
 app.delete("/books/deleteBook", (req, res) => {
    console.log("This is a DELETE request");
    BOOKS.pop();
    res.send(BOOKS)
 })

//delete request for book with SPECIFIC ID
// http://localhost:2023/books/deleteIndBook/1 *I should see the book w/ id:1 eliminated
 app.delete("/books/deleteIndBook/:id", (req, res) => {
    console.log("Got a DELETEInd request");
    const { id } = req.params; 
    const book = BOOKS.filter(book => book.id !== id);
    if(!book){
        res.status(404).send("I don't have that book!")
    }
        res.send(book);
        
 }) 

//a rule for when the request is not understood
// http://localhost:2023/whitney-rene 
app.use((req, res) => {
    res.status(404).send("Sorry, I can't find that!")
})

//this should be the last function of your server, it tells computer which port to use
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



//CHALLENGES for the future:
//filter books array according to this para, if format is empty, show all books
//  // res.json({"book1": BOOKS[id],
    // "book2": BOOKS[id]})
