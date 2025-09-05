'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../styles/FAQs.css';
import arrowImg from '../../public/MenuDownArrow.png'; 

const FAQs = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

    const faqData = [
    {
      question: "What is TEDxSVIT?",
      answer: "TEDxSVIT is an independently organized TEDx event hosted at Sardar Vallabhbhai Patel Institute of Technology (SVIT). It brings together visionary speakers and thought leaders to share “ideas worth spreading” with our campus and broader community."
    },
    {
      question: "How is TEDxSVIT different from a TED Talk?",
      answer: "While TED Talks are part of the official global TED conferences, TEDxSVIT is a local, student-led initiative licensed by TED. It follows TED’s format and guidelines but features speakers and themes relevant to our regional and academic community."
    },
    {
      question: "Who can attend a TEDxSVIT event?",
      answer: "TEDxSVIT is open to students, faculty, professionals, and idea enthusiasts. Attendees must register in advance as seats are limited. Details are announced through our website and social media platforms."
    },
    {
      question: "What kind of topics are featured at TEDxSVIT?",
      answer: "TEDxSVIT talks cover a diverse range of topics, including technology, innovation, personal growth, mental health, education, social change, and more. We aim to highlight voices that inspire, challenge, and provoke meaningful thought."
    },
    {
      question: "Why should I attend TEDxSVIT?",
      answer: "Attending TEDxSVIT means joining a vibrant space for dialogue, creativity, and exploration. You'll hear inspiring talks, meet like-minded people, and leave with new ideas and perspectives that could change the way you think."
    },
    {
      question: "What are TED talks?",
      answer: "TEDx Talks are independently organized presentations that follow the format and spirit of TED Talks, which are short, powerful talks on topics related to Technology, Entertainment, and Design - and beyond."
    },
    {
      question: "Where can I watch TEDx talks online?",
      answer: "All approved TEDx Talks are uploaded to the official TEDx YouTube channel or featured on the TED website. You can explore talks from all over the world, including previous TEDxSVIT events."
    }
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-accordion">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-accordion-item">
            <button
              className={`faq-button ${expandedItem === index ? 'faq-expanded' : ''}`}
              aria-expanded={expandedItem === index}
              onClick={() => toggleAccordion(index)}
            >
              <span className="faq-accordion-title">{faq.question}</span>
              <span className="faq-icon" aria-hidden="true">
                <Image 
                  src={arrowImg} 
                  alt="Arrow Icon" 
                  width={30} 
                  height={30} 
                 
                  style={{ 
                    transform: expandedItem === index ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s ease' 
                  }} 
                />
              </span>
            </button>
            <div className={`faq-accordion-content ${expandedItem === index ? 'faq-open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
