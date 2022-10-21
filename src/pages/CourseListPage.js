import React, { useState } from "react";
import { connect } from "react-redux";
import "./CourseListPage.css";
import Modal from "react-modal";
import NewCourse from "../components/NewCourse";
import { closeNewCourseModal, openNewCourseModal } from "../actions";
import { Link } from "@reach/router";

const CourseListPage = ({
  courses,
  coursesLoading,
  coursesError,
  isModalOpen,
  openNewCourseModal,
  closeNewCourseModal,
}) => {
  if (coursesLoading) {
    return <div></div>;
  }

  if (coursesError) {
    return <div>{coursesError.message}</div>;
  }
  return courses.length === 0 ? (
    <div className="CreateCourse">
      <NewCourse />
    </div>
  ) : (
    <div className="CourseList">
      <h1>Your Courses</h1>
      <button className="new-course-btn" onClick={openNewCourseModal}>
        New Course
      </button>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <div className="title">{course.name}</div>
              <div className="price">${course.price}</div>
            </Link>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}>
        <NewCourse />
      </Modal>
    </div>
  );
};

const mapState = (state) => ({
  courses: state.courses.courses,
  coursesLoading: state.courses.coursesLoading,
  coursesError: state.courses.coursesError,
  isModalOpen: state.courses.newCourseModalOpen,
});

const mapDispatch = {
  openNewCourseModal,
  closeNewCourseModal,
};

export default connect(mapState, mapDispatch)(CourseListPage);
