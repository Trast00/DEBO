import AnalyticalData from '../models/AnalyticalData.js'

export const postAnalyticalData = (req, res) => {
  const eventType = req.query["eventType"]
  if (eventType === 'click') {
    const eventDescription = "clicked on a data (tender probably)"
    const {source, userId, userName, dataId, dataName, emailId} = req.query
    const date = new Date.now()
    const analyticalData = new AnalyticalData({
      source, 
      eventType,
      eventDescription,
      user: {userId, userName},
      data: {dataId, dataName},
      date,
      other: {
        emailId
      }
    })
    analyticalData.save()

  } else {
    res.json("Event type not allowed")
  }
}