// ** React Imports
import { Link } from "react-router-dom";
import { Fragment } from "react";
import moment from "moment";
// ** Custom Components
import Avatar from "@components/avatar";
// ** Store & Actions
import { getUser, getData, deleteUser } from "../store/action";
import { store } from "@store/storeConfig/store";
import { useSelector } from "react-redux";
import "./style.scss";
// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  MoreVertical,
  Star,
  FileText,
  Trash2,
  Archive,
  User,
  Settings,
  Briefcase,
} from "react-feather";
import { numberFormat } from "../../../../utility/Utils";

export const columns = (props) => {
  const { allData } = useSelector((state) => state.invoice);
  const dateParser = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date;
  };
  const lastMonthSales = (id) => {
    if (allData.length > 0) {
      const filteredData = allData.filter((item) => item.userID === id);
      const lmsData = filteredData.filter((item) => {
        return (
          new Date(item.created.seconds * 1000).getMonth() ===
          new Date().getMonth() - 1
        );
      });

      let sum = 0.0;
      lmsData.map((sin, ind) => {
        sin?.elements?.forEach((single) => {
          sum = sum + parseFloat(single.productPrice.split("/")[1]);
        });
      });
      return parseFloat(sum).toFixed(2);
    }
    return 0.0;
  };
  const thisMonthSales = (id) => {
    if (allData.length > 0) {
      const filteredData = allData.filter((item) => item.userID === id);
      const lmsData = filteredData.filter((item) => {
        return (
          new Date(item.created.seconds * 1000).getMonth() ===
          new Date().getMonth()
        );
      });
      let sum = 0.0;
      lmsData.map((sin, ind) => {
        sin?.elements?.forEach((single) => {
          sum = sum + parseFloat(single?.productPrice?.split("/")[1]);
        });
      });
      return parseFloat(sum).toFixed(2);
    }
    return 0.0;
  };
  function typeFinder(type) {
    if (type === "admin") {
      return (
        <Fragment>
          <Settings size="20" color="blue" className="mr-1" /> {type}
        </Fragment>
      );
    }
    if (type === "empresa") {
      return (
        <Fragment>
          <Briefcase size="20" color="green" className="mr-1" /> {type}
        </Fragment>
      );
    }
    if (type === "persona") {
      return (
        <Fragment>
          <User size="20" color="blue" className="mr-1" /> {type}
        </Fragment>
      );
    }
  }

  const typeUserFinder = (state) => {
    console.log(state);
    if (state === "horeca") {
      return <Badge
        style={{
          textTransform: 'capitalize'
        }}
        color="success" > {state}</Badge >;
    } else if (state === "distribution") {
      return <Badge style={{
        textTransform: 'capitalize'
      }} color="info">{state}</Badge>;
    } else if (state === "retail_online") {
      return <Badge style={{
        textTransform: 'capitalize'
      }} color="danger">{state}</Badge>;
    } else if (state === "friend") {
      return <Badge style={{
        textTransform: 'capitalize'
      }} color="warning">{state}</Badge>;
    } else if (state === "other") {
      return <Badge style={{
        textTransform: 'capitalize'
      }} color="light-primary">{state}</Badge>;
    } else {
      return state;
    }
  };
  return [
    {
      name: "Nombre",
      minWidth: "200px",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {/* {renderClient(row)} */}
          <Avatar
            color="light-primary"
            className="mr-50"
            content={row.name ? row.name : "John Doe"}
            initials
          />

          <div className="d-flex flex-column">
            <Link
              to={`/clients/view/${row.id}`}
              className="user-name text-truncate mb-0"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="font-weight-bold">
                {row?.name?.length > 15
                  ? `${row.name.substring(0, 15)}...`
                  : row.name}
              </span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              {row.email.length > 18
                ? `${row.email.substring(0, 18)}...`
                : row.email}
            </small>
          </div>
        </div>
      ),
    },

    {
      name: "FECHA",
      selector: "dueDate",
      sortable: true,
      minWidth: "130px",
      cell: (row) =>
        moment(
          dateParser(row.created ? row.created.seconds : row.date.seconds)
        ).format("Do MMM YY"),
    },
    {
      name: "Role",
      minWidth: "140px",
      selector: "type",
      sortable: true,
      cell: (row) => typeFinder(row.type),
    },
    {
      name: "Type",
      minWidth: "",
      selector: "",
      sortable: false,
      cell: (row) => typeUserFinder(row.company),
    },
    {
      name: "MES ANTERIOR",
      selector: "role",
      minWidth: "167px",
      cell: (row) => (
        <div className="w-100 d-flex justify-content-center">
          {` S/ ${numberFormat(parseInt(lastMonthSales(row.id)))}.00`}
        </div>
      ),
    },
    {
      name: "ESTE MES",
      selector: "",
      cell: (row) => (
        <div className="w-100 d-flex justify-content-left">
          {`S/ ${numberFormat(parseInt(thisMonthSales(row.id)))}.00`}
        </div>
      ),
    },
    {
      name: "Category",
      minWidth: "117px",
      selector: "category",
      cell: (row) => (
        <span className="text-capitalize">
          {row.category
            ? Array.from({ length: 5 }, (_, i) => i + 1).map((item, index) => {
              return (
                <Star
                  key={`star${index}`}
                  style={{
                    width: "15px",
                    height: "15px",
                    fill: index + 1 <= row.category ? "#7367f0" : "",
                  }}
                  color={index < row.category ? "#7367f0" : "gray"}
                />
              );
            })
            : Array.from({ length: 5 }, (_, i) => i + 1).map((item, index) => {
              return (
                <Star
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                  key={`starEmpty-${index}`}
                  color="gray"
                />
              );
            })}
        </span>
      ),
    },
    {
      name: "Actions",
      maxWidth: "10px",
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/clients/view/${row.id}`}
              className="w-100"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className="mr-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/clients/edit/${row.id}`}
              className="w-100"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() =>
                store.dispatch(deleteUser(row.id)).then((res) => {
                  store.dispatch(getData({ q: props.q }));
                })
              }
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];
};
