import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import styles from "./Admin.module.css";
import spinner from "/Fidget-spinner.gif";
import Gear from "/Gear.gif";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import UserContext from "../../Config/context";
import { signOut, auth } from "../../Config/FirebaseConfig";
import { useContext } from "react";

import SideBarList from "../../Components/SideBarList";

import { Navigate, Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

// const admin = ["Create Course", "All Courses", "All Students", "About"];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function AdminDashboard({ DashboardFor, childrenComponent, Options }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { loading, isloading } = useContext(UserContext);
  const Navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, setUser } = useContext(UserContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        console.log("logout successfully");
        isloading(false);
        Navigate("/login");
        setUser("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        height: "100vh",
        width: "100%  ",
      }}
    >
      <CssBaseline />
      <AppBar
        sx={{ bgcolor: "white", color: "#333" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              width: "2%",
              color: "#333",
              ...(open && { display: "none" }),
            }}
            className={styles.menu}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
              alignItems: "center",
            }}
          >
            <Typography className={styles.dashboardName}>
              {DashboardFor}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.url} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logOut}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Dashborad</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SideBarList key={crypto.randomUUID()} navigations={Options} />
      </Drawer>

      <Main open={open} className={styles.mainContainer}>
        <DrawerHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* <Courses />
          <Courses /> */}
          {/* <MyForm
            formName={"Create a New Course"}
            labels={["Course Name", "teacher Name", "date", "description"]}
            fieldComponent1={
              <TextField id="outlined-basic" label="Level" variant="outlined" />
            }
            fieldComponent2={
              <TextField id="outlined-basic" label="type" variant="outlined" />
            }
            btnName={"Create"}
          />
        */}
          {childrenComponent}
          <Outlet />
        </div>
      </Main>
    </Box>
  );
}

export default AdminDashboard;
