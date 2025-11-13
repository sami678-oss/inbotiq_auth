
import React, { useState, useEffect, useCallback } from "react";

const API_ROOT = "https://inbotiq-backend-xkqs.onrender.com";
const PRODUCT_URL = `${API_ROOT}/api/products`; 

const MessageModal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white p-8 rounded-2xl max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className={`text-2xl font-bold mb-3 ${title.includes("Success") || title.includes("✅") ? 'text-green-600' : 'text-blue-600'}`}>{title.replace(/[✅❌⚠️]/g, '').trim()}</h2>
            <p className="mb-5 text-gray-700">{message.replace(/[✅❌⚠️]/g, '').trim()}</p>
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md cursor-pointer transition hover:bg-blue-700 active:shadow-none"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);


export default function HomePage({ userRole, onLogout }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("low");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "https://i.ibb.co/TDHMqg8C/Product.jpg",
    rateing: "",
  });
  const [wishlist, setWishlist] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  

  const [clientName, setClientName] = useState("Guest"); 
  const [userId, setUserId] = useState(null); 
  const [alertMessage, setAlertMessage] = useState(null);
  const customAlert = (title, message) => setAlertMessage({ title, message });


  const fetchWishlist = useCallback(async (currentUserId) => {
    if (currentUserId) {
    }
  }, []);

  
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(PRODUCT_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      customAlert("Network Error", "Could not connect to the backend server to load products.");
    }
  }, []);


  
  useEffect(() => {

    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
        try {
            const user = JSON.parse(storedUserInfo);
            
           
            setClientName(user.name || user.email.split('@')[0] || user.role); 
            
        
            setUserId(user.id); 
            
          
            fetchWishlist(user.id);
        } catch (e) {
            console.error("Error parsing user info:", e);
        }
    }

    fetchProducts();
  }, [fetchProducts, fetchWishlist]);


  
  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.category
    ) {
      customAlert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(PRODUCT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        customAlert("❌ Failed to Add", errorData.message || "Failed to add product due to a server error.");
        return;
      }

      const savedProduct = await res.json();
      setProducts([savedProduct, ...products]);
      setNewProduct({
        name: "", price: "", description: "", category: "",
        image: "https://i.ibb.co/TDHMqg8C/Product.jpg",
        rateing: ""
      });
      setShowAddModal(false);
      customAlert("✅ Success", "Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      customAlert("Network Error", "Could not connect to the backend server to add product.");
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${PRODUCT_URL}/${productToDelete._id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
          customAlert("❌ Deletion Failed", "Failed to delete product. Server response not successful.");
          return;
      }
      
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
      customAlert("✅ Success", "Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      customAlert("Network Error", "Could not connect to the backend server to delete product.");
    }
  };



  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "low" ? a.price - b.price : b.price - a.price
  );

  const filteredProducts = sortedProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="home-container">
    
      <nav 
        className="w-full fixed top-0 left-0 z-10 bg-white border-b border-gray-200 shadow-sm"
      >
        <div 
          className="max-w-screen-xl mx-auto px-5 py-3 flex justify-between items-center"
        >
          <h1 
            className="text-xl font-bold text-blue-600"
          >
            Product Store
          </h1>
          <div 
            className="flex items-center gap-4"
          >
            
            <span 
              className="font-medium text-gray-700 hidden sm:inline"
            >
              Welcome, **{clientName}** ({userRole})
            </span>
         
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer transition duration-200 hover:bg-red-700" 
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div 
        className="max-w-screen-xl mx-auto px-5 mt-24 pb-5"
      >
    
        <header className="flex justify-between items-center mb-5 flex-wrap gap-3">
          <h2 className="text-2xl font-bold m-0">Products</h2>
        </header>

       
        <div 
          className="flex flex-wrap justify-between items-center mb-5 gap-3"
        >
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 min-w-[200px]"
          />
          <div 
            className="flex items-center gap-3 w-full sm:w-auto"
          >
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              className="px-4 py-2 rounded-lg border border-gray-300 flex-1"
            >
              <option value="low">Sort by price: Low to High</option>
              <option value="high">Sort by price: High to Low</option>
            </select>
            {userRole === "admin" && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition duration-200 hover:bg-blue-700"
                onClick={() => setShowAddModal(true)}
              >
                + Add Product
              </button>
            )}
          </div>
          
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className="relative bg-white p-4 rounded-xl shadow-lg text-center transition duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              {userRole === "admin" && (
                <button
                  className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center cursor-pointer transition hover:bg-red-700"
                  onClick={() => confirmDelete(product)}
                >
                  &times;
                </button>
              )}

              <img src={product.image} alt={product.name} className="max-w-full rounded-lg" />
              <h3 className="mt-3 mb-1 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <p className="font-bold text-xl text-blue-600">₹{product.price.toFixed(2)}</p>
              <span className="inline-block bg-gray-100 text-xs px-3 py-1 rounded-full mt-2 font-medium">
                {product.category}
              </span>

              
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <label className="block font-semibold mt-3 mb-1">Product Name *</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Enter product name"
            />
            <label className="block font-semibold mt-3 mb-1">Price *</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Enter price"
            />
            <label className="block font-semibold mt-3 mb-1">Description *</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base min-h-[80px] resize-y"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Enter product description"
              maxLength="500"
            />
            <label className="block font-semibold mt-3 mb-1">Category *</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              placeholder="Enter category"
            />
            <label className="block font-semibold mt-3 mb-1">Rating</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base"
              value={newProduct.rateing}
              onChange={(e) => setNewProduct({ ...newProduct, rateing: e.target.value })}
              placeholder="Enter rating"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition hover:bg-blue-700" 
                onClick={handleAddProduct}
              >
                Add Product
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition hover:bg-gray-600"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-semibold mb-3">Confirm Delete</h2>
            <p className="mb-5 text-gray-700">
              Are you sure you want to delete{" "}
              <strong className="font-extrabold">"{productToDelete.name}"</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition hover:bg-red-700" 
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition hover:bg-gray-600"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {alertMessage && (
        <MessageModal
          title={alertMessage.title}
          message={alertMessage.message}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
}
