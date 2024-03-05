import { useContext, useEffect, useRef, useState } from "react";
import spinner from "/Fidget-spinner.gif";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Myform.module.css";

// importing firbase auth and createUser with firebase config file

import {
  auth,
  createUser,
  db,
  collection,
  addDoc,
  query,
  getDocs,
  where,
} from "../Config/FirebaseConfig";
import Uploader from "../Components/Uploader";
import UserContext from "../Config/context";
import SavingBtn from "../Components/SavingBtn";

export default function MyForm({ formName, labels, btnName, children }) {
  const navigate = useNavigate();
  const { imageUrl, isloading, loading } = useContext(UserContext);
  const [mainLoading, setMainLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // geting form values
  const city = useRef();
  const course = useRef();
  const studentName = useRef();
  const studentFatherName = useRef();
  const studentEmail = useRef();
  const studentPassword = useRef();
  const [list, setList] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [email, getEmail] = useState("");

  useEffect(function () {
    setMainLoading(true);
    async function getCourseList() {
      // getEmail(studentEmail.current.querySelector("input"));
      let array = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Admin"));
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
          setList(array);
          setMainLoading(false);
        });
      } catch (error) {
        setMainLoading(false);
        alert(
          "Sorry we are not able to generate courses please check you internet connection"
        );
      }
    }

    getCourseList();
  }, []);

  async function handleAddmission(e) {
    e.preventDefault();
    setSubmitLoading(true);
    const Name = studentName.current.querySelector("input").value;
    const fatherName = studentFatherName.current.querySelector("input").value;
    const email = studentEmail.current.querySelector("input").value;
    const Password = studentPassword.current.querySelector("input").value;
    const cityName = city.current.value;
    const courseName = course.current.value;

    if (!Name || !fatherName || !email || !Password || !cityName || !courseName)
      return;

    createUser(auth, email, Password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        let courseInfo = [];

        const q = query(
          collection(db, "Admin"),
          where("Course", "==", courseName)
        );
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              courseInfo.push(doc.data());
              setCourseData(courseInfo);
            });

            addDoc(collection(db, "users"), {
              courseName,
              Name,
              fatherName,
              cityName,
              teacher: courseInfo[0]?.Teacher,
              day: courseInfo[0]?.Day,
              Lev: courseInfo[0]?.Lev,
              uid: user.uid,
              date: new Date().toDateString(),
              url: imageUrl,
              rollNumber: new Date().getMilliseconds() + 1000,
            })
              .then((docref) => {
                navigate("/student-portal/Courses");
                console.log("document written with id ", docref.id);

                setSubmitLoading(false);
              })
              .catch((e) => {
                setSubmitLoading(false);
                alert("Error adding document: ", e);
              });
          })
          .catch((e) => console.log(e.message));
        setSubmitLoading(false);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSubmitLoading(false);
        console.log(errorMessage);
        // ..
      });
  }

  return (
    <>
      {mainLoading ? (
        <div
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={spinner} />
        </div>
      ) : (
        <form
          onSubmit={handleAddmission}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "1rem 0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
          }}
        >
          <h1 className={styles.formHeading}>{formName}</h1>
          <div className={styles.fieldContainer}>
            {/* {fieldComponent1} */}
            <div className={styles.textFilledResponsive}>
              <select ref={city} style={{ width: "100%", height: "3.4rem" }}>
                <option>Select City</option>
                <option>Karachi</option>
                <option>Lahore</option>
              </select>
            </div>

            <div className={styles.textFilledResponsive}>
              <select ref={course} style={{ width: "100%", height: "3.4rem" }}>
                <option>Select Course</option>
                {list.map((el, i) => (
                  <option key={i}>{el.Course}</option>
                ))}
              </select>
            </div>
            <TextField
              id="outlined-basic1"
              label={labels[0]}
              variant="outlined"
              ref={studentName}
              className={styles.textFilledResponsive}
            />

            <TextField
              id="outlined-basic2"
              label={labels[2]}
              variant="outlined"
              ref={studentFatherName}
              className={styles.textFilledResponsive}
            />

            <TextField
              id="outlined-basic3"
              label={labels[1]}
              variant="outlined"
              value={email}
              onChange={(e) => getEmail(e.target.value)}
              ref={studentEmail}
              className={styles.textFilledResponsive}
            />

            <TextField
              id="outlined-basic4"
              label={labels[3]}
              variant="outlined"
              ref={studentPassword}
              type="password"
              className={styles.textFilledResponsive}
            />
          </div>

          <div className={styles.btnContainer}>
            <Uploader email={email} />
            {submitLoading ? (
              <SavingBtn />
            ) : (
              <Button
                type="submit"
                className={styles.formBtn}
                variant="contained"
              >
                {btnName}
              </Button>
            )}
          </div>
          <div>{children}</div>
        </form>
      )}
    </>
  );
}
