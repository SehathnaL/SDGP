"use client"
import React, {useState, useEffect} from 'react';
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import useSpeechToText from 'react-hook-speech-to-text';
import { handleChatSession } from './chatHandler';


function RecordUserAnswer() {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1]?.transcript;
      setUserAnswer(latestResult);
    }
  }, [results]);

  const handleStopRecording = () => {
    stopSpeechToText();
    handleChatSession(userAnswer);
  };
return (
    <div>
        <footer className="flex justify-between items-center p-4 border-t border-gray-800">
        <div className="text-lg font-mono"></div>
        <div></div>
        <Button
            variant="outline"
            size="icon"
            className=" bg-amber-400 hover:bg-amber-500 border-none h-12 w-50"
            
            onClick={isRecording ? handleStopRecording : startSpeechToText}>
        
          <h2>
          <Mic className="h-6 w-6" />
          </h2>
        
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
           <Button onClick={()=>console.log(userAnswer)}>Show Answer</Button>
           
           
       

        <Button variant="ghost" size="icon" className="text-gray-400">
          <Info className="h-6 w-6" />
        </Button>
      </footer>
    </div>
  )
}

export default RecordUserAnswer;
