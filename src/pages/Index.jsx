import { useState } from "react";
import { Container, Text, VStack, Input, Button, Box } from "@chakra-ui/react";

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, botResponse: "This is a placeholder response" }),
    });

    const newChat = await response.json();
    setChatHistory([...chatHistory, newChat]);
    setUserInput("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Chat with our Bot</Text>
        <Box width="100%" maxHeight="400px" overflowY="auto" border="1px solid #ccc" p={4} borderRadius="md">
          {chatHistory.map((chat, index) => (
            <Box key={index} mb={4}>
              <Text><strong>You:</strong> {chat.userInput}</Text>
              <Text><strong>Bot:</strong> {chat.botResponse}</Text>
            </Box>
          ))}
        </Box>
        <Input
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button onClick={handleSend} colorScheme="blue">Send</Button>
      </VStack>
    </Container>
  );
};

export default Index;