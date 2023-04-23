import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table";
import SERVER_URL from "./config";
import axios from "axios";

function App() {
  const [groupUsers, setGroupUsers] = useState([]);
  useEffect(() => {
    axios
      .get(SERVER_URL + "/group")
      .then(({data}) => {
        console.log(data)
        setGroupUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <div className="App">
      <Table endpoint="/income" num="1" />
      <Table endpoint="/male" num="2" />
      <Table endpoint="/quote" num="3" />
      <Table endpoint="/email" num="4" />
      {/* <Table endpoint="/group"/> */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>City</th>
              <th>User Count</th>
              <th>Average Income</th>
            </tr>
          </thead>
          <tbody>
            {groupUsers.map((user) => (
              <tr key={user.city}>
                <td>{user.city}</td>
                <td>{user.user_count}</td>
                <td>{user.avg_income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
