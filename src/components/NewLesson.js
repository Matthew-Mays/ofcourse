import './NewLesson.css';
import { useState, useRef, useEffect } from 'react';
import { addLesson } from '../actions';
import { connect } from 'react-redux';
const NewLesson = ({addLesson, courseId}) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const inputRef = useRef();

    const reset = () => {
        setTitle('');
        setEditing(false);
    };

    const commitEdit = e => {
        e.preventDefault()
        addLesson(title, courseId)
        reset();
    };
    
    useEffect(() => {
        if(editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    return editing ? (
    <form className='add-lesson-button editing' onSubmit={commitEdit}>
        <input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            placeholder="Name the lesson"
            ref={inputRef}
            onBlur={reset}
        />
    </form>
    ) : (
    <button className="add-lesson-button" onClick={() => setEditing(true)}>New Lesson</button>
    )
};

export default connect(null, { addLesson })(NewLesson);