import React from "react";
import TicketColumn from "./TicketColumn";

const TicketContainer = ({ groupedTickets, grouping }) => {
  return (
    <div className="ticket-container">
      {Object.keys(groupedTickets).map((group) => (
        <TicketColumn
          key={group}
          group={group}
          tickets={groupedTickets[group]}
          grouping={grouping}
        />
      ))}
    </div>
  );
};

export default TicketContainer;
