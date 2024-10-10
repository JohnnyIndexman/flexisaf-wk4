import React from "react";
import '../CSS/Header.css'
import { useState, useEffect } from "react";
import Hamburger from 'hamburger-react'

function Nav() {

  const [isOpen, setOpen] = useState(false)
  const [ style, setStyle ] = useState({
    display: 'none'
  })

  useEffect(() => {
    if (isOpen) {
      setStyle({ display: "flex" });
    } else {
      setStyle({ display: "none" });
    }
  }, [isOpen]);

  return (
    <div>
      <nav>
        <h2>IndexBlogs</h2>
        <div className="header">
          <p>
            <a href="/">About</a>
          </p>
          <p>
            <a href="/">Contact </a>
          </p>
        </div>
        <Hamburger toggled={isOpen} toggle={setOpen}/>
      </nav>

      <div className="hamburger-menu" style={style}>
      <p>
            <a href="/">About</a>
          </p>
          <p>
            <a href="/">Contact </a>
          </p>
      </div>
    </div>
  );
}

export default Nav;
