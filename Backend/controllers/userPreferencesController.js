import Tender from "../models/tender.js"
import User from "../models/user.js"

export const updateHiddenTenderById = (req, res) => {
  console.log("start Hidding user")
  const { userUuid, tenderId, isTenderHidden } = req.body
  console.log("User UUID:", req.body)
  User.getByUuid(userUuid).then(user => {
    if (!user) {
      res.json(user)
      return
    }
    user.preference.hiddenTender[tenderId] = isTenderHidden
    const updatedUser = new User({...user})
    return updatedUser.update()
    //user.preference.hiddenTender = Object.keys(user.preference.hiddenTender).map(tenderKey => tenderKey != tenderId)
  }).then(result => {
    res.json(result)
  })
}
export const updateSavedTenderById = (req, res) => {
  const { userUuid, tenderId, isTenderSaved } = req.body
  User.getByUuid(userUuid).then(user => {
    if (!user) {
      res.json(user)
      return
    }
    user.preference.savedTender[tenderId] = isTenderSaved
    const updatedUser = new User({...user})
    return updatedUser.update()
    //user.preference.hiddenTender = Object.keys(user.preference.hiddenTender).map(tenderKey => tenderKey != tenderId)
  }).then(result => {
    res.json(result)
  })
}
export const updateViewedTenderById = (req, res) => {
  const { userUuid, tenderId, isTenderViewed } = req.body
  User.getByUuid(userUuid).then(user => {
    if (!user) {
      res.json(user)
      return
    }
    user.preference.viewedTender[tenderId] = isTenderViewed
    const updatedUser = new User({...user})
    return updatedUser.update()
  }).then(result => {
    res.json(result)
  })
}

export const getSavedTendersByUuid = (req, res) => {
  const { uuid } = req.params
  User.getByUuid(uuid).then(user => {
    if (!user) {
      res.json(user)
      return
    }
    const savedTenderIds = Object.keys(user.preference.savedTender).filter(tenderKey => user.preference.savedTender[tenderKey])
    console.log("saved ids: ",savedTenderIds)
    return Tender.getTendersByIds(savedTenderIds)
  }).then(tenders => {
    res.json(tenders)
  })
}
