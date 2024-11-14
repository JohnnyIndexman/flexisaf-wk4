#IndexBlog
IndexBlog is a React project that fetches blog posts from an API and displays them on the page. This project uses a custom hook useFetch for fetching data, which is unit-tested to ensure functionality.

#Table of Contents
Project Overview
Features
Installation
Usage
Testing
Contributing
License

#Project Overview
The IndexBlog project is a simple blog application that fetches posts from a JSON API (JSONBin in this case) and displays them in a React app. It demonstrates the use of a custom hook for data fetching, which is modular and can be reused in other parts of the application.

#Features
Fetches and displays blog posts from a JSON API.
Uses a custom useFetch hook for data fetching.
Simple and clean UI.
Test coverage for the App.js and useFetch hook to ensure data-fetching functionality works as expected, and that the footer, body, and header components are present.

#Installation
To run this project locally, please follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/JohnnyIndexman/flexisaf-wk4.git
cd IndexBlog
Install dependencies:

bash
Copy code
npm install
Start the application:

bash
Copy code
npm start
The application should now be running on http://localhost:3000.


#Usage
Run the application and navigate to http://localhost:3000 to view the blog posts fetched from the API.
The app uses a custom useFetch hook to fetch data, which is located in the hooks directory.

#Testing
The IndexBlog project includes tests for the useFetch hook to verify its functionality, and also tests for the home, header, and footer component. The test for the hook checks that it correctly fetches data and renders it in a test component. 
