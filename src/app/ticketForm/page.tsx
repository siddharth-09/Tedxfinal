import "./TicketForm.css"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <div className="mainFormContainer">
        {/* <Navbar /> */}
        <div>
          {/* <TicketForm /> */}
          <Image
            src="/formMandala.svg"
            alt=""
            className="formMandala"
            width={1920}
            height={1080}
          />
          <p className="ticketMessage">
            Get your tickets offline at our registration desk near Canteen. <br />
            <span className="highlight">Limited Seats left!!!</span>
          </p>

        </div>
      </div>
    </>
  )
}
