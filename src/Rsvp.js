import React, { useEffect, useState } from "react";
import Head from "./Head";
import $ from 'jquery';

var guestlist = [
    { id: 0, group: "chayfam", name: "Srun Chay Ung"},
    { id: 1, group: "chayfam", name: "Kevin Ung"},
    { id: 2, group: "wendymario", name: "Mario Huynh", child: true},
  ];

export default function Rsvp() {
  
    const [searchTerm, setSearchTeam] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [groupSelected, setGroupSelected] = useState(false);
    const [groupList, setGroupList] = useState([]);


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
        console.log('onsbmit', {guests: groupList, ...objectifyForm($(event.target).serializeArray())});
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
                
                {!groupList.length ? 
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
                                    {searchResults.map((guest) => {
                                        return <div onClick={(event) => onSelectGuest(guest.name)}>{guest.name}</div>
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
                                        return <div className="row mb-4">
                                            <div className="col-4">
                                                <p>{guest.name}{guest.child ? ' (Child)' : ''}</p>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-check">
                                                    <input required className="form-check-input" type="radio" value="yes" id={`attending1-${guest.id}`}
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
                                                    <label className="form-check-label" for={`attending1-${guest.id}`}>
                                                        Attending
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                    <input required className="form-check-input" type="radio" value="no" id={`attending2-${guest.id}`}
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
                                                    <label className="form-check-label" for={`attending2-${guest.id}`}>
                                                        Can't attend
                                                    </label>
                                                </div>
                                            

                                                {guest.child && guest.attending ? 
                                                <div className="row g-3 mt-3">
                                                <div className="col-6">
                                                    <label for="meal" className="col-form-label mt-0">Meal</label>
                                                </div>
                                                <div className="col-6">
                                                <div className="form-check">
                                                    <input required className="form-check-input" type="radio" value="Pizza" id={`childmeal1-${guest.id}`}
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
                                                    <label className="form-check-label" for={`childmeal1-${guest.id}`}>
                                                        Pizza
                                                    </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input required className="form-check-input" type="radio" value="Fish & Chips" id={`childmeal2-${guest.id}`}
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
                                                            <label className="form-check-label" for={`childmeal2-${guest.id}`}>
                                                                Fish & Chips
                                                            </label>
                                                    
                                                </div> </div>
                                            </div>
                                                : null}

                                            {guest.attending ? <div className="row g-3 align-items-center mt-3">
                                                    <div className="col-6">
                                                        <label for="dietery" className="col-form-label">Dietery restrictions</label>
                                                    </div>
                                                    <div className="col-6">
                                                        <input type="text" id="dietery" className="form-control" placeholder="Vegan, GF, etc."
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
                                    <label for="songrequests" className="form-label">What songs are guaranteed to get you up on the dance floor?</label>
                                    <textarea className="form-control" id="songrequests" name="songrequests" rows="3"></textarea>
                                </div>

                                <div className="mt-4">
                                    <label for="contact" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="contact" name="contact"/>
                                </div>
                                <div className="text-end mt-4">
                                    <button type="submit" class="btn btn-primary btn-lg">RSVP!</button>
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

