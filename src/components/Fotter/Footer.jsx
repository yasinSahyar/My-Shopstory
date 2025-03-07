
import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer-dark">
      <div className="footer-content">
        <div className="social-icons">
          <a href="" target="_blank" rel="noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/yasin1123" target="_blank" rel="noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="" target="_blank" rel="noreferrer">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://github.com/yasinSahyar" target="_blank" rel="noreferrer">
            <i className="fa fa-github"></i>
          </a>
        </div>

        <p className="footer-info">
        My Shopstory | Email: support@example.com | Contact: +3589857191
        </p>

        <p className="footer-copyright">
          © 2025 By@Yasin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
