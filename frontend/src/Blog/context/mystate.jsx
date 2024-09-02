import { useState } from "react";
import MyContext from "./mycontext";

const MyState = (props) => {
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');

    const [user,setuser]=useState([]);

    const addNote = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/addblog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            const addNoteData = await res.json();  //convert response to json

            if (res.status === 401 || addNoteData.error) {
                console.log("Authentication failed: ", addNoteData.error || "Invalid token");
                alert("Authentication failed. Please log in again.");
                return;
            }

            getAllNotes();
            alert("Note added successfully");

            setTag("");
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding note: ", error);
            alert("An error occurred. Please try again.");
        }
    }
    const getAllNotes = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/fetchallblog`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
    
            const noteData = await res.json();  //convert response to json
            if (res.ok) {
                setAllNotes(noteData);
            } else {
                console.error("Error fetching notes:", noteData.error);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    }
    
    const deletenote=async(id)=>{
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/deleteblog/${id}`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            const noteData = await res.json(); //convert response to json

           
            getAllNotes();
            console.log(noteData);
            alert("Note deleted successfully");
        }catch(error){
            console.log("delete note error",error);
        }
    }


    const editNote = async (id, updatedNote) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(updatedNote)  // Send the updated note data
            });
    
            const noteData = await res.json(); // Convert response to JSON
    
            if (res.ok) {
                getAllNotes();  // Refresh notes list
                alert("Note updated successfully");
            } else {
                console.error("Error updating note:", noteData.error);
                alert("Error updating note");
            }
        } catch (error) {
            console.error("Update note error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    const userData=async()=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/getuser`,{
            method:'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
        });
        const userdata=await response.json();
        setuser(userdata);
    }


  
    return (
        <MyContext.Provider value={{
            allNotes,
            getAllNotes,
            loading,
            tag,
            setTag,
            title,
            setTitle,
            description,
            setDescription,
            addNote,
            deletenote,
            editNote,
            user,
            setuser,
            userData
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

export default MyState;
