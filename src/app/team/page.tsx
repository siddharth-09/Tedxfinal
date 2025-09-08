/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'
import React, { useState, useEffect, useRef } from 'react';
import './team.css'; // Make sure to place the CSS file in the same directory or adjust the path
import Image from "next/image";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import TeamGallery from "@/components/TeamGallery";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNavPopup from '@/components/MobilePopup';

// Main HomePage component that combines all sections
export default function HomePage() {
  type Member = {
    name: string;
    role: string;
    department: string;
    designation?: string; // Added optional designation field
    imageUrl: string;
  };

  type MemberGroup = {
    groupName: string;
    members: Member[];
  };

  // Other teams data
  const otherTeamsData: MemberGroup[] = [
    {
      groupName:"Core Team",
      members: [
        { name: 'Kabir Brahmbhatt', role: 'TY', department: 'Mechanical', designation:'Organiser', imageUrl: '/CoreAndWeb/' },
        { name: 'Aditi Patel', role: 'SY', department: 'Mechanical', designation:'Organiser', imageUrl: '/CoreAndWeb/Aditi.JPG' },
        { name: 'Vipra Dave', role: 'SY', department: 'Mechanical', designation:'Chief Coordinator', imageUrl: '/CoreAndWeb/Vipra.png' },
        { name: 'Dhyani Upadhyay', role: 'TY', department: 'CE', designation:'Chief Coordinator', imageUrl: '/CoreAndWeb/Dhyani.png' },
      ],
    },
    {
      groupName:"Website Team",
      members: [
        // { name: 'Kabir Brahmbhatt', role: 'TY', department: 'Mechanical', imageUrl: '/CoreAndWeb/' },
        // { name: 'Aditi Patel', role: 'SY', department: 'Mechanical', imageUrl: '/CoreAndWeb/' },
        // { name: 'Vipra Dave', role: 'SY', department: 'Mechanical', imageUrl: '/CoreAndWeb/Vipra.png' },
        // { name: 'Dhyani Upadhyay', role: 'TY', department: 'CE', imageUrl: '/CoreAndWeb/Dhyani.png' },
        { name: 'Krish Prajapati', role: 'TY', department: 'Mechanical', imageUrl: '/CoreAndWeb/Krish.jpeg' },
        { name: 'Nakul Desai', role: 'SY', department: 'Mechanical', imageUrl: '/CoreAndWeb/Nakul Desai.jpg' },
        { name: 'Nitya Patel', role: 'SY', department: 'Mechanical', imageUrl: '/CoreAndWeb/Nitya.jpeg' },
        { name: 'Siddharth Panchal', role: 'SY', department: 'Mechanical', imageUrl: '/CoreAndWeb/Siddharth Panchal.jpeg' },
        
        { name: 'Dhaval Patel', role: 'TY', department: 'CE', imageUrl: '/CoreAndWeb/Dhaval.jpeg' },
      ],
    },
    {
      groupName: 'Admin & Logistics Team',
      members: [
        { name: 'Aadi Joshi', role: 'TY', department: 'Mechanical', imageUrl: '/AdminAndLogistics/AadiJoshi.jpeg' },
        { name: 'Miraj Mistry', role: 'SY', department: 'Mechanical', imageUrl: '/AdminAndLogistics/' },
        { name: 'Mishit Shah', role: 'SY', department: 'Mechanical', imageUrl: '/AdminAndLogistics/' },
        { name: 'Netra Rakeshkumar Patel', role: 'TY', department: 'CE', imageUrl: '/AdminAndLogistics/Netra Patel.jpg' },
        { name: 'Sriram Swaminathan', role: 'TY', department: 'CE', imageUrl: '/AdminAndLogistics/Sriram Swaminathan.jpg' },
      ],
    },
    {
      groupName: 'Graphic Design Team',
      members: [
        { name: 'Chaitanya Giri', role: 'TY', department: 'CSD', imageUrl: '/GraphicDesignImages/chaitanya.JPG' },
        { name: 'Meher Rathod', role: 'SY', department: 'CSD', imageUrl: '/GraphicDesignImages/Meher Rathod.jpg' },
        { name: 'Rudra Joshi', role: 'TY', department: 'IT', imageUrl: '/GraphicDesignImages/Rudra Joshi Ashutosh.jpg' },
      ],
    },
    {
      groupName: 'Videography Team',
      members: [
        { name: 'Akshita Vimawala', role: 'TY', department: 'Aeronautical', imageUrl: '/VideographyImages/Akshita.jpeg' },
        { name: 'Vyom Patel', role: 'SY', department: 'Civil', imageUrl: '/VideographyImages/Vyom Patel.jpeg' },
      ],
    },
    {
      groupName: 'Video Editing Team',
      members: [
        { name: 'Deep Patoriya', role: 'TY', department: 'CE', imageUrl: '/VideoEditing/Deep Patoriya.jpg' },
        { name: 'Parth Soni', role: 'TY', department: 'CE', imageUrl: '/VideoEditing/Parth Soni.jpeg' },
        { name: 'Sambhrant Shukla', role: 'FY', department: 'Mechanical', imageUrl: '/VideoEditing/Sambhrant Shukla.jpg' },
      ],
    },
    {
      groupName: 'Social Media Team',
      members: [
        { name: 'Krish Patel', role: 'SY', department: 'CE', imageUrl: '/SocialMedia/Krish Patel.jpeg' },
        { name: 'Malek Noor', role: 'TY', department: 'IT', imageUrl: '/SocialMedia/Malek Noor.jpeg' },
        { name: 'Rajat Haathi', role: 'SY', department: 'CE', imageUrl: '/SocialMedia/Rajat Haathi.jpg' },
      ],
    },
    {
      groupName: 'Anchoring Team',
      members: [
        { name: 'Anjali Panchal', role: 'FY', department: 'CSD', imageUrl: '/Anchoring/Anjali Panchal.jpg' },
        { name: 'Devanshi Chaudhary', role: 'FY', department: 'IT', imageUrl: '/Anchoring/Devanshi.jpeg' },
        { name: 'Shrey Shah', role: 'FY', department: 'IT', imageUrl: '/Anchoring/shrey pic.png' },
      ],
    },
    {
      groupName: 'Dance Team',
      members: [
        { name: 'Kavya Thakkar', role: 'SY', department: 'Aeronautical', imageUrl: '/Dance/Kavya Gaurav Thakkar.jpg' },
        { name: 'Kritika Panchal', role: 'SY', department: 'CE', imageUrl: '/Dance/Kritika Panchal.jpg' },
        { name: 'Sakhi Bhagat', role: 'SY', department: 'CSD', imageUrl: '/Dance/Sakhi Bhagat.jpeg' },
      ],
    },
    {
      groupName: 'Music Team',
      members: [
        { name: 'Meet Barot', role: 'LY', department: 'IT', imageUrl: '/Music/Meet Barot.jpg' },
        { name: 'Ishmael Tinodiwanaishe Ruzungunde', role: 'SY', department: 'Aeronautical', imageUrl: '/Music/Ishmael Tynoe.jpeg' },
        { name: 'Nisarg Vimalkumar Rana', role: 'TY', department: 'Aeronautical', imageUrl: '/Music/Nisarg Rana.jpg' },
        { name: 'Manan Sutariya', role: 'TY', department: 'IT', imageUrl: '/Music/Manan Sutariya.jpg' },
        { name: 'Mahek Doshi', role: 'SY', department: 'CE', imageUrl: '/Music/Mahek Doshi.jpg' },
        { name: 'Dhruva Pratik Shah', role: 'TY', department: 'Mechanical', imageUrl: '/Music/Dhruva.jpeg' },
        { name: 'Harshil Dharmik', role: 'SY', department: 'Mechanical', imageUrl: '/Music/Harshil Dharmik.jpg' },
        { name: 'Yug Kalpesh Patel', role: 'SY', department: 'Mechanical', imageUrl: '/Music/Yug Patel.jpeg' },
        { name: 'Samhita Gandhi', role: 'FY', department: 'IT', imageUrl: '/Music/Samhita' },
        { name: 'Shubhamkumar Harshadkumar Panchal', role: 'SY', department: 'Mechanical', imageUrl: '/Music/Shubham Panchal.JPG' },
      ],
    },
  ];
  return (
    <>
      {/* <Navbar /> */}
      <div className="teamContainer">

      <div className='HeroSectionContainer'>
        <Image
          src="/TeamMandala.png"
          width={1920}
          height={1080}
          alt="Picture of the author"
          className="TeamMandala"
          />
        <h1>Meet the team behind this event</h1>
      </div>
        <div className='photesSection'>

          {otherTeamsData.map(group => (
            <TeamGallery 
              key={group.groupName}
              title={group.groupName}
              members={group.members}
              
            />
          ))}
        </div>

      <Footer />
          </div>
    </>
  );
}