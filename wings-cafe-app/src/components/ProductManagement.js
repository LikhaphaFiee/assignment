import React, { useState } from 'react';

function ProductManagement({ products, addProduct, editProduct, sellProduct }) { // Added sellProduct prop
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === -1) {
      addProduct({
        ...formValues,
        id: Date.now(),
        price: parseFloat(formValues.price),
        quantity: parseInt(formValues.quantity),
      });
    } else {
      editProduct(editingIndex, {
        ...formValues,
        price: parseFloat(formValues.price),
        quantity: parseInt(formValues.quantity),
      });
    }

    setFormValues({
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
    });
    setEditingIndex(-1);
  };

  const handleEdit = (index) => {
    const productToEdit = products[index];
    setFormValues(productToEdit);
    setEditingIndex(index);
  };

  const handleSell = (productId) => {
    const quantityToSell = parseInt(prompt("Enter quantity to sell:"), 10);
    if (isNaN(quantityToSell) || quantityToSell <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    sellProduct(productId, quantityToSell);
  };

  return (
    <section id="productForm">
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={formValues.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={formValues.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-row">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={formValues.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
            min="0"
            step="1"
          />
        </div>

        <button type="submit">
          {editingIndex === -1 ? 'Add Product' : 'Update Product'}
        </button>
      </form>

      <h3>Product List</h3>
      <ul>
        {products.map((product, index) => (
          <li key={product.id}>
            {product.name} - {product.quantity} units at ${product.price}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleSell(product.id)}>Sell</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductManagement;
