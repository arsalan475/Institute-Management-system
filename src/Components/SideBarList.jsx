import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { Link } from "react-router-dom";
import { createContext, useContext } from "react";

function SideBarList({ navigations }) {
  return (
    <div>
      <List>
        {navigations.map((text, index) => {
          const real = text;
          const spilted = text.split(" ").join("");
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <Link
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                  to={spilted}
                >
                  <ListItemText primary={real} />{" "}
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default SideBarList;
