// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "react-feather";

import DataTable from "react-data-table-component";
// ** Table Columns
import { columns } from "./columns";
// ** Store & Actions
import { getUser, getUserInvoices } from "../store/action";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap
import {
  Button,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Alert,
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";

// ** User View Components
import UserInfoCard from "./UserInfoCard";
import RecentInvoicesTable from "./RecentInvoicesTable";

// ** Styles
import "@styles/react/apps/app-users.scss";

const CustomHeader = ({
  handleFilter,
  value,
  handleStatus,
  statusValue,
  handlePerPage,
  rowsPerPage,
}) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center mr-2">
            <Label for="rows-per-page">Ver</Label>
            <CustomInput
              className="form-control ml-50 pr-3"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
          </div>
          <Button.Ripple tag={Link} to="/create_order" color="primary">
            Realizar Pedido
          </Button.Ripple>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <Label for="search-invoice">Buscar Pedido</Label>
            <Input
              id="search-invoice"
              className="ml-50 mr-2 w-100"
              type="text"
              value={value}
              // onChange={(e) => handleFilter(e.target.value)}
              placeholder="Buscar"
            />
          </div>
          <Input
            className="w-auto "
            type="select"
            value={statusValue}
            // onChange={(e) => handleStatus(e.target.value)}
          >
            <option value="">Buscar Estado</option>
            <option value="PROGRAMADO">Programado</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="EN TRANSITO">Tránsito</option>
          </Input>
        </Col>
      </Row>
    </div>
  );
};
const UserView = (props) => {
  // ** Vars
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const store = useSelector((state) => state.users),
    dispatch = useDispatch(),
    fullLOcation = location.pathname.split("/");
  const id = fullLOcation[fullLOcation.length - 1];
  const FetchData = () => {
    dispatch(getUser(id)).then((data) => {
      dispatch(getUserInvoices(data.selectedUser.email));
    });
  };
  // ** Get suer on mount
  useEffect(() => {
    FetchData();
  }, []);
  // console.log("store", store.selectedUser)
  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="12" lg="12" md="12">
          <UserInfoCard
            selectedUser={store.selectedUser}
            FetchData={FetchData}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="12">
          {/* <Card>
             <RecentInvoicesTable items={store.selectedUserInvoices} />
          </Card> */}

          <Card>
            <CardHeader>
              <CardTitle tag="h4">Recent Invoices</CardTitle>
            </CardHeader>
            <div className="invoice-list-dataTable">
              <DataTable
                noHeader
                pagination
                paginationServer
                subHeader={true}
                columns={columns({ q: value })}
                responsive={true}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                defaultSortField="invoiceId"
                // paginationDefaultPage={currentPage}
                // paginationComponent={CustomPagination}
                data={
                  statusValue
                    ? data?.filter((sin) => sin.state === statusValue)
                    : store.selectedUserInvoices
                }
                subHeaderComponent={
                  <CustomHeader
                    value={value}
                    statusValue={statusValue}
                    rowsPerPage={rowsPerPage}
                    // handleFilter={handleFilter}
                    // handlePerPage={handlePerPage}
                    // handleStatus={handleStatus}
                  />
                }
              />
            </div>
          </Card>
        </Col>

        {/* new table */}
        <div className="invoice-list-wrapper"></div>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/clients">Users List</Link>
      </div>
    </Alert>
  );
};

export default UserView;
