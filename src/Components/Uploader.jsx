import { useState } from "react";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";

import {
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
} from "../Config/FirebaseConfig";
import { useContext } from "react";
import UserContext from "../Config/context";
import SavingBtn from "./SavingBtn";

const Uploader = ({ email }) => {
  const [upload, setUpload] = useState(false);
  const [image, setImage] = useState();
  const { setImageUrl, loading, isloading } = useContext(UserContext);

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  function handleChange(e) {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      isloading(true);
      handleUpload(file);
    }
  }

  function handleUpload(file) {
    const imgRef = storageRef(storage, `/users/${email}/profile`);
    // const storageRef = firebase.storage().storageRef(`images/${image.name}`);
    const uploadTask = uploadBytes(imgRef, file).then((snapshot) => {
      console.log("added to firestore");

      getDownloadURL(imgRef)
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg
          console.log("uploaded");
          setImageUrl(() => url);
          setUpload(true);
        })
        .catch((error) => {
          // Handle any errors
          setUpload(false);
        })
        .finally(() => isloading(false));
    });
  }

  return (
    <div>
      {/* <input type="file" />
      <button >Upload</button> */}
      {loading ? (
        <SavingBtn />
      ) : (
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
        >
          {upload ? "Uploaded" : "Upload file"}
          <VisuallyHiddenInput type="file" onChange={(e) => handleChange(e)} />
        </Button>
      )}
    </div>
  );
};

export default Uploader;
