import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SREVER_URL from "../config";
const Table = ({ endpoint, num }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Logic for displaying current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const fetchData = async () => {
    try {
      console.log(SREVER_URL + endpoint);
      const { data } = await axios.get(SREVER_URL + endpoint, {
        signal: controller.signal,
      });
      setUsers(data);
      setIsLoading(false);
      console.log(data);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <>
      <br />
      <h3 style={{ marginLeft: "5rem" }}>Query {num}</h3>
      <br />
      {isLoading ? (
        <div class="loaderBox">
            <div className="loader"></div>
        </div>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Income</th>
                <th>City</th>
                <th>Car</th>
                <th>Quote</th>
                <th>Phone Price</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers != undefined &&
                currentUsers != null &&
                currentUsers.length > 0 &&
                currentUsers.map((user) => (
                  <tr key={user.email}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.income}</td>
                    <td>{user.city}</td>
                    <td>{user.car}</td>
                    <td>{user.quote}</td>
                    <td>{user.phone_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{ backgroundColor: currentPage === 1 ? "red" : "#4CAF50" }}
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
              style={{
                backgroundColor:
                  currentPage === Math.ceil(users.length / usersPerPage)
                    ? "red"
                    : "#4CAF50",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
