## Abstract

WanderLust is a web-based accommodation listing platform inspired by modern travel marketplaces. It allows visitors to browse available stays and enables registered users to create, update, and delete their own property listings. Users can upload listing images, post reviews with ratings, and manage their accounts securely.

The application follows the MVC design pattern. It is built using Node.js and Express.js, uses MongoDB for data storage, EJS for server-rendered views, Passport.js for authentication, and Cloudinary for image hosting. The project demonstrates practical implementation of CRUD operations, user authentication, authorization, input validation, session management, and cloud-based media storage.

## 1. Introduction

Finding suitable travel accommodation requires clear listing information, photographs, user feedback, and a simple way for hosts to manage their properties. WanderLust addresses these needs through one application where users can discover stays and interact with listing content.

The project was developed as a learning-oriented full-stack web application. Its main goal is to apply database operations, server-side routing, authentication, validations, and responsive interface concepts in a real-world use case.

## 2. Problem Statement

Travellers need a convenient way to view accommodation details and feedback, while property owners need a controlled way to publish and maintain their listings. A system is required that supports secure login, listing management, image upload, and authenticated reviews.

## 3. Objectives

- Develop a complete web application for accommodation listings.
- Implement Create, Read, Update, and Delete (CRUD) operations for listings.
- Provide secure user signup, login, logout, and session handling.
- Allow authenticated users to upload listing images.
- Enable authenticated users to add ratings and reviews.
- Restrict edits and deletions to the respective listing owner or review author.
- Validate user input and display meaningful feedback messages.

## 4. Scope

The current version supports listing discovery, listing management, image upload, user authentication, and review management. The project is suitable as a prototype for a travel or homestay marketplace.

Future versions may include search and filters, maps and geocoding, booking/payment support, wishlists, email verification, admin dashboards, and deployment monitoring.

## 5. Technology Stack

| Layer | Technologies used |
| --- | --- |
| Frontend | HTML, CSS, JavaScript, Bootstrap, EJS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js, passport-local, passport-local-mongoose |
| Image storage | Cloudinary, Multer, multer-storage-cloudinary |
| Validation | Joi |
| Session and feedback | express-session, connect-mongo, connect-flash |

## 6. System Architecture

```text
Browser
   ↓
Express Routes → Middleware (authentication, authorization, validation)
   ↓
Controllers → Mongoose Models → MongoDB Atlas
   ↓                         ↘
EJS Views                       Cloudinary (listing images)
```

The application uses MVC architecture: routes receive requests, controllers contain the request logic, models define database entities, and EJS views render the user interface.

## 7. Modules and Functionality

| Module | Functionality |
| --- | --- |
| User module | Signup, login, logout, session-based authentication |
| Listing module | View all listings, view details, create, edit, update, and delete listings |
| Image module | Upload PNG/JPG/JPEG listing images to Cloudinary |
| Review module | Add reviews with 1–5 ratings and delete own reviews |
| Authorization module | Ensures only listing owners and review authors can modify their content |
| Validation module | Validates listing and review request data using Joi |
| Feedback module | Uses flash messages for successful actions and errors |

## 8. Database Design

### User

| Attribute | Description |
| --- | --- |
| username | Unique username used to log in |
| email | User email address |
| password hash and salt | Managed securely by passport-local-mongoose |

### Listing

| Attribute | Description |
| --- | --- |
| title | Property title |
| description | Property details |
| image | Cloudinary image URL and filename |
| price | Listing price; cannot be negative |
| location | City or area of the property |
| country | Country of the property |
| owner | Reference to the user who created the listing |
| reviews | References to associated reviews |

### Review

| Attribute | Description |
| --- | --- |
| comment | Written feedback |
| rating | Rating from 1 to 5 |
| createdAt | Date and time of creation |
| author | Reference to the user who posted the review |

