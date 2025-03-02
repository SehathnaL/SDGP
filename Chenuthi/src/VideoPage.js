import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './VideoPage.css'; // Ensure you have your CSS file for styles

const VideoPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const video = document.getElementById("myVideo");

        const attemptPlay = () => {
            video
                .play()
                .then(() => {
                    console.log("Video playback started successfully.");
                })
                .catch((error) => {
                    console.error("Autoplay failed:", error);
                    video.muted = true; // Mute the video and try again
                    video
                        .play()
                        .then(() => {
                            console.log("Video started playing with muted audio.");
                        })
                        .catch((err) => console.error("Video failed to play:", err));
                });
        };

        // Ensure autoplay tries only after the video is ready
        if (video.readyState >= 3) {
            attemptPlay();
        } else {
            video.addEventListener("canplay", attemptPlay);
        }

        return () => {
            video.removeEventListener("canplay", attemptPlay);
        };
    }, []);

    const handleJoinNowClick = () => {
        navigate('/service-choice'); // Navigate to ServiceChoicePage
    };

    return (
        <div>
            <p id='id1'>Your Session With<br /> <b>Mr.Will</b> is ready<br /><span id="span1">Good Luck!</span></p>
            <button className="button" onClick={handleJoinNowClick}>Join Now</button>
            <video id="myVideo" autoPlay loop muted>
                <source src={`./Images/Nico Wren - Avatar Demo.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPage;
