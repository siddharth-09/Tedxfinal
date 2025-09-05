// test
import ScrollReveal from "../../Reactbits/ScrollReveal/ScrollReveal";
import Image from "next/image";
import "../styles/page.css";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import Link from "next/link";



export default function Home() {
  return (
  
    <>
      <div className="mainpage">
      {/* ------------------------Navbar-------------------------- */}
      {/* <Navbar /> */}
      
      {/* ------------------------Hero Section-------------------------- */}
      <div className="heroSection">
        <div className="heroMandalaImgContainer"> 
          {/* <img src="mainMandala.svg" alt="#" className="heroMandala" /> */}
          <Image
          src="/MainHeroInnerMandala.svg"
          width={1000}
          height={1000}
          alt="Picture of the author"
          className="heroInnerMandala"
          />
          <Image
          src="/MainHeroOuterMandala.svg"
          width={1000}
          height={1000}
          alt="Picture of the author"
          className="heroMandala"
          />
        </div>
        
        <div className="logoTextButtonContainer">
          <div className="logoText">
            <Image
              src="/samatvamTextLogo.svg"
              width={500}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className="addressText">
            <p>September 09, 2025 | 9.00 AM onwards</p>
            <p>Architecture auditorium, SVIT Campus, Vasad</p>
          </div>
          <div className="getTicketBtn">
            <Link href="/ticketForm">
              <button  style={{ color: "white"}}>Get Tickets</button>
            </Link>
            
          </div>
        </div>
      </div>
      {/* ------------------------Samtavam Meaning Text-------------------------- */}
      <div className="samatavamMeaning">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={10}
          blurStrength={10}
        >
          Samatvam means equanimity a balanced state of mind that remains calm,
          undisturbed, and impartial in success and failure, pleasure and pain,
          gain and loss.
        </ScrollReveal>

      
      </div>
      {/* ------------------------Frequently Asked Questions-------------------------- */}
      <div className="FAQContainer">
        <FAQs />
      </div>
      <Footer />
    </div>
    </>
  );
}
