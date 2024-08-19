import Country from "../models/country.js"

export const getCountries = (req, res, next) => {
  Country.getAll().then(countries => {
    res.json(countries)
  }).catch(err => console.log(err))
}