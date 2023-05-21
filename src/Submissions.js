import React, { useEffect, useState } from "react";
import $ from 'jquery';
import './submissions.css'


export default function Submissions() {
  
    const [submissions, setSubmissions] = useState([]);
    const [attendanceFilter, setAttendanceFilter] = useState('all');
   
    useEffect(() => {
       $.ajax({
            url: "https://3frsl5q2h2.execute-api.ap-southeast-2.amazonaws.com/default/RSVP",
            type: "GET",
            crossDomain: true,
            dataType: "json",
            contentType:"application/json; charset=utf-8",
            success: function (response) {
                console.log('RES', response);
                setSubmissions(response.data.filter(submissions => {
                    return submissions.submitted;
                }).sort((a, b) => {
                    return new Date(b?.submitted) - new Date(a?.submitted);
                }));
            },
            error: function (xhr, status) {
            
            }
        });
    }, []);

    const guestList = submissions?.map((submission) => {
        return submission?.guests;
    })?.flat(1);

    const attendingCount = guestList?.filter((guest) => {
        return !!guest?.attending;
    });

    const notAttendingCount = guestList?.filter((guest) => {
        return !guest?.attending;
    });

  return (
      <div className="submissions-container">
          <div className="m-3">
              <select onChange={(e) => setAttendanceFilter(e.target.value)} defaultValue="all">
                  <option value="all">Show All</option>
                  <option value="attending">Only show attending</option>
                  <option value="notattending">Only show not attending</option>
                  <option value="dietery">Only show dietery</option>
              </select>
          </div>
       <table>
              <thead>
                  <tr>
                      <th>Submitted</th>
                      <th>Guest</th>
                      <th>Attending (Yes: {attendingCount?.length}  No: {notAttendingCount?.length})</th>
                      <th>Dietery</th>
                      <th>Songs</th>
                      <th>Email</th>
                      <th>Comments</th>
                  </tr>
              </thead>
              <tbody>
                  {submissions.map((submission, i) => {
                      return submission.guests.filter((guest) => {
                          if (attendanceFilter === 'attending' && !guest.attending) {
                              return false;
                          }
                          if (attendanceFilter === 'notattending' && !!guest.attending) {
                              return false;
                          }
                          if (attendanceFilter === 'dietery' && !guest.dietery) {
                              return false;
                          }
                          return true;
                      }).map((guest, index) => {
                          return <tr key={guest.id} style={{
                              backgroundColor: i % 2 ? 'rgba(var(--theme-sage-rgb), 0.1)' : 'rgba(var(--theme-sage-rgb), 0.3)'
                          }}>
                              <td>{new Date(submission.submitted).toLocaleString()}</td>
                              <td>{guest.name} {guest.baby ? <i className="fas fa-baby"></i> : guest.child ? <i className="fas fa-child"></i> : ''}</td>
                              <td>{guest.attending ? 'Yes' : 'No'}</td>
                              <td>{guest.dietery}</td>
                              <td>{index === 0 ? submission.songrequests : ''}</td>
                              <td>{index === 0 ? submission.contact : ''}</td>
                              <td>{index === 0 ? submission.comments : ''}</td>
                          </tr>
                      })
                        
            })}
        
        </tbody>
       </table>
    </div>
  );
}

