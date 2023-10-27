# Package Tracker API

This Python API is designed to manage and query packages using FastAPI.

## Table of Contents

- [Installation](#installation)
- [How to Run](#how-to-run)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the API locally, you need to install the required packages. Make sure you have Python and pip installed.

`pip install -r requirements.txt`
This command installs the necessary packages listed in the requirements.txt file.

## How to Run
Open a terminal and navigate to the project directory.

Run the following command to start the API server:

`uvicorn main:app --reload`
This command uses uvicorn to run the FastAPI application with automatic reloading.

The API will be accessible at http://localhost:8000.

## API Documentation
The API documentation, powered by Swagger UI, can be accessed at http://localhost:8000/docs or http://localhost:8000/redoc.

Swagger UI: Interactive API documentation.
ReDoc: Alternative API documentation with a different layout.

### Dummy Data Adder
To add dummy data to the API, you must run the following endpoint before using the filter functionalities in the React.js frontend:

Endpoint: http://localhost:8000/generate_packages
Method: GET
Description: This endpoint generates dummy packages with lorem ipsum values for return and destination addresses. It calls the create_package endpoint ten times to create packages with unique IDs.

### Query Packages
Enter a package ID, return address, or destination address in the search bar and click the "Search" button.
The table below will display the packages matching the provided criteria.

### Update Package
To update a package, find the row with the desired package, and click the "Update" button.
This will simulate updating the package's return address to "Updated Address."

## Contributing
Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

If you encounter any issues or have suggestions for improvements, please open an issue.

## License
This project is licensed under the MIT License.

**requirements.txt**

fastapi==0.70.0
uvicorn==0.15.0