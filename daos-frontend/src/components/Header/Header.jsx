import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import Burger from "./../BurgerMenu/Burger";
import { useState } from "react";
import BurgerMenu from "./../BurgerMenu/BurgerMenu";

const Header = () => {
  const { userInfo, resetUserInfoState } = useGlobalContext();

  const [burgerOpen, setBurgerOpen] = useState(false);
  const toggleBurger = () => {
    setBurgerOpen(!burgerOpen);
  };

  let navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    resetUserInfoState();
    redirectToLogin();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.nav_left}>
          <Link to="/" className={styles.logo_link}>
            <span className={styles.logo}>Musik Samspil</span>{" "}
          </Link>
          <span className={styles.description}>
            Skabt af DAOS - Dansk Amatørorkester Samvirke
          </span>
        </div>

        <div className={styles.nav_right}>
          <ul className={styles.nav_desktop}>
            <li className={styles.nav_link}>
              <NavLink
                to="/orchestras"
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
                  className={({ isActive }) =>
                    ` ${styles.link} ${isActive ? styles.underline : ""}`
                  }
                >
                  Profil
                </NavLink>
              </li>
            )}

            {userInfo.token.length == 0 && (
              <li>
                <NavLink to="/create-profile" className={styles.nav_btn_signup}>
                  Opret bruger
                </NavLink>
              </li>
            )}

            {userInfo.token.length == 0 && (
              <li>
                <Link to="/login" className={styles.nav_btn_login}>
                  Log ind
                </Link>
              </li>
            )}

            {userInfo.token.length > 0 && (
              <li>
                <button
                  type="button"
                  className={styles.nav_btn_logout}
                  onClick={logout}
                >
                  Log out
                </button>
              </li>
            )}
          </ul>

          <div className={styles.burger_wrapper}>
            <Burger toggleBurger={toggleBurger} isOpen={burgerOpen} />
          </div>
        </div>
      </nav>

      {burgerOpen && (
        <BurgerMenu
          toggleBurger={toggleBurger}
          logout={logout}
          isOpen={burgerOpen}
        />
      )}
    </header>
  );
};

export default Header;
