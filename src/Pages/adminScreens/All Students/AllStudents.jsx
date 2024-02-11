import StudentList from "../../../Components/StudentList";
import { useContext, useEffect, useState } from "react";
import { getDocs, collection, db } from "../../../Config/FirebaseConfig";
import UserContext from "../../../Config/context";
import spinner from "/Fidget-spinner.gif";

function AllStudents() {
  const [data, setData] = useState([]);
  const [docId, setDocId] = useState([]);
  const { loading, isloading } = useContext(UserContext);

  useEffect(function () {
    isloading(true);
    async function getCourseList() {
      let data = [];
      let ids = [];

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());

          // setUser(doc.data());
          isloading(false);
          data.push(doc.data());
          setData(data);
          ids.push(doc.id);
          setDocId(ids);

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
        <StudentList
          data={data}
          docId={docId}
          setData={setData}
          setDocId={setDocId}
        />
      )}
    </>
  );
}

export default AllStudents;
