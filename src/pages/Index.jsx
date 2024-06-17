import { useState } from 'react';
import { Container, Text, VStack, Input, Button, Box } from "@chakra-ui/react";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.response);
  };
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Chat with our Bot</Text>
        <Input 
          placeholder="Type your message here..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <Button onClick={handleSubmit}>Send</Button>
        {response && (
          <Box p={4} mt={4} borderWidth={1} borderRadius="md">
            <Text>{response}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
