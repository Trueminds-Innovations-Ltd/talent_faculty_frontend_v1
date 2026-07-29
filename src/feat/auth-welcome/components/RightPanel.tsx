import styles from "./RightPanel.module.css";
import { Check } from "lucide-react";


const RightPanel = () => {
  const handleContinue = () => {
    console.log("Continue clicked");
    // Later, navigate to the dashboard
  };

  return (
    <section className={styles.right}>
      <div className={styles.wrapper}>
        
        <img
          src="/logo1.png"
          alt="TalentFaculty"
          className={styles.logo}
        />

        <div className={styles.successCircle}>
          <Check size={38} strokeWidth={2.5} />
        </div>

        <h2>Welcome to TalentFaculty</h2>

        <p>
          Your account is ready, let's get you to your dashboard.
        </p>

        <button onClick={handleContinue}>
          Continue
        </button>
      </div>
    </section>
  );
};

export default RightPanel;