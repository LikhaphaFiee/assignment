import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/style.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import Notification from './components/Notification';

function App() {
  // Load initial data from localStorage (users, login status)
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const storedLoginStatus = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const storedUsername = localStorage.getItem('username') || "";

  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus);
  const [notification, setNotification] = useState("");
  const [users, setUsers] = useState(storedUsers);
  const [currentUser, setCurrentUser] = useState(storedUsername);
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(true); // New state to toggle forms

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('username', currentUser);

    if (currentUser) {
      localStorage.setItem(`products_${currentUser}`, JSON.stringify(products));
    }
  }, [isLoggedIn, currentUser, products]);

  useEffect(() => {
    if (currentUser) {
      const userProducts = JSON.parse(localStorage.getItem(`products_${currentUser}`)) || [];
      setProducts(userProducts);
    }
  }, [currentUser]);

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      setNotification(`Welcome, ${username}!`);
      const userProducts = JSON.parse(localStorage.getItem(`products_${username}`)) || [];
      setProducts(userProducts);
    } else {
      setNotification("Invalid username or password! Please sign up first if you don't have an account.");
    }
  };

  const handleSignup = (username, password) => {
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      setNotification("Username already taken! Please log in.");
    } else {
      const newUser = { username, password };
      setUsers([...users, newUser]);
      setNotification("Signup successful! Please log in.");
      setShowLogin(true); // Switch to login form after signup
      setProducts([]);
    }
  };

  const addProduct = (newProduct) => {
    const existingProduct = products.find(product => product.name === newProduct.name);
    if (existingProduct) {
      setNotification("Product already exists!");
    } else {
      newProduct.originalQuantity = newProduct.quantity;
      setProducts([...products, newProduct]);
      setNotification("Product added successfully!");
    }
  };

  const checkStockLevel = (product) => {
    const threshold = product.originalQuantity * 0.7;
    if (product.quantity <= threshold) {
      setNotification(`Warning! Stock for ${product.name} has dropped by 30% or more.`);
    }
  };

  const sellProduct = (productId, quantity) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        if (product.quantity < quantity) {
          setNotification("Not enough stock!");
        } else {
          product.quantity -= quantity;
          checkStockLevel(product);
          setNotification(`Product sold successfully! Be aware that the remaining stock for ${product.name}: ${product.quantity}`);
        }
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    setNotification('Product deleted successfully!');
  };

  const addUser = (newUser) => {
    const userExists = users.some(user => user.username === newUser.username);
    if (userExists) {
      setNotification("User already exists!");
    } else {
      setUsers([...users, newUser]);
      setNotification("User added successfully!");
    }
  };

  const editUser = (index, updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
    setNotification("User updated successfully!");
  };

  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
    setNotification("User deleted successfully!");
  };

  const editProduct = (index, updatedProduct) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
    setNotification("Product updated successfully!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    setProducts([]);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setNotification("You have been logged out.");
  };

  return (
    <Router>
      <div className="container">
        <h1>
          <img src="/th.jpeg" alt="Logo" className="logo" />
          Wings Cafe Inventory System
        </h1>

        {isLoggedIn && (
          <Navbar handleNavigation={() => {}} handleLogout={handleLogout} />
        )}

        {notification && <Notification message={notification} />}

        <Routes>
          {!isLoggedIn ? (
            <>
              <Route
                path="/"
                element={
                  <>
                    {showLogin ? (
                      <LoginForm handleLogin={handleLogin} />
                    ) : (
                      <SignupForm handleSignup={handleSignup} />
                    )}
                    {/* Remove the signup prompt and leave the toggle button only */}
                    <button onClick={() => setShowLogin(!showLogin)}>
                      {showLogin ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                    </button>
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard products={products} sellProduct={sellProduct} deleteProduct={deleteProduct} />}
              />
              <Route
                path="/productManagement"
                element={<ProductManagement products={products} addProduct={addProduct} editProduct={editProduct} sellProduct={sellProduct} />}
              />
              <Route
                path="/userManagement"
                element={<UserManagement users={users} addUser={addUser} editUser={editUser} deleteUser={deleteUser} />}
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;