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
    
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [localStream, setLocalStream] = useState(null);
        const mediaRecorderRef = useRef(null);
    

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
            let stream=null
            if(isVideoOn){
                console.log("INISDE ON")
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: isAudioOn 
                });
            }
            else{
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
        console.log(!isVideoOn)
        setIsVideoOn(!isVideoOn);
    };

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn);
        
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.stop()
            });
        }
    };

    const endCall = () => {
        stopAllTracks();
        
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }
        
        if (socketRef.current) {
            socketRef.current.emit("leave-room");
            socketRef.current.disconnect();
        }
        
        navigation('/');
    };

    const handleRecording = async () => {
        if (isRecording) {
            // Stop recording
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            setIsRecording(false);
        } else {
            try {
                let stream;
                
                // If a video call is active, record the local stream
                if (localStream) {
                    stream = localStream;
                } else {
                    // Otherwise, capture the full screen
                    stream = await navigator.mediaDevices.getDisplayMedia({
                        video: { mediaSource: "screen" },
                        audio: true 
                    });
                }
    
                mediaRecorderRef.current = new MediaRecorder(stream);
                recordedChunksRef.current = [];
    
                mediaRecorderRef.current.ondataavailable = event => {
                    if (event.data.size > 0) {
                        recordedChunksRef.current.push(event.data);
                    }
                };
    
                mediaRecorderRef.current.onstop = () => {
                    if (recordedChunksRef.current.length > 0) {
                        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "recording.webm";
                        a.click();
                    }
                };
    
                mediaRecorderRef.current.start();
                setIsRecording(true);
    
                // Stop recording if the screen capture is stopped
                stream.getVideoTracks()[0].onended = () => {
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                        mediaRecorderRef.current.stop();
                        setIsRecording(false);
                    }
                };
            } catch (error) {
                console.error("Error starting recording:", error);
            }
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

                </div>
            )}
            </div>
                   <div className="video-wrapper">
                    <img src="./avatar-meeting.png" alt="Avatar"/>
                </div>
                        
            <div className="controls">
                <button onClick={toggleVideo} style={{ backgroundColor: isVideoOn ? '#c49168' : 'black' }} > <i className={`fa-solid ${isVideoOn ? "fa-video" : "fa-video-slash"}`}></i> {isVideoOn ? " Turn Off Video" : " Turn On Video"} </button>
                <button 
                    onClick={toggleAudio} 
                    style={{ backgroundColor: isAudioOn ? '#c49168' : 'black' }}
                >
                    <i className={`fa-solid ${isAudioOn ? "fa-microphone" : "fa-microphone-slash"}`}></i> 
                    {isAudioOn ? " Mute Mic" : " Unmute Mic"}
                </button>
                <button onClick={handleRecording} style={{ backgroundColor: isRecording ? 'black' : '#c49168' }}>
                  <i className="fa-solid fa-circle"></i> {isRecording ? " Stop Recording" : " Start Recording"}
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