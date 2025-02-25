    import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Avatar from "./Avatar";

const MeetingPage = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const socketRef = useRef(null);
    const API_KEY = 'YOUR_API_KEY_HERE';
    const API_URL = 'https://api.gooey.ai/lip-sync';

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
    const [captions, setCaptions] = useState('');


    useEffect(() => {
        const initializeSocket = () => {
            socketRef.current = io();

            socketRef.current.on('connect', () => {
                console.log('Connected to server');
                const roomId = 'someRoomId'; // Replace with dynamic room ID
                const userId = 'someUserId'; // Replace with dynamic user ID
                socketRef.current.emit("join-room", roomId, userId);
            });

            socketRef.current.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            socketRef.current.on("offer", async offer => {
                await peerConnection.setRemoteDescription(offer);
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socketRef.current.emit("answer", answer);
            });

            socketRef.current.on("answer", async answer => {
                await peerConnection.setRemoteDescription(answer);
            });

            socketRef.current.on("candidate", async candidate => {
                try {
                    await peerConnection.addIceCandidate(candidate);
                } catch (error) {
                    console.error("Error adding ICE candidate:", error);
                }
            });
        };

        const startMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                localVideoRef.current.srcObject = stream;
                setupWebRTC(stream);
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };

        const setupWebRTC = (stream) => {
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });
            setPeerConnection(pc)

            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            pc.ontrack = event => {
                setRemoteStream(event.streams[0]);
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            pc.onicecandidate = event => {
                if (event.candidate && socketRef.current) {
                    socketRef.current.emit("candidate", event.candidate);
                }
            };

        };

        initializeSocket();
        startMedia();

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (peerConnection) {
                peerConnection.close();
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
        }
    };

    const toggleCaptions = () => {
        if (!isCaptionsEnabled) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = true;
            recognition.lang = "en-US";
            recognition.onresult = event => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                setCaptions(transcript);
            };
            recognition.start();
            setIsCaptionsEnabled(true);
        } else {
            // Stop recognition (implementation depends on how you handle it)
            setIsCaptionsEnabled(false);
        }
    };

    const endCall = () => {
        if (peerConnection) {
            peerConnection.close();
        }
        if (socketRef.current) {
            socketRef.current.emit("leave-room");
            socketRef.current.disconnect();
        }
    };

    const startRecording = () => {
        recordedChunksRef.current = [];
        const mr = new MediaRecorder(localStream);
        mediaRecorderRef.current = mr;

        mr.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
            }
        };

        mr.onstop = () => {
            const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "meeting-recording.webm";
            a.click();
        };

        mr.start();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    return (
        <div>
            <div className="meeting-container">
                <div className="video-wrapper"> {/* Add wrapper for aspect ratio */}
                    <video ref={localVideoRef} autoPlay playsInline muted />
                </div>
                <div className="video-wrapper"> {/* Add wrapper for aspect ratio */}
                    <img src=  "./Isula_Jayagoda_i_won'_ai_avatar_it_gild_she_won't_professional_an_2f0523c4-e8ab-4652-9894-3654e419b18d.png"/>
                </div>
            </div>

            <div className="controls">
                <button onClick={toggleVideo}><i className="fa-solid fa-video"></i> Video</button>
                <button onClick={toggleAudio}><i className="fa-solid fa-microphone"></i> Mic</button>
                <button onClick={toggleCaptions}><i className="fa-solid fa-closed-captioning"></i> Captions</button>
                <button onClick={startRecording}><i className="fa-solid fa-circle"></i> Start Recording</button>
                <button onClick={stopRecording}><i className="fa-solid fa-stop"></i> Stop Recording</button>
                <button onClick={endCall}><i className="fa-solid fa-phone-slash"></i> End</button>
            </div>

            <div id="captionsContainer">{captions}</div>
            {/* /*<Avatar /> */}
        </div>
        
    );
};

export default MeetingPage;