// ** React Imports
import { useState } from "react";

// ** Third Party Components
import { User, MapPin, Plus } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { Row, Col, Button, Label, FormGroup, Input, Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../store/action";
import Stars from "./Stars";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Model from "./model";

const UserInfoTab = ({ selectedUser, setShowToast, ShowToast }) => {
  // ** State
  const [data, setData] = useState(selectedUser);
  const [showPopUp, setShowPopUp] = useState(false);
  const [stars, setStars] = useState(selectedUser.category || 0);

  const dispatch = useDispatch();
  const ChangeStars = (value) => {
    setStars(value);
    setData({ ...data, ["category"]: value });
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const stateOptions = [
    "Amazonas",
    "Ancash",
    "Apurimac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",
    "Cusco",
    "Huancavelica",
    "Huanuco",
    "Ica",
    "Junín",
    "La Libertad",
    "Lambayeque",
    "Lima, Loreto",
    "Madre de Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martín",
    "Tacna",
    "Tumbes",
    "Ucayali",
  ];
  // ** React hook form vars
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(UpdateUser(selectedUser.id, data, ShowToast, setShowToast));
      }}
    >
      {showPopUp && <Model setShow={setShowPopUp} show={showPopUp} />}
      <Row className="mt-1">
        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Personal Information</span>
          </h4>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="phone">Telefono</Label>
            <Input
              type="phone"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              value={data.phone}
              onChange={changeHandler}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="Website">Website</Label>
            <Input
              type="url"
              name="website"
              id="website"
              placeholder="website url"
              value={data.website}
              onChange={changeHandler}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="Website">Categoria</Label>
            <Stars value={stars} ChangeValue={ChangeStars} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <h4 className="mb-1 mt-2">
            <MapPin size={20} className="mr-50" />

            <span className="align-middle">Direccion</span>
          </h4>
        </Col>
        <Col md="4" sm="12">
          <FormGroup>
            <Label for="state">Departamento</Label>
            <Input
              type="select"
              name="state"
              id="state"
              value={data.state}
              onChange={changeHandler}
            >
              {stateOptions.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </Input>
          </FormGroup>
        </Col>
        <Col md="4" sm="12">
          <FormGroup>
            <Label for="province">Ciudad</Label>
            <Input
              type="text"
              name="province"
              id="province"
              placeholder="province name"
              value={data.province}
              onChange={changeHandler}
            />
          </FormGroup>
        </Col>
        <Col md="4" sm="12">
          <FormGroup>
            <Label for="district">Distrito</Label>
            <Input
              type="text"
              name="district"
              id="district"
              placeholder="district name"
              value={data.district}
              onChange={changeHandler}
            />
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <Label for="address">Direccion</Label>
            <Input
              type="textarea"
              name="address"
              id="address"
              value={data.address}
              onChange={changeHandler}
            />
          </FormGroup>
        </Col>

        <Col className="d-flex flex-sm-row flex-column mt-2">
          <Button
            color="primary"
            className="mb-1 mb-sm-0 mr-0 mr-sm-1"
            onClick={() => {
              setShowPopUp(true);
            }}
          >
            <Plus size={20} className="mr-50" />
            <span className="ml-2">AGREGAR DIRECCIÓN</span>
          </Button>
          <Button
            type="submit"
            color="primary"
            className="mb-1 mb-sm-0 mr-0 mr-sm-1"
          >
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default UserInfoTab;
