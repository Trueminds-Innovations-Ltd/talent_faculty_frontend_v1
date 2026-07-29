import styles from "./PasswordReset.module.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const PasswordReset = () => {
  return (
    <main className={styles.container}>
      <LeftPanel />
      <RightPanel />
    </main>
  );
};

export default PasswordReset;