import { useContext, useEffect, useState, Fragment } from "react";
import { Row, Col, Card, CardBody, CardText, CardTitle } from "reactstrap";
import CompanyTable from "./CompanyTable";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCategories,
  getProductsData,
} from "../../../redux/actions/clients";
import { getData } from "../../apps/invoice/store/actions";
import {
  getAllData,
  getUser,
  getUserInvoices,
} from "../../apps/user/store/action";
import { GetOffersData } from "../../../redux/actions/offers";
import ApexRadialBarChart from "@src/views/charts/apex/ApexRadialbar";
import ApexBarChart from "@src/views/charts/apex/ApexBarChart";
import BestUsersTable from "./bestUsers";
import TopProductsTable from "./TopProducts";
import ClientDashboard from "./ClientDashboard";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";

const EcommerceDashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const { colors } = useContext(ThemeColors),
    Categories = useSelector((state) => state.Clients),
    { allData } = useSelector((state) => state.invoice),
    { offers } = useSelector((state) => state.offers),
    userState = useSelector((state) => state.users),
    productsState = useSelector((state) => state.products),
    [Offers, setOffers] = useState([]),
    trackBgColor = "#e9ecef",
    [cats, setCats] = useState(Categories.categories || []);

  useEffect(() => {
    if (userData.type && userData.type !== "admin") {
      dispatch(getUser(userData.id)).then((data) => {
        dispatch(getUserInvoices(data.selectedUser.email));
      });
    }
    dispatch(FetchCategories());
    dispatch(getAllData());
    dispatch(getProductsData());
    dispatch(GetOffersData());
    dispatch(
      getData({
        page: 1,
        perPage: 10,
        status: "",
        q: "",
      })
    );
  }, []);

  const thisMonthSales = () => {
    let grandTotal = 0;
    if (allData.length > 0) {
      const lmsData = allData.filter((item) => {
        return (
          new Date(item.created.seconds * 1000).getMonth() ===
          new Date().getMonth()
        );
      });
      lmsData.map((item) => {
        if (item.elements) {
          item.elements.map((elem) => {
            if (elem.productPrice) {
              grandTotal += !isNaN(Number(elem.productPrice.split("/")[1]))
                ? Number(elem.productPrice.split("/")[1])
                : 0 * Number(elem.quantity);
            }
          });
        } else if (item.products) {
          item.products.map((elem) => {
            grandTotal += Number(elem.total);
          });
        }
      });
      return grandTotal.toFixed(2);
    }
    return 0;
  };
  const PreviousMonthSale = () => {
    let grandTotal = 0;
    if (allData.length > 0) {
      const lmsData = allData.filter((item) => {
        return (
          new Date(item.created.seconds * 1000).getMonth() ===
          new Date().getMonth() - 1
        );
      });
      lmsData.map((item) => {
        if (item.elements) {
          item.elements.map((elem) => {
            if (elem.productPrice) {
              grandTotal += !isNaN(Number(elem.productPrice.split("/")[1]))
                ? Number(elem.productPrice.split("/")[1])
                : 0 * Number(elem.quantity);
            }
          });
        } else if (item.products) {
          item.products.map((elem) => {
            grandTotal += Number(elem.total);
          });
        }
      });
      return grandTotal.toFixed(2);
    }
    return 0;
  };
  useEffect(() => {
    setCats(Categories.categories);
  }, [Categories.categorallDataies]);

  useEffect(() => {
    setOffers(offers);
  }, [offers]);
  const productsTotaler = () => {
    if (allData.length > 0) {
      return allData.reduce(
        (a, b) =>
          +a +
          +(b.elements
            ? b.elements.length
            : b.products
            ? b.products.length
            : 0),
        0
      );
    }
  };
  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((d - yearStart) / (86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }

  const lastMothsOrders = () => {
    const arr = allData.filter((item) => {
      const date = item.created ? item.created : item.date;
      if (
        new Date(date.seconds * 1000).getMonth() ===
        new Date().getMonth() - 1
      ) {
        return item;
      }
    });
    return arr.length;
  };

  const thisMonthOrders = () => {
    const arr = allData.filter((item) => {
      const date = item.created ? item.created : item.date;
      if (new Date(date.seconds * 1000).getMonth() === new Date().getMonth()) {
        return item;
      }
    });
    return arr.length;
  };
  const thisMonthOrdersCalculator = () => {
    const arr = allData.filter((item) => {
      const date = item.created ? item.created : item.date;
      if (new Date(date * 1000).getMonth() === new Date().getMonth()) {
        return item;
      }
    });
    return arr.length;
  };
  const calculatTotalEarnings = () => {
    let grandTotal = 0;
    allData.map((item) => {
      if (item.elements) {
        item.elements.map((elem) => {
          if (elem.productPrice) {
            grandTotal += !isNaN(Number(elem.productPrice.split("/")[1]))
              ? Number(elem.productPrice.split("/")[1])
              : 0 * Number(elem.quantity);
          }
        });
      } else if (item.products) {
        item.products.map((elem) => {
          grandTotal += Number(elem.total);
        });
      }
    });
    return grandTotal.toFixed(2);
  };
  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }
  const calculateUserWithType = () => {
    const data = groupByKey(userState.allData, "type");
    const UsersData = {};
    Object.keys(data).map((item) => {
      UsersData[item] = data[item].length;
    });
    return UsersData;
  };
  const CalculateInvoicesWIthUsers = () => {
    const factoredData = [];
    const data = groupByKey(allData, "userID");
    Object.keys(data).map((item) => {
      factoredData.push({ id: item, value: data[item].length });
    });
    return factoredData;
  };
  const TopSellingProductsCalculator = () => {
    const allElementsInOrders = [];
    allData.map((item) => {
      if (item.elements) {
        item.elements.map((elem) => {
          for (let index = 0; index < Number(elem.quantity); index++) {
            allElementsInOrders.push(elem);
          }
        });
      }
      if (item.products) {
        item.products.map((prod) => {
          prod.productName = prod.product.name;
          prod.quantity = prod.qty;
          for (let index = 0; index < Number(prod.qty); index++) {
            allElementsInOrders.push(prod);
          }
        });
      }
    });
    const NewArrayToReturnToTable = [];
    const producedObject = groupByKey(allElementsInOrders, "productName");
    Object.keys(producedObject).map((item) => {
      producedObject[item] = {
        sales: producedObject[item].length,
      };
    });

    Object.keys(producedObject).map((item) => {
      allData.map((invoice) => {
        if (invoice.elements) {
          invoice.elements.map((elem) => {
            if (elem.productName === item) {
              if (producedObject[item].orders) {
                producedObject[item].orders++;
              } else {
                producedObject[item].orders = 1;
              }
            }
          });
        }
        if (invoice.products) {
          invoice.products.map((prod) => {
            if (prod.productName === item) {
              if (producedObject[item].orders) {
                producedObject[item].orders++;
              } else {
                producedObject[item].orders = 1;
              }
            }
          });
        }
      });
    });
    Object.keys(producedObject).map((item) => {
      NewArrayToReturnToTable.push({
        name: item,
        sales: producedObject[item].sales,
        orders: producedObject[item].orders,
      });
    });
    NewArrayToReturnToTable.sort((a, b) => {
      if (a.sales < b.sales) return -1;
      return a.sales > b.sales ? 1 : 0;
    }).reverse();

    return NewArrayToReturnToTable;
    // return [1, 2, 3]
  };
  TopSellingProductsCalculator();
  return (
    <div id="dashboard-ecommerce">
      {userData.type && userData.type !== "admin" && (
        <ClientDashboard
          allData={allData}
          userData={userData}
          lastMothsOrders={lastMothsOrders}
          thisMonthOrders={thisMonthOrders}
        ></ClientDashboard>
      )}
      <Row className="match-height">
        {userData.type === "admin" ? (
          <Col xl="4" md="6" xs="12">
            <CardMedal
              thisMonthSales={thisMonthSales}
              title1="Total de Ventas del Mes"
              title2="Target is S/ 250,000"
              buttonTitle="Ver Ventas"
              PreviousMonthSale={PreviousMonthSale}
              type={userData.type}
              price={true}
            />
          </Col>
        ) : null}
        {userData.type === "admin" && (
          <Col xl="8" md="6" xs="12">
            <StatsCard
              orders={thisMonthOrdersCalculator}
              users={userState.allData}
              products={productsState.allProducts.length}
              cls={{ xl: "3", sm: "6" }}
            />
          </Col>
        )}
      </Row>

      {userData.type === "admin" && (
        <Row className="match-height">
          <Col lg="12" md="12">
            <Row className="match-height">
              <Col lg="6" md="6" xs="12">
                <ApexRadialBarChart
                  allUsers={userState.allData}
                  usersData={calculateUserWithType}
                />
              </Col>
              <Col lg="6" md="6" xs="12">
                <BestUsersTable />
              </Col>
            </Row>
          </Col>
          {userData.type === "admin" && (
            <Fragment>
              <Col lg="6" xs="12">
                <TopProductsTable />
              </Col>
            </Fragment>
          )}
        </Row>
      )}
      {Offers.length > 0 && <h3 className="my-2"> Special Offers</h3>}
      <Row className="match-height">
        {Offers.length > 0 &&
          Offers.map((item, index) => {
            return (
              <Col lg="4" md="6" xs="12" key={index}>
                <Card className="mb-3">
                  <div
                    className="imagedisplayer"
                    style={{
                      width: "100%",
                      height: "250px",
                      backgroundImage: `url(${item.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                    }}
                  ></div>
                  <CardBody>
                    <CardTitle tag="h4">{item.captions}</CardTitle>
                    <CardText>
                      <small className="text-muted">
                        {item.validTill ? item.validTill : ""}
                      </small>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
