

// export default ManageProduct;
import React, { useEffect, useState } from "react";
import "./ManageProduct.css"; 

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        gender: "",
        price: "",
        image: "",
        images: "", 
        sizes: "", 
        resolution: "",
        stock: "Available",
        frameMaterial: "",
        lensMaterial: "",
        features: "",
        discount: "0"
    });

    const categories = [
        "Computer Glasses",
        "Sunglasses",
        "Eye Glasses",
        "Contact Lenses",
        "Reading Glasses"
    ];

    const genderOptions = ["Male", "Female", "Kids", "Unisex"];
    
    const subCategoryOptions = {
        "Computer Glasses": ["Blu 0 Computer Glasses", "Premium Range", "Gaming Glasses"],
        "Sunglasses": ["Aviator", "Wayfarer", "Round", "Sports"],
        "Eye Glasses": ["Full Frame", "Half Rim", "Rimless", "Premium"],
        "Contact Lenses": ["Daily Wear", "Monthly", "Colored", "Toric"],
        "Reading Glasses": ["Basic", "Premium", "Foldable"]
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sampleproduct/all`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addProduct = async () => {
        try {
            const formattedData = {
                ...newProduct,
                images: newProduct.images.split(",").map((url) => url.trim()), 
                sizes: newProduct.sizes.split(",").map((size) => size.trim()),
                features: newProduct.features.split(",").map((feature) => feature.trim())
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sampleproduct/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData)
            });

            if (response.ok) {
                fetchProducts();
                resetForm();
            } else {
                alert("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async () => {
        try {
            // Make sure we format arrays correctly for the update
            const formattedProduct = {
                ...editingProduct,
                images: Array.isArray(editingProduct.images) 
                    ? editingProduct.images 
                    : editingProduct.images.split(",").map(url => url.trim()),
                sizes: Array.isArray(editingProduct.sizes) 
                    ? editingProduct.sizes 
                    : editingProduct.sizes.split(",").map(size => size.trim()),
                features: Array.isArray(editingProduct.features) 
                    ? editingProduct.features 
                    : (editingProduct.features || "").split(",").map(feature => feature.trim())
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sampleproduct/update/${editingProduct._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedProduct)
            });

            if (response.ok) {
                fetchProducts();
                setEditingProduct(null);
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/sampleproduct/delete/${id}`, { method: "DELETE" });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const resetForm = () => {
        setNewProduct({
            name: "",
            description: "",
            category: "",
            subCategory: "",
            gender: "",
            price: "",
            image: "",
            images: "",
            sizes: "",
            resolution: "",
            stock: "Available",
            frameMaterial: "",
            lensMaterial: "",
            features: "",
            discount: "0"
        });
    };

    const handleCategoryChange = (e, isEditing) => {
        const selectedCategory = e.target.value;
        if (isEditing) {
            setEditingProduct({
                ...editingProduct,
                category: selectedCategory,
                subCategory: "" // Reset subcategory when category changes
            });
        } else {
            setNewProduct({
                ...newProduct,
                category: selectedCategory,
                subCategory: "" // Reset subcategory when category changes
            });
        }
    };

    return (
        <div className="container">
            <h1 className="title">Manage Products</h1>

            {/* Add / Edit Product Form */}
            <div className="form-container">
                <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={editingProduct ? editingProduct.name : newProduct.name} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })} 
                    />
                    
                    <select 
                        value={editingProduct ? editingProduct.category : newProduct.category} 
                        onChange={(e) => handleCategoryChange(e, !!editingProduct)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <select 
                        value={editingProduct ? editingProduct.subCategory : newProduct.subCategory} 
                        onChange={(e) => editingProduct 
                            ? setEditingProduct({ ...editingProduct, subCategory: e.target.value }) 
                            : setNewProduct({ ...newProduct, subCategory: e.target.value })}
                        disabled={!(editingProduct ? editingProduct.category : newProduct.category)}
                    >
                        <option value="">Select Sub-Category</option>
                        {(editingProduct ? editingProduct.category : newProduct.category) && 
                            subCategoryOptions[editingProduct ? editingProduct.category : newProduct.category].map((subCat) => (
                                <option key={subCat} value={subCat}>{subCat}</option>
                            ))
                        }
                    </select>

                    <select 
                        value={editingProduct ? editingProduct.gender : newProduct.gender} 
                        onChange={(e) => editingProduct 
                            ? setEditingProduct({ ...editingProduct, gender: e.target.value }) 
                            : setNewProduct({ ...newProduct, gender: e.target.value })}
                    >
                        <option value="">Select Gender</option>
                        {genderOptions.map((gender) => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>

                <textarea 
                    placeholder="Description" 
                    value={editingProduct ? editingProduct.description : newProduct.description} 
                    onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
                
                <div className="form-group">
                    <input 
                        type="number" 
                        placeholder="Price" 
                        value={editingProduct ? editingProduct.price : newProduct.price} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })} 
                    />
                    <input 
                        type="number" 
                        placeholder="Discount (%)" 
                        value={editingProduct ? editingProduct.discount || "0" : newProduct.discount} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discount: e.target.value }) : setNewProduct({ ...newProduct, discount: e.target.value })} 
                    />
                </div>
                
                <input 
                    type="text" 
                    placeholder="Main Image URL" 
                    value={editingProduct ? editingProduct.image : newProduct.image} 
                    onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value })} 
                />
                
                <input 
                    type="text" 
                    placeholder="Additional Image URLs (comma-separated)" 
                    value={editingProduct ? (Array.isArray(editingProduct.images) ? editingProduct.images.join(", ") : editingProduct.images) : newProduct.images} 
                    onChange={(e) => editingProduct 
                        ? setEditingProduct({ ...editingProduct, images: e.target.value }) 
                        : setNewProduct({ ...newProduct, images: e.target.value })} 
                />
                
                <input 
                    type="text" 
                    placeholder="Available Sizes (comma-separated)" 
                    value={editingProduct ? (Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(", ") : editingProduct.sizes) : newProduct.sizes} 
                    onChange={(e) => editingProduct 
                        ? setEditingProduct({ ...editingProduct, sizes: e.target.value }) 
                        : setNewProduct({ ...newProduct, sizes: e.target.value })} 
                />
                
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Frame Material" 
                        value={editingProduct ? editingProduct.frameMaterial || "" : newProduct.frameMaterial} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, frameMaterial: e.target.value }) : setNewProduct({ ...newProduct, frameMaterial: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="Lens Material" 
                        value={editingProduct ? editingProduct.lensMaterial || "" : newProduct.lensMaterial} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, lensMaterial: e.target.value }) : setNewProduct({ ...newProduct, lensMaterial: e.target.value })} 
                    />
                </div>
                
                <input 
                    type="text" 
                    placeholder="Features (comma-separated)" 
                    value={editingProduct ? (Array.isArray(editingProduct.features) ? editingProduct.features.join(", ") : editingProduct.features || "") : newProduct.features} 
                    onChange={(e) => editingProduct 
                        ? setEditingProduct({ ...editingProduct, features: e.target.value }) 
                        : setNewProduct({ ...newProduct, features: e.target.value })} 
                />
                
                <select 
                    value={editingProduct ? editingProduct.stock : newProduct.stock} 
                    onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value })}
                >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                {editingProduct ? (
                    <div className="button-group">
                        <button className="update-btn" onClick={updateProduct}>Update Product</button>
                        <button className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </div>
                ) : (
                    <button className="add-btn" onClick={addProduct}>Add Product</button>
                )}
            </div>

            {/* Product List */}
            <h2 className="product-title">Existing Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                        <h3>{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <div className="product-details">
                            <p><strong>Category:</strong> {product.category}</p>
                            {product.subCategory && <p><strong>Sub-Category:</strong> {product.subCategory}</p>}
                            {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
                            <p><strong>Price:</strong> ${product.price}</p>
                            {product.discount && product.discount !== "0" && (
                                <p><strong>Discount:</strong> {product.discount}%</p>
                            )}
                            <p><strong>Stock:</strong> {product.stock}</p>
                        </div>
                        <div className="product-actions">
                            <button className="edit-btn" onClick={() => setEditingProduct(product)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageProduct;