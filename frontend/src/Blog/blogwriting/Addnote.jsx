import React, { useContext } from 'react';
import myContext from '../context/mycontext';
import { useNavigate } from 'react-router-dom';
import './addnote.css';  // Import the CSS file

const Addnote = ({handlePopupToggle,isPopupVisible}) => {
    const context = useContext(myContext);
    const { tag, setTag, title, setTitle, description, setDescription, addNote } = context;
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (title && tag && description) {
            addNote();
            navigate('/blog');
        } else {
            alert('Please fill in all fields before submitting.');
        }
        handlePopupToggle(!isPopupVisible);
    };

    return (
        <div className="addnote-container">
            <h2 className="addnote-heading"> Blogs</h2>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                placeholder="Title"
                className="addnote-input"
            />
            <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                type="text"
                name="tag"
                placeholder="Tag"
                className="addnote-input"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
                placeholder="Description"
                className="addnote-textarea"
            />
            <button
                onClick={handleSubmit}
                className="addnote-button"
            >
                Add Blog
            </button>
        </div>
    );
};

export default Addnote;
