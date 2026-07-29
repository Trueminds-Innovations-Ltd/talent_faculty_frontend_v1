import styles from "./Welcome.module.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const Welcome = () => {
  return (
    <main className={styles.container}>
      <LeftPanel />
      <RightPanel />
    </main>
  );
};

export default Welcome;