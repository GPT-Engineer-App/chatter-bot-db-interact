const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Chat = require('./models/Chat');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  // Process the message and generate a response
  const response = generateResponse(message);

  // Save the interaction to the database
  const chat = new Chat({ message, response });
  await chat.save();

  res.json({ response });
});

function generateResponse(message) {
  // Simple example of generating a response
  if (message.toLowerCase().includes('hello')) {
    return 'Hi there! How can I help you today?';
  } else if (message.toLowerCase().includes('bye')) {
    return 'Goodbye! Have a great day!';
  } else {
    return 'I am not sure how to respond to that.';
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});