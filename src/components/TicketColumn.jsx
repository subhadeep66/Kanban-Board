import React from "react";
import Card from "./Card";
import { userMap, priorityMap } from "./constants";
import { statusImages, priorityImages } from "./constants"; 

const TicketColumn = ({ group, tickets, grouping }) => {
  const displayGroup = grouping === "priority"
    ? priorityMap[group] || "Unknown"
    : grouping === "user"
    ? userMap[group] || "Unknown"
    : group;

  const count = grouping === "priority"
    ? Object.values(tickets).flat().length
    : tickets.length;

  // Determine the image to display based on grouping
  const getStatusImage = () => {
    if (grouping === "status") {
      const statusKey = tickets.length > 0 ? tickets[0].status.toLowerCase() : 'default'; // Convert to lower case for matching
      return statusImages[statusKey] || statusImages.default;
    }
    return null;
  };

  // Determine the priority image to display
  const getPriorityImage = () => {
    if (grouping === "priority") {
      // Get the priority of the first ticket to determine the image
      const firstTicket = Object.values(tickets)[0][0]; // Get the first ticket from the first title group
      const priorityKey = firstTicket.priority; // Get priority level
      return priorityImages[priorityKey] || priorityImages[0]; // Default to 'No priority'
    }
    return null;
  };

  const statusImage = getStatusImage();
  const priorityImage = getPriorityImage();

  return (
    <div className="ticket-column">
      <div className="header">
        <h2 id="display">
          {priorityImage && grouping !== "user" && (
            <img
              src={priorityImage}
              alt="Priority"
              className="priority-image"
            />
          )}
          {statusImage && grouping === "status" && (
            <img
              src={statusImage}
              alt="Status"
              className="status-image"
            />
          )}
          {`${displayGroup} `}
          {grouping === "user" && (
            <img
              src="https://w7.pngwing.com/pngs/802/786/png-transparent-google-account-google-search-customer-service-google-logo-login-button-blue-sphere-car-rental-thumbnail.png" // Update this path to the actual location of your logo image
              alt="Logo"
              className="logo-header"
            />
          )}
          <span className="count">{count}</span>
          <img src="/img/add.svg" alt="" id="add" />
          <img src="/img/3 dot menu.svg" alt="" id="dot3" />
        </h2>
      </div>
      {grouping === "priority" ? (
        Object.keys(tickets).map((title) => {
          const ticketsForTitle = tickets[title];
          return (
            <Card key={title} user={ticketsForTitle} grouping={grouping} />
          );
        })
      ) : (
        <Card user={tickets} grouping={grouping} />
      )}
    </div>
  );
};

export default TicketColumn;
