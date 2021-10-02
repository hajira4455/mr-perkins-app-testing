import { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function CreateInvoice (props) {
  const { createInvoice } = useSelector(state => state.invoice)
  const [Forms, setForms] = useState([])
  useEffect(() => {
    setForms(createInvoice)
  }, [createInvoice])
  const getGrandTotal = () => {
    return Object.values(Forms).reduce((a, b) => +a + +b.total, 0)
  }
  return (
    <div>
      {Object.keys(Forms).length > 0 &&
        Object.keys(Forms).map((form, index) => {
          return (
            <div key={`subTotal-${index}`} className='invoice-total-item'>
              <p className='invoice-total-title'>
                {Forms[form].product.name} ({Forms[form].qty})
              </p>
              <p className='invoice-total-amount'>${Forms[form].total}</p>
            </div>
          )
        })}
      <hr className='my-50' />
      <div className='invoice-total-item'>
        <p className='invoice-total-title'>Total:</p>
        <p className='invoice-total-amount'>${getGrandTotal()}</p>
      </div>
    </div>
  )
}

export default CreateInvoice
