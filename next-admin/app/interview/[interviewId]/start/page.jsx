"use client";

import Image from "next/image";
import { Mic, Info, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { chatSession } from "@/utils/GeminiAiModel";
import TestPage from "../../services/testPage";
import {
  handleInitialPrompt,
  handleChatSession,
} from "../../services/chatHandler";
import RecordUserAnswer from "../../services/recordUserAnswer";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [initialResponse, setInitialResponse] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const webcamRef = useRef(null);
  const recordUserAnswerRef = useRef(null);
  const [initialPromptSet, setInitialPromptSet] = useState(false);
  const initialPromptTriggered = useRef(false);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const unwrappedParams = await params;
        console.log("Interview ID:", unwrappedParams.interviewId);

        const interview = await GetInterviewDetails(
          unwrappedParams.interviewId
        );
        console.log("Interview:", interview);
        if (interview && !initialPromptTriggered.current) {
          console.log("Job Role:", interview.jobRole);
          console.log("Job Desc:", interview.jobDesc);
          handleInitialPrompt(interview.jobRole, interview.jobDesc);
          initialPromptTriggered.current = true; // Prevent re-triggering
        }
      } catch (error) {
        console.error("Error fetching parameters:", error);
      }
    };
    fetchParams();
  }, [params]);

  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      // console.log("Fetched Interview Data:", result);

      if (
        result[0] &&
        result[0].jsonMockResp &&
        result[0].jsonMockResp.length > 0
      ) {
        setInitialResponse(result[0]?.jsonMockResp?.[0]?.question || "");
        setInterviewData(result[0]);
        return {
          jobRole: result[0].jobRole,
          jobDesc: result[0].jobDesc,
        };
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  const handleSubmit = () => {
    handleChatSession(userInput, setUserInput);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleWebcam = useCallback(() => {
    setIsWebcamOn((prev) => !prev);
  }, []);
  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Image src="/logo-white.png" width={80} height={30} alt="logo" />
          <h1 className="text-lg font-medium">Mock Interview</h1>
        </div>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
          End interview
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Participant 1 - Coder's Gym Channel */}
          <div className="bg-[#1e1e1e] rounded-lg p-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="interviewer"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#1e1e1e] p-1 rounded-full">
                <VideoOff size={20} className="text-gray-400" />
              </div>
            </div>
            <p className="text-center">Nadia</p>
          </div>

          {/* Participant 2 - user */}
          <div className="bg-[#1e1e1e] border-2 border-amber-600 rounded-lg overflow-hidden flex flex-col">
            {isWebcamOn ? (
              /* Webcam view - fills the entire container */
              <div className="relative flex-1 w-full aspect-video">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  mirrored={true}
                  className="absolute inset-0 w-full h-full object-cover"
                  videoConstraints={{
                    facingMode: "user",
                  }}
                />
                <div
                  className="absolute bottom-4 right-4 bg-[#1e1e1e] p-1 rounded-full cursor-pointer z-10"
                  onClick={toggleWebcam}
                >
                  <Video size={20} className="text-amber-600" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-center text-white">Amika</p>
                </div>
              </div>
            ) : (
              /* Profile view - shows circular avatar */
              <div className="p-6 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-6">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/batman.jpg"
                      alt="Thasara"
                      width={128}
                      height={128}
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div
                    className="absolute bottom-0 right-0 bg-[#1e1e1e] p-1 rounded-full cursor-pointer"
                    onClick={toggleWebcam}
                  >
                    <VideoOff size={20} className="text-gray-400" />
                  </div>
                </div>
                <p className="text-center">Amika</p>
              </div>
            )}
          </div>
        </div>
        {/* Display initial response */}
        {initialResponse && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-white">
            <p>{initialResponse}</p>
          </div>
        )}
        <div className="mt-4 w-full mx-w-4xl flex">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="mt-4 w-full max-w-4xl p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
      </main>

      {/* Footer */}
      <RecordUserAnswer />
    </div>
  );
}

export default StartInterview;
