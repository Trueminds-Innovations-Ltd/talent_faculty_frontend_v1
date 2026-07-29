import { useState } from "react";
import styles from "./RightPanel.module.css";
import EmailInput from "./EmailInput";

const RightPanel = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      alert(`Verification code has been sent to ${email}`);
    }, 1500);
  };

  return (
    <section className={styles.right}>
      <div className={styles.card}>
        <h2>Reset your password</h2>

        <p>
          Enter the email tied to your account and we'll send a code to verify
          it's you.
        </p>

        <EmailInput email={email} setEmail={setEmail} />

        <button onClick={handleSendCode} disabled={loading}>
          {loading ? "Sending..." : "Send code"}
        </button>

        <a href="/login">Back to sign in</a>
      </div>
    </section>
  );
};

export default RightPanel;