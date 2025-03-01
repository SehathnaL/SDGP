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
                socketRef.current.emit("join-room", "someRoomId", "someUserId");
            });
            socketRef.current.on('disconnect', () => console.log('Disconnected from server'));
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
        const setupLipSyncProcessor = (stream) => {
            try {
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                // Create a script processor node for real-time processing
                const processor = audioContext.createScriptProcessor(4096, 1, 1);
                source.connect(processor);
                processor.connect(audioContext.destination);
                processor.onaudioprocess = async (event) => {
                    const inputBuffer = event.inputBuffer.getChannelData(0);
                    const wavData = convertToWAV(inputBuffer);
                    const base64Audio = arrayBufferToBase64(wavData);
                    sendLipSyncFrame(base64Audio);
            };
            audioProcessorRef.current = processor;
        } catch (error) {
            console.error("Error setting up lip sync processor:", error);

        }
        };
        const sendLipSyncFrame = async (audioFrame) => {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        audio: audioFrame,
                        // Add any additional parameters required by the API
                    })
                });
                if (!response.ok) {
                    throw new Error(`Lip sync API error: ${response.status}`);
                }
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Failed to process audio frame for lip sync:', error);
                return null;
            }
        };
        // Function to update your avatar based on the lip sync data
        const updateAvatar = (lipSyncData) => {
        // Update your Avatar component state or call its methods to reflect the lip movement.
        // This is a placeholder. You should adjust this based on the structure of lipSyncData.
        console.log('Lip sync API response:', lipSyncData);
        // For example, you might update an Avatar context or call a method on the Avatar component.
        };

        const convertToWAV = (float32Array) => {
            const buffer = new ArrayBuffer(44 + float32Array.length * 2);
            const view = new DataView(buffer);
            const sampleRate = 44100;
            
            function writeString(offset, str) {
                for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
            }
            
            writeString(0, 'RIFF');
            view.setUint32(4, 36 + float32Array.length * 2, true);
            writeString(8, 'WAVE');
            writeString(12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, 1, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * 2, true);
            view.setUint16(32, 2, true);
            view.setUint16(34, 16, true);
            writeString(36, 'data');
            view.setUint32(40, float32Array.length * 2, true);

            let offset = 44;
            for (let i = 0; i < float32Array.length; i++) {
                view.setInt16(offset, float32Array[i] * 0x7FFF, true);
                offset += 2;
            }
            return buffer;
        };

        const arrayBufferToBase64 = (buffer) => {
            let binary = '';
            let bytes = new Uint8Array(buffer);
            for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        };
        
        const sendLipSyncFrame = async (base64Audio) => {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({ audio: base64Audio }),
                });

                if (!response.ok) {
                    throw new Error(`Lip sync API error: ${response.status}`);
                }

                const result = await response.json();
                updateAvatar(result);
            } catch (error) {
                console.error('Failed to process lip sync:', error);
            }
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
            {/* You can pass lip sync data as props to your Avatar component if needed */}
            {/* <Avatar lipSyncData={...} /> */} 
        </div>
        
    );


export default MeetingPage;