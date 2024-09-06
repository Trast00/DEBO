import React, { useEffect } from 'react'
import './countries.css'

const ListCountries = ({onGetData}) => {
  const [coutries, setCountries] = React.useState([])
  const serverUrl = process.env.REACT_APP_SERVER_URL
  useEffect(() => {
    fetch(`${serverUrl}/countries`)
      .then(response => response.json())
      .then(data => {
        setCountries(data)
        onGetData(data)
      })
  }, [])
  return (
    <>
      <ul class="list-countries">
        {coutries.map(country => (
          <li class="list-countries-item">
            <div class="country">
              <div class="svg-flag">
                <img src={country?.flagUrl} alt="flag" />
              </div>
              <div class="content">
                <p class="name">{country.name}</p>
                <p class="tag d-none">+154 de marché en cours</p>
              </div>
            </div>
          </li>
          ))}
      </ul>
    </>
  )
}

export default ListCountries