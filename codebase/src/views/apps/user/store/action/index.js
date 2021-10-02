import axios from 'axios'
import { firestore, SecondaryAuth, storage } from '@src/utility/firebase'
import { paginateArray } from '../../../../../@fake-db/utils'
import { store } from '../../../../../redux/storeConfig/store'
// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    return await firestore
      .collection('users')
      .get()
      .then(snap => {
        const records = []
        snap.docs.map(item => {
          const record = item.data()
          record.id = item.id
          records.push(record)
        })
        dispatch({
          type: 'GET_ALL_DATA',
          data: records
        })
      })
  }
}

// ** Get data on page or row change
export const getData = params => {
  const { q = '', perPage = 10, page = 1, role = 0 } = params
  return async dispatch => {
    const queryLowered = q.toLowerCase()
    let filteredData = store.getState().users.allData

    if (queryLowered.length > 0) {
      filteredData = filteredData.filter(item => {
        if (item.name.toLowerCase().includes(queryLowered)) {
          return item
        }
        if (item.email.toLowerCase().includes(queryLowered)) {
          return item
        }
      })
    }
    if (role !== 0) {
      filteredData = await filteredData.filter(
        item => item.category && item.category === role
      )
    }
    const response = {
      users: paginateArray(filteredData, perPage, page)
    }
    dispatch({
      type: 'GET_DATA',
      data: response,
      totalPages: filteredData.length,
      params
    })
  }
}

// ** Get User
export const getUser = id => {
  return async dispatch => {
    const ref = firestore.collection('users').doc(id)
    const doc = await ref.get()

    if (!doc.exists) {
      console.log('not found user')
    }
    const Data = doc.data()
    Data.id = id
    return dispatch({
      type: 'GET_USER',
      selectedUser: Data
    })
  }
}
export const getUserInvoices = email => {
  return async dispatch => {
    const invoiceRef = firestore.collection('orders')
    const invoices = await invoiceRef.where('email', '==', email).get()
    if (invoices.empty) {
      console.log('No matching documents.')
    }
    const invoicesarr = []
    invoices.forEach(doc => {
      const invoice = doc.data()
      invoice.id = doc.id
      invoicesarr.push(invoice)
    })
    return dispatch({
      type: 'GET_USER_INVOICES_DATA',
      data: invoicesarr
    })
  }
}

// ** Add new user
export const addUser = user => {
  return async () => {
    user.created = new Date()
    const ref = firestore.collection('users')
    const { email, password } = user
    const CreateUser = await SecondaryAuth.createUserWithEmailAndPassword(
      email,
      password
    )
    await CreateUser.user.updateProfile({
      displayName: user.name,
      photoURL: 'user'
    })
    const userAdded = await ref.doc(CreateUser.user.uid).set(user)
    return userAdded
  }
}

// ** Delete user
export const deleteUser = id => {
  return async (dispatch, getState) => {
    try {
      const ref = firestore.collection('users').doc(id)
      const userFoundById = await ref.get()
      const userFound = userFoundById.data()
      const email = userFound.email,
        password = userFound.password ? userFound.password : 'zeeeshan'
      await ref.delete()
      const userLogin = await SecondaryAuth.signInWithEmailAndPassword(
        email,
        password
      )

      const userLoggedn = SecondaryAuth.currentUser
      await userLoggedn.delete()
      dispatch({
        type: 'USER_DELETED',
        id
      })
      return dispatch({
        type: 'USER_DELETED',
        id
      })
    } catch (error) {
      return dispatch({
        type: 'USER_DELETED',
        id
      })
    }
  }
}
export const disableUserById = (id, status) => {
  return async () => {
    try {
      const ref = firestore.collection('users').doc(id)
      await ref.update({ status })
      return { message: 'user updated successfully', code: 200 }
    } catch (error) {
      return { message: 'user cannot be updated', code: 400 }
    }
  }
}
const UpdateData = (id, DataToUpdate) => {
  firestore
    .collection('users')
    .doc(id)
    .update(DataToUpdate)
}
export const UpdateUser = (
  id,
  userDetails,
  ShowToast,
  setShowToast,
  file = null
) => {
  return async dispatch => {
    if (file) {
      const uploadTask = storage
        .ref(`/images/${(Math.random() * 1e32).toString(36)}`)
        .put(file)
      uploadTask.on(
        'state_changed',
        snapShot => {
          //takes a snap shot of the process as it is happening
          if (!ShowToast.state) {
            setShowToast({
              state: true,
              total: snapShot._delegate.totalBytes,
              transfered: snapShot._delegate.bytesTransferred
            })
          }
        },
        err => {
          //catches the errors
          console.log(err)
          return { message: 'data cannot be updated', code: 400 }
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref('images')
            .child(file.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
              setShowToast({
                state: false,
                total: 0,
                transfered: 0
              })
              userDetails['img'] = fireBaseUrl
              UpdateData(id, userDetails)
              return { message: 'data updated successfully', code: 200 }
            })
        }
      )
    } else {
      UpdateData(id, userDetails)
      return { message: 'data updated successfully', code: 200 }
    }
  }
}

export const SaveAndUpdateCategories = ({ id, prices }) => {
  return async () => {
    try {
      const categories = { categories: prices }
      UpdateData(id, categories)
      return { message: 'user updated successfully', code: 200 }
    } catch (error) {
      return { message: 'user cannot be updated', code: 400, error }
    }
  }
}
