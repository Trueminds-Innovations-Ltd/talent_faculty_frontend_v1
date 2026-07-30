import styles from "./LeftPanel.module.css";

const LeftPanel = () => {
  return (
    <section className={styles.left}>
      <div className={styles.circle}></div>

      <div className="h-full w-full relative flex items-center px-8 py-12 lg:px-12 lg:py-16 xl:px-16 " >
        <h1 className='text-5xl'>
          Welcome back
          <br />
          to TalentFaculty.
        </h1>
      </div>
    </section>
  );
};

export default LeftPanel;