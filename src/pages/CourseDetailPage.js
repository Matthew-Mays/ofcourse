import React, { useEffect } from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import Loading from "../components/Loading";
import Lesson from "../components/Lesson";
import { getLessonsByCourse, getCourseById } from "../selectors";
import { loadLessons, addLesson, saveLesson, togglePreviewMode } from "../actions";
import "./CourseDetailPage.css";
import { Link, Match } from "@reach/router";

const CourseDetailPage = ({
  course,
  lessons,
  loading,
  loadLessons,
  addLesson,
  saveLesson,
  children,
  previewMode,
  togglePreviewMode
}) => {
  useEffect(() => {
    if (course) {
      loadLessons(course.id);
    }
  }, [course]);

  if (loading) {
    return <Loading />;
  }
  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name}</h1>
        <button className="preview-btn" onClick={togglePreviewMode}>
          {previewMode ? "Edit" : "Preview"}
        </button>
      </header>
      <div className="content">
        <div className="sidebar">
          {lessons.length > 0 && (
            <ul className="lessons">
              {lessons.map((lesson) => (
                <Match key={lesson.id} path={`lessons/${lesson.id}`}>
                  {({ match }) => {
                    const className = `lesson-item ${match ? "selected" : ""}`;
                    return (
                      <li>
                        <Lesson
                          className={className}
                          lesson={lesson}
                          onSubmit={(name) =>
                            saveLesson({
                              ...lesson,
                              name,
                            })
                          }
                        >
                          {(edit, remove) => (
                            <div className={className}>
                              <Link to={`lessons/${lesson.id}`}>
                                {lesson.name}
                              </Link>
                              <button
                                className="edit-lesson-btn"
                                onClick={() => edit(lesson.name)}
                              >
                                Edit
                              </button>
                              <button
                                onClick={remove}
                                className="delete-lesson-btn"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Lesson>
                      </li>
                    );
                  }}
                </Match>
              ))}
            </ul>
          )}
          <Lesson
            className="add-lesson-button"
            onSubmit={(title) => addLesson(title, course.id)}
          >
            {(edit) => (
              <button className="add-lesson-button" onClick={edit}>
                New Lesson
              </button>
            )}
          </Lesson>
        </div>
        <div className="lesson">{children}</div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    previewMode: state.app.previewMode,
    loading: state.courses.coursesLoading,
    lessons: getLessonsByCourse(state, ownProps),
    course: getCourseById(state, ownProps),
  };
};
export default connect(mapState, { loadLessons, addLesson, saveLesson, togglePreviewMode })(
  CourseDetailPage
);
