/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState } from "react";
import "./speaker.css";
import Image from "next/image";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";

import TeamGallery from "@/components/TeamGallery";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNavPopup from "@/components/MobilePopup";

// Speaker data
const speakers = [
  {
    name: "Bhargsetu Sharma",
    img: "/Speakers/Bhargsetu.png", // update with your actual image paths/names
    desc: "Has rescued more than 5000 stray animals and birds. Awarded the Raksha Mantri Padak from the Defence Ministry in 2019 and the Governor's Medal at just age 20 Invited to MTV Roadies 2019 as Real Hero ",
  },
  {
    name: "Nisha Kumari",
    img: "/Speakers/Nisha.jpg",
    desc: "First woman from Vadodara to summit Mount Everest Nisha Kumari rode approximately 16,697 km, crossing 15 countries over the course of 210 days. Cycled through India, Nepal, China, Kyrgyzstan, Uzbekistan, Kazakhstan, Russia, Latvia, Lithuania, Poland, Czech Republic, Germany, Netherlands, Belgium and France Along the way, Nisha and her coach planted more than 1050 trees emphasising their message on environmental conservation and sustainability"  
  },
  {
    name: "Tarun Barot",
    img: "/Speakers/Tarun.png",
    desc: "Known as “encounter specialist”, Tarun is Gujarat Police's most talked-about officers for his high-profile cases that made national headlines He played a major role in the arrest and encounter of underworld don and Dawood Ibrahim associate Abdul Latif - who later inspired Shah Rukh Khan’s movie Raees (2017) He led various high-profile encounters to bring down bootleggers, Khalistani leaders and underworld gangs for which he had to even serve jail-time. Post retirement, Barot is deeply involved social work and welfare of people. In COVID, he organised meals for 5000+ needy people for 75 consecutive days and distributed 1000+ ration kits. He has facilitated marriages of 10+ underprivileged women."
  },
  {
    name: "Vikrem Rajgopal",
    img: "/Speakers/Vikrem.jpg",  
    desc: "17+ years of experience in Oil and Gas sector with industry giant L&T5x Winner of International Speech Contest at Club level in Toastmasters International, Winner of Evaluation Speech Contest at Division Level. Awarded Rising Star Award in Toastmasters (2021) Currently serving as President of Vadodara Toastmasters Pursues his passion in public speaking despite a busy corporate life. Known for his impactful speeches with thought-provoking ideas."
  },
];

// Main HomePage component that combines all sections
export default function HomePage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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


        <Footer />
      </div>
    </>
  );
}
