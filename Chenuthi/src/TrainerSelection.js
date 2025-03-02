import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerSelection.css";

const TrainerCard = ({ trainer, onViewClick }) => {
    return (
        <fieldset id="fieldset1">
            <div className="trainer-card-content">
                <img src={trainer.imgSrc} alt={trainer.name} className="trainer-images" />
                <h3>{trainer.name}</h3>
                <p>{trainer.title}</p>
                <p>Price: ${trainer.price}</p>
                <button
                    className="view-button"
                    onClick={() => onViewClick(trainer)}
                >
                    Proceed To Pay
                </button>
            </div>
        </fieldset>
    );
};

const TrainerModal = ({ trainerDetails, isOpen, onClose, proceedToCheckout, generateStars }) => {
    if (!isOpen) return null;

    return (
        <div className="overlay active" onClick={onClose}>
            <div className="modal active" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <span id="trainer-name">
                        {trainerDetails.name}{" "}
                        <span className="rating-stars" style={{ marginLeft: "20px" }}>
                            {generateStars(trainerDetails.rating)} {trainerDetails.rating}
                        </span>
                    </span>
                    <button className="close-button" onClick={onClose}>
                        ✖
                    </button>
                </div>
                <div className="modal-body">
                    <img
                        src={trainerDetails.imgSrc}
                        alt={trainerDetails.name}
                        className="trainer-modal-image"
                    />
                    <div className="details-container">
                        <p>{trainerDetails.description}</p>
                        <p id="info"><strong>Title:</strong> {trainerDetails.title}</p>
                        <p id="info"><strong>Company:</strong> {trainerDetails.company}</p>
                        <p id="info"><strong>Experience:</strong> {trainerDetails.experience}</p>
                        <p id="info"><strong>Price:</strong> ${trainerDetails.price}</p>
                    </div>
                </div>
                <button className="modal-button" onClick={proceedToCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

const TrainerSelection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const navigate = useNavigate();

    const trainers = [
        {
            name: "James Carter",
            title: "Senior Hiring Manager",
            company: "ABC Corp",
            experience: "10 years",
            rating: 4.8,
            price: 150, // Added price
            imgSrc: "./Images/Trainer1.png",
            description:
                "James Carter is an experienced hiring manager with expertise in identifying talent and coaching candidates to excel in interviews. He has a proven track record of helping professionals secure their dream jobs.",
        },
        {
            name: "Michael Reed",
            title: "Leadership Coach",
            company: "XYZ Ltd",
            experience: "8 years",
            rating: 4.7,
            price: 120, // Added price
            imgSrc: "./Images/Trainer2.png",
            description:
                "Michael Reed specializes in leadership development and career growth. With years of experience coaching executives, he brings insights that are invaluable to career progression.",
        },
        {
            name: "Sophia Taylor",
            title: "Interview Strategist",
            company: "NextStep Careers",
            experience: "13 years",
            rating: 4.9,
            price: 200, // Added price
            imgSrc: "./Images/Trainer5.jpeg",
            description:
                "Sophia Taylor specializes in creating effective interview strategies tailored to individual strengths. With over a decade of experience, she has helped numerous candidates secure their dream roles.",
        },
        {
            name: "Emily Davis",
            title: "Behavioral Interview Coach",
            company: "CareerAscend",
            experience: "10 years",
            rating: 4.8,
            price: 180, // Added price
            imgSrc: "./Images/Trainer6.jpeg",
            description:
                "Emily Davis is an expert in behavioral interview techniques. She helps candidates master the STAR method and other frameworks to excel in competency-based interviews.",
        },
        {
            name: "William Harris",
            title: "Recruitment Expert",
            company: "Elite Recruiters",
            experience: " 9 years",
            rating: 4.9,
            price: 160, // Added price
            imgSrc: "./Images/Trainer3.png",
            description:
                "William Harris is a recruitment expert who has worked with top-tier companies to scout and develop talent. His sessions provide a comprehensive understanding of the hiring process.",
        },
        {
            name: "Ethan Blake",
            title: "Soft Skills Trainer",
            company: "SkillsPro",
            experience: "7 years",
            rating: 4.5,
            price: 140, // Added price
            imgSrc: "./Images/Trainer4.png",
            description:
                "Ethan Blake focuses on enhancing interpersonal and communication skills, ensuring candidates present themselves effectively during interviews and in the workplace.",
        },
        {
            name: "Olivia Brown",
            title: "Team Management Coach",
            company: "TeamWorks",
            experience: "11 years",
            rating: 4.7,
            price: 170, // Added price
            imgSrc: "./Images/Trainer7.jpeg",
            description:
                "Olivia Brown brings years of experience in team management and organizational leadership. She helps candidates master collaborative and leadership skills to stand out.",
        },
        {
            name: "Isabella Clark",
            title: "Public Speaking Coach",
            company: "SpeakEasy",
            experience: "15 years",
            rating: 4.8,
            price: 190, // Added price
            imgSrc: "./Images/Trainer8.jpeg",
            description:
                "Isabella Clark is an accomplished public speaking coach who empowers candidates to communicate with confidence and clarity in interviews and presentations.",
        },
    ];

    const openModal = (trainer) => {
        setSelectedTrainer(trainer);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTrainer(null);
    };

    const proceedToCheckout = () => {
        if (selectedTrainer) {
            navigate('/payment', { state: { trainer: selectedTrainer } });
        }
    };

    const generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        let stars = "";
        for (let i = 0; i < fullStars; i++) {
            stars += "★"; // Full star
        }
        if (halfStar) {
            stars += "☆"; // Half star
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += "☆"; // Empty star
        }
        return stars;
    };

    return (
        
        <div>
            
            <h1>
                Select <span>Your</span> Trainer ...
            </h1>
                <div className="trainer-container1">
                {trainers.map((trainer, index) => (
                    <TrainerCard key={index} trainer={trainer} onViewClick={openModal} />
                ))}</div>
            

            <TrainerModal
                trainerDetails={selectedTrainer}
                isOpen={modalOpen}
                onClose={closeModal}
                proceedToCheckout={proceedToCheckout}
                generateStars={generateStars}
            />
        </div>
    );
};

export default TrainerSelection;
