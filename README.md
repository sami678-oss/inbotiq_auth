 Inbotiq Product StoreOverviewThe Inbotiq Product Store is a full-stack e-commerce application designed for product management and client interaction. 
 It features distinct roles for Administrators (managing products) and Users (browsing, searching, and creating a personalized wishlist).
 The application is built using the MERN stack (MongoDB, Express, React, Node.js).
 
 ✨ FeaturesFrontend (Client)Role-Based Dashboard: Displays a personalized welcome message using the client's name.
 
 Authentication: Combined Sign In and Sign Up forms with session persistence via Local Storage.
 
 Product Catalog: View all products, with sorting by price and keyword search.
 
 User Role: Can add/remove products to/from a personal Wishlist.
 
 Admin Role: Can Add and Delete products from the catalog.
 
 Backend (API)Secure Authentication: User passwords are encrypted using Bcrypt.
 
 MongoDB Schema: Models for User, Product, and Wishlist.
 
 RESTful APIs: Endpoints for product CRUD operations, authentication.
 
 Tech StackFrontendReact (with Hooks and functional components)
 
 React Router DOM (for navigation and protected routes)Tailwind CSS (assumed, based on utility classes in components)
 
 BackendNode.jsExpress.jsMongoDB (via Mongoose for ODM)Bcrypt (for password hashing)
 
 Repository StructureThe project follows a standard monorepo structure:Inbotiq/



 
├── backend/                  # Node/Express API
│   ├── controllers/
│   ├── models/               # Mongoose schemas (userModel, productModel, etc.)
│   ├── routes/
│   ├── server.js             # Main server file
│   └── package.json
└── frontend/                 # React client application
    ├── src/
    │   ├── components/       # LoginPage, HomePage, etc.
    │   └── App.jsx
    └── package.json

    
🚀 Getting StartedPrerequisitesNode.js (v18+)MongoDB (local instance or a cloud service like MongoDB Atlas)

1. Backend SetupNavigate to the backend directory:Bashcd backend
Install dependencies:Bashnpm install
# or yarn install
Create a .env file in the backend folder and add your MongoDB connection string:# .env
MONGO_URI="mongodb+srv://<user>:<password>@<cluster-name>/<database-name>?retryWrites=true&w=majority"
PORT=5000
Start the backend server:Bashnpm start
The API should now be running at http://localhost:5000.2. Frontend SetupNavigate to the frontend directory:Bashcd ../frontend
Install dependencies:Bashnpm install
# or yarn install
Ensure your API URL is correctly configured. If using Vite/CRA, you might need a .env file. For simplicity, 
the current setup assumes hardcoding http://localhost:5000 is used, but for deployment, you must update this.Start the frontend development server:Bashnpm run dev
# or npm start (for CRA)
The application should now be accessible at http://localhost:3000 (or similar).

🔑 Authentication DetailsAccount TypeExample EmailExample PasswordAdminadmin@demo.comadmin123Useruser@demo.
comuser123(Note: These accounts are assumed to be pre-seeded in your development database or can be created using the Sign Up form.)

🌐 Deployment (Frontend)The frontend client application (the frontend folder) can be deployed to platforms like Vercel or Netlify.

Configuration Steps:Base Directory / Root Directory: Set this to frontend.

Build Command: npm run buildOutput Directory: Usually dist (for Vite) or build (for CRA).

Important: Before deployment, change all hardcoded http://localhost:5000 URLs in the frontend components (LoginPage.jsx, HomePage.jsx) to your live,
deployed backend API URL.

🤝 ContributionIf you'd like to contribute, please fork the repository and submit a pull request!📜 LicenseThis project is licensed under the MIT License.
