/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState } from "react";
import "./speaker.css";
import Image from "next/image";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import MasonryGallery from "@/components/Masonry";
import TeamGallery from "@/components/TeamGallery";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNavPopup from "@/components/MobilePopup";

// Speaker data
const speakers = [
  {
    name: "Bhargsetu Sharma",
    img: "/Speakers/Bhargsetu.png", // update with your actual image paths/names
    desc: "Bhargsetu Sharma is the one who has done several good things in her entire life. She has done so many things that we can't fit it here in this frame because our content writer is on a vacation.",
  },
  {
    name: "Nisha Kumari",
    img: "/Speakers/Nisha.jpg",
    desc: "Nisha Kumari is the one who has done several good things in her entire life. She has done so many things that we can't fit it here in this frame because our content writer is on a vacation.",
  },
  {
    name: "Tarun Barot",
    img: "/Speakers/Tarun.png",
    desc: "Tarun Barot is the one who has done several good things in his entire life. He has done so many things that we can't fit it here in this frame because our content writer is on a vacation.",
  },
  {
    name: "Vikrem Rajgopal",
    img: "/Speakers/Vikrem.jpg",
    desc: "Vikrem Rajgopal is the one who has done several good things in his entire life. He has done so many things that we can't fit it here in this frame because our content writer is on a vacation.",
  },
];

// Main HomePage component that combines all sections
export default function HomePage() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
      {/* <Navbar /> */}
      <div className="teamContainer">
        <div className="HeroSectionContainer">
          <Image
            src="/TeamMandala.png"
            width={1920}
            height={1080}
            alt="Picture of the author"
            className="TeamMandala"
          />
          <h1>Meet the Speakers</h1>
        </div>

        {/* Speaker Boxes Start */}
        <div>
          {speakers.map((s, idx) => (
            <div className="speaker-box" key={idx}>
             <div className="speaker-image" onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
  <Image
    src={s.img}
    alt={s.name}
    width={450}
    height={600}
    className="cover-image"
    priority
  />
  <div className="speaker-name-mobile">{s.name}</div>
</div>

              <div className={`speaker-desc ${openIdx === idx ? "show" : ""}`}>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Speaker Boxes End */}

        <FAQs />
        <Footer />
      </div>
    </>
  );
}
