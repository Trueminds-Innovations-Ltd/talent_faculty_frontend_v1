import styles from "./LeftPanel.module.css";
import ProgressSteps from "./ProgressSteps";

const LeftPanel = () => {
  return (
    <section className={styles.left}>
      <div className={styles.circle}></div>

      <div className={styles.content}>
        <p className={styles.step}>STEP 1 OF 3</p>

        <h1>
          It happens to
          <br />
          everyone.
        </h1>

        <h3>
          We will help you get back in a minute.
        </h3>

        <ProgressSteps />
      </div>
    </section>
  );
};

export default LeftPanel;