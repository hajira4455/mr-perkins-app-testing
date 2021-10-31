import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Form,
  CustomInput,
  Alert,
} from "reactstrap";
import { Home, ShoppingBag, MapPin } from "react-feather";
import firebase from 'firebase/app'
// import LoadingFeedback from "./loaders/LoadingFeedback";
const ModalDirections = (props) => {
  let { show, setShow, getDirections } = props;
  const [message, setMessage] = useState();
  const [data, setData] = useState({
    direction: "",
    door: "",
    district: "",
    option: 0,
    title: "",
  });
  const changeHandler = (e) => {
    setMessage("")
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addDirection = () => {
    // e.preventDefault();
    if (data.title.length < 1) {
      setMessage("Por favor colocal el título de la nueva dirección");
    }

    if (data.direction.length < 1) {
      setMessage("Por favor coloca la dirección")
    }

    if (data.door.length < 1) {
      setMessage("Debes colocar alguna Puerta, oficina o referencia");
    }
    else if (data.title && data.direction && data.door && data.district && data.option) {
      // feedback: "Agregando dirección",
      setShow(!show);
      firebase
        .firestore()
        .collection("users")
        .doc(window?.location?.pathname?.split('/')[3])
        .collection("directions")
        .add({
          title: data.title,
          direction: data.direction,
          created: new Date(),
          district: data.district,
          door: data.door,
          type: data.option,
        })
        .then(() => {
          setShow(!show);
          getDirections()
        })
        .catch((e) => {
          console.log(e, "Algo salió mal");
        });

    }
  };
  return (
    <div>
      <Form

      >
        <Modal isOpen={show} toggle={() => setShow(!show)}>
          <ModalHeader toggle={() => setShow(!show)}>
            AGREGAR DIRECCIÓN
          </ModalHeader>
          <ModalBody>
            {message &&
              <Alert color="danger">
                <div>
                  <h4 class="alert-heading">
                    Error
                  </h4>
                </div>
                <div class="alert-body">
                  <span>{message}</span>
                </div>
              </Alert>}
            <FormGroup>
              <Label for="phone">Dirección</Label>
              <Input
                type="text"
                name="direction"
                placeholder="Ejem: Entre Av Colonial y Av Venezuela"
                value={data.direction}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="phone">Piso, Puerta, Oficina o Referncia</Label>
              <Input
                type="text"
                name="door"
                placeholder="Ejem: Entre Av Colonial y Av Venezuela "
                value={data.door}
                onChange={changeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Distrito</Label>

              <select
                name="cars"
                className="custom-select"
                value={data.district}
                onChange={(e) => {
                  setMessage("")
                  let dubData = { ...data };
                  dubData.district =
                    e.currentTarget.options[
                      e.currentTarget.options.selectedIndex
                    ].value;

                  setData(dubData);
                }}
              >
                <option value="" selected>
                  Selecciona tu distrito
                </option>
                <option value="Cercado de Lima">Cercado de Lima</option>
                <option value="Ancón">Ancón</option>
                <option value="Ate">Ate</option>
                <option value="Barranco">Barranco</option>
                <option value="Breña">Breña</option>
                <option value="Carabayllo">Carabayllo</option>
                <option value="Chaclacayo">Chaclacayo</option>
                <option value="Chorrillos">Chorrillos</option>
                <option value="Cieneguilla">Cieneguilla</option>
                <option value="Comas">Comas</option>
                <option value="El Agustino">El Agustino</option>
                <option value="Independencia">Independencia</option>
                <option value="Jesús María">Jesús María</option>
                <option value="La Molina">La Molina</option>
                <option value="La Victoria">La Victoria</option>
                <option value="Lince">Lince</option>
                <option value="Los Olivos">Los Olivos</option>
                <option value="Lurigancho">Lurigancho</option>
                <option value="Lurín">Lurín</option>
                <option value="Magdalena del Mar">Magdalena del Mar</option>
                <option value="Miraflores">Miraflores</option>
                <option value="Pachacamac">Pachacamac</option>
                <option value="Pucusuna">Pucusuna</option>
                <option value="Pueblo Libre">Pueblo Libre</option>
                <option value="Puente Piedra">Puente Piedra</option>
                <option value="Punta Hermosa">Punta Hermosa</option>
                <option value="Punta Negra">Punta Negra</option>
                <option value="Rímac">Rímac</option>
                <option value="San Bartolo">San Bartolo</option>
                <option value="San Borja">San Borja</option>
                <option value="San Isidro">San Isidro</option>
                <option value="San Juan de Lurigancho">
                  San Juan de Lurigancho
                </option>
                <option value="San Juan de Miraflores">
                  San Juan de Miraflores
                </option>
                <option value="San Luis">San Luis</option>
                <option value="San Martin de Porres">
                  San Martin de Porres
                </option>
                <option value="San Miguel">San Miguel</option>
                <option value="Santa Anita">Santa Anita</option>
                <option value="Santa María del Mar">Santa María del Mar</option>
                <option value="Santa Rosa">Santa Rosa</option>
                <option value="Santiago de Surco">Santiago de Surco</option>
                <option value="Surquillo">Surquillo</option>
                <option value="Villa El Salvador">Villa El Salvador</option>
                <option value="Villa María del Triunfo">
                  Villa María del Triunfo
                </option>
              </select>
            </FormGroup>
            <div className="d-flex justify-content-between ">
              <FormGroup
                onClick={() => {
                  setMessage("")
                  let dubData = { ...data };
                  dubData.option = 0;
                  setData(dubData);
                }}
              >
                <CustomInput
                  type="radio"
                  label={
                    <span>
                      <Home size={20} className="mr-50" />
                      Mi casa
                    </span>
                  }
                  checked={data.option === 0}
                />
              </FormGroup>
              <FormGroup
                onClick={() => {
                  setMessage("")
                  let dubData = { ...data };
                  dubData.option = 1;
                  setData(dubData);
                }}
              >
                <CustomInput
                  type="radio"
                  label={
                    <span>
                      <ShoppingBag size={20} className="mr-50" />
                      Oficina
                    </span>
                  }
                  checked={data.option === 1}
                />
              </FormGroup>
              <FormGroup
                onClick={() => {
                  let dubData = { ...data };
                  dubData.option = 2;
                  setData(dubData);
                }}
              >
                <CustomInput
                  type="radio"
                  label={
                    <span>
                      <MapPin size={20} className="mr-50" />
                      Otros
                    </span>
                  }
                  checked={data.option === 2}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="phone">¿De quién es esta dirección?</Label>
              <Input
                type="text"
                name="title"
                placeholder="Ejem: Tía Rosa"
                value={data.title}
                onChange={changeHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              onClick={() => {
                addDirection();

              }}
            >
              Guardar
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};

export default withRouter(ModalDirections);
