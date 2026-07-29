import styles from "./EmailInput.module.css";
import { Mail } from "lucide-react";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput = ({ email, setEmail }: EmailInputProps) => {
  return (
    <>
      <label>Email address</label>

      <div className={styles.input}>
        <Mail size={18} color="#B8B8B8" />

        <input
          type="email"
          placeholder="You@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </>
  );
};

export default EmailInput;