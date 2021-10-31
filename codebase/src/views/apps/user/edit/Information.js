// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import { User, MapPin, Plus, MoreVertical, Trash2, Archive } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import {
  Row, Col, Button, Label, FormGroup, Input, Form, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../store/action";
import Stars from "./Stars";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Model from "./model";
import firebase from 'firebase/app'

const UserInfoTab = ({ selectedUser, setShowToast, ShowToast }) => {
  // ** State
  const [data, setData] = useState(selectedUser);
  const [dir, setDir] = useState([]);
  const [message, setMessage] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [stars, setStars] = useState(selectedUser.category || 0);

  const dispatch = useDispatch();


  const getDirections = () => {
    firebase.firestore().collection("users").doc(window?.location?.pathname?.split('/')[3]).collection("directions").orderBy("created", "desc").limit(10).get()
      .then(snap => {
        let directions = [];
        snap.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;

          directions.push(data)
        })
        setDir(directions)
      })
  }
  useEffect(() => {
    getDirections()
  }, [])
  console.log("dir", dir)
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
  const delDirection = (id) => {
    firebase.firestore().collection("users").doc(window?.location?.pathname?.split('/')[3]).collection("directions").doc(id).delete()
      .then(() => {
        setMessage("Dirección eliminada!")
        setTimeout(() => {
          setMessage("")
        }, [1500])
        getDirections();
      })
  }
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(UpdateUser(selectedUser.id, data, ShowToast, setShowToast));
      }}
    >
      {
        message &&
        <Alert color="success">
          <div>
            <h4 class="alert-heading">
              Success
            </h4>
          </div>
          <div class="alert-body">
            <span>{message}</span>
          </div>

        </Alert>}
      {showPopUp && <Model setShow={setShowPopUp} show={showPopUp} getDirections={getDirections} />}
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
        {/* <Col md="4" sm="12">
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

        </Col> */}
        <Col sm="12" className="d-flex flex-wrap">

          {
            dir?.map(sin =>
            (<Col md={4} className="form-control m-1 h-auto">
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <div>

                    {sin.title}
                  </div>

                  <UncontrolledDropdown>
                    <DropdownToggle tag="div" className="btn btn-sm">
                      <MoreVertical size={14} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      {/* <DropdownItem
                        className="w-100"
                      >
                        <Archive size={14} className="mr-50" />
                        <span className="align-middle">Editar</span>
                      </DropdownItem> */}
                      <DropdownItem
                        className="w-100"
                        onClick={() => {
                          delDirection(sin.id)
                        }}
                      >
                        <Trash2 size={14} className="mr-50" />
                        <span className="align-middle">Eliminar</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                </div>
                <div>{sin.direction}</div>
                <div>{
                  sin.type === 0 ? "Casa" : sin.type === 1 ? "Trabajo" : "Otro"
                }</div>
              </FormGroup>
            </Col>
            )
            )}
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
