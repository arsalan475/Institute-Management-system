import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { doc, deleteDoc, db } from "../Config/FirebaseConfig";

import { useContext } from "react";
import UserContext from "../Config/context";
import ProfileCard from "./ProfileCard";
import styles from "./studentList.module.css";
import { Style } from "@mui/icons-material";

const Header = {
  width: "25%",
  textAlign: "center",
  backgroundColor: "#333",
  padding: "1rem ",
  color: "white",
};

export default function StudentList({ data, setData, docId, setDocId }) {
  const { imageUrl } = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const [image, setImage] = useState("");
  const [open, isOpen] = useState(false);
  // function checkImage(e) {
  //   console.log(e.target.files);
  //   const mountainsRef = storageRef(storage, e.target.files[0].name);
  //   const mountainImagesRef = storageRef(storage, "images/R (2).jpeg.jpg");
  // }

  async function deleteUser(index) {
    const docRef = doc(db, "users", docId[index]);

    try {
      const res = await deleteDoc(docRef);
      data.splice(index, 1);
      docId.splice(index, 1);
      setDocId([...docId]);
      setData([...data]);
      console.log("deleted");
    } catch (error) {
      console.log(error.message);
      console.log("not deleted");
    }
  }

  const [checked, setChecked] = useState([1]);
  console.log(data);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  function showModal() {
    isOpen(true);
    console.log("clicked");
  }
  function showProfile(index) {
    console.log(data[index].url);
    setImage(data[index].url);
    setProfileData(data[index]);
  }
  return (
    <>
      {open && <ProfileCard isOpen={isOpen} image={image} data={profileData} />}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <List
          dense
          sx={{
            width: "100%",
            bgcolor: "#f7f7f7",
            color: "#333",
            borderRadius: "10px",
            fontWeight: "bold",
            border: "1px solid #1976D2",
          }}
        >
          <div
            className={styles.header}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: " 1rem",
              width: "100%",
            }}
          >
            <b style={Header}>Name</b>
            <b style={Header}>Course Name</b>
            <b style={Header}>Roll Number</b>
            <b style={Header}>Operation</b>
          </div>

          {data?.map((el, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem
                sx={{ mb: "1rem" }}
                key={index}
                secondaryAction={
                  <Button
                    onClick={() => deleteUser(index)}
                    startIcon={<DeleteIcon className={styles.dtBtn} />}
                  ></Button>
                }
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    showProfile(index);
                    showModal();
                  }}
                  className={styles.liItem}
                >
                  <ListItemAvatar className={styles.avatarContainer}>
                    <Avatar
                      alt={`Avatar n°${index + 1}`}
                      src={el.url}
                      sx={{
                        border: "3px solid #1976D2",
                      }}
                      className={styles.avatarImg}
                    />
                  </ListItemAvatar>

                  <ListItemText id={labelId} primary={`${el.Name} `} />

                  <div
                    style={{
                      display: "flex",
                      width: "25%",
                    }}
                  >
                    <ListItemText id={labelId} primary={`${el.courseName} `} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "39%",
                    }}
                  >
                    <ListItemText id={labelId} primary={`${el.rollNumber} `} />
                  </div>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
}
