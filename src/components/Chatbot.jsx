import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Container } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box width="100%" height="60vh" overflowY="auto" border="1px solid #ccc" borderRadius="md" p={4}>
          {messages.map((msg, index) => (
            <HStack key={index} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
              <Box bg={msg.sender === 'user' ? 'blue.500' : 'gray.300'} color={msg.sender === 'user' ? 'white' : 'black'} p={3} borderRadius="md">
                <Text>{msg.text}</Text>
              </Box>
            </HStack>
          ))}
        </Box>
        <HStack width="100%">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button onClick={handleSend} colorScheme="blue" rightIcon={<FaPaperPlane />}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Chatbot;