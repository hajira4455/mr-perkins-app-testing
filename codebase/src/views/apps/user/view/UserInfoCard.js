// ** React Imports
import { Link, useHistory } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import { deleteUser, disableUserById } from "../store/action";
import { store } from "@store/storeConfig/store";
import "./style.scss";

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col, Media } from "reactstrap";
import {
  DollarSign,
  TrendingUp,
  User,
  Check,
  Star,
  Flag,
  Phone,
  MapPin,
} from "react-feather";

const UserInfoCard = ({ selectedUser, FetchData }) => {
  const history = useHistory();

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.img) {
      return (
        <img
          src={selectedUser.img}
          alt="user-avatar"
          className="img-fluid rounded"
          height="104"
          width="104"
        />
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          "light-success",
          "light-danger",
          "light-warning",
          "light-info",
          "light-primary",
          "light-secondary",
        ],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="rounded"
          content={selectedUser.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(36px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "90px",
            width: "90px",
          }}
        />
      );
    }
  };

  const deleteUserMethod = (id) => {
    store.dispatch(deleteUser(id)).then((res) => {
      history.go(-1);
      // if (res.code === 200) {
      //   history.go(-1)
      // }
    });
  };
  const disableUser = (id, status) => {
    store.dispatch(disableUserById(id, status)).then((res) => {
      if (res.code === 200) {
        FetchData();
      }
    });
  };
 
  return (
    <Card>
      <CardBody>
        <Row>
          <Col
            xl="6"
            lg="12"
            className="d-flex flex-column justify-content-between border-container-lg"
          >
            <div className="user-avatar-section">
              <div className="d-flex justify-content-start">
                {renderUserImg()}

                <div className="d-flex flex-column ml-1">
                  <div className="user-info mb-1">
                    <h4 className="mb-0">
                      {selectedUser !== null
                        ? selectedUser.name
                        : "Eleanor Aguilar"}
                    </h4>
                    <CardText tag="span">
                      {selectedUser !== null
                        ? selectedUser.email
                        : "eleanor.aguilar@gmail.com"}
                    </CardText>
                  </div>
                  <div className="d-flex flex-wrap align-items-center btn-sm">
                    <div className="longButtons mb-1 mb-sm-0">
                      <Button.Ripple
                        tag={Link}
                        to={`/clients/edit/${selectedUser.id}`}
                        color="primary"
                        className="btn-sm"
                      >
                        Editar
                      </Button.Ripple>
                      <Button.Ripple
                        className="ml-1 btn-sm"
                        color="danger"
                        outline
                        onClick={() => {
                          deleteUserMethod(selectedUser.id);
                        }}
                      >
                        Borar
                      </Button.Ripple>
                    </div>
                    <Button.Ripple
                      className="ml-1 btn-sm"
                      color={
                        selectedUser.status === "inactive"
                          ? "success"
                          : "warning"
                      }
                      outline
                      onClick={() => {
                        disableUser(
                          selectedUser.id,
                          selectedUser.status === "inactive"
                            ? "active"
                            : "inactive"
                        );
                      }}
                    >
                      {selectedUser.status === "inactive"
                        ? "Enable"
                        : "desactivar"}
                    </Button.Ripple>
                  </div>
                </div>
              </div>
              <div className="d-flex my-2 userssales">
                <Media className="mx-2">
                  <Avatar
                    icon={
                      <div
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        S/
                      </div>
                    }
                    className="mr-2 bg-light-primary"
                  />
                  <Media className="my-auto" body>
                    {/* current sale*/}
                    <h4 className="font-weight-bolder mb-0">S/ 1234</h4>
                    <CardText className="font-small-3 mb-0">
                      Ventas Mes
                    </CardText>
                  </Media>
                </Media>
                <Media>
                  <Avatar
                    icon={<TrendingUp size={24} />}
                    className="mr-2 bg-light-success"
                  />
                  <Media className="my-auto" body>
                    {/* current sala */}
                    <h4 className="font-weight-bolder mb-0">S/ 1234</h4>
                    <CardText className="font-small-3 mb-0">
                      Ventas Año
                    </CardText>
                  </Media>
                </Media>
              </div>
            </div>
          </Col>
          <Col xl="6" lg="12" className="mt-2 mt-xl-0">
            <div className="user-info-wrapper">
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <User className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Username
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser !== null
                    ? selectedUser.name
                    : "eleanor.aguilar"}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <User className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Business Name
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser !== null
                    ? selectedUser.businessName
                    : "eleanor.aguilar"}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Check className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Status
                  </CardText>
                </div>
                <CardText className="text-capitalize mb-0">
                  {selectedUser.status ? selectedUser.status : "Active"}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Star className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Role
                  </CardText>
                </div>
                <CardText className="text-capitalize mb-0">
                  {selectedUser !== null ? selectedUser.type : "Admin"}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <DollarSign className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Payment Type
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser.paymentType ? selectedUser.paymentType : ""}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Flag className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    State
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser.state ? selectedUser.state : ""}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <MapPin className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Province
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser.province ? selectedUser.province : ""}
                </CardText>
              </div>

              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <TrendingUp className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    District
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser.district ? selectedUser.district : ""}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <Phone className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Contact
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser !== null
                    ? selectedUser.phone
                    : "no number saved"}
                </CardText>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserInfoCard;
