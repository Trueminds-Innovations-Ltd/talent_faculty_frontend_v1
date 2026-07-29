import styles from "./LeftPanel.module.css";

const LeftPanel = () => {
  return (
    <section className={styles.left}>
      <div className={styles.circle}></div>

      <div className={styles.content}>
        <h1>
          Welcome back
          <br />
          to TalentFaculty.
        </h1>
      </div>
    </section>
  );
};

export default LeftPanel;