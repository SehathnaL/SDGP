import { sendMessage} from "@/utils/GeminiAiModel";
import { useState } from "react";

export const handleInitialPrompt = async (jobRole, jobDesc) => {
 
    try {
      const initialPrompt = `You are a professional interviewer called Nadia, a Women 
       conducting a job interview. 
      Greet the candidate warmly and begin the conversation. Start by introducing yourself 
      and maintain a professional yet friendly tone throughout the session. And ask user can we start the conversation.
      And ask 1 question on this topic ${jobDesc}. Only after the user input. And when you are done with the interview, say "Goodbye" and end the conversation.`;
      const response = await sendMessage(initialPrompt);
      console.log("Initial Prompt Response:", response);
      console.log("Job Role:", jobRole);
      console.log("Job Description:", jobDesc);
      
    } catch (error) {
      console.error("Error in initial prompt:", error);
    }
  };
  
  export const handleChatSession = async (userInput, setUserInput) => {
    try {
      
      const response = await sendMessage(userInput);
      console.log("User Input:", userInput);
      console.log("Chat Session Response:", response);
      
      setUserInput("");
    } catch (error) {
      console.error("Error during chat session:", error);
    }
  };