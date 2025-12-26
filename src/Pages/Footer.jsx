import { Link } from "react-router-dom";
import annamLogo from "../assets/img/thumbs/Annamalai_logo.jpg";
// import Icon1 from "../assets/img/icons/icon-1.svg";

// import { ReactComponent as Icon1 } from "../assets/img/icons/icon-1.svg";



export default function Footer() {
    return <>
        <footer className="footer-section footer-section-2 p-t-125 p-t-md-100 p-t-xs-30 p-b-50">
            <div className="container">
                <div className="row justify-content-between row-gap-md-5 row-gap-4 p-b-xs-50 p-b-80">
                    <div className="col-xl-4 col-lg-8 col-md-7">
                        <div className="footer-widget">
                            <div className="about-widget">
                                <div className="footer-logo">
                                    <a href="#">
                                        <img
                                            src={annamLogo}
                                            alt="logo"
                                            width="90"
                                        />
                                        &ensp; Annamalai Foundations
                                    </a>
                                </div>
                                <div className="text">
                                    <p>
                                        Introducing our team of talented and skilled professionals
                                        who are ready to increase your productivity and bring your
                                        business.
                                    </p>
                                </div>
                                <div className="info">
                                    <p>
                                        <b>We Are Available !!</b>
                                    </p>
                                    <p>
                                        Mon-Sat: <span>10:00am to 07:30pm</span>
                                    </p>
                                </div>
                                <div className="social-links">
                                    <a href="https://www.facebook.com/people/Annamalai-Foundation/61567348864633/">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="https://twitter.com">
                                        <i className="fab fa-x-twitter"></i>
                                    </a>
                                    <a href="https://www.instagram.com">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/in/annamalai-foundation-a3352b334/">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-5">
                        <div className="footer-widget">
                            <h3 className="w-title">
                                <span>
                                    {/* <Icon1 width={32} height={32} /> */}
                                </span>
                                Quick Links
                            </h3>
                            <ul>
                                <li><Link to="/aboutus">About Us</Link></li>
                                <li><Link to="/collaborate">Collaborate</Link></li>
                                <li><Link to="/mediatalks">Media Talks</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="#">Meet Our Team</Link></li>
                                <li><Link to="/contactus">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-5">
                        <div className="footer-widget">
                            <h3 className="w-title">
                                <span>
                                    <img src="/src/assets/img/icons/icon-1.svg" alt="icon" />
                                </span>
                                Our Services
                            </h3>
                            <ul>
                                <li>
                                    <a href="#">For Research</a>
                                </li>
                                <li>
                                    <a href="#">For Institutors</a>
                                </li>
                                <li>
                                    <a href="#">For Innovators</a>
                                </li>
                                <li>
                                    <a href="#">Global Recolonisation</a>
                                </li>
                                <li>
                                    <a href="#">Expert Network</a>
                                </li>
                                <li>
                                    <a href="#">Research Resource</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <div className="footer-widget">
                            <h3 className="w-title">
                                <span>
                                    <img src="/src/assets/img/icons/icon-1.svg" alt="icon" />
                                </span>
                                Get in Touch
                            </h3>
                            <div className="get-in-touch">
                                <a href="#" className="footer-address">
                                    <div className="icon">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className="text">
                                        <h6>Address</h6>
                                        <p>4848 Pin Oak Park, Apt 1416, Houston, TX 77081, USA</p>
                                    </div>
                                </a>
                                <a href="mailto:support@example.com" className="email">
                                    <div className="icon">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </div>
                                    <div className="text">
                                        <h6>Email</h6>
                                        <p>info@annamalaitrust.com</p>
                                    </div>
                                </a>
                                <a href="tel:+70264566579" className="phone">
                                    <div className="icon">
                                        <i className="fi fi-rr-call-outgoing"></i>
                                    </div>
                                    <div className="text">
                                        <h6>Phone</h6>
                                        <p>908-516-3069</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="container">
                            <div className="footer-bottom-layout">
                                <div className="footer-bottom-menu">
                                    <ul>
                                        <li>
                                            <a href="#">Terms & Condition</a>
                                        </li>
                                        <li>
                                            <a href="#">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="footer-copyright">
                                    © 2025 Annamalai Foundations. All Rights Reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div id="backToTop" aria-label="Back to top" title="Back to top">
            <svg>
                <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="#FFE175"
                    stroke-width="3"
                    fill="none"
                    stroke-linecap="round"
                />
            </svg>
            <span className="icon">
                <i className="fas fa-arrow-up"></i>
            </span>
        </div>

        <a
            href="https://wa.me/996294"
            className="whatsapp-float"
            target="_blank"
            title="Chat with us on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
    </>
}