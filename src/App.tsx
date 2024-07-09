import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import Login from "@/feature/auth/Login";
import Countries from "@/feature/country/Countries";
import Layout from "@/components/Layout";
// import Register from './components/Register';
// import PasswordReset from './components/PasswordReset';
// import Profile from './components/Profile';
// import Dashboard from './components/Dashboard';
// import Education from './components/Education';
// import WorkExperience from './components/WorkExperience';
// import Skills from './components/Skills';
// import Certifications from './components/Certifications';
// import Projects from './components/Projects';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              element={
                <Layout>
                  <PrivateRoute />
                </Layout>
              }
            >
              <Route path="/countries" element={<Countries />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/*"
                element={
                  <Layout>
                    <Routes>
                      <Route path="/countries" element={<Countries />} />
                      {/* 他のルートをここに追加 */}
                    </Routes>
                  </Layout>
                }
              />
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
    </QueryClientProvider>
  );
}

export default App;
