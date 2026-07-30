import styles from "./RightPanel.module.css";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";


const RightPanel = () => {

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

        <Link to='/dashboard' className="w-full">
          <button className="bg-primary w-full" >
            Continue
          </button>
        </Link>

      </div>
    </section>
  );
};

export default RightPanel;