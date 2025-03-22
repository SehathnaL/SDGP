import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from "react-media-recorder";

const MeetingPage = () => {
    const navigation = useNavigate();
    const socketRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    
    // Speech-to-text states
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [transcriptionInterval, setTranscriptionInterval] = useState(null);

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true, audio: true });

    useEffect(() => {
        const initializeSocket = () => {
            socketRef.current = io();
            socketRef.current.on('connect', () => {
                console.log('Connected to server');
                socketRef.current.emit("join-room", "someRoomId", "someUserId");
            });
            socketRef.current.on('disconnect', () => console.log('Disconnected from server'));
        };

        initializeSocket();

        return () => {
            stopAllTracks();
            stopTranscription();
            
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Disconnected from server');
            }
        };
    }, []);

    useEffect(() => {
        if (isVideoOn) {
            initializeCamera();
        } else {
            stopAllTracks();
        }
    }, [isVideoOn]);
    
    const initializeCamera = async () => {
        try {
            let stream = null;
            
            if (!isVideoOn) {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: isAudioOn 
                });
            } else {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: isAudioOn 
                });
            }
            
            setLocalStream(stream);
            
            if (socketRef.current) {
                setupWebRTC(stream);
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };
    
    const setupWebRTC = (stream) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        setPeerConnection(pc);
        peerConnectionRef.current = pc;
        
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        
        pc.ontrack = event => {
            setRemoteStream(event.streams[0]);
        };
        
        pc.onicecandidate = event => {
            if (event.candidate && socketRef.current) {
                socketRef.current.emit("candidate", event.candidate);
            }
        };
    };
    
    const stopAllTracks = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
            });
            setLocalStream(null);
        }
    };
    
    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
    };

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn);
        
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.stop();
            });
        }
        
        // If audio is turned off, stop transcription
        if (isAudioOn && isTranscribing) {
            stopTranscription();
        }
    };

    const endCall = () => {
        stopAllTracks();
        stopTranscription();
        
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }
        
        if (socketRef.current) {
            socketRef.current.emit("leave-room");
            socketRef.current.disconnect();
        }
        
        navigation('/');
    };

    const handleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording(!isRecording);
    };

    const toggleFullScreenRecording = async () => { 
        if (isRecording) {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            setIsRecording(false);
        } else {
            try {
                // Capture the entire screen for recording only (not sharing)
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: { mediaSource: "screen" }, // Captures full screen
                    audio: true // Captures system audio
                });
    
                mediaRecorderRef.current = new MediaRecorder(screenStream);
                recordedChunksRef.current = [];
    
                mediaRecorderRef.current.ondataavailable = event => {
                    if (event.data.size > 0) {
                        recordedChunksRef.current.push(event.data);
                    }
                };
    
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'full-screen-recording.webm';
                    a.click();
                };
    
                mediaRecorderRef.current.start();
                setIsRecording(true);
    
                // Stop recording if the user closes the screen capture
                screenStream.getVideoTracks()[0].onended = () => {
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                        mediaRecorderRef.current.stop();
                        setIsRecording(false);
                    }
                };
            } catch (error) {
                console.error("Error starting full-screen recording:", error);
            }
        }
    };
    
    // Speech-to-text functionality
    const startTranscription = async () => {
        if (!isTranscribing && isAudioOn) {
            try {
                // Get audio stream for transcription
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // Set up audio recorder with the stream
                const audioRecorder = new MediaRecorder(audioStream);
                audioChunksRef.current = [];
                
                audioRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };
                
                audioRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    await sendAudioToWhisper(audioBlob);
                    
                    // If still transcribing, restart recording
                    if (isTranscribing) {
                        audioChunksRef.current = [];
                        audioRecorder.start(5000); // Record in 5-second chunks
                    }
                };
                
                // Start recording audio in chunks
                audioRecorder.start(5000);
                
                mediaRecorderRef.current = audioRecorder;
                setIsTranscribing(true);
                
            } catch (error) {
                console.error("Error starting transcription:", error);
                setIsTranscribing(false);
            }
        }
    };
    
    const stopTranscription = () => {
        if (isTranscribing) {
            // Stop audio recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
            
            // Reset state
            setIsTranscribing(false);
        }
    };
    
    const sendAudioToWhisper = async (audioBlob) => {
        try {
            // Create form data for the API request
            const formData = new FormData();
            formData.append('file', audioBlob);
            formData.append('model', 'whisper-1');
            
            // Set your OpenAI API key in environment variables for security
            const apiKey = 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;
            
            // Send the audio to OpenAI Whisper API
            const response = await fetch(
                'https://api.openai.com/v1/audio/transcriptions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    },
                    body: formData
                }
            );
            
            const data = await response.json();
            console.log("Transcription result:", data);
            
            // Process the transcription result
            if (data && data.text) {
                const newText = data.text.trim();
                if (newText) {
                    setTranscript(prev => prev + ' ' + newText);
                    
                    // Optionally send transcript to server via socket
                    if (socketRef.current) {
                        socketRef.current.emit("transcript-update", newText);
                    }
                }
            }
        } catch (error) {
            console.error("Error with Whisper API:", error);
        }
    };
    
    // Toggle transcription with a single button
    const toggleTranscription = () => {
        if (isTranscribing) {
            stopTranscription();
        } else {
            startTranscription();
        }
    };

    return (
        <div className='meeting-container'>
            <div className="video-wrapper"> 
                {isVideoOn ? (
                    <Webcam 
                        ref={webcamRef} 
                        audio={isAudioOn} 
                        muted={true} // Always mute the local preview to prevent feedback
                        style={{ width: '100%' }}
                    />
                ) : (
                    <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        backgroundColor: '#333', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'white'
                    }}>
                        Camera Off
                    </div>
                )}
            </div>
            <div className="video-wrapper">
                <img src="./avatar-meeting.png" alt="Avatar"/>
            </div>
            
            {transcript && (
                <div className="transcript-container" style={{
                    padding: '10px',
                    margin: '10px 0',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                    maxHeight: '100px',
                    overflowY: 'auto'
                }}>
                    <h3>Transcript:</h3>
                    <p>{transcript}</p>
                </div>
            )}
                        
            <div className="controls">
                <button onClick={toggleVideo} style={{ backgroundColor: isVideoOn ? '#c49168' : 'black' }} > 
                    <i className={`fa-solid ${isVideoOn ? "fa-video" : "fa-video-slash"}`}></i> {isVideoOn ? " Turn Off Video" : " Turn On Video"} 
                </button>
                <button 
                    onClick={toggleAudio} 
                    style={{ backgroundColor: isAudioOn ? '#c49168' : 'black' }}
                >
                    <i className={`fa-solid ${isAudioOn ? "fa-microphone" : "fa-microphone-slash"}`}></i> 
                    {isAudioOn ? " Mute Mic" : " Unmute Mic"}
                </button>
                <button onClick={toggleFullScreenRecording} style={{ backgroundColor: isRecording ? 'black' : '#c49168' }}>
                    <i className="fa-solid fa-circle"></i> {isRecording ? " Stop Recording" : " Start Recording"}
                </button>
                <button 
                    onClick={toggleTranscription}
                    style={{ backgroundColor: isTranscribing ? 'black' : '#c49168' }}
                    disabled={!isAudioOn}
                >
                    <i className={`fa-solid ${isTranscribing ? "fa-stop" : "fa-microphone-lines"}`}></i> 
                    {isTranscribing ? " Stop Transcribing" : " Transcribe"}
                </button>
                <button 
                    onClick={endCall} 
                    style={{ backgroundColor: '#c49168' }}
                >
                    <i className="fa-solid fa-phone-slash"></i> End
                </button>
            </div>
        </div>
    );
};

export default MeetingPage;