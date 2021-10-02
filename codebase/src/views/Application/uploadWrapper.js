import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import FileUploaderBasic from './fileUploader'
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'

const Uploader = ({ setFile }) => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <FileUploaderBasic setFile={setFile}/>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Uploader
