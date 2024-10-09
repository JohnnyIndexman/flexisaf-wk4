import React from "react";
import '../CSS/Header.css'

function Nav() {
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
      </nav>
    </div>
  );
}

export default Nav;
