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
              height: "100vh",
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              color="text.primary"
              textTransform="uppercase"
              sx={{ fontSize: "4vw", fontWeight: "900" }}
            >
              {indivadualCourseName}
            </Typography>
            <Typography
              variant="h5"
              color="text.primary"
              textTransform="capitalize"
            >
              {indivadualCourseEnrolledLength >= 1 ? (
                <h3 style={{ padding: 0, margin: 0, fontSize: "3vw" }}>
                  There are {indivadualCourseEnrolledLength} students in that
                  course
                  <br />
                  <h6
                    style={{
                      marginTop: "0.7rem",
                      marginBottom: "0.3rem",
                      padding: 0,
                    }}
                  >
                    Classes On {everyStudent[0].day}{" "}
                  </h6>
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
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        width: "100%",

                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={el.url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${el.Name} ${el.fatherName}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
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
