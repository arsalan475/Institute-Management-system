// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./index.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import MyForm from "./Pages/MyForm";

import AdminDashboard from "./Pages/adminScreens/AdmiDashboard";
import Student from "./Pages/studentScreens/StudentDashBoard";
import Login from "./Pages/Login";
import { useEffect, useRef, useState } from "react";
import UserContext from "./Config/context";
import AdminForm from "./Pages/adminScreens/CreateCourse/CreateCourseForm";
import AllStudents from "./Pages/adminScreens/All Students/AllStudents";
import AllCouses from "./Pages/adminScreens/AllCourses/AllCouses";
import Courses from "./Components/Courses";
import CourseDetail from "./Pages/adminScreens/Course deatails/CourseDetail";
import { onAuthStateChanged, auth } from "./Config/FirebaseConfig";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [user, setUser] = useState("");
  const [loading, isloading] = useState(false);
  const [links, setLinks] = useState(null);
  const [indivadualCourseEnrolledLength, setIndivadualCourseEnrolledLength] =
    useState();
  const [indivadualCourseName, setIndivadualCourseName] = useState([]);
  const [everyStudent, setEveryStudent] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [checkUser, setCheckUser] = useState(null);

  useEffect(function () {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        setCheckUser(user);
        return;
      }

      setCheckUser(null);
    });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          loading,
          isloading,
          setLinks,
          setIndivadualCourseEnrolledLength,
          indivadualCourseEnrolledLength,
          indivadualCourseName,
          setIndivadualCourseName,
          everyStudent,
          setEveryStudent,
          imageUrl,
          setImageUrl,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <MyForm
                  formName={"Admission Form"}
                  labels={["Your Name", "Email", "Father Name", "Password"]}
                  btnName={"Submit"}
                >
                  <Link to={"/login"}>
                    Already had Enrolled Just Click Here to Login In
                  </Link>
                </MyForm>
              }
            />

            <Route path="login" element={<Login />} />

            <Route
              path="student-portal"
              element={
                <ProtectedRoute user={checkUser}>
                  <AdminDashboard
                    DashboardFor={`${
                      !user.Name || !user.fatherName
                        ? ""
                        : `${`${user.Name} ${user.fatherName}`}`
                    }`}
                    // childrenComponent={<Student />}
                    Options={["Courses"]}
                  />
                </ProtectedRoute>
              }
            >
              <Route path="Courses" element={<Student />} />
              <Route path="Courses/courseDetail" element={<CourseDetail />} />
            </Route>

            <Route
              path="admin"
              element={
                <ProtectedRoute user={checkUser}>
                  <AdminDashboard
                    DashboardFor={"Admin Dashbord"}
                    // childrenComponent={<Student />}
                    Options={["Create Courses", "All Student", "all Courses"]}
                  />
                </ProtectedRoute>
              }
            >
              <Route
                path={encodeURI("CreateCourses")}
                element={<AdminForm />}
              />
              <Route path="AllStudent" element={<AllStudents />} />
              <Route path="AllCourses" element={<AllCouses />} />
              <Route
                path="allCourses/courseDetail"
                element={<CourseDetail />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
