import styles from "./ProgressSteps.module.css";

const ProgressSteps = () => {
  return (
    <div className={styles.steps}>
      <div className={`${styles.item} ${styles.active}`}>
        <span className={styles.activeDot}></span>
        <p>Request</p>
      </div>

      <div className={styles.item}>
        <span className={styles.dot}></span>
        <p>Verify</p>
      </div>

      <div className={styles.item}>
        <span className={styles.dot}></span>
        <p>Reset</p>
      </div>
    </div>
  );
};

export default ProgressSteps;