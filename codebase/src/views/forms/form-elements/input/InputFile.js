import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Row,
  Col
} from 'reactstrap'
const changeHandler = e => {
  console.log(e.target.files)
}
const InputFile = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Input File</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col md='6' sm='12'>
            <FormGroup>
              <Label for='inputFile'>Simple File Input</Label>
              <Input type='file' id='inputFile' name='fileInpur' />
            </FormGroup>
          </Col>
          <Col md='6' sm='12'>
            <FormGroup>
              <Label for='exampleCustomFileBrowser'>Custom File Input</Label>
              <CustomInput
                type='file'
                id='exampleCustomFileBrowser'
                name='customFile'
                onChange={changeHandler}
              />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default InputFile
