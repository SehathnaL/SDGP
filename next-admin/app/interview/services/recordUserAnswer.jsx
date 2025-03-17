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

// "use client";
// import React, { useState, useRef } from "react";
// import { Info, Mic } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function RecordUserAnswer() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [userAnswer, setUserAnswer] = useState("");
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   // Function to start recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//         await sendToWhisper(audioBlob);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   // Function to stop recording
//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // Function to send audio to OpenAI Whisper API
//   const sendToWhisper = async (audioBlob) => {
//     const formData = new FormData();
//     formData.append("file", audioBlob, "audio.wav");
//     formData.append("model", "whisper-1");

//     try {
//       const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
//         method: "POST",
//         headers: {
//           Authorization: `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`, 
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.text) {
//         setUserAnswer(data.text);
//       }
//     } catch (error) {
//       console.error("Error sending audio to Whisper:", error);
//     }
//   };

//   return (
//     <div>
//       <footer className="flex justify-between items-center p-4 border-t border-gray-800">
//         <Button
//           variant="outline"
//           size="icon"
//           className="bg-amber-400 hover:bg-amber-500 border-none h-12 w-50"
//           onClick={isRecording ? stopRecording : startRecording}
//         >
//           <Mic className="h-6 w-6" />
//           {isRecording ? "Stop Recording" : "Start Recording"}
//         </Button>

//         <Button onClick={() => console.log(userAnswer)}>Show Answer</Button>

//         <Button variant="ghost" size="icon" className="text-gray-400">
//           <Info className="h-6 w-6" />
//         </Button>
//       </footer>
//     </div>
//   );
// }

// export default RecordUserAnswer;