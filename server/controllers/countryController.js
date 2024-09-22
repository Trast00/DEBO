import Country from "../models/country.js"

export const getCountries = (req, res, next) => {
  console.log("Country Controller getCountries")
  Country.getAll().then(countries => {
    res.json(countries)
  }).catch(err => {
    res.status(500).send(err)
  })
}