import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { IOrderDataState } from "../Redux/Slice/adminSlice";
// import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

export default function DataList(props) {
    const [userList, setUserList] = useState<IOrderDataState[]>([]);
    const orderData = useSelector((state: RootState) => state.admin.orderData);
    console.log("orderData:", orderData);

    const columns = [
        {
            dataField: "order_id",
            text: "Id",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "account_name",
            text: "Username",
            sort: true,
            filter: textFilter(),
        },
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 15,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            // console.log("page", page);
            // console.log("sizePerPage", sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            // console.log("page", page);
            // console.log("sizePerPage", sizePerPage);
        },
    });

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            const orderId = row.order_id;
            props.setOrderId(orderId);
        },
    };

    useEffect(() => {
        setUserList(orderData);
    }, []);
    return (
        <div>
            {/* <ToolkitProvider bootstrap4 keyField="id" data={userList} columns={columns} exportCSV>
                {(props) => (
                    <React.Fragment>
                        <MyExportCSV {...props.csvProps} />
                        <BootstrapTable
                            // bootstrap4
                            // keyField="id"
                            // columns={columns}
                            // data={userList}
                            pagination={pagination}
                            filter={filterFactory()}
                            {...props.baseProps}
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider> */}

            <BootstrapTable
                bootstrap4
                keyField="id"
                columns={columns}
                data={userList}
                pagination={pagination}
                filter={filterFactory()}
                rowEvents={rowEvents}
                // {...props.baseProps}
            />
        </div>
    );
}
