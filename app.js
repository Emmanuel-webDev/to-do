const express = require('express')
const ejs = require('ejs')
const path = require('path')
const mongo = require('mongodb')
const app = express();

const data = require('./data/database');
const { ObjectId } = require('mongodb');

const id = mongo.ObjectId

app.set('views', path.join(__dirname, 'Frontend'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/create', async (req, res)=>{
    const newList = {
        list: req.body.text,
        date: new Date().toLocaleTimeString()
    }
    const  lists = await data.getdb().collection('Todolist').insertOne(newList);
    console.log(lists)
    res.redirect('/createlist')
})

app.get('/createlist', async (req,res)=>{
    const  lists = await data.getdb().collection('Todolist').find({},{list: 1, _id: 1}).toArray();
    res.render('create', { list : lists})
})

app.get('/update/:id', async (req,res)=>{
    const listId = new ObjectId(req.params.id)
    const lists = await data.getdb().collection('Todolist').findOne({_id:listId}, {list: 1})
    res.render('update', {x : lists})
})

app.post('/created/:id', async (req,res)=>{
    const listId = new ObjectId(req.params.id)
    const  lists = await data.getdb().collection('Todolist').updateOne({_id:listId}, { $set:{ list : req.body.text} })
    res.redirect('/createlist')
})

app.post('/del/:id', async(req,res)=>{
    const postid = new ObjectId(req.params.id);
    const output = await data.getdb().collection('Todolist').deleteOne({_id: postid})
    res.redirect('/createlist')
})

//let port = 3000
if(process.env.PORT){
    port = process.env.PORT
}

data.connection().then(function (){
    app.listen(port)
    });
