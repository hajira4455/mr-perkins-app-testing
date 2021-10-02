import React from 'react'
import { Toast, ToastBody, ToastHeader, Spinner, Progress } from 'reactstrap'
function Toaster ({ toastInfo }) {
  if (toastInfo.state) {
    return (
      <div className='d-flex justify-content-end'>
        <div className='p-1 bg-primary mr-3 mt-1 rounded'>
          <Toast>
            <ToastHeader icon={<Spinner size='sm' color='primary' />}>
              File Uploading
            </ToastHeader>
            <ToastBody>
              <Progress
                animated
                value={Math.ceil(
                  (toastInfo.transfered / toastInfo.total) * 100
                )}
                style={{ width: '250px' }}
              />
            </ToastBody>
          </Toast>
        </div>
      </div>
    )
  } else {
    return ''
  }
}

export default Toaster
