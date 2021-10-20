// ** React Imports

import { Link } from "react-router-dom";
import moment from "moment";
// ** Custom Components
import Avatar from "@components/avatar";

import avatarImg from "@src/assets/images/portrait/small/avatar-s-20.jpg";

// ** Store & Actions
import { getData } from "../store/action";
import { store } from "@store/storeConfig/store";
import { numberFormat } from "../../../../utility/Utils";

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import {
  Eye,
  Send,
  MoreVertical,
  Trash,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart,
  Repeat,
} from "react-feather";
import { FormattedNumber } from "react-intl";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

const dateParser = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date;
};
const TotalCounter = (products) => {
  return products.reduce((a, b) => +a + +Number(b.total), 0);
};
const ElementTotalCounter = (products) => {
  let sum = 0.0;
  products.map((sin) => {
    sum = sum + parseFloat(sin.productPrice.split("/")[1]);
  });
  return sum;
};
const statusFinder = (state) => {
  if (state === "ENTREGADO") {
    return <Badge color="success">{state}</Badge>;
  } else if (state === "PROGRAMADO") {
    return <Badge color="info">{state}</Badge>;
  } else if (state === "PENDIENTE") {
    return <Badge color="danger">{state}</Badge>;
  } else if (state === "Despacho") {
    return <Badge color="warning">{state}</Badge>;
  } else if (state === "EN TRANSITO") {
    return <Badge color="light-primary">{state}</Badge>;
  } else {
    return state;
  }
};
// ** Table columns
export const columns = (props) => {
  return [
    {
      name: "Invoice Id",
      minWidth: "",
      selector: "id",
      cell: (row) => (
        <Link to={`/invoice/preview/${row.id}`}>{`#${row.number}`}</Link>
      ),
    },
    {
      name: "PRODUCTS",
      minWidth: "",
      selector: "id",
      cell: (row) => <div>{row?.elements?.length || 0}</div>,
    },
    {
      name: "Total",
      selector: "total",
      sortable: true,
      minWidth: "100px",
      cell: (row) => (
        <span>
          S/
          {row.products
            ? `${numberFormat(parseInt(TotalCounter(row.products)))}.00`
            : `${numberFormat(parseInt(ElementTotalCounter(row.elements)))}.00`}
        </span>
      ),
    },
    {
      name: "NROGUIA",
      selector: "state",
      sortable: true,
      minWidth: "",
      cell: (row) => statusFinder(row.state),
    },
    {
      name: "FECHA",
      selector: "dueDate",
      sortable: true,
      minWidth: "200px",
      cell: (row) =>
        moment(
          dateParser(row.created ? row.created.seconds : row.date.seconds)
        ).format("Do MMM YY"),
    },
    {
      name: "Acccion",
      minWidth: "110px",
      selector: "",
      sortable: true,
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Link to={`/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className="mx-1" />
          </Link>
          <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
            Preview Invoice
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];
};
