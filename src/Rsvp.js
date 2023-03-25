import React, { useState } from "react";
import $ from 'jquery';
import guestlist from './guests.json';


export default function Rsvp() {
  
    const [searchTerm, setSearchTeam] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [groupSelected, setGroupSelected] = useState(false);
    const [rsvped, setRsvped] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [isRsvping, setIsRsvping] = useState(false);


    const onSearchGuest = (event) => {
        var search = event.target.value;
        var regex = new RegExp(search, 'ig');

        if (event.keyCode === 13 && searchResults.length === 1) {
            return onSelectGuest(searchResults[0].name);
        }

        setSearchTeam(search);

        setSearchResults(guestlist.filter(function (guest) {
            return guest.name.match(regex);
        }));
    };

    const onSelectGuest = (value) => {
        var group = guestlist.find(function (obj) {
            return obj.name === value;
        }).group; //Find the group the guest belongs to

        var groupList = guestlist.filter(function (obj) {
            return obj.group === group;
        }); //List of guests from that group

        setGroupList(groupList);
    };

    const objectifyForm = (formArray) => {
        //serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            var value = formArray[i]['value'];
            returnArray[formArray[i]['name']] = value && value.replace(/(<|>)/g, '');
        }
        return returnArray;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        var data = objectifyForm($(event.target).serializeArray());
        console.log('onsbmit', {guests: groupList, contact: data.contact, songrequests: data.songrequests});
        setIsRsvping(true);
        $.ajax({
            url: "https://3frsl5q2h2.execute-api.ap-southeast-2.amazonaws.com/default/RSVP",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify({guests: JSON.stringify(groupList), contact: data.contact, songrequests: data.songrequests}),
            dataType: "json",
            contentType:"application/json; charset=utf-8",
            success: function (response) {
                console.log('RES', response);
                setRsvped(true);
                setIsRsvping(false);
            },
            error: function (xhr, status) {
                setRsvped('error');
                setIsRsvping(false);
            }
        });
    };


  return (
    <>
        {/* <Head isRSVP={true}/> */}
        <section className="page-section" id="rsvp">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase mb-2">RSVP</h2>
                    <p className="text-muted">Please RSVP by 30 June 2023</p>
                    
                </div>
                
                {!!rsvped ? 
                    <div className="row my-5">
                        <div className="col-md-4 mx-auto text-center">
                            {rsvped === 'error' ?
                                <>
                                    <h2>Sorry! Something went wrong</h2>
                                    <p>Please try again</p>
                                </> 
                            : <>
                                <h2>Thank you for confirming</h2>
                                <p>We hope to see you soon!</p>
                            </>}
                        </div>
                    </div>
                : !groupList.length ? 
                    <div className="row my-4">
                        <div className="col-md-4 mx-auto">
                            <input type="search" 
                                placeholder="Enter your name" 
                                defaultValue={searchTerm} 
                                className="form-control form-control-lg" 
                                onKeyUp={(event) => onSearchGuest(event)}
                                onChange={(event) => onSearchGuest(event)}
                                />
                            {!groupSelected && !!searchTerm ?
                                searchResults.length ? 
                                    <div className="guestselect-container">
                                    {searchResults.slice(0, 4).map((guest) => {
                                        return <div key={guest.id} onClick={(event) => onSelectGuest(guest.name)}>{guest.name}</div>
                                    })}
                                    </div> : <p>Sorry, can't find you</p>
                            : null}
                        </div>
                    </div>
                : <div className="row my-4" id="guests">
                        <div className="col-md-5 mx-auto">
                            <div className="row no-gutters">
                                <div className="col-6"><h3>Guests</h3></div>
                                <div className="col-6 text-end">
                                    <p className="cursor-pointer"
                                        onClick={() => {
                                            setGroupList([]);
                                            setGroupSelected(false);
                                        }}>Oops. Not you?</p>
                                </div>
                            </div>
                
                            <form onSubmit={(event) => onSubmit(event)}>
                                <div className="guests-container">
                                    {groupList.map((guest) => {
                                        return <div className="row mb-4" key={guest.id}>
                                            <div className="col-4">
                                                <p>{guest.name}{guest.baby ? ' (B)' : guest.child ? ' (C)' : ''}</p>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-check">
                                                    <input required className="form-check-input" type="radio" value="yes" id={`attending1-${guest.id}`} name={`attending-${guest.id}`}
                                                        disabled={isRsvping}
                                                        onChange={(event) => {
                                                            if (event.target.checked) {
                                                                setGroupList(groupList.map(g => {
                                                                    if (g.id === guest.id) {
                                                                        g.attending = true;
                                                                    }
                                                                    return g;
                                                                }));
                                                            }
                                                        }}/>
                                                    <label className="form-check-label" htmlFor={`attending1-${guest.id}`}>
                                                        Will attend
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                    <input required className="form-check-input" type="radio" value="no" id={`attending2-${guest.id}`} name={`attending-${guest.id}`}
                                                    disabled={isRsvping}
                                                    onChange={(event) => {
                                                        if (event.target.checked) {
                                                            setGroupList(groupList.map(g => {
                                                                if (g.id === guest.id) {
                                                                    g.attending = false;
                                                                }
                                                                return g;
                                                            }));
                                                        }
                                                    }}/>
                                                    <label className="form-check-label" htmlFor={`attending2-${guest.id}`}>
                                                        Unable to attend
                                                    </label>
                                                </div>
                                            

                                                {guest.child && guest.attending && !guest.baby ? 
                                                <div className="row g-3 mt-3">
                                                <div className="col-6">
                                                    <label htmlFor="meal" className="col-form-label mt-0">Meal</label>
                                                </div>
                                                <div className="col-6">
                                                <div className="form-check">
                                                    <input required className="form-check-input" type="radio" value="Pizza" id={`childmeal1-${guest.id}`} name={`childmeal-${guest.id}`}
                                                        disabled={isRsvping}
                                                        onChange={(event) => {
                                                            if (event.target.checked) {
                                                                setGroupList(groupList.map(g => {
                                                                    if (g.id === guest.id) {
                                                                        g.meal = event.target.value
                                                                    }
                                                                    return g;
                                                                }));
                                                            }
                                                        }}/>
                                                    <label className="form-check-label" htmlFor={`childmeal1-${guest.id}`}>
                                                        Pizza
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input required className="form-check-input" type="radio" value="Fish & Chips" id={`childmeal2-${guest.id}`} name={`childmeal-${guest.id}`}
                                                            disabled={isRsvping}
                                                            onChange={(event) => {
                                                                if (event.target.checked) {
                                                                    setGroupList(groupList.map(g => {
                                                                        if (g.id === guest.id) {
                                                                            g.meal = event.target.value
                                                                        }
                                                                        return g;
                                                                    }));
                                                                }
                                                            }}/>
                                                            <label className="form-check-label" htmlFor={`childmeal2-${guest.id}`}>
                                                                Fish & Chips
                                                            </label>
                                                    
                                                </div> </div>
                                            </div>
                                                : null}

                                            {guest.attending && !guest.baby ? <div className="row g-3 align-items-center mt-3">
                                                    <div className="col-6">
                                                        <label htmlFor="dietery" className="col-form-label">Dietery restrictions</label>
                                                    </div>
                                                    <div className="col-6">
                                                        <input type="text" id="dietery" className="form-control" placeholder="Vegan, GF, etc."
                                                        disabled={isRsvping}
                                                        onKeyUp={(event) => {
                                                              setGroupList(groupList.map(g => {
                                                                 if (g.id === guest.id) {
                                                                    g.dietery = event.target.value
                                                                }
                                                                return g;
                                                             }));
                                                        }}/>
                                                    </div>
                                                </div> : null}
                                            </div>   
                                        </div>
                                    })}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="songrequests" className="form-label">What songs are guaranteed to get you up on the dance floor?</label>
                                    <textarea className="form-control" id="songrequests" name="songrequests" rows="3" disabled={isRsvping}></textarea>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="contact" className="form-label">Email{' '}-{' '}
                                    <span className="text-muted"><small>We will send the photo gallery after the event</small></span></label>
                                    <input type="email" className="form-control" id="contact" name="contact" disabled={isRsvping}/>
                                </div>
                                <div className="text-end mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={isRsvping}>{isRsvping ? <i className="fas fa-spin fa-spinner"></i>: 'RSVP!'}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                }
            </div>
        </section>
    </>
  );
}

