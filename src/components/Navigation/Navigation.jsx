import React from "react";
import { NavLink } from "react-router-dom";
import css from './Navigation.module.css'

export default function Navigation() {
  return (
    <>
      <nav>
        <ul className={css.navigationUl} >
          <li>
            <NavLink className={css.navLink} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={css.navLink} to="/movies">Movies</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
