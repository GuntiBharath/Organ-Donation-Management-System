# LifeShare Organ Donation Management System

LifeShare is a full-stack web application designed to facilitate organ donation and transplantation by connecting donors, recipients, and partner hospitals. The system provides a secure platform for donor and recipient registration, organ matching, and searching for potential donors.

---

## Project Structure

```
lifeshare/
│
├── backend/                      # Backend server and API
│   ├── models/                   # Mongoose data models
│   │   ├── Donor.js             # Donor schema and model
│   │   ├── Recipient.js         # Recipient schema and model
│   │   └── Hospital.js          # Hospital schema and model
│   ├── routes/                   # Express route handlers
│   │   ├── donor.js             # Donor-related API routes
│   │   ├── recipient.js         # Recipient-related API routes
│   │   └── hospital.js          # Hospital-related API routes
│   ├── server.js                # Express server setup and route registration
│   ├── package.json             # Backend dependencies and scripts
│   └── package-lock.json
│
├── frontend/                     # React frontend application
│   ├── public/                  # Public assets and static files
│   │   ├── index.html           # Main HTML file
│   │   ├── fortis-hospital.jpg  # Sample hospital images
│   │   └── manipal.jpg
│   ├── src/                     # React source code
│   │   ├── App.js               # Main React component with UI and logic
│   │   ├── index.js             # React app entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies and scripts
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── package-lock.json
│
├── playground-1.mongodb.js       # MongoDB playground script (optional)

```
## Features

- **Donor Registration:** Donors can register by providing personal, medical, and location information, including organs they are willing to donate.
- **Recipient Registration:** Recipients can register with their medical needs, urgency level, and hospital information.
- **Search Donors:** Users can search for potential donors based on organ type, blood type, and location.
- **Partner Hospitals:** Displays a list of partner hospitals and transplant centers with contact and rating information.
- **Secure and Private:** Consent is required for sharing personal and medical information.
- **Responsive UI:** Mobile-friendly navigation and forms built with React and Tailwind CSS.

---

## Technologies Used

- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose ODM
  - CORS and dotenv for environment management
- **Frontend:**
  - React.js with functional components and hooks
  - Axios for API requests
  - Tailwind CSS for styling
- **Others:**
  - Nodemon for backend development
  - React Scripts for frontend build and development

---

## Installation and Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

---

## Usage

- Open the frontend URL in your browser.
- Use the navigation to register as a donor or recipient.
- Search for donors based on organ, blood type, and location.
- View partner hospitals and their details.

---

## API Endpoints

- `GET /api/donors` - Get list of donors (supports query parameters for filtering)
- `POST /api/donors` - Register a new donor
- `GET /api/recipients` - Get list of recipients
- `POST /api/recipients` - Register a new recipient
- `GET /api/hospitals` - Get list of partner hospitals
- `POST /api/hospitals` - Add a new hospital (if applicable)

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## License

This project is licensed under the ISC License.

---

## Contact

For any inquiries or support, please contact the project maintainer.

---

This README provides a comprehensive overview of the LifeShare Organ Donation Management System project, including its structure, features, technologies, and setup instructions.
