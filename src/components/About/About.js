import {Releases} from "./Releases"
import './About.css'
import {Github, EnvelopeAtFill,} from 'react-bootstrap-icons'
import { useCookies } from 'react-cookie';
import logo1 from '../../logo.png';
import Navbar from "../Navbar/Navbar";

function About() {
    const [token] = useCookies(['mr-token']);
  
    return (
        <div className="about">
            {token['mr-token']? <Navbar/> : null }
            <div className="container-fluid mt-2">
            <h1>קצת על האתר...</h1>
                <p>ד"ר אראל דוד סגל-הלוי</p>
                <br/>
              
                {Releases.map((item, index) => (
                    <div key={index}>
                    <h4>גרסא <b>{item.version}</b> {item.year}</h4>
                    <p>{`מתכנתים: ${item.programmers}`}</p>
                    </div>
                ))}
                <br/>
                     <ul className="list-unstyled d-flex justify-content-center ">
                 <li class="ms-3"><a href='https://github.com/ariel-research' className="link-body-emphasis"><Github/></a></li>
                 <li class="ms-3"><a href='mailto:ariel-research23@gmail.com' className="link-body-emphasis"><EnvelopeAtFill/>ariel-research23@gmail.com</a></li>
                 </ul>

            </div>
            {!token['mr-token']?
            <p className="text-center text-muted mt-5 mb-0"><a href="/"
            className="fw-bold text-body pr"><u>התחברו כאן!</u></a></p> 
            : null }
        </div>
    )

}
export default About;