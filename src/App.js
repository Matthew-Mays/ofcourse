import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { Router, Redirect } from "@reach/router";
const App = () => {
  return (
    <Router>
      <Redirect noThrow from="/" to="/courses" />
      <CourseListPage path="/courses" />
      <CourseDetailPage path="/courses/:courseId"/>
    </Router>
  );
};

export default App;
