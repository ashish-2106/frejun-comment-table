import React, { useState } from 'react';
import useCommentsData from './hooks/useCommentsData';
import Navbar from './components/Navbar';
import CommentsTable from './components/CommentsTable';
import './App.css';

function App() {
  const { comments, posts, loading, setComments } = useCommentsData();
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CommentsTable
        comments={comments}
        posts={posts}
        setComments={setComments}
        searchQuery={searchQuery}
      />
    </div>
  );
}
export default App;