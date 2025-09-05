
import "./TicketForm.css"
import { TicketForm } from "./TicketForm"
import Image from "next/image"
export default function Home(){
    return(
        <>
        
            <div className="mainFormContainer">
                {/* <Navbar /> */}
            <div>
                <TicketForm />
                <Image src="/formMandala.svg" alt="" className="formMandala" width={1920} height={1080} />
            </div>
            </div>
            
    </>
    )
}