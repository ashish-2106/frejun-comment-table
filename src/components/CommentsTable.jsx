import React, { useState } from 'react';
import { saveEditsToLocalStorage } from '../utils/localStorageHelper';

const ITEMS_PER_PAGE = 10;

export default function CommentsTable({ comments, posts, setComments, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [tempEdit, setTempEdit] = useState({ name: '', body: '' });

  const handleEditInit = (comment) => {
    setEditingId(comment.id);
    setTempEdit({ name: comment.name, body: comment.body });
  };

  const handleEditConfirm = (id) => {
    const updatedComments = comments.map(comment =>
      comment.id === id ? { ...comment, ...tempEdit } : comment
    );
    setComments(updatedComments);
    saveEditsToLocalStorage(id, 'name', tempEdit.name);
    saveEditsToLocalStorage(id, 'body', tempEdit.body);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const filteredComments = comments.filter(comment =>
    comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredComments.length / ITEMS_PER_PAGE);

  return (
    <div>
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.email}</td>
              <td onDoubleClick={() => handleEditInit(comment)}>
                {editingId === comment.id ? (
                  <div className="editable-cell">
                    <textarea
                      value={tempEdit.name}
                      onChange={(e) => setTempEdit({ ...tempEdit, name: e.target.value })}
                    />
                    <span className="action-icon" onClick={() => handleEditConfirm(comment.id)}>✅</span>
                    <span className="action-icon" onClick={handleEditCancel}>❌</span>
                  </div>
                ) : (
                  comment.name
                )}
              </td>
              <td onDoubleClick={() => handleEditInit(comment)}>
                {editingId === comment.id ? (
                  <div className="editable-cell">
                    <textarea
                      value={tempEdit.body}
                      onChange={(e) => setTempEdit({ ...tempEdit, body: e.target.value })}
                    />
                    <span className="action-icon" onClick={() => handleEditConfirm(comment.id)}>✅</span>
                    <span className="action-icon" onClick={handleEditCancel}>❌</span>
                  </div>
                ) : (
                  comment.body
                )}
              </td>
              <td>{posts[comment.postId] || 'Loading...'}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
     <div className="edit-notice">
         Double-click on Name or Body fields to edit. Press ✅ to save or ❌ to cancel.
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
    
  );
}
