import React, { useState } from "react";

const NavBar = ({ grouping, onGroupingChange, sorting, onSortingChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="boundary">
      <div className="app_NavBar">
        <img src="/img/Display.svg" alt="" id="display-img"/>
        <h3 className="toggle-header">
          Display
          <img src="/img/down.svg" alt="" onClick={toggleVisibility} />
        </h3>
        {isVisible && (
          <div className="NavBar2">
            <label htmlFor="grouping" id="grouping">
              Grouping
            </label>
            <select value={grouping} onChange={onGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option> {/* Added option */}
            </select>

            <div id="order">
              <label htmlFor="sorting" id="ordering">
                Ordering
              </label>
              <select id="sorting" value={sorting} onChange={onSortingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
