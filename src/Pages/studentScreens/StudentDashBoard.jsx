import { useContext, useEffect, useState } from "react";
import Courses from "../../Components/Courses";
import UserContext from "../../Config/context";
import styles from "./Delay.module.css";
import {
  onAuthStateChanged,
  auth,
  query,
  collection,
  db,
  where,
  getDocs,
} from "../../Config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import spinner from "/Fidget-spinner.gif";

function Student() {
  const navigate = useNavigate();
  const { loading, isloading } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(function () {
    isloading(true);
    async function getData() {
      try {
        const q = query(
          collection(db, "users"),
          where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());

          isloading(false);
        });
      } catch (e) {
        console.log(e.message, "message");
        isloading(false);
      }
    }

    getData();
  }, []);

  return (
    <>
      {loading ? (
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
      ) : user === "" ? (
        <h1
          className={styles.delay}
          style={{
            textAlign: "center",
            textTransform: "capitalize",
            color: "orangered",
          }}
        >
          You are Eliminated from this Course you don't have access to this
          dashBoard ‼{" "}
        </h1>
      ) : (
        <Courses student={user} />
      )}
    </>
  );
}

export default Student;
