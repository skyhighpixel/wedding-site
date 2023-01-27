
import React from "react";
import {
    Link
  } from "react-router-dom";

export default function Head({isRSVP}) {
    console.log('head')
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="#page-top">
                    <img src="/logo.png"></img></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li className="nav-item"><a className="nav-link" href="#schedule">Schedule</a></li>
                        <li className="nav-item"><a className="nav-link" href="#details">Details</a></li>
                        {/* <li className="nav-item"><Link className="nav-link" to="/rsvp">RSVP</Link></li> */}
                    </ul>
                </div>
            </div>
        </nav>
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">
                    You're invited to the wedding of
                </div>
                <div className="masthead-heading text-uppercase">Angela & Kieran</div>
                <h3>
                    Saturday 12 August 2023
                </h3>
                {!isRSVP ? <a className="btn btn-primary btn-xl text-uppercase mt-3" href="#rsvp">RSVP</a> : null}
            </div>
        </header>

        </>
  );
}
