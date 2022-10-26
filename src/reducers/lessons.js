import produce from 'immer';
import {
  ADD_LESSON_SUCCESS,
  ADD_LESSON_BEGIN,
  ADD_LESSON_ERROR,
  LOAD_LESSONS_BEGIN,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_ERROR,
  RESET_LESSON_ERROR,
  SAVE_LESSON_SUCCESS,
  SAVE_LESSON_BEGIN,
  SAVE_LESSON_ERROR,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_BEGIN,
  DELETE_LESSON_ERROR,
  SET_LESSON_MARKDOWN
} from '../actions';

const initialState = {
  lessons: {},
  loading: false,
  error: null
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_LESSON_BEGIN:
    case SAVE_LESSON_BEGIN:
    case DELETE_LESSON_BEGIN:
      draft.loading = true;
      draft.error = null;
      return;
    case ADD_LESSON_ERROR:
    case SAVE_LESSON_ERROR:
    case DELETE_LESSON_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return;
    case ADD_LESSON_SUCCESS:
    case SAVE_LESSON_SUCCESS:
      draft.loading = false;
      draft.lessons[action.payload.id] = action.payload;
      return;
    case LOAD_LESSONS_BEGIN:
        draft.loading = true;
        draft.error = null;
        return;
    case LOAD_LESSONS_SUCCESS:
        draft.loading = false;
        action.payload.forEach(lesson => {
            draft.lessons[lesson.id] = lesson
        })
        return;
    case LOAD_LESSONS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        return;
    case RESET_LESSON_ERROR:
      draft.error = null;
      return;
    case DELETE_LESSON_SUCCESS:
        draft.loading = false;
        delete draft.lessons[action.payload.id];
        return;
    case SET_LESSON_MARKDOWN:
        draft.lessons[action.payload.lesson.id].markdown = action.payload.markdown;
        return;
    default:
      return;
  }
}, initialState);

export default reducer;