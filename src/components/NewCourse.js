import { useState, useRef, useEffect } from "react";
import { addCourse } from "../actions";
import { connect } from "react-redux";
import "./NewCourse.css";

const NewCourse = ({ dispatch, saveInProgress, saveError }) => {
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let fixedPrice = parseFloat(coursePrice);
    fixedPrice = fixedPrice.toFixed(2);
    dispatch(addCourse(courseName, fixedPrice));
  };

  return (
    <div className="NewCourse">
      <h1>Create Your First Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Pick a name:
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            disabled={saveInProgress}
            ref={inputRef}
          />
          <input
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            disabled={saveInProgress}
          />
          {saveError && (
            <div className="saveError-message">Error: {saveError.message}</div>
          )}
        </label>
        <button type="submit" disabled={saveInProgress}>
          Create Course
        </button>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  saveInProgress: state.saveInProgress,
  saveError: state.saveError,
});

export default connect(mapState)(NewCourse);
