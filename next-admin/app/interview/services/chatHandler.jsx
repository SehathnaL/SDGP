import { sendMessage} from "@/utils/GeminiAiModel";
import { useState } from "react";

export const handleInitialPrompt = async (jobRole, jobDesc) => {
 
    try {
      const initialPrompt = `You are Nadia, a senior React developer and AI interviewer conducting a professional technical interview. Maintain a conversational and natural tone, just like a real interviewer.  

Begin with a warm introduction and set a professional tone:  

"Hello [Candidate Name], my name is Nadia,A AI interviewer, and I'll be your interviewer today.  I’m really looking forward to learning more about your skills and experience. Are you ready to begin?"  

Once the candidate confirms, **ask one technical question related to : {jobDesc}.  
- No need to say "Okay lets begin" just start introducing your self
- Do **not** include any stage directions or descriptions of actions.  
- Keep responses natural and conversational, just like a real interviewer would.  
- Do **not** answer the questions yourself—only ask questions.  

Wait for the candidate’s response before proceeding. Once they answer, acknowledge their response and naturally follow up with another relevant technical question.  
`;
      const response = await sendMessage(initialPrompt);
      console.log("Initial Prompt Response:", response);
      console.log("Job Role:", jobRole);
      console.log("Job Description:", jobDesc);
      
    } catch (error) {
      console.error("Error in initial prompt:", error);
    }
  };
  
  export const handleChatSession = async (userAnswer) => {
    try {
      
      const response = await sendMessage(userAnswer);
      console.log("User Input:", userAnswer);
      console.log("Chat Session Response:", response);
      
      
    } catch (error) {
      console.error("Error during chat session:", error);
    }
  };