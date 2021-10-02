import { firestore, storage } from '@src/utility/firebase'
export const CreateOffer = offer => {
  return async dispatch => {
    const ref = firestore.collection('offers')
    const fileName = (Math.random() * 1e32).toString(36)
    if (offer.image) {
      const file = offer.image
      const uploadTask = storage.ref(`/images/${fileName}`).put(file)
      // return file.name
      await uploadTask.on(
        'state_changed',
        snapShot => {
          console.log(snapShot)
          //takes a snap shot of the process as it is happening
        },
        err => {
          //catches the errors
          console.log(err)
          console.log(err)
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref('images')
            .child(fileName)
            .getDownloadURL()
            .then(fireBaseUrl => {
              offer.image = fireBaseUrl
              ref.add(offer).then(success => {
                ref.get().then(data => {
                  const records = []
                  data.docs.map(item => {
                    const record = item.data()
                    record.id = item.id
                    records.push(record)
                  })
                  return dispatch({
                    type: 'GET_ALL_OFFERS',
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
  }
}

// ** Delete Invoice
export const deleteOffer = id => {
  return async dispatch => {
    const ref = firestore.collection('offers')
    const dlt = await ref.doc(id).delete()
    return dispatch({
      type: 'Offer_Delete',
      id
    })
  }
}
export const GetOffersData = id => {
  return (dispatch, getStore) => {
    const ref = firestore.collection('offers')
    ref.get().then(data => {
      const records = []
      data.docs.map(item => {
        const record = item.data()
        record.id = item.id
        records.push(record)
      })
      return dispatch({
        type: 'GET_ALL_OFFERS',
        data: records
      })
    })
  }
}
