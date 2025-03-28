  // import React, { useState } from 'react';

  // function ManageProduct() {
  //   const [products, setProducts] = useState([
  //     { id: 1, name: 'Salad', description: 'Fresh green salad', category: 'Salad', price: 25, image: null }
  //   ]);

  //   const [newProduct, setNewProduct] = useState({
  //     name: '',
  //     description: '',
  //     category: 'Salad',
  //     price: '',
  //     image: null
  //   });

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setNewProduct(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   };

  //   const handleImageUpload = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setNewProduct(prev => ({
  //         ...prev,
  //         image: URL.createObjectURL(file)
  //       }));
  //     }
  //   };

  //   const addProduct = () => {
  //     // Validate input
  //     if (!newProduct.name || !newProduct.description || !newProduct.price) {
  //       alert('Please fill in all fields');
  //       return;
  //     }

  //     const productToAdd = {
  //       ...newProduct,
  //       id: products.length + 1,
  //       price: parseFloat(newProduct.price)
  //     };

  //     setProducts(prev => [...prev, productToAdd]);
      
  //     // Reset form
  //     setNewProduct({
  //       name: '',
  //       description: '',
  //       category: 'Salad',
  //       price: '',
  //       image: null
  //     });
  //   };

  //   const deleteProduct = (id) => {
  //     setProducts(prev => prev.filter(product => product.id !== id));
  //   };

  //   return (
  //     <div style={{ 
  //       backgroundColor: 'white', 
  //       borderRadius: '12px', 
  //       padding: '20px',
  //       boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  //     }}>
  //       <h1 style={{ 
  //         color: '#333', 
  //         marginBottom: '20px',
  //         borderBottom: '2px solid #f0f0f0',
  //         paddingBottom: '10px'
  //       }}>
  //         Manage Products
  //       </h1>

  //       {/* Add Product Form */}
  //       <div style={{ 
  //         backgroundColor: '#f9f9f9', 
  //         padding: '20px', 
  //         borderRadius: '8px',
  //         marginBottom: '20px'
  //       }}>
  //         <h2 style={{ color: '#333', marginBottom: '15px' }}>Add New Product</h2>
          
  //         <div style={{ display: 'flex', gap: '20px' }}>
  //           {/* Left Column - Image Upload */}
  //           <div style={{ 
  //             flex: '0 0 200px', 
  //             display: 'flex', 
  //             flexDirection: 'column', 
  //             alignItems: 'center' 
  //           }}>
  //             <div style={{ 
  //               width: '200px', 
  //               height: '200px', 
  //               border: '2px dashed #ddd',
  //               display: 'flex',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               marginBottom: '10px',
  //               borderRadius: '8px',
  //               overflow: 'hidden'
  //             }}>
  //               {newProduct.image ? (
  //                 <img 
  //                   src={newProduct.image} 
  //                   alt="Product" 
  //                   style={{ 
  //                     width: '100%', 
  //                     height: '100%', 
  //                     objectFit: 'cover' 
  //                   }} 
  //                 />
  //               ) : (
  //                 <span style={{ color: '#888' }}>Upload image</span>
  //               )}
  //             </div>
  //             <input 
  //               type="file" 
  //               accept="image/*"
  //               onChange={handleImageUpload}
  //               style={{ 
  //                 width: '100%', 
  //                 padding: '10px', 
  //                 backgroundColor: '#f0f0f0',
  //                 border: 'none',
  //                 borderRadius: '4px'
  //               }}
  //             />
  //           </div>

  //           {/* Right Column - Product Details */}
  //           <div style={{ flex: 1 }}>
  //             <div style={{ marginBottom: '15px' }}>
  //               <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
  //                 Product name
  //               </label>
  //               <input
  //                 type="text"
  //                 name="name"
  //                 placeholder="Type here"
  //                 value={newProduct.name}
  //                 onChange={handleInputChange}
  //                 style={{ 
  //                   width: '100%', 
  //                   padding: '10px', 
  //                   border: '1px solid #ddd',
  //                   borderRadius: '4px'
  //                 }}
  //               />
  //             </div>

  //             <div style={{ marginBottom: '15px' }}>
  //               <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
  //                 Product description
  //               </label>
  //               <textarea
  //                 name="description"
  //                 placeholder="Write content here"
  //                 value={newProduct.description}
  //                 onChange={handleInputChange}
  //                 style={{ 
  //                   width: '100%', 
  //                   padding: '10px', 
  //                   border: '1px solid #ddd',
  //                   borderRadius: '4px',
  //                   minHeight: '100px'
  //                 }}
  //               />
  //             </div>

  //             <div style={{ 
  //               display: 'flex', 
  //               gap: '15px',
  //               justifyContent: 'space-between' 
  //             }}>
  //               <div style={{ flex: 1 }}>
  //                 <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
  //                   Product category
  //                 </label>
  //                 <select
  //                   name="category"
  //                   value={newProduct.category}
  //                   onChange={handleInputChange}
  //                   style={{ 
  //                     width: '100%', 
  //                     padding: '10px', 
  //                     border: '1px solid #ddd',
  //                     borderRadius: '4px'
  //                   }}
  //                 >
  //                   <option value="Salad">Salad</option>
  //                   <option value="Drinks">Drinks</option>
  //                   <option value="Dessert">Dessert</option>
  //                 </select>
  //               </div>

  //               <div style={{ flex: 1 }}>
  //                 <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
  //                   Product Price
  //                 </label>
  //                 <input
  //                   type="number"
  //                   name="price"
  //                   placeholder="$25"
  //                   value={newProduct.price}
  //                   onChange={handleInputChange}
  //                   style={{ 
  //                     width: '100%', 
  //                     padding: '10px', 
  //                     border: '1px solid #ddd',
  //                     borderRadius: '4px'
  //                   }}
  //                 />
  //               </div>
  //             </div>

  //             <button
  //               onClick={addProduct}
  //               style={{
  //                 width: '100%',
  //                 padding: '12px',
  //                 backgroundColor: 'black',
  //                 color: 'white',
  //                 border: 'none',
  //                 borderRadius: '4px',
  //                 marginTop: '15px',
  //                 cursor: 'pointer'
  //               }}
  //             >
  //               ADD
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Product List */}
  //       <div>
  //         <h2 style={{ color: '#333', marginBottom: '15px' }}>Product List</h2>
  //         <table style={{ 
  //           width: '100%', 
  //           borderCollapse: 'collapse',
  //           backgroundColor: 'white'
  //         }}>
  //           <thead>
  //             <tr style={{ backgroundColor: '#f0f0f0' }}>
  //               <th style={{ 
  //                 padding: '12px', 
  //                 textAlign: 'left', 
  //                 borderBottom: '1px solid #ddd' 
  //               }}>Image</th>
  //               <th style={{ 
  //                 padding: '12px', 
  //                 textAlign: 'left', 
  //                 borderBottom: '1px solid #ddd' 
  //               }}>Product Name</th>
  //               <th style={{ 
  //                 padding: '12px', 
  //                 textAlign: 'left', 
  //                 borderBottom: '1px solid #ddd' 
  //               }}>Description</th>
  //               <th style={{ 
  //                 padding: '12px', 
  //                 textAlign: 'left', 
  //                 borderBottom: '1px solid #ddd' 
  //               }}>Category</th>
  //               <th style={{ 
  //                 padding: '12px', 
  //                 textAlign: 'left', 
  //                 borderBottom: '1px solid #ddd' 
  //               }}>Price</th>
  //               <th style={{ 
  //                 padding: '12px', 
  //                 textAlign: 'left', 
  //                 borderBottom: '1px solid #ddd' 
  //               }}>Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {products.map(product => (
  //               <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
  //                 <td style={{ padding: '12px' }}>
  //                   {product.image ? (
  //                     <img 
  //                       src={product.image} 
  //                       alt={product.name} 
  //                       style={{ 
  //                         width: '50px', 
  //                         height: '50px', 
  //                         objectFit: 'cover',
  //                         borderRadius: '4px'
  //                       }} 
  //                     />
  //                   ) : (
  //                     <div style={{ 
  //                       width: '50px', 
  //                       height: '50px', 
  //                       backgroundColor: '#f0f0f0',
  //                       display: 'flex',
  //                       justifyContent: 'center',
  //                       alignItems: 'center',
  //                       borderRadius: '4px'
  //                     }}>
  //                       No Image
  //                     </div>
  //                   )}
  //                 </td>
  //                 <td style={{ padding: '12px' }}>{product.name}</td>
  //                 <td style={{ padding: '12px' }}>{product.description}</td>
  //                 <td style={{ padding: '12px' }}>{product.category}</td>
  //                 <td style={{ padding: '12px' }}>${product.price.toFixed(2)}</td>
  //                 <td style={{ padding: '12px' }}>
  //                   <button
  //                     onClick={() => deleteProduct(product.id)}
  //                     style={{ 
  //                       backgroundColor: '#ff6347', 
  //                       color: 'white', 
  //                       border: 'none',
  //                       padding: '6px 12px',
  //                       borderRadius: '4px',
  //                       cursor: 'pointer'
  //                     }}
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }

  // export default ManageProduct;
 
  import React, { useEffect, useState } from "react";
import "./ManageProduct.css"; // Import the CSS file

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/sampleproduct/all");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addProduct = async () => {
        try {
            const response = await fetch("http://localhost:5000/sampleproduct/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });

            const data = await response.json();
            if (response.ok) {
                fetchProducts();
                setNewProduct({ name: "", description: "", category: "", price: "", image: "" });
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await fetch(`http://localhost:5000/sampleproduct/delete/${id}`, { method: "DELETE" });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container">
           

            <h1 className="title">Manage Products</h1>

            {/* Add Product Form */}
            <div className="form-container">
                <h2>Add New Product</h2>
                <div className="form-group">
                    <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <input type="text" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                </div>
                <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
                <div className="form-group">
                    <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <input type="text" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                </div>
                <button className="add-btn" onClick={addProduct}>Add Product</button>
            </div>

            {/* Product List */}
            <h2 className="product-title">Existing Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageProduct;
