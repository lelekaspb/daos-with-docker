import styles from "./Preloader.module.css";

const Preloader = () => {
  return (
    <section className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
      </div>
      {/* <div class="custom-loader"></div> */}
    </section>
  );
};

export default Preloader;
