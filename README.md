# WanderLust

WanderLust is a full-stack accommodation listing platform inspired by Airbnb. Users can explore stays, create and manage their own listings, upload property images, and share reviews.

## Features

- Browse all available accommodation listings
- Create, edit, and delete listings (owner-only actions)
- Upload listing images through Cloudinary
- Sign up, log in, and log out with Passport.js
- Add and delete reviews with 1–5 star ratings
- Server-side validation with Joi
- Flash messages and persistent user sessions stored in MongoDB

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Passport.js and passport-local-mongoose
- **Templates:** EJS with ejs-mate
- **Uploads:** Multer and Cloudinary
- **Validation:** Joi

## Getting Started

### Prerequisites

- Node.js 22 or later
- A MongoDB Atlas connection string
- A Cloudinary account

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/Apexcoder1711/WanderLust.git
   cd WanderLust
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root.

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the application.

   ```bash
   node app.js
   ```

5. Visit `http://localhost:8080/listings` in your browser.

## Project Structure

```text
controllers/  # Listing, review, and user request handlers
models/       # Mongoose schemas for users, listings, and reviews
routes/       # Express routes
views/        # EJS templates
public/       # Static CSS and JavaScript
utils/        # Error and async-handler utilities
```

## Environment Variables

Never commit your `.env` file. It is already excluded through `.gitignore`.

## Author

[Apexcoder1711](https://github.com/Apexcoder1711)
