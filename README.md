# **New Pawnshop Project Documentation**

## **Project Overview**
The *New Pawnshop Project* is a modern web application built with **Next.js** and **React** to manage pawnshop operations efficiently. It provides a robust interface for handling product listings, user management, and transactions. The backend leverages **Node.js** and **Express**, integrated with a **MongoDB** database for scalable data storage. The frontend utilizes **Next.js** for server-side rendering and routing, ensuring fast load times and improved SEO.

---

## **Deployed Link**
The project is deployed and accessible at:  
[**New Pawnshop Application**](https://https-github-com-kfaracik-new-pawnshop.onrender.com/)  
*(Replace with the actual URL)*  

---

## **Technology Stack**
### **Frontend**
- **Framework:** Next.js
- **Styling:** Styled-components, CSS Modules
- **State Management:** React Query
- **Routing:** Next.js routing
- **Icons:** Custom SVGs

### **Backend**
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB (via Mongoose)
- **Documentation:** Swagger (via swagger-jsdoc and swagger-ui-express)
- **Environment Variables:** Managed with dotenv

### **Tooling**
- **TypeScript:** Strongly-typed development
- **Nodemon:** Backend development monitoring
- **Bcrypt:** Password hashing for user security
- **React Query:** Data fetching and caching on the frontend
- **Swagger UI:** API documentation

---

## **Project Structure**
### **Frontend Structure (Next.js)**
```plaintext
src/
├── components/        # Reusable UI components
│   ├── Button.tsx
│   ├── PageContainer.tsx
│   ├── Title.tsx
│   ├── Center.tsx
│   └── WhiteBox.tsx
├── hooks/             # Custom React hooks
│   ├── useProduct.ts  # Hook for fetching product details
├── pages/             # Next.js routing pages
│   ├── index.tsx      # Homepage
│   ├── product/       # Dynamic product page
│   │   └── [id].tsx   # Product detail page
│   └── api/           # API routes (if used)
├── public/            # Static assets (e.g., images, icons)
├── styles/            # Global and module styles
│   ├── globals.css
│   └── themes.ts
└── utils/             # Utility functions
    ├── axiosInstance.ts # Configured Axios for API requests
    └── helpers.ts      # Generic utility functions
```

### **Backend Structure (Express.js)**
```plaintext
src/
├── controllers/       # Business logic for routes
│   ├── productController.ts
│   └── userController.ts
├── models/            # Mongoose schemas and models
│   ├── Product.ts
│   └── User.ts
├── routes/            # API endpoints
│   ├── productRoutes.ts
│   └── userRoutes.ts
├── middlewares/       # Custom middleware
│   ├── authMiddleware.ts # JWT authentication
├── services/          # Services for business logic
│   ├── productService.ts
│   └── userService.ts
├── utils/             # Helper functions and constants
│   ├── errorHandler.ts
│   └── jwtUtils.ts
├── server.ts          # Entry point for the backend server
└── swagger.ts         # Swagger documentation setup
```

---

## **Features**
### **Frontend**
1. **Dynamic Product Pages:** Using Next.js dynamic routing for seamless product detail rendering.
2. **Responsive Design:** Styled-components ensure mobile and desktop optimization.
3. **Optimized API Integration:** React Query handles caching and re-fetching data efficiently.
4. **User Interaction:** Features such as adding items to a cart, modal displays, and product navigation.

### **Backend**
1. **Secure Authentication:** JWT-based authentication for secure user login and session management.
2. **Comprehensive API:** RESTful API with endpoints for managing products, users, and transactions.
3. **Scalable Database Design:** MongoDB ensures high performance with schema-based models via Mongoose.
4. **Real-time Updates:** Optimized data handling for frequent updates and queries.

---

## **Development Workflow**
### **Setting Up Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/new-pawnshop
   cd new-pawnshop
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables:
   Create a `.env` file at the root and add the following:
   ```
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

4. Run the application:
   - Start the backend:
     ```bash
     npm run start
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

### **Testing**
- Add Jest and testing libraries to ensure component and API reliability.
- Use Swagger to verify API correctness.

---

## **Future Enhancements**
1. **Real-time Notifications:** Integrate WebSocket for transaction updates.
2. **Role-based Access Control (RBAC):** Implement admin and user-level permissions.
3. **Payment Integration:** Enable secure payment gateways for online transactions.
4. **Advanced Search and Filter:** Allow users to search and filter products by attributes.

---

## **Contact**
For further information or support, please contact the development team:  
**Email:** support@newpawnshop.com  
**GitHub Repository:** [New Pawnshop Project](#)
