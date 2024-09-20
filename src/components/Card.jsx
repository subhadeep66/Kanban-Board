import React from "react";
import "./Card.css";

const statusImages = {
  cancelled: '/img/Cancelled.svg',
  Inprogress: '/img/in-progress.svg',
  completed: '/img/Done.svg',
  Todo: '/img/To-do.svg', 
  Backlog: '/img/Backlog.svg'
};

function Card({ user, grouping }) {
  return (
    <div className="MainCard">
      {user.map((curUser) => {
        const { id, title, priority, status } = curUser;
        const statusImage = statusImages[status] || '/img/default-status.svg'; // Default image if status not found

        return (
          <div key={id} className="card">
            <p className="id-text">{id}</p>
            <div className="card-header">
  
              <img 
                src={statusImage} // 
                className="status-logo"
              />
              <p className="title">{title}</p>
            </div>
            <p id="feature">Feature Request</p>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
