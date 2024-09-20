import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TicketContainer from "./TicketContainer";
import './App.css';

const API = "https://api.quicksell.co/v1/internal/frontend-assignment";

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "status");
  const [sorting, setSorting] = useState(localStorage.getItem("sorting") || "none");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        if (Array.isArray(data)) {
          setTickets(data);
        } else if (data && data.tickets) {
          setTickets(data.tickets);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  // Save the grouping and sorting to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("sorting", sorting);
  }, [sorting]);

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const sortTickets = (tickets, sorting) => {
    switch (sorting) {
      case "priority":
        return [...tickets].sort((a, b) => b.priority - a.priority);
      case "title":
        return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };

  const groupTickets = (tickets, grouping) => {
    switch (grouping) {
      case "status":
        return tickets.reduce((acc, ticket) => {
          acc[ticket.status] = acc[ticket.status] || [];
          acc[ticket.status].push(ticket);
          return acc;
        }, {});
      case "user":
        return tickets.reduce((acc, ticket) => {
          acc[ticket.userId] = acc[ticket.userId] || [];
          acc[ticket.userId].push(ticket);
          return acc;
        }, {});
      case "priority":
        return tickets.reduce((acc, ticket) => {
          const priorityGroup = ticket.priority;
          const titleGroup = ticket.title;

          acc[priorityGroup] = acc[priorityGroup] || {};
          acc[priorityGroup][titleGroup] = acc[priorityGroup][titleGroup] || [];
          acc[priorityGroup][titleGroup].push(ticket);

          return acc;
        }, {});
      default:
        return tickets;
    }
  };

  const sortedTickets = sortTickets(tickets, sorting);
  const groupedTickets = groupTickets(sortedTickets, grouping);

  return (
    <div className="app">
      <NavBar 
        grouping={grouping} 
        onGroupingChange={handleGroupingChange} 
        sorting={sorting} 
        onSortingChange={handleSortingChange} 
      />
      <TicketContainer groupedTickets={groupedTickets} grouping={grouping} />
    </div>
  );
}

export default App;
