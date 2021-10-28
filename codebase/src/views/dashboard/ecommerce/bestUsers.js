import { useState, useEffect } from "react";
// ** Third Party Components
import { useSelector } from "react-redux";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, CardHeader, CardTitle } from "reactstrap";
import { calculateTotalnteger, numberFormat } from "../../../utility/Utils";
const BestUsersTable = () => {
  const data2 = useSelector((state) => state);
 
  const data = useSelector((state) => state?.invoice?.allData);
 
  const [dataforTable, setDataforTable] = useState([]);
  const getTotalClients = () => {
    return new Promise((resolve) => {
      const arrUserTotal = [];
      // Agrupo en un array todos los clientes
      const grouped = Array.from(
        data
          .reduce(
            (m, o) => m.set(o.userID, (m.get(o.userID) || []).concat(o)),
            new Map()
          )
          .values()
      );
      // Formeto los pedidos totales por producto y los sumo
      for (let i = 0; i < grouped.length; i++) {
        const obj = {};
        obj.count = 0;

        for (let j = 0; j < grouped[i].length; j++) {
          obj.name = grouped[i][j].name;
          obj.userID = grouped[i][j].userID;
          obj.count += calculateTotalnteger(grouped[i][j].elements);
        }

        arrUserTotal.push(obj);

        if (i === grouped.length - 1) {
          resolve(arrUserTotal);
        }
      }
    });
  };

  useEffect(() => {
    if (data) {
      getTotalClients()
        .then((res) => {
          const reorder = res.sort(
            (a, b) => parseFloat(b.count) - parseFloat(a.count)
          );
          const limitFiveUSers = reorder.splice(0, 20);
          setDataforTable(limitFiveUSers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const basicColumns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "",
      selector: "",
      sortable: "",
      minWidth: "100px",
    },
    {
      name: "Sales",
      selector: "count",
      sortable: true,
      minWidth: "300px",
      cell: (row) => {
        return <div>S/ {numberFormat(row.count)}</div>;
      },
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Mejores Clientes</CardTitle>
      </CardHeader>
      {dataforTable.length > 0 && (
        <DataTable
          noHeader
          pagination
          data={dataforTable}
          columns={basicColumns}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationPerPage={15}
          paginationRowsPerPageOptions={[15, 25, 50, 100]}
        />
      )}
    </Card>
  );
};

export default BestUsersTable;
