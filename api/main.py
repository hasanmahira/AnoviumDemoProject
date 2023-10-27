from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uuid
from lorem_text import lorem # pip install lorem_text

app = FastAPI()

# CORS configuration
origins = ["http://localhost:3000"]  # Update with the origin of your React app

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for packages
packages = []


class Package(BaseModel):
    return_address: str
    destination_address: str
    package_id: Optional[str] = None  # Make package_id optional in the request


# API endpoint to create a package
@app.post("/create_package")
def create_package(package: Package):
     # Generate a GUID for package_id if not provided
    if package.package_id is None:
        package.package_id = str(uuid.uuid4())

    # Append the package to the list
    packages.append(package)
    return {"message": "Package created successfully", "package": package}


# API endpoint to query packages with pagination and limit
@app.get("/query_package")
def query_package(
    contains_string: Optional[str] = None,
    page: Optional[int] = Query(1, alias="page"),
    limit: Optional[int] = Query(10, alias="limit"),
):
    start_index = (page - 1) * limit
    end_index = start_index + limit

    result = []

    for package in packages[start_index:end_index]:
        if (contains_string is None or 
            contains_string.lower() in package.destination_address.lower() or 
            contains_string.lower() in package.return_address.lower() or 
            contains_string.lower() in package.package_id.lower()
        ):
            result.append(package)

    return result


# API endpoint to generate lorem ipsum values and call create_package
@app.get("/generate_packages")
def generate_packages():
    generated_packages = []

    for _ in range(10):
        return_address = lorem.paragraph()
        destination_address = lorem.paragraph()

        # Create a Package instance
        package = Package(return_address=return_address[:50], destination_address=destination_address[:100])

        # Call the create_package endpoint to generate a GUID for package_id
        create_package(package)

        # Append the generated package to the listnp
        generated_packages.append(package)

    return generated_packages
