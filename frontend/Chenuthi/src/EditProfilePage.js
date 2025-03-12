import React from 'react';
import './EditProfilePage.css'; // Create a separate CSS file for styles

const EditProfilePage = () => {
    return (
        <div className="edit-container">
            <Navigation/>
            <h1 id='h1'>Edit Profile</h1>
            <form action="#" method="post">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" defaultValue="Jane Doe" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue="jane.doe@example.com" />

                <label htmlFor="education">Education</label>
                <input type="text" id="education" name="education" defaultValue="Informatics Institute Of Technology" />

                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" defaultValue="+123-456-7890" />

                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" defaultValue="New York, USA" />

                <label htmlFor="skills">Skills</label>
                <textarea id="skills" name="skills">JavaScript, Python, HTML/CSS, React</textarea>

                <button type="submit">Save Changes</button>
            </form>
            <Footer/>
        </div>
    );
};

export default EditProfilePage;