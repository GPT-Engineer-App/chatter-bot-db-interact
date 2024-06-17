const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });

const chatSchema = new mongoose.Schema({
  userInput: String,
  botResponse: String,
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

app.post('/api/chat', async (req, res) => {
  const { userInput, botResponse } = req.body;
  const chat = new Chat({ userInput, botResponse });
  await chat.save();
  res.status(201).send(chat);
});

app.get('/api/chat', async (req, res) => {
  const chats = await Chat.find();
  res.status(200).send(chats);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});