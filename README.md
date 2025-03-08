
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
# My Shopstory

## Screenshots
![Home Page](screenshots/home.png)
![Products Page](screenshots/products.png)
![Login Page](screenshots/login.png)
![Register Page](screenshots/register.png)
![Cart Page](screenshots/cart.png)
![Checkout Page](screenshots/checkout.png)
![About Page](screenshots/about.png)
![Contact Page](screenshots/contact.png)

## Published Application
- Front-End: [https://shopstory-frontend.vercel.app](https://shopstory-frontend.vercel.app)

## Back-End Application/API
- Back-End: [https://shopstory-backend.herokuapp.com](https://shopstory-backend.herokuapp.com)

## API Documentation
- [API Documentation](https://documenter.getpostman.com/view/12345/your-api) (Create using Postman or similar tool)

## Database Description
- **Database Name**: `shopstory_db`
- **Table**: `users`
  - `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
  - `full_name` (VARCHAR(255), NOT NULL)
  - `email` (VARCHAR(255), UNIQUE, NOT NULL)
  - `password` (VARCHAR(255), NOT NULL)
  - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## Functionalities Implemented
- User registration and login with MySQL database integration.
- Product listing with filtering (All, Men's Clothing, Women's Clothing).
- Add to cart and view cart functionality.
- Checkout process with billing address and payment details.
- About Us and Contact Us pages.
- Responsive navigation bar and footer.

## Known Bugs/Problems
- The checkout button is disabled (needs payment gateway integration).
- No logout functionality implemented yet.

## References and Tutorials
- React Tutorial: [React Official Documentation](https://reactjs.org/)
- Redux Tutorial: [Redux Documentation](https://redux.js.org/)
- MySQL with Node.js: [MySQL2 Documentation](https://www.npmjs.com/package/mysql2)
- Graphics Libraries: React-Bootstrap, Font Awesome



