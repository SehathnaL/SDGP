import React, { forwardRef } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";


const RecordUserAnswer = forwardRef(({ setUserInput }, ref) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button
        variant="outline"
        size="icon"
        className="rounded-full bg-amber-400 hover:bg-amber-500 border-none h-12 w-12"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}

        <Mic className="h-6 w-6" />
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
});

export default RecordUserAnswer;
