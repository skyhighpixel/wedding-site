import React from "react";
import Head from "./Head";
import Rsvp from "./Rsvp";

export default function Home() {

  return (
    <>
        <Head/>
    
        <section className="page-section bg-light" id="schedule">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Schedule</h2>
                </div>
                <ul className="timeline">
                    <li className="timeline-inverted">
                        <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://wedding-site-12082023.s3.ap-southeast-2.amazonaws.com/ceremony.jpeg" alt="Ceremony" />
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>"I Do"s @ 5pm</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">We kindly request guests to arrive 10 minutes early</p></div>
                        </div>
                    </li>
                    <li className="timeline-inverted">
                        <div className="timeline-image"><img className="rounded-circle img-fluid" src="https://wedding-site-12082023.s3.ap-southeast-2.amazonaws.com/canapes.jpeg" alt="Canapes" /></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>Canapés & Drinks</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">Relax with some nibbles and drinks</p></div>
                        </div>
                    </li>
                    <li className="timeline-inverted">
                        <div className="timeline-image"><img className="rounded-circle img-fluid" src="https://wedding-site-12082023.s3.ap-southeast-2.amazonaws.com/reception.jpeg" alt="..." /></div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4>Reception</h4>
                            </div>
                            <div className="timeline-body"><p className="text-muted">Eat! Drink! Dance!</p></div>
                        </div>
                    </li>
                    <li className="timeline-inverted">
                        <div className="timeline-image">
                            <h4>
                                Be Part
                                <br />
                                Of Our
                                <br />
                                Story!
                            </h4>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section className="page-section" id="details">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Details</h2>
                </div>
                <div className="row text-center">
                
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-location-dot fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Venue</h4>
                        <p className="text-muted">West Beach Pavilion</p>
                        <p className="text-muted">330A Beaconsfield Parade, St Kilda West VIC 3182</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-car fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Getting there</h4>
                        <p className="text-muted"><strong>Parking:</strong> Plenty of street parking</p>
                        <p className="text-muted"><strong>Public transport:</strong> No. 12 tram. 4 mins walk from Cowderoy St/Park St stop. Or no. 96 tram, 8 mins walk from Jacka Bvd/Fitzroy St stop</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa-brands fa-black-tie fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Dress code</h4>
                        <p className="text-muted">Dress to impress!</p>
                    </div>
                </div>
                <div className="google-map-container"><div className="google-map"><iframe title="map" width="800" height="250" id="gmap_canvas" src="https://maps.google.com/maps?q=west%20beach%20pavilion&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
            </div>
        </section>
        <section className="page-section bg-light" id="wishingwell">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Wishing Well</h2>
                </div>
            
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center"><p className="large text-muted">Your presence at our wedding is the greatest gift of all. However, should you wish to honour us with a gift, a wishing well will be available at the reception for your contribution and best wishes.
                    </p></div>
                </div>
            </div>
        </section>
       
        
        <Rsvp/>


        <div className="footer py-4">
            <p className="text-muted mb-0">If you have any questions, send us an email: <a href="mailto:ak.wedding1223@gmail.com">ak.wedding1223@gmail.com</a></p>
        </div>
              
    </>
  );
}

