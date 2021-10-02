import axios from 'axios'
import { firestore } from '@src/utility/firebase'
// ** GET Products
export const getProducts = params => {
  const { q } = params
  const queryLowered = q.toLowerCase()
  return async dispatch => {
    return await firestore
      .collection('products')
      .get()
      .then(snap => {
        const records = []
        snap.docs.map(item => {
          const record = item.data()
          record.id = item.id
          if (q.length > 0) {
            if (record.name.toLowerCase().includes(queryLowered)) {
              records.push(record)
            }
          } else {
            records.push(record)
          }
        })
        dispatch({
          type: 'GET_PRODUCTS',
          data: { products: records, total: records.length, params }
        })
      })
  }
}
// ** GET Wishlist Items

// ** DELETE Wishlist Item
export const deleteProduct = id => {
  return async dispatch => {
    const ref = firestore.collection('products')
    await ref.doc(id).delete()
    return dispatch({
      type: 'Product_Deleted',
      id
    })
  }
}

// ** GET Cart Items

// ** GET Single Product
export const getProduct = slug => {
  return async dispatch => {
    return await firestore
      .collection('products')
      .doc(slug)
      .get()
      .then(snapshot => {
        const data = snapshot.data()
        data.id = snapshot.id
        dispatch({
          type: 'GET_PRODUCT',
          data
        })
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  }
}
