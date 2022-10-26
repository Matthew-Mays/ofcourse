import {setLessonMarkdown} from '../actions';
import { connect } from 'react-redux';
const LessonEditor = ({ lesson, setLessonMarkdown }) => (
    <>
    <div className="lesson-editor-help">
        <p>
            You are editing this lesson. Changes are saved automatically.
        </p>
    </div>
    <textarea
        className="lesson-editor"
        value={lesson.markdown || ''}
        onChange={e => setLessonMarkdown(lesson, e.target.value)}
    />
    </>
);

export default connect(null, {setLessonMarkdown})(LessonEditor);