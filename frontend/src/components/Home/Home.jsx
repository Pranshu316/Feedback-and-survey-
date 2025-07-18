import Navbar from "../Navbar/Navbar";
import './Home.css';
import { useNavigate } from 'react-router-dom';
const Home= ({darkMode,setSideBarOpen,setProfileBarOpen}) => {
    const navigate = useNavigate();
    return(
        <>
        <div className="card-container">
            <article className="card" onClick={() => {
                setSideBarOpen(false);
                setProfileBarOpen(false);
                navigate('/blankform')
                }}>
                <header><h2>Blank Form</h2></header>
                <img className="blank" src="./blank.jpg" alt="blank form"  />
            </article>
            <article className="card" onClick={() => {
                setSideBarOpen(false);
                setProfileBarOpen(false);
                navigate('/feedbackfrom')
                }}>
                <header><h2>Feedback Form</h2></header>
                <img src="/feedback.jpg" alt="/feedback_image" />
            </article>

             <article className="card"  onClick={() => {
                setSideBarOpen(false);
                setProfileBarOpen(false);
                navigate('/surveyform')
                }}>
                <header><h2>Survey Form</h2></header>
                <img src="/survey.jpg" alt="/feedback_image" />
            </article>

            <article className="card"  onClick={() => {
                setSideBarOpen(false);
                setProfileBarOpen(false);
                navigate('/contactform')
                }}>
                <header><h2>Contact Information</h2></header>
                <img src="/contact.jpg" alt="/feedback_image" />
            </article>


        </div>

        </>

    );

};

export default Home;