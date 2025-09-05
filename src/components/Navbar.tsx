"use client";
import { usePathname } from "next/navigation"; 
import GlassSurface from "../../Reactbits/GlassSurface/GlassSurface";
import MobileNavPopup from "./MobilePopup";
import "../styles/page.css";

// export default function Navbar() {
//   const pathname = usePathname();

//   const handleNavClick = (href: string) => {
//     if (pathname === href) {
//       window.location.href = href; // 🔥 Full page reload
//     } else {
//       window.location.href = href; // navigate with reload
//     }
//   };

//   return (
//     <>
//       <div className="NavBar" style={{ padding: "1rem" }}>
//         <MobileNavPopup />
//         <GlassSurface
//           width="100%"
//           height="85%"
//           borderRadius={24}
//           className="glassNavbarContainer"
//         >
//           <div className="navbar-content">
//             <div className="logo">
//               <img src="/logoNav.png" alt="" />
//             </div>

//             {/* Desktop Navigation */}
//             <div className="nav-links desktop-nav">
//               <button onClick={() => handleNavClick("/")}>Home</button>
//               <button onClick={() => handleNavClick("/team")}>Team</button>
//               <button onClick={() => handleNavClick("/sponsors")}>Sponsors</button>
//               <button onClick={() => handleNavClick("/about")}>About</button>
//             </div>

//             {/* Desktop Get Tickets Button */}
//             <div className="get-tickets desktop-nav">
//               <button
//                 className="tickets-button"
//                 onClick={() => handleNavClick("/ticketForm")}
//               >
//                 Get Tickets
//               </button>
//             </div>
//           </div>
//         </GlassSurface>
//       </div>
//     </>
//   );
// }
export default function Navbar() {
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (pathname === href) {
      window.location.href = href;
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <div className="NavBar" style={{ padding: "1rem",position:"fixed"}}>
        <MobileNavPopup />
        <GlassSurface
          width="100%"
          height="85%"
          borderRadius={24}
          className="glassNavbarContainer"
        >
           <div className="navbar-content">
            <div className="logo">
              <img src="/logoNav.png" alt="NavLogo" onClick={()=>{
              handleNavClick("/")
              }} style={{cursor:"pointer"}}/>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              <a onClick={() => handleNavClick("/")}>Home</a>
              <a onClick={() => handleNavClick("/team")}>Team</a>
              <a onClick={() => handleNavClick("/sponsors")}>Sponsors</a>
              <a onClick={() => handleNavClick("/about")}>About</a>
            </div>

            {/* Desktop Get Tickets Button */}
            <div className="get-tickets desktop-nav">
              <button
                className="tickets-button"
                onClick={() => handleNavClick("/ticketForm")}
              >
                Get Tickets
              </button>
            </div>
          </div>
        </GlassSurface>
      </div>
    </>
  );
}