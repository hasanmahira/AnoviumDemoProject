# AnoviumDemoProject
This repository contains a Package Tracker project with a Python API (FastAPI) for package management and a React.js frontend for querying packages.

## Project Structure

- `api/`: Contains the FastAPI (Python) backend for managing and querying packages.
- `app/`: Contains the React.js frontend for interacting with the Package Tracker API.

## Python API (FastAPI)

### Overview

The `api/` directory houses the FastAPI backend responsible for managing and querying package information. It uses an in-memory storage mechanism for simplicity.

### Installation

To run the API locally, navigate to the `api/` directory and install the required packages:

```pip install -r requirements.txt```

### How to Run
Open a terminal and navigate to the api/ directory.

Run the following command to start the API server:

```uvicorn main:app --reload```
The API will be accessible at http://localhost:8000.

### API Documentation
The API documentation, powered by Swagger UI, can be accessed at http://localhost:8000/docs or http://localhost:8000/redoc.

Swagger UI: Interactive API documentation.
ReDoc: Alternative API documentation with a different layout.

### Dummy Data Adder
To add dummy data to the API, you must run the following endpoint before using the filter functionalities in the React.js frontend:

Endpoint: http://localhost:8000/generate_packages
Method: GET
Description: This endpoint generates dummy packages with lorem ipsum values for return and destination addresses. It calls the create_package endpoint ten times to create packages with unique IDs.


## React.js Frontend
Overview
The app/ directory contains the React.js frontend, allowing users to interact with the Package Tracker API and query package details.

### Installation
To run the React.js frontend locally, navigate to the app/ directory and install the necessary packages:

```npm install```

### How to Run
Open a terminal and navigate to the app/ directory.

Run the following command to start the development server:

```npm start```
The frontend will be accessible at http://localhost:3000.

### Features
Query Packages
Enter a package ID, return address, or destination address in the search bar and click the "Search" button.
The table below will display the packages matching the provided criteria.

Update Package
To update a package, find the row with the desired package, and click the "Update" button.
This will simulate updating the package's return address to "Updated Address."

Pagination and Limit
Use the pagination controls at the bottom of the page to navigate through different pages of the package list.
Change the number of rows displayed per page using the "5 Rows," "10 Rows," and "20 Rows" buttons.


### Contributing
Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.
If you encounter any issues or have suggestions for improvements, please open an issue.

### License
This project is licensed under the MIT License.

This general README provides an overview of the entire project, including both the Python API and React.js frontend, their respective structures, and basic instructions for installation and running. Adjust the content based on your specific project details.