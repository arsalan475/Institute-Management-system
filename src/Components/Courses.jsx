import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";

import Typography from "@mui/joy/Typography";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";

import {
  collection,
  db,
  query,
  where,
  getDocs,
} from "../Config/FirebaseConfig";
import { useContext, useState } from "react";
import "../index.css";
import { Pending } from "@mui/icons-material";
import styled from "@emotion/styled";
import UserContext from "../Config/context";
import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Courses({ student }) {
  // const [ indivadualCourseEnrolledLength,  setIndivadualCourseEnrolledLength] = useState();
  const navigate = useNavigate();
  const { indivadualCourseEnrolledLength, setIndivadualCourseEnrolledLength } =
    useContext(UserContext);
  const { setIndivadualCourseName } = useContext(UserContext);
  const { everyStudent, setEveryStudent, loading, isloading } =
    useContext(UserContext);

  async function getDetails(cr) {
    isloading(true);
    let holdLength = [];
    let holdAllStudents = [];

    try {
      const q = query(collection(db, "users"), where("courseName", "==", cr));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.indivadualCourseName());

        // setUser(doc.indivadualCourseName());
        isloading(false);
        holdAllStudents.push(doc.data());
        holdLength.push(doc.data());

        // console.log(length);

        // isloading(false);
      });
      // console.log(holdLength.length);

      setIndivadualCourseEnrolledLength(holdLength.length);
      setEveryStudent(holdAllStudents);
      //setIndivadualCourseName(holdLength[0].courseName);
      setIndivadualCourseName(holdLength[0].courseName);

      // holdAllStudents = [];
      holdLength.length = 0;
    } catch (e) {
      isloading(false);
    }
    // holdAllStudents.length = 0;
    isloading(false);
  }

  function handdleDetails(e) {
    const cr = e.target
      .closest(".parent")
      .querySelector("p")
      .textContent.slice(2, -2);

    getDetails(cr);
    // navigate("courseDetail");
    console.log(student);
  }

  return (
    <Card
      data-resizable
      sx={{
        textAlign: "center",
        alignItems: "center",
        width: "350px",
        // to make the demo resizable
        overflow: "auto",
        resize: "none",
        "--icon-size": "100px",
        paddingTop: "0",
      }}
      className="parent"
    >
      <i>
        <b>Teacher Name</b> <br />{" "}
        {student.Teacher ? student.Teacher : student.teacher}
      </i>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {!student.url ? (
          <BakeryDiningIcon color="warning" sx={{ fontSize: "4rem" }} />
        ) : (
          <Avatar
            alt={`Avatar `}
            src={student.url}
            sx={{
              border: "3px solid #1976D2",
              width: "50%",
              height: "auto",
            }}
          />
        )}
      </div>

      <Typography level="title-lg" sx={{ mt: ".5rem" }}>
        🎊{student.courseName ? student.courseName : student.Course}🎊
      </Typography>
      <CardContent sx={{ maxWidth: "40ch" }}>
        <b> level : {student.Lev ? student.Lev : "advanced"} </b>

        <h5
          style={{ padding: 0, margin: 0 }}
          className={student.date ? "" : "hidden"}
        >
          {student.date
            ? `Enrolled Date : ${student.date}`
            : `Days : ${student.Day}`}
        </h5>
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          "--Button-radius": "40px",
          width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
        }}
      >
        <Link to="courseDetail">
          {" "}
          <Button variant="solid" color="warning" onClick={handdleDetails}>
            Course Details
          </Button>
        </Link>
        {/* <Button variant="plain" color="neutral">
          Skip
        </Button> */}
      </CardActions>
    </Card>
  );
}
