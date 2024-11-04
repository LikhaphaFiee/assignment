import React, { useState } from 'react';

function UserManagement({ users, addUser, editUser, deleteUser }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // If editing, update the user
      editUser(editIndex, { username: newUsername, password: newPassword });
      setNotification('User updated successfully!');
      setIsEditing(false);
    } else {
      // Add new user
      addUser({ username: newUsername, password: newPassword });
      setNotification('User added successfully!');
    }

    // Clear input fields after submission
    setNewUsername('');
    setNewPassword('');
  };

  // Handle edit button click
  const handleEdit = (index) => {
    setNewUsername(users[index].username);
    setNewPassword(users[index].password);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    deleteUser(index);
    setNotification('User deleted successfully!');
  };

  // Handle cancel edit
  const cancelEdit = () => {
    setNewUsername('');
    setNewPassword('');
    setIsEditing(false);
    setNotification('Edit canceled');
  };

  return (
    <section id="userManagement">
      <h2>User Management</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="newUsername">Username</label>
          <input 
            type="text" 
            id="newUsername" 
            placeholder="Username" 
            value={newUsername} 
            onChange={(e) => setNewUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-row">
          <label htmlFor="newPassword">Password</label>
          <input 
            type="password" 
            id="newPassword" 
            placeholder="Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
        {isEditing && (
          <button type="button" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* Notification for user actions */}
      {notification && <p className="notification">{notification}</p>}

      <table id="userTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UserManagement;
