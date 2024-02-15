import styles from "./Profile.module.css";

function ProfileCard({ isOpen, image, data }) {
  function closeModal() {
    isOpen(false);
  }

  return (
    <>
      <div className={styles.mainContainer}></div>
      <div className={styles.card}>
        <span className={styles.closeIcon} onClick={closeModal}>
          ❌
        </span>
        <div className={styles.imageContainer}>
          <img src={image} />
        </div>
        <div className={styles.content}>
          <h1>
            <h2>{`${data.Name} ${data.fatherName}`}</h2>

            <p>{data.courseName}</p>
          </h1>
          <div className={styles.detailContainer}>
            <h1>
              <h2>city</h2>
              <p>{data.cityName}</p>
            </h1>
            <h1>
              <h2>Roll Number</h2>
              <p>{data.rollNumber}</p>
            </h1>
            <h1>
              <h2>Enrolled Date</h2>
              <p>{data.date}</p>
            </h1>
          </div>
          <div className={styles.detailContainer}>
            <h1>
              <h2>Status</h2>
              <p className={styles.green}>Active</p>
            </h1>
            <h1>
              <h2>Completed</h2>
              <p>70%</p>
            </h1>
            <h1>
              <h2>Last Active</h2>
              <p>1 day ago</p>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
