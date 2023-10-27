import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Modal, Button } from 'react-bootstrap';

const PackageTracker = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    // Fetch all packages on initial load
    fetchPackages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const fetchPackages = async () => {
  try {
    const response = await fetch(`http://localhost:8000/query_package?page=${currentPage}&limit=${pageSize}&contains_string=${query}`);
    const data = await response.json();
    // Extract total pages from the response headers
    const totalCount = response.headers.get('X-Total-Count');
    setTotalPages(Math.ceil(totalCount / pageSize));
    setResults(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  const handleReadMore = (packageData) => {
    setSelectedPackage(packageData);
    setModalShow(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Package Tracker</h1>

      <div className="row mb-3">
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Enter package ID, return address, or destination address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-primary btn-block" onClick={fetchPackages}>
            Search
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Return Address</th>
                <th>Destination Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>{item.package_id}</td>
                  <td>{item.return_address.length > 20 ? item.return_address.slice(0, 20) + '...' : item.return_address}</td>
                  <td>{item.destination_address.length > 20 ? item.destination_address.slice(0, 20) + '...' : item.destination_address}</td>
                  <td>
                    <Button variant="info" onClick={() => handleReadMore(item)}>
                      Read More
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

       {/* Pagination Controls */}
       <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between">
            <div>
              <Button variant="outline-primary" onClick={() => handlePageSizeChange(5)}>
                5 Rows
              </Button>{' '}
              <Button variant="outline-primary" onClick={() => handlePageSizeChange(10)}>
                10 Rows
              </Button>{' '}
              <Button variant="outline-primary" onClick={() => handlePageSizeChange(20)}>
                20 Rows
              </Button>
            </div>
            <div>
              <Button
                variant="outline-primary"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>{' '}
              <Button
                variant="outline-primary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Read More */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Package Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Package ID:</strong> {selectedPackage?.package_id} <br />
          <strong>Return Address:</strong> {selectedPackage?.return_address} <br />
          <strong>Destination Address:</strong> {selectedPackage?.destination_address}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PackageTracker;
