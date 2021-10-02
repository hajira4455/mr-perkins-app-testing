import axios from 'axios'
import { firestore, storage } from '@src/utility/firebase'
// ** Get data

export const getProductsData = params => {
  return async dispatch => {
    return await firestore
      .collection('products')
      .get()
      .then(snap => {
        const records = []
        snap.docs.map(item => {
          const record = item.data()
          record.id = item.id
          records.push(record)
        })
        dispatch({
          type: 'GET_PRODUCT_DATA',
          data: records
        })
      })
  }
}

export const SaveCategory = category => {
  return async dispatch => {
    const ref = firestore.collection('categories')
    const newCat = await ref.add(category)
    const newData = await ref.doc(newCat.id).get()

    const data = newData.data()
    data.id = newCat.id
    return dispatch({
      type: 'Category_Added',
      data
    })
  }
}

export const UpdateCategory = category => {
  return async dispatch => {
    const ref = firestore.collection('categories').doc(category.editID)
    delete category.editID
    const newCat = await ref.update(category)
    const newData = await ref.get()
    const data = newData.data()
    data.id = newData.id
    return dispatch({
      type: 'Category_Updated',
      data
    })
  }
}
export const FetchCategories = () => {
  return async dispatch => {
    const ref = firestore.collection('categories')
    const Categories = await ref.get()
    const records = []
    Categories.docs.map(item => {
      const record = item.data()
      record.id = item.id
      records.push(record)
    })
    return dispatch({
      type: 'All_Categories_Fetched',
      data: records
    })
  }
}
export const DeleteCategory = id => {
  return async dispatch => {
    const ref = firestore.collection('categories').doc(id)
    const Categories = await ref.delete()
    return dispatch({
      type: 'Category_Delete',
      id
    })
  }
}
export const CreateProduct = category => {
  return async dispatch => {
    const ref = firestore.collection('products')
    if (category.img) {
      const file = category.img
      const uploadTask = storage
        .ref(`/images/${(Math.random() * 1e32).toString(36)}`)
        .put(file)
      // return file.name
      await uploadTask.on(
        'state_changed',
        snapShot => {
          //takes a snap shot of the process as it is happening
        },
        err => {
          //catches the errors
          console.log(err)
          return { message: 'data cannot be uploaded', code: 400, err }
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref('images')
            .child(file.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
              console.log(fireBaseUrl)
              category.img = fireBaseUrl
              ref.add(category).then(success => {
                ref.get().then(data => {
                  const records = []
                  data.docs.map(item => {
                    const record = item.data()
                    record.id = item.id
                    records.push(record)
                  })
                  return dispatch({
                    type: 'GET_PRODUCT_DATA',
                    data: records
                  })
                })
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      )
    } else {
      alert('image not found')
    }
    // const newCat = await ref.add(category)
    // const newData = await ref.doc(newCat.id).get()
    // const data = newData.data()
    // data.id = newCat.id
    // return dispatch({
    //   type: 'Product_Added',
    //   data
    // })
  }
}

// ** Delete Invoice
export const deleteInvoice = id => {
  return (dispatch, getStore) => {
    axios
      .delete('/apps/invoice/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_INVOICE'
        })
      })
      .then(() => dispatch(getData(getStore().invoice.params)))
  }
}
