import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Countries from "./components/Countries";
// import Register from './components/Register';
// import PasswordReset from './components/PasswordReset';
// import Profile from './components/Profile';
// import Dashboard from './components/Dashboard';
// import Education from './components/Education';
// import WorkExperience from './components/WorkExperience';
// import Skills from './components/Skills';
// import Certifications from './components/Certifications';
// import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/education">Education</Link>
            </li>
            <li>
              <Link to="/work-experience">Work Experience</Link>
            </li>
            <li>
              <Link to="/skills">Skills</Link>
            </li>
            <li>
              <Link to="/certifications">Certifications</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/countries" element={<Countries />} />
          </Route>
          {/* <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/education" element={<PrivateRoute component={Education} />} />
          <Route path="/work-experience" element={<PrivateRoute component={WorkExperience} />} />
          <Route path="/skills" element={<PrivateRoute component={Skills} />} />
          <Route path="/certifications" element={<PrivateRoute component={Certifications} />} />
          <Route path="/projects" element={<PrivateRoute component={Projects} />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
