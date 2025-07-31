import React from 'react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar">
      <h1> Comments Dashboard</h1>
      <input
        type="text"
        placeholder="Search by Name, Email, Body"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </nav>
  );
}