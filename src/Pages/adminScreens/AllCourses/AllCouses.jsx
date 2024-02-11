import Courses from "../../../Components/Courses";
import { useState, useEffect, useContext } from "react";
import spinner from "/Fidget-spinner.gif";
import { getDocs, collection, db } from "../../../Config/FirebaseConfig";
import UserContext from "../../../Config/context";

function AllCouses() {
  const [data, setData] = useState([]);
  const { isloading, loading } = useContext(UserContext);
  useEffect(function () {
    isloading(true);
    async function getCourseList() {
      let data = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Admin"));
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());

          // setUser(doc.data());
          data.push(doc.data());
          setData(data);
          isloading(false);
          // console.log[data);
          // isloading(false);
        });
      } catch (error) {
        isloading(false);
      }
    }

    getCourseList();
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
      ) : (
        data?.map(function (el, i) {
          return <Courses key={i} student={el} />;
        })
      )}
    </>
  );
}

export default AllCouses;
