import React, { useContext, useEffect } from 'react';
import myContext from '../context/mycontext';
import { Link } from 'react-router-dom';
import './notecard.css';
import Chip from '../components/common/Chip/index';

const NotesCard = () => {
    const context = useContext(myContext);
    const { allNotes = [],tag, getAllNotes, loading,user,userData } = context;
  
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        }
    }, []);
    useEffect(()=>{
        userData();
    },[])


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <>
            {loading ? (
                <div>
                    <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading" />
                </div>
            ) : (
                <div className="blogItem-container">
                    {allNotes.length > 0 ? (
                        allNotes.map((item, index) => {
                            const { tag,title, description, _id } = item;
                          
                            const randomNumber = Math.floor(Math.random() * 4) + 1;
                            const imageSrc = `/assets/images/chef${randomNumber}.png`;

                            const randomNumber2 = Math.floor(Math.random() * 4) + 1;
                            const imageSrc2 = `/assets/images/food${randomNumber2}.avif`;


                           
                            return (
                                <div key={index} className='blogItem-wrap'>
                                    <Link className='blogItem-link' to={`/blog/${_id}`}>
                                        <img className='blogItem-cover' src={imageSrc2} alt='cover' />
                                        <Chip label={tag} />
                                        <h3>{title}</h3>
                                        <p className='blogItem-desc'>{description}</p>
                                        <footer>
                                            <div className='blogItem-author'>
                                                <img src={imageSrc} alt='avatar' />
                                                <div>
                                                    <h6>{user.name}</h6>
                                                    <p>{formatDate(user.createdAt)}</p>
                                                </div>
                                            </div>
                                            ➝
                                        </footer>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <p></p>
                    )}
                </div>
            )}
        </>
    );
};

export default NotesCard;
