import React from 'react'
import Navbar from "./Navbar";
import '../styles/about.css';
import awesome from '../images/about - awesome.jpeg'
import login from '../images/about - awesome.svg'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Alertss from "./Alertss";

function About() {
    return (
        <div>
            <Navbar />
            <Alertss />
            <div className="text-white aboutImg text-center">
                <div className="note-img">
                    <h1 className="display-4">Empowering  Students</h1>
                    <p>The best place to keep all your notes safe and secure. Your notes are always there with you in the clouds.</p>
                </div>
            </div>

            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Make something <span style={{ color: "#9C27B0" }}>Awesome</span> </h2>
                        <p>Cloud Notebook allows you to create notes anywhere and anytime. It also make sure that you can access them whenever you want.
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <Button component={Link} to="/new" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create New Note</Button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid awesome" src={awesome} alt="about-awesome" />
                    </div>
                </div>

                <div className="row login mt-5 mb-5 p-5">
                    <div className="col-md-6">
                        <img className="img-fluid" src={login} alt="about-awesome" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Powering the <span style={{ color: "#9C27B0" }}>internet’s visuals</span> </h2>
                        <p>
                            Ideation : Many times we need to create notes of something really important, but due to unavailability of resources we are unable to note down the relevant things. So cloud notebook provides the best solution for these problems.
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <Button component={Link} to="/register" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Sign up now</Button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="content">
                    <div className="top">
                        <div className="logo-details">
                            <span className="logo_name"><span style={{ color: "#9C27B0" }}>C</span>loud <span style={{ color: "#9C27B0" }}>N</span>otebook</span>
                        </div>
                        <div className="media-icons">
                            {/* <Link to="/"><i className="fab fa-facebook-f"></i></Link> */}
                            <a href='https://www.facebook.com/himanshu.dangwal.73' target='_blank' rel="noreferrer"><i className="fab fa-facebook-f"></i></a>

                            {/* <Link to="/"><i className="fab fa-twitter"></i></Link> */}
                            <a href='https://twitter.com/HIMANSHU_DANGWA' target='_blank' rel="noreferrer"><i className="fab fa-twitter"></i></a>

                            {/* <Link to="https://www.instagram.com/_himanshu_dangwal_/?hl=en"><i className="fab fa-instagram"></i></Link> */}
                            <a href='https://www.instagram.com/_himanshu_dangwal_/?hl=en' target='_blank' rel="noreferrer"><i className="fab fa-instagram"></i></a>
                            
                            {/* <Link to="/"><i className="fab fa-linkedin-in"></i></Link> */}
                            <a href='https://www.linkedin.com/in/himanshu-dangwal-682330197/' target='_blank' rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>

                            {/* <Link to="/"><i className="fab fa-youtube"></i></Link> */}
                            <a href='https://www.youtube.com/@codeyourdreams3429' target='_blank' rel="noreferrer"><i className="fab fa-youtube"></i></a>

                        </div>
                    </div>
                    <div className="link-boxes">
                        <ul className="box">
                            <li className="link_name">Company</li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new">New Notes</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/">Get started</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Services</li>
                            <li><Link to="/">Your Notes</Link></li>
                            <li><Link to="/new">New Note</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Account</li>
                            <li><Link to="/login">Sign-in</Link></li>
                            <li><Link to="/register">Join Free</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Top Categories</li>
                            <li><Link to="/c/61554bfe801949ad7b9be4ff">Tent Notes</Link></li>
                            <li><Link to="/c/61554c2753bcf306407cb1bd">RV and Van Notes</Link></li>
                            <li><Link to="/c/61554c43d2a6b15f764aff36">Canoe Notes</Link></li>
                            <li><Link to="c/61554c63dfd6a37d71449b5c">Survivalist Notes</Link></li>
                        </ul>
                        <ul className="box input-box">
                            <li className="link_name">About Cloud - Notebook</li>
                            <li style={{color: "#F7FFFF"}}>
                                The best place to keep your notes safe and secure. Don't wait just give it a go.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-details">
                    <div className="bottom_text">
                        <span className="copyright_text">Copyright © 2023 <Link to="/">Cloud-Notebook</Link>All rights reserved</span>
                        <span className="policy_terms">
                            <Link to="/">Privacy policy</Link>
                            <Link to="/">Terms & condition</Link>
                        </span>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default About
