import AnalyticalData from '../models/analyticalData.js'

export const postAnalyticalData = (req, res) => {
  const eventType = req.body["eventType"]
  if (eventType === 'click') {
    const eventDescription = "clicked on a data (tender probably)"
    const {source, userId, userName, dataId, dataName, emailId} = req.body
    const date = getDateWithHour()
    const analyticalData = new AnalyticalData({
      source, 
      eventType,
      eventDescription,
      user: {userId, userName},
      data: {dataId, dataName},
      date: date,
      other: {
        emailId
      }
    })

    analyticalData.updateOther({emailId})
    analyticalData.save().then(result => {
      return res.json(result)
    }).catch(err => {
      return res.status(500).send(err)
    })

  } else {
    res.json("Event type not allowed")
  }
}

const getDateWithHour = () => {
  const date = new Date();

  // Extract year, month, day, and hour
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');

  // Combine into a single string
  const formattedDate = `${year}-${month}-${day} ${hour}:00`;
  return formattedDate
}