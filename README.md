# [Ecommerce](https://sw-shop.netlify.app/) application written with MERN (MongoDB, Express, React, Node.js) stack

[Visit the site](https://sw-shop.netlify.app/) | [Server](https://github.com/faridahasx/mern-stack-ecommerce/tree/main/server) | [Client](https://github.com/faridahasx/mern-stack-ecommerce/tree/main/client)

![Project gif](https://github.com/faridahasx/mern-stack-ecommerce/blob/main/project.gif)

## Overview

- **Client:**

  - Built with Typescript, React.

  - Styled with CSS and Material UI for a modern and responsive user interface.

  - Bundled with Vite.

- **Server:**

  - Developed with JavaScript and Node.js.

- **Authentication:**

  - This project implements JWT tokens for user authentication:
    - Access tokens are used to access protected resources which expire in 15 minutes.
    - Refresh tokens are used to renew access tokens resources which expire in 7 days.
  - Passport.js is used for Google OAuth2 authentication. Ensure you configure your authentication credentials.

- **Image Upload:**

  - Cloudinary is integrated for image upload functionality.

- **Database:**

  - MongoDB is used as the database to store and retrieve data.

- **Code Formatting:**
  - The codebase is formatted using Prettier.

## Optimizations
- Add tests
- Add payment system
- Move server and client to the same domain, because setting authentication cookies on iPhones requires the server and client to be on the same domain.


## Usage

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/faridasLab/mern-stack-ecommerce
   ```

2. **Navigate to the client directory:**

   ```bash
   cd client
   ```

3. **Install client dependencies:**

   ```bash
   npm install
   ```

4. **Navigate to the server directory:**

   ```bash
   cd server
   ```

5. **Install server dependencies:**

   ```bash
   npm install
   ```

6. **Create a Cloudinary Account:**

   - If you don't have a Cloudinary account, create one at [Cloudinary Sign-up](https://cloudinary.com/users/register).
   - Obtain your Cloudinary API Key, API Secret, and Cloud Name.

7. **Configure Cloudinary Credentials:**

   - Create a `config.env` file in the `server` directory.
   - Add the following details to the `config.env` file:
     ```env
     CLOUD_NAME = your_cloudinary_cloud_name
     CLOUD_API_KEY = your_cloudinary_api_key
     CLOUD_API_SECRET = your_cloudinary_api_secret
     CLOUDINARY_URL = cloudinary://your_cloudinary_api_key:your_cloudinary_api_secret@your_cloudinary_cloud_name
     ```

8. **Configure Google OAuth Credentials:**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project and enable the Google+ API.
   - Navigate to the "Credentials" page and create OAuth client credentials.
   - Obtain your Client ID and Client Secret.

9. **Configure OAuth Credentials:**

   - Add the following details to the `config.env` file in the `server` directory:
     ```env
     GOOGLE_CLIENT_ID = your_google_client_id
     GOOGLE_CLIENT_SECRET = your_google_client_secret
     ```

10. **Configure MongoDB:**

    - Create a MongoDB Atlas account or use an existing MongoDB server.
    - Obtain your MongoDB connection URI.
11. Configure MongoDB Connection URI:
    - Add the following details to the `config.env` file in the server directory:
        ```env
        MONGO_URI = your_mongodb_connection_uri
        ```

11. **Start the development servers:**

    ```bash
    # Start client
    cd client
    npm run dev

    # Start server
    cd server
    npm run dev
    ```



## Issues 📝
Currently, it’s impossible to authenticate iPhone users properly because setting authentication cookies on iPhones requires the server and client to be on the same domain.


## 📇 Contact 

If you have any queries, please feel free to reach out:
- [🌎 My official website](https://faridah.vercel.app)
- Email: farida.hasanova009@gmail.com
- Twitter: [@faridahasx](https://twitter.com/faridahasx)
- LinkedIn: [Farida Hasanova](https://www.linkedin.com/in/faridahasx)



