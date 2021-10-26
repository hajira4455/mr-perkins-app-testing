import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const ApexBarChart = ({ info, direction, allUsers, groupByKey }) => {
  const [usersGroup, setUsersGroup] = useState([]);
  useEffect(() => {
    const UsersData = {};
    const data = groupByKey(allUsers, "province");
    Object.keys(data).map((item) => {
      UsersData[item] = data[item].length;
    });
    setUsersGroup(UsersData);
  }, [allUsers, groupByKey]);
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "10%",
        endingShape: "rounded",
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    colors: info,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Object.keys(usersGroup),
    },
    yaxis: {
      opposite: direction === "rtl",
    },
  };

  const series = [
    {
      data: Object.values(usersGroup),
    },
  ];

  return <Card></Card>;
};

export default ApexBarChart;
