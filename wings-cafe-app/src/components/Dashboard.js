import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import image1 from '../assets/images/image1.jpeg';
import image2 from '../assets/images/image2.jpeg';
import image3 from '../assets/images/image3.jpeg';
import image4 from '../assets/images/image4.jpeg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ products, deleteProduct }) => {
  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchNotification, setSearchNotification] = useState('');

  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSearch = () => {
    const foundProduct = products.find(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundProduct) {
      setSearchResult(foundProduct);
      setSearchNotification('');
    } else {
      setSearchResult(null);
      setSearchNotification(`No product found with name: ${searchTerm}`);
    }
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      deleteProduct(productId);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Stock Quantity',
        data: products.map((product) => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-content" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background with sliding images */}
      <div
        className="dashboard-background"
        style={{
          backgroundImage: `url(${images[backgroundIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          transition: 'background-image 1s ease-in-out',
        }}
      ></div>

      <h2>Dashboard</h2>
      <p>Total Quantity: {totalQuantity}</p>

      {/* Stock Levels Bar Chart */}
      <div style={{ width: '80%', margin: '20px auto', height: '300px' }}>
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Search Product */}
      <div>
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResult && (
        <div>
          <h4>Product Found:</h4>
          <p>Name: {searchResult.name}</p>
          <p>Price: M{searchResult.price}</p>
          <p>Quantity: {searchResult.quantity}</p>
        </div>
      )}
      {searchNotification && <p className="notification">{searchNotification}</p>}

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6">No products available.</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
