import { useState, useEffect } from "react";
// ** Third Party Components
import Avatar from "@components/avatar";
import { useSelector } from "react-redux";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, CardHeader, CardTitle } from "reactstrap";
import { transformPacking } from "../../../utility/Utils";

const BestProductsTable = () => {
  const data = useSelector((state) => state?.invoice?.allData);
  const products = useSelector((state) => state?.products?.allProducts);
  const COUNT_LIMIT_LIST = 20;
  const [dataforTable, setDataforTable] = useState([]);

  const getTotalOrders = () => {
    const total = data.length;
    const arrPlot = [];
    const arrProductsTotal = [];

    return new Promise((resolve) => {
      // Agrupo en un array todos los pedidos
      for (let i = 0; i < total; i++) {
        const totalElements = data[i].elements ? data[i].elements.length : 0;
        for (let j = 0; j < totalElements; j++) {
          arrPlot.push(data[i].elements[j]);
        }
        if (i === total - 1) {
          resolve();
        }
      }
    }).then(() => {
      // Agrupo los pedidos por producto
      const grouped = Array.from(
        arrPlot
          .reduce(
            (m, o) => m.set(o.productID, (m.get(o.productID) || []).concat(o)),
            new Map()
          )
          .values()
      );

      // Formeto los pedidos totales por producto y los sumo
      for (let i = 0; i < grouped.length; i++) {
        const obj = {};
        obj.counter = 0;
        obj.productName = grouped[i][0].productName;
        obj.productID = grouped[i][0].productID;

        obj.counter += grouped[i].reduce(
          (acc, curr) =>
            acc + parseInt(curr.quantity) * transformPacking(curr.packing),
          0
        );

        arrProductsTotal.push(obj);

        if (i === grouped.length - 1) {
          return arrProductsTotal;
        }
      }
    });
  };
  useEffect(() => {
    getTotalOrders().then((res) => {
      const reorder = res.sort(
        (a, b) => parseFloat(b.counter) - parseFloat(a.counter)
      );
      const limitFourProducts = reorder.splice(0, COUNT_LIMIT_LIST);
      let mergedProductImg = limitFourProducts.map((e, i) => {
        let match = products.find((element) => element.id === e.productID);
        if (match) {
          e.img = match.img;
        }
        return e;
      });
      setDataforTable(mergedProductImg);
    });
  }, []);

  const basicColumns = [
    {
      name: "Imagen",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <div className="avatar-2">
          {row && row.img ? (
            <Avatar img={row.img} />
          ) : (
            <Avatar
              color="light-primary"
              className="mr-50"
              content={row.productName}
              initials
            />
          )}
        </div>
      ),
    },
    {
      name: "Nombre",
      selector: "productName",
      sortable: true,
      minWidth: "200px",
    },

    {
      name: "Total",
      selector: "counter",
      sortable: true,
      maxWidth: "20px",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Productos Más Vendidos</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={dataforTable}
        columns={basicColumns}
        paginationPerPage={5}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </Card>
  );
};

export default BestProductsTable;
