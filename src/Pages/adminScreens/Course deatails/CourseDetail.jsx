import { useContext } from "react";
import UserContext from "../../../Config/context";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import spinner from "/Fidget-spinner.gif";
import styles from "./CourseDetail.module.css";
import { useEffect } from "react";
function CourseDetail() {
  const { indivadualCourseEnrolledLength } = useContext(UserContext);
  const { indivadualCourseName } = useContext(UserContext);
  const { everyStudent, loading } = useContext(UserContext);
  console.log(everyStudent);

  //   console.log(data);

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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#f7f7f7",
              height: "auto",
              width: "100%",
              padding: "1rem",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "10px",
            }}
            className="wrapper"
          >
            <Typography
              variant="h2"
              color="text.primary"
              textTransform="uppercase"
              sx={{ fontSize: "3vw", fontWeight: "900" }}
            >
              {indivadualCourseName}
            </Typography>
            <Typography
              variant="h5"
              color="text.primary"
              textTransform="capitalize"
              className={styles.subHeading}
              sx={{ marginBottom: "1rem" }}
            >
              {indivadualCourseEnrolledLength >= 1 ? (
                <h3 style={{ padding: 0, margin: 0, fontSize: "2vw" }}>
                  There are {indivadualCourseEnrolledLength} students in that
                  course
                  <br />
                  <span
                    style={{
                      marginTop: "0.7rem",
                      marginBottom: "0.3rem",
                      padding: 0,
                    }}
                  >
                    Classes On {everyStudent[0].day}{" "}
                  </span>
                </h3>
              ) : (
                <h3> No One Enrolled Yet </h3>
              )}
            </Typography>

            {everyStudent
              ? everyStudent.map((el, i) => (
                  <List
                    key={i}
                    sx={{
                      width: "50%",
                      bgcolor: "background.paper",
                      padding: 0,
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginBottom: ".5rem",
                      boxShadow: "0 1px 5px #333 ",
                    }}
                    className={styles.full}
                  >
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        width: "100%",
                        padding: "0 8px",
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          className={styles.image}
                          alt="Remy Sharp"
                          src={el.url}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span className={styles.subHeading}>
                            {" "}
                            {el.Name} {el.fatherName}
                          </span>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              // sx={{ display: "inline" }}
                              // component="span"
                              // variant="body2"
                              // color="text.primary"
                              className={styles.subHeading}
                            >
                              {el.cityName}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                ))
              : ""}
          </div>
        </div>
      )}
    </>
  );
}

export default CourseDetail;
