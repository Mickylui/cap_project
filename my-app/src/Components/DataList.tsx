import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
export default function DataList() {
    const [userList, setUserList] = useState([]);

    const columns = [
        {
            dataField: "id",
            text: "Id",
        },
        {
            dataField: "name",
            text: "Name ",
        },
        {
            dataField: "id",
            text: "Username",
        },
        {
            dataField: "id",
            text: "Email",
        },
    ];

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((result) => setUserList(result))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                {userList && userList.length > 0
                    ? userList.map((user) => (
                          <tr>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                          </tr>
                      ))
                    : "loading"}
            </table>
        </div>
    );
}
