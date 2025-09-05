"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MobileNavPopup() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <>
        <button 
          className="mobile-hamburger"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="mobile-nav-popup">
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <img src="/logoNav.png" alt="" />
            </div>
            <button 
              className="mobile-close-btn"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          
          <div className="mobile-nav-content">
            <div className="mobile-nav-links">
              <Link href="/">
                <span className="nav-item">Home</span>
              </Link>
              <Link href="/team">
                <span className="nav-item">Team</span>
              </Link>
              <Link href="/sponsors">
                <span className="nav-item">Sponsors</span>
              </Link>
              <Link href="/about">
                <span className="nav-item">About</span>
              </Link>
            </div>
            
            <div className="mobile-tickets-section">
              <Link href="/ticketForm">
                <button className="mobile-tickets-button">Get Tickets</button>
              </Link>
            </div>
          </div>
        </div>
        <style jsx>{`
          .mobile-hamburger {
            display: none;
            position: fixed;
            top: 2rem;
            right: 2rem;
            transform: translateY(-50%);
            z-index: 1000;
            flex-direction: column;
            justify-content: space-between;
            width: 28px;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            cursor: pointer;
            padding: 8px;
            transition: all 0.3s ease;
          }
          
          .mobile-nav-popup {
            display: none;
          }
          
          @media (max-width: 768px) {
            .mobile-hamburger {
              display: flex;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <button 
        className={`mobile-hamburger ${isMenuOpen ? 'mobile-hamburger-active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="lineHum"></div>
        <div className="lineHum"></div>
      </button>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMenu}></div>
      )}

      {/* Mobile Navigation Popup */}
      <div className={`mobile-nav-popup ${isMenuOpen ? 'mobile-nav-popup-open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="mobile-logo">
            <img src="/logoNav.png" alt="" />
          </div>
          <button 
            className="mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <div className="mobile-nav-content">
          <div className="mobile-nav-links">
            <Link href="/" onClick={closeMenu}>
              <span className="nav-item">Home</span>
            </Link>
            <Link href="/team" onClick={closeMenu}>
              <span className="nav-item">Team</span>
            </Link>
            <Link href="/sponsors" onClick={closeMenu}>
              <span className="nav-item">Sponsors</span>
            </Link>
            <Link href="/about" onClick={closeMenu}>
              <span className="nav-item">About</span>
            </Link>
          </div>
          
          <div className="mobile-tickets-section">
            <Link href="/ticketForm" onClick={closeMenu}>
              <button className="mobile-tickets-button">Get Tickets</button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile Hamburger Button */
        .mobile-hamburger {
        pointer-events: none;
          display: none !important;
          position: absolute;
          top: 3.5rem;
          right: 2.5rem;
          transform: translateY(-50%);
          z-index: 1000;
          flex-direction: column;
          justify-content: space-between;
          width: 48px;
          height: 48px;
          background: transparent;
          display:grid !important;
          grid-template-rows:repeat(3,1fr);
          border: 1px solid rgba(255, 255, 255, 0);
          border-radius: 8px;
          
          cursor: pointer;
          padding: 5px;
          padding-top:14px;
          padding-bottom:8px;
          transition: all 0.3s ease;
        }
        .lineHum{
        display:none;
          width:100%;
          height:100%;
          margin:0px;
          margin-left:2px;
          padding-right:12px;
          padding-left:12px;
          border-bottom:2px solid white;
        }
        .mobile-hamburger:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .mobile-hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background-color: white;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .mobile-hamburger-active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-hamburger-active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-hamburger-active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        

        /* Overlay */
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          backdrop-filter: blur(2px);
        }

        /* Mobile Navigation Popup */
        .mobile-nav-popup {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.95));
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 9999;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .mobile-nav-popup-open {
          right: 0;
        }

        /* Mobile Navigation Header */
        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-logo img {
          height: 2.5rem;
          width: auto;
        }

        .mobile-close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .mobile-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        /* Mobile Navigation Content */
        .mobile-nav-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 200px);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
        }

        .mobile-nav-links a {
          text-decoration: none;
          color: white;
          display: block;
          transition: all 0.3s ease;
        }

        .nav-item {
          display: block;
          padding: 1.2rem 1rem;
          font-size: 1.3rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .nav-item:hover {
          background: rgba(229, 9, 20, 0.1);
          color: #e50914;
          padding-left: 1.5rem;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 2px;
          background: #e50914;
          transition: width 0.3s ease;
        }

        .nav-item:hover::before {
          width: 4px;
        }

        /* Mobile Tickets Section */
        .mobile-tickets-section {

          // margin-top: 2rem;
          // padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-tickets-button {
          width: 100%;
          background: linear-gradient(135deg, #e50914, #ff1744);
          color: white;
          border: none;
          padding: 1.2rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
        }

        .mobile-tickets-button:hover {
          background: linear-gradient(135deg, #c10710, #e50914);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
        }

        /* Show hamburger on mobile devices */
        @media (max-width: 768px) {
          .mobile-hamburger {
            display: flex;
            pointer-events: auto;
          }
            .lineHum{
        display:flex;
        }

        /* Adjust popup width for smaller screens */
        @media (max-width: 400px) {
          .mobile-nav-popup {
            width: 100vw;
          }
            
        }
        
        }
      `}</style>
    </>
  );
}