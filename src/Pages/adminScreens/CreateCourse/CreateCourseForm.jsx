import { useEffect, useRef } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// importing firbase auth and createUser with firebase config file

import { db, collection, addDoc } from "../../../Config/FirebaseConfig";

export default function AdminForm() {
  const navigate = useNavigate();
  // geting form values
  const Days = useRef();
  const HeldOn = useRef();
  const CourseName = useRef();
  const TeacherName = useRef();
  const Level = useRef();
  const Description = useRef();

  function handleAddmission(e) {
    e.preventDefault();

    const Day = Days.current.value;
    const Held = HeldOn.current.value;
    const Course = CourseName.current.querySelector("input").value;
    const Lev = Level.current.querySelector("input").value;
    const Teacher = TeacherName.current.querySelector("input").value;
    const Desc = Description.current.querySelector("input").value;

    if (!Course || !Day || !Teacher || !Held || !Lev || !Desc) return;

    console.log(Day, Held, Course, Lev, Teacher, Desc);

    async function sendInfo() {
      try {
        const docRef = await addDoc(collection(db, "Admin"), {
          Course,
          Teacher,
          Lev,
          Day,
          Held,
          uid: "oIAWfYVHxagXxtpPeJ1jO48F6vb2",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    sendInfo();
  }
  return (
    <>
      <form
        onSubmit={handleAddmission}
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "1rem 0",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>{"create couse"}</h1>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            width: "70%",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* {fieldComponent1} */}
            <div>
              <select ref={HeldOn} style={{ width: "100%", height: "3.4rem" }}>
                <option>Classes Will be Taken</option>
                <option>Onsite</option>
                <option>Live Classes</option>
              </select>
            </div>
            <TextField
              id="outlined-basic"
              label={"courseName"}
              variant="outlined"
              ref={CourseName}
            />
            <TextField
              id="outlined-basic"
              label={"Level"}
              variant="outlined"
              ref={Level}
            />
          </div>

          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div>
              <select ref={Days} style={{ width: "100%", height: "3.4rem" }}>
                <option>Select classes Days</option>
                <option>TTS</option>
                <option>MWF</option>
                <option>Only Sunday</option>
              </select>
            </div>
            <TextField
              id="outlined-basic"
              label={"teacher Name"}
              variant="outlined"
              ref={TeacherName}
            />
            <TextField
              id="outlined-basic"
              label={"description"}
              variant="outlined"
              ref={Description}
            />
          </div>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 auto",
          }}
        >
          <Button
            type="submit"
            sx={{
              width: "10rem",
              fontWeight: "bold",
              display: "flex",
              justify: "center",
            }}
            variant="contained"
          >
            Create Course
          </Button>
        </div>
      </form>
    </>
  );
}
