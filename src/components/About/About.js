import Navbar from "../Navbar/Navbar";

function About() {

    return (
        <div className="about">
            <Navbar active="אודות" />
            <div className="container-fluid mt-2">
                <h1>קצת על האתר...</h1>
                <br/>
                <h2>גרסה 0.0.2 (התשפ"ג)</h2>
                <p>אוריה אלפרין</p>
                <h2>גרסה 0.0.1 (התשפ"א)</h2>
                <p>איתי שמחייב, ליהיא בלפר, יוסף שטיין</p>
            </div>
        </div>
    )

}
export default About;