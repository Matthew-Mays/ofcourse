import './Lesson.css';
import { useState, useRef, useEffect } from 'react';
import { addLesson, resetLessonError, deleteLesson } from '../actions';
import { connect } from 'react-redux';
const Lesson = ({onSubmit, className, lesson, children, saving, error, resetError, deleteLesson}) => {
    const initialValue = lesson ? lesson.name : '';
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(initialValue);
    const inputRef = useRef();

    const reset = () => {
        setTitle(initialValue);
        setEditing(false);
        resetError();
    };

    const beginEditing = () => {
        setEditing(true);
    }
    const commitEdit = e => {
        e.preventDefault()
        onSubmit(title)
            .then(reset)
            .catch(error => {
                setEditing(false);
                setEditing(true);
            })
    };
    
    const cancelEdit = e => {
        if (!saving) {
            reset();
        }
    }

    const performDelete = () => {
        deleteLesson(lesson);
    }
    useEffect(() => {
        if(editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    return editing ? (
    <form className={`${className || ''} editing`} onSubmit={commitEdit}>
        <input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            placeholder="Name the lesson"
            ref={inputRef}
            onBlur={cancelEdit}
            disabled={saving}
        />
    </form>
    ) : (
        children(beginEditing, performDelete)
    )
};

const mapState = state => ({
    saving: state.lessons.saving,
    error: state.lessons.error
});

export default connect(mapState, { addLesson, deleteLesson, resetError: resetLessonError })(Lesson);