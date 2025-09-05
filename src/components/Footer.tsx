"use client";
//import { FaYoutube, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import '../styles/Footer.css';
// import TedXFooter from '../../public/TedXFooter.png'
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className="footer-grid">
      <div className="footer-nav">
        <div className="footer-col1">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Team</a>
          <a href="#">Sponsors</a>
        </div>
        <div className="footer-col2">
          <a href="#">Get Tickets</a>
          <a href="#">Gallery</a>
          <a href="#">FAQ</a>
        </div>
      </div>

      
          <div className="footer-bottom">
           <div className="footer-row">
            <p className="license">
             *This independent TEDx event is operated under license from TED.
            </p>
            <div className="social-icons">
             <a href="#">FaYoutube </a>
             <a href="#">FaLinkedin </a>
             <a href="#">FaXTwitter </a>
             <a href="#">FaInstagram </a>
            </div>
           </div>
           <div className="footerImage">
            <Image src="/TedXFooter.png" alt="TEDx Footer" width={0} height={0} sizes="100vw" style={{width:'100%',height:'auto'}} />
           </div>
          </div>


    </footer>
  );
};

export default Footer;
