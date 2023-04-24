import styles from "./BurgerMenu.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const BurgerMenu = ({ toggleBurger, logout, isOpen }) => {
  const { userInfo, resetUserInfoState } = useGlobalContext();
  const handleLogout = () => {
    toggleBurger();
    logout();
  };
  return (
    <div
      className={`${styles.mobile_menu} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      <ul className={styles.nav_mobile}>
        <li className={styles.nav_link}>
          <NavLink
            to="/orchestras"
            onClick={toggleBurger}
            className={({ isActive }) =>
              ` ${styles.link} ${isActive ? styles.underline : ""}`
            }
          >
            Ensembler
          </NavLink>
        </li>
        <li className={styles.nav_link}>
          <NavLink
            to="/posts"
            onClick={toggleBurger}
            className={({ isActive }) =>
              ` ${styles.link} ${isActive ? styles.underline : ""}`
            }
          >
            Opslag
          </NavLink>
        </li>

        {userInfo.token.length > 0 && (
          <li className={styles.nav_link}>
            <NavLink
              to="/profile"
              onClick={toggleBurger}
              className={({ isActive }) =>
                ` ${styles.link} ${isActive ? styles.underline : ""}`
              }
            >
              Profil
            </NavLink>
          </li>
        )}

        {userInfo.token.length == 0 && (
          <li className={styles.nav_btn}>
            <NavLink
              to="/create-profile"
              onClick={toggleBurger}
              className={styles.nav_btn_signup}
            >
              Opret bruger
            </NavLink>
          </li>
        )}

        {userInfo.token.length == 0 && (
          <li className={styles.nav_btn}>
            <Link
              to="/login"
              onClick={toggleBurger}
              className={styles.nav_btn_login}
            >
              Log ind
            </Link>
          </li>
        )}

        {userInfo.token.length > 0 && (
          <li className={styles.nav_btn}>
            <button
              type="button"
              className={styles.nav_btn_logout}
              onClick={handleLogout}
            >
              Log out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default BurgerMenu;