## 9. Routes Summary

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/listings` | Show all listings |
| GET / POST | `/listings/new`, `/listings` | Show and submit a new listing |
| GET / PUT / DELETE | `/listings/:id`, `/listings/:id/edit` | View, update, or delete a listing |
| POST | `/listings/:id/reviews` | Add a review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review |
| GET / POST | `/signup`, `/login` | Signup and login |
| GET | `/logout` | Logout |

## 10. Team Roles and Contribution Log

The following division is clear and balanced for the viva. Adjust only if your actual contribution was different.

| Team member | Primary role | Responsibilities | Deliverables |
| --- | --- | --- | --- |
| **Prachi** | Frontend & UI Developer | Designed EJS pages, reusable navbar/footer layouts, listing forms, listing cards, styling, and user-facing flash messages. | Responsive user interface and template integration |
| **Suchitra** | Backend & Database Developer | Built Express routes/controllers, MongoDB schemas, listing/review CRUD operations, Joi validation, and Cloudinary upload flow. | Core business logic and database integration |
| **Ankita** | Authentication, Integration & QA Developer | Implemented Passport authentication, session handling, ownership/author checks, route protection, integration testing, documentation, and final presentation coordination. | Secure access control, testing, and project documentation |

### Work Log

| Phase | Task | Owner | Status |
| --- | --- | --- | --- |
| Planning | Defined problem statement, objectives, and modules | All members | Completed |
| UI design | Designed pages, forms, navigation, and listing views | Prachi | Completed |
| Data layer | Created User, Listing, and Review models | Suchitra | Completed |
| CRUD | Implemented listing and review operations | Suchitra | Completed |
| Authentication | Added signup, login, logout, sessions, and redirects | Ankita | Completed |
| Authorization | Added owner and review-author permission checks | Ankita | Completed |
| Media uploads | Configured Cloudinary and Multer | Suchitra | Completed |
| Validation | Added Joi schemas and error handling | Suchitra | Completed |
| Testing | Checked major user flows and protected routes | Ankita with all members | Completed |
| Documentation | Prepared README, report, and presentation material | Ankita with all members | Completed |

## 11. Testing Summary

| Test case | Expected result |
| --- | --- |
| New user signup | Account is created and user is logged in |
| Valid user login | User is redirected to listings or their requested page |
| Create listing without login | User is redirected to login page |
| Owner edits listing | Listing is updated successfully |
| Non-owner edits listing | Action is blocked with an error message |
| Add review without login | User is redirected to login page |
| Delete another user's review | Action is blocked with an error message |
| Invalid listing/review input | Joi validation error is shown |
| Upload supported image | Image is stored through Cloudinary and linked to listing |

## 12. Limitations

- Search, filtering, and map functionality are not included in the current version.
- Payment and real-time booking are outside the present scope.
- The project does not include an administrator dashboard.
- Automated test scripts are not currently configured.

## 13. Conclusion

WanderLust successfully demonstrates a complete full-stack web application for accommodation listings. The project integrates frontend templates, backend routing, database persistence, cloud image upload, authentication, authorization, validation, and error handling. It meets the objectives of developing a secure and practical CRUD-based web application and provides a strong base for future travel-platform features.

## 14. Future Enhancements

- Search listings by location, price, and category
- Add interactive maps and geocoding
- Build booking calendars and payment integration
- Add wishlists and user profiles
- Create an admin dashboard and content moderation
- Add email verification and password reset
- Write automated unit and integration tests

## 15. References

1. Node.js Documentation — https://nodejs.org/docs/
2. Express.js Documentation — https://expressjs.com/
3. MongoDB Documentation — https://www.mongodb.com/docs/
4. Mongoose Documentation — https://mongoosejs.com/docs/
5. Passport.js Documentation — https://www.passportjs.org/docs/
6. Cloudinary Documentation — https://cloudinary.com/documentation

---

# Presentation Plan and Script

**Suggested duration:** 8–10 minutes total. Use screenshots of your own running application for the demo slides.

| Slide | Presenter | Topic | Time |
| --- | --- | --- | --- |
| 1–3 | Prachi | Introduction, problem, objectives, UI | 2.5 min |
| 4–6 | Suchitra | Architecture, database, CRUD and uploads | 3 min |
| 7–10 | Ankita | Authentication, testing, conclusion, demo | 3–4 min |

##  Ankita— Slides 1 to 3

**Slide 1: Title**

“Good morning/afternoon respected faculty members. We are Ankita  ,Prachi and Suchitra,. Our minor project is **WanderLust**, an accommodation listing and review platform. The idea is inspired by travel marketplaces where users can explore stays and hosts can publish their properties.”

**Slide 2: Problem Statement**

“When users look for accommodation, they need property information, images, and genuine feedback in one place. At the same time, owners need a simple way to manage their listings. WanderLust addresses this by providing listing management, secure user accounts, image uploads, and reviews.”

**Slide 3: Objectives and UI**

“Our objectives were to create a full-stack CRUD application, implement secure authentication, allow image uploads, and ensure that only authorized users can edit their own content. I worked mainly on the user interface: EJS pages, navigation, listing forms, cards, and responsive styling. The interface is designed to keep browsing and creating a listing simple for users.”

**Handover:** “Now Suchitra will explain the technical architecture, database, and core functionality.”

##  Prachi — Slides 4 to 6

**Slide 4: Architecture and Tech Stack**

“WanderLust follows the MVC architecture. The browser sends requests to Express routes, middleware checks authentication, authorization, and validation, controllers process the request, and Mongoose stores data in MongoDB. EJS renders the final pages. We used Node.js, Express.js, MongoDB, Mongoose, EJS, Joi, Multer, and Cloudinary.”

**Slide 5: Database and CRUD**

“The application has three main entities: User, Listing, and Review. A listing contains title, description, price, location, country, image, owner, and reviews. Each review has a comment, rating, creation time, and author. The listing module supports create, read, update, and delete operations. When a listing is deleted, its related reviews are also removed.”

**Slide 6: Image Upload and Validation**

“For images, we use Multer with Cloudinary storage. This keeps uploaded property images in cloud storage instead of the local server. Joi validates listing and review data on the server, for example price restrictions and valid review ratings. These checks help keep the stored data consistent.”

**Handover:** “Next, Ankita will explain security, testing, and the final outcome.”

## Suchitra — Slides 7 to 10

**Slide 7: Authentication and Authorization**

“For user security, we implemented signup, login, logout, password handling, and persistent sessions using Passport.js and MongoDB session storage. Protected actions, such as creating a listing or posting a review, require login. We also added authorization: only the owner can edit or delete a listing, and only the review author can delete their review.”

**Slide 8: Testing**

“We tested the main flows: signup and login, creating a listing, updating and deleting it as the owner, adding a review, preventing unauthorized access, validating incorrect input, and uploading supported image formats. Flash messages inform the user about successful actions and errors.”

**Slide 9: Future Scope**

“In future, we can add location-based search, filters, interactive maps, bookings, payments, wishlists, an admin panel, and automated testing. The current architecture is modular, so these features can be added incrementally.”

**Slide 10: Conclusion and Demo**

“To conclude, WanderLust demonstrates a full-stack web application with CRUD operations, authentication, authorization, validation, and cloud image uploads. We will now show a short demonstration of browsing listings, logging in, and creating or reviewing a listing. Thank you. We are ready for your questions.”

## Quick Viva Answers

| Question | Short answer |
| --- | --- |
| Why MongoDB? | It stores document-style data flexibly and works naturally with JavaScript through Mongoose. |
| Why MVC? | It separates data, request logic, and UI, making the project easier to maintain. |
| How are passwords protected? | passport-local-mongoose handles password hashing and authentication rather than storing plain passwords. |
| How is unauthorized editing prevented? | Middleware compares the logged-in user with the listing owner or review author before allowing the action. |
| Why Cloudinary? | It provides cloud storage and delivery for listing images, avoiding local-file storage issues. |
| What does Joi do? | It validates incoming request data before it is saved to the database. |
