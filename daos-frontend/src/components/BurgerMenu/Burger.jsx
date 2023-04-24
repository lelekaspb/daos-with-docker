import styles from "./Burger.module.css";

const Burger = ({ toggleBurger, isOpen }) => {
  return (
    <>
      <div className={styles.hamburger} onClick={toggleBurger}>
        <div
          className={`${styles.burger1} ${
            isOpen ? styles.burger1_open : styles.burger1_closed
          }`}
        ></div>
        <div
          className={`${styles.burger2} ${
            isOpen ? styles.burger2_open : styles.burger2_closed
          }`}
        ></div>
        <div
          className={`${styles.burger3} ${
            isOpen ? styles.burger3_open : styles.burger3_closed
          }`}
        ></div>
      </div>
    </>
  );
};

export default Burger;
