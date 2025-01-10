const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
require("dotenv").config(); // Load environment variables from .env file
const app = express()
const port = 3000

app.use(express.json());

app.use(cors());

main().catch(err => console.log(err));

async function main() {
  //mongose stuff coming back

  const DATABASE_URI = process.env.DATABASE_URI;
  
  await mongoose.connect(DATABASE_URI);

}
    
  const todoSchema = new mongoose.Schema({
    id: String,
    text: String,
    checked: Boolean
  });

  todoSchema.methods.print = function print() {
    const output = "| " + this.id + " | " + this.text + " | " + this.checked + " | ";
    console.log(output);
  }

  const todo = mongoose.model('Todo', todoSchema);

  // const testTodo1 = new todo({ id: '1', text: 'testTodo1', checked: false });
  // const testTodo2 = new todo({ id: '2', text: 'testTodo2', checked: false });
  // const testTodo3 = new todo({ id: '3', text: 'testTodo3', checked: false });
  // console.log(testTodo.id)
  // console.log(testTodo.text)
  // console.log(testTodo.checked)

  // testTodo.print();

  // testTodo1.save();
  // testTodo2.save();
  // testTodo3.save();

  // const result = await todo.find();

  
  // console.log('this has been json stringified');
  // console.log(JSON.stringify(result));


//Test setup

//get should get lets just say the whole database of todos

//post should put a todo into the database


// basic node.js setup

app.get('/', async (req, res) => {
  try {
    const result = await todo.find();
    res.send(result);
  } catch (error) {
    console.log(error)
  }

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id); 
  await todo.findOneAndDelete({ id: id});
})

app.patch('/patch/check/:id/:checked', async (req, res) => {
  const id = req.params.id;
  const checked = req.params.checked;
  console.log(checked);
  await todo.updateOne({ id: id }, { checked: checked });
})

app.patch('/patch/:id/:text', async (req, res) => {
  const id = req.params.id;
  const text = req.params.text;
  console.log(id + text);
  await todo.updateOne({ id: id }, { text: text });
})

  // res.send()
})

app.post('/post', (req, res) => {
    res.send('Got a POST request')
    console.log("here is the req.body" + req.body)
    const task = req.body;
    console.log(req.body);
    const todoToPost = new todo({id: task.id, text: task.text, checked: task.checked});
    todoToPost.save();
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//mvp setup

//frontend only needs to get all the todos in order to setup todolist on startup
//  in that case the get'/' should do because I don't need parameters I just need all the todos

//adding todo is pretty simple and is same as what I have in test one above so that should be easy
//  just make sure that I can add a single todo. I might have to change it to multiple but for now a single todo
//  at a time should be fine

main();