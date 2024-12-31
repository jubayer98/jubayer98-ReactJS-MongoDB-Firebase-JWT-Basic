const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors({
    origin: ['http://localhost:5173',
        'https://b10a11-b0162.web.app',
        'https://b10a11-b0162.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        }

        req.user = decoded;

        next();
    })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8irzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //await client.connect();
        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // auth related APIs
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
                })
                .send({ success: true });
        })

        app.post('/logout', (req, res) => {
            res
                .clearCookie('token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
                })
                .send({ success: true })
        })

        // books related APIs
        const booksCollection = client.db('lmsDB').collection('books');
        const borrowedBooksCollection = client.db('lmsDB').collection('borrowed_books');

        app.get('/books', async (req, res) => {
            const email = req.query.email;
            let query = {};
            if (email) {
                query = { Email: email }
            }
            const cursor = booksCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await booksCollection.findOne(query);
            res.send(result);
        })

        app.put('/books/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedBook = req.body;
            const book = {
                $set: {
                    Image: updatedBook.Image,
                    Name: updatedBook.Name,
                    AuthorName: updatedBook.AuthorName,
                    Category: updatedBook.Category,
                    Quantity: updatedBook.Quantity,
                    Rating: updatedBook.Rating
                }
            }

            const result = await booksCollection.updateOne(filter, book, options);
            res.send(result);
        })

        app.post('/books', async (req, res) => {
            const newBook = req.body;
            const result = await booksCollection.insertOne(newBook);
            res.send(result);
        })

        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await booksCollection.deleteOne(query);
            res.send(result);
        })

        // book borrow APIs
        app.get('/borrowed-books', verifyToken, async (req, res) => {
            const email = req.query.email;
            const query = { email: email };

            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: 'Forbidden Access' });
            }
            //console.log(req.cookies)

            const result = await borrowedBooksCollection.find(query).toArray();

            for (const borrowed of result) {
                const borrowedQuery = { _id: new ObjectId(borrowed.book_id) };
                const borrowedResult = await booksCollection.findOne(borrowedQuery);

                if (borrowedResult) {
                    borrowed.Image = borrowedResult.Image;
                    borrowed.Name = borrowedResult.Name;
                    borrowed.AuthorName = borrowedResult.AuthorName;
                }
            }

            res.send(result);
        })

        app.get('/borrowed-books/books/:book_id', async (req, res) => {
            const bookId = req.params.book_id;
            const query = { book_id: bookId };
            const result = await borrowedBooksCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/borrowed-books', async (req, res) => {
            const borrowedBooks = req.body;
            const result = await borrowedBooksCollection.insertOne(borrowedBooks);

            const id = borrowedBooks.book_id;
            //const query = { _id: new ObjectId(id) };
            //const book = await booksCollection.findOne(query);

            // let borrowCount = 0;
            // if (book.borrowedBooksCount) {
            //     borrowCount = book.borrowedBooksCount + 1;
            // }
            // else {
            //     borrowCount = 1;
            // }

            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $inc: {
                    borrowedBooksCount: 1,
                    Quantity: -1
                }
            }

            const updateResult = await booksCollection.updateOne(filter, updatedDoc);

            res.send(result);
        })

        app.delete('/borrowed-books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await borrowedBooksCollection.deleteOne(query);
            res.send(result);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running...')
})

app.listen(port, () => {
    console.log(`server is running at: ${port}`)
})