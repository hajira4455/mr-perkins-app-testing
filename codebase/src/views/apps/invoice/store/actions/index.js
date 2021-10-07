import axios from 'axios'
import { firestore } from '@src/utility/firebase'
import { paginateArray, sortCompare } from '../../../../../@fake-db/utils'
import { store } from '../../../../../redux/storeConfig/store'
// ** Get data

export const getData = params => {
  const { q = '', perPage = 10, page = 1, status = null } = params
  const queryLowered = q.toLowerCase()
  return async (dispatch, getStore) => {
    const { userData } = await getStore().auth
    const ref = firestore.collection('orders')
    const type = userData.type
    if (userData.user) {
      const data =
        type === 'admin'
          ? await ref.get()
          : userData.id
            ? await ref.where('userID', '==', userData.id).get()
            : null
      const records = []
      await data.docs.map(item => {
        const record = item.data()
        record.id = item.id
        records.push(record)
      })

      const filteredData = records
        .filter(
          invoice =>
            /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
            invoice.name &&
            invoice.email &&
            (invoice.name.toLowerCase().includes(queryLowered) ||
              invoice.email.toLowerCase().includes(queryLowered) ||
              invoice.userID.toLowerCase().includes(queryLowered))
        )
        .sort(sortCompare('id'))
        .reverse()
      dispatch({
        type: 'GET_INVOICE_DATA',
        data: paginateArray(filteredData?.sort((a, b) => b.created.seconds - a.created.seconds), perPage, page),
        allData: records,
        totalPages: records.length,
        params
      })
    }
  }
}
export const SetInvoiceData = ({ formID, product }) => {
  return dispatch => {
    if (product.product) {
      dispatch({
        type: 'SET_FORM_DATA',
        data: {
          formID,
          details: {
            product: product.product,
            qty: product.qty,
            total: product.total
          }
        }
      })
    }
  }
}
export const SetInvoiceDetails = client => {
  return dispatch => {
    dispatch({
      type: 'INVOICE_CREATOR_DETAILS',
      data: client
    })
  }
}
export const SaveInvoice = data => {
  return async (dispatch, getStore) => {
    const { createInvoice, invoiceCreatorDetails } = getStore().invoice
    const { userData } = getStore().auth
    data.products = []
    Object.keys(createInvoice).map(item => {
      data.products.push(createInvoice[item])
    })
    data.userID = invoiceCreatorDetails.id
      ? invoiceCreatorDetails.id
      : userData.id
    data.name =
      userData.type === 'admin'
        ? invoiceCreatorDetails.name
        : userData.user.name
    data.email =
      userData.type === 'admin'
        ? invoiceCreatorDetails.email
        : userData.user.email
    data.created = new Date()
    data.status = 'unattended'

    const ref = firestore.collection('orders')
    const newOrder = await ref.add(data)
    const fullNewOrder = await ref.doc(newOrder.id).get()
    return fullNewOrder.data()
  }
}
export const deleteInvoiceData = id => {
  return dispatch => {
    dispatch({
      type: 'DELETE_INVOICE_DATA',
      data: id
    })
  }
}
export const GetSingleInvoice = id => {
  return async dispatch => {
    const ref = firestore.collection('orders')
    const singleOrder = await ref.doc(id).get()
    const data = singleOrder.data()
    data.id = id
    return dispatch({
      type: 'GET_SINGLE_INVOICE',
      data
    })
  }
}
export const setInvoiceStatus = ({ id, state }) => {
  return async dispatch => {
    const ref = firestore.collection('orders')
    const foundOrder = await ref.doc(id).update({ state })
    return 'invoiceUpdated'
  }
}
// ** Delete Invoice
export const deleteInvoice = id => {
  return async dispatch => {
    const ref = firestore.collection('orders')
    const foundOrder = await ref.doc(id).delete()
    return 'orderDeleted'
  }
}
