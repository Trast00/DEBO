import React, { useEffect, useState } from 'react'
import './search-tender.css'
import { redirect } from 'react-router-dom'

const SearchTender = (props) => {
  const { showSearchResult, isLoading } = props
  const [listActivities, setListActivities] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedMarketTypes, setSelectedMarketTypes] = useState([])
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [searching, setSearching] = useState(false)

  // request to server one time
  useEffect(() => {
    if (isLoading) {
      return
    }
    getIndustryTypes()
    getSearchPreferences()
    if (listActivities.length === 0) {
      searchTender([], [], [], [])
    }
  }, [isLoading])

  const getIndustryTypes = () => {
    fetch('http://localhost:3000/industryTypes')
    .then(response => {
      if (!response.ok) {
        console.log("unauthorized")
        throw Error('Unauthorized')
      }
      return response.json(); // Add return statement here
    }).then(data => {
      setListActivities(data)
      console.log("listActivities", listActivities)
    }).catch(error => {
      console.log(error)
      if (error.message === 'Unauthorized') {
        redirect('/NotAllowed')
      }
    })
  }

  const getSearchPreferences = () => {
    if (!localStorage.getItem('searchPreferences')) return
    const preferences = JSON.parse(localStorage.getItem('searchPreferences'))
    console.log("get search preferences", preferences.industryTypes)
    preferences.industryTypes && setSelectedActivities([...preferences.industryTypes])
    preferences.countries && setSelectedCountries([...preferences.countries])
    preferences.marketTypes && setSelectedMarketTypes([...preferences.marketTypes])
    preferences.keywords && setSelectedKeywords([...preferences.keywords])
  }

  const removeKeyword = (keyword) => {
    if (keyword.trim === '') return
    const removeIndex = selectedKeywords.indexOf(keyword)
    if (removeIndex === -1) return
    const listLenght = selectedKeywords.length 
    const newList = [...selectedKeywords.splice(0, removeIndex), ...selectedKeywords.splice(removeIndex+1, listLenght)]
    setSelectedKeywords([...newList])
    return
  }

  const updateSearchFilter = (e, type) => {
    switch (type) {
      case 'activities':
        if (selectedActivities.includes(e.target.value)) {
          setSelectedActivities(selectedActivities.filter(activity => activity !== e.target.value))
        } else {
          setSelectedActivities([...selectedActivities, e.target.value])
        }
        break;
      case 'countries':
        if (selectedCountries.includes(e.target.value)) {
          setSelectedCountries(selectedCountries.filter(country => country !== e.target.value))
        } else {
          setSelectedCountries([...selectedCountries, e.target.value])
        }
        break;
      case 'marketTypes':
        if (selectedMarketTypes.includes(e.target.value)) {
          setSelectedMarketTypes(selectedMarketTypes.filter(marketType => marketType !== e.target.value))
        } else {
          setSelectedMarketTypes([...selectedMarketTypes, e.target.value])
        }
        break;
      case 'keywords':
        // for keywords we will use the search text
        if(searchText.trim() === '') return
        if(selectedKeywords.includes(searchText)) {
          setSearchText('')
        } else {
          setSelectedKeywords([...selectedKeywords, searchText])
          setSearchText('')
        }
        break;
      default:
        break;
    }
  }

  // search tender
  const searchTender = (countries, industryTypes, marketTypes, keywords, shouldUpdatePreference=false) => {
    //send a search query
    setSearching(true)

    fetch('http://localhost:3000/tenders/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        countries,
        industryTypes,
        marketTypes: {
          expired: marketTypes.includes('Marché en expire'),
          ongoing: marketTypes.includes('Marché en cours'),
          company: marketTypes.includes('Marché en entreprise'),
          office: marketTypes.includes('Marché en bureau')
        },
        keywords
      })
    }).then(response => {
      if (!response.ok) {
        console.log("unauthorized")
        throw Error('Unauthorized')
      }
      //console.log("searchResult", response.json())
      return response.json(); // Add return statement here
    }).then(data => {
      console.log("Search result", data)
      showSearchResult(data)
    }).catch(error => {
      console.log(error)
      if (error.message === 'Unauthorized') {
        redirect('/NotAllowed')
      }
    })

    if (shouldUpdatePreference) {
      const searchPreference = {
        countries,
        industryTypes,
        marketTypes,
        keywords
      }
      localStorage.setItem('searchPreferences', JSON.stringify(searchPreference))
    }
    setSearching(false)
  }
  
  return (
    <>
      <section class="tender-search tender-section">
        <h1>Recherche rapide</h1>
        <p class="ms-2 mb-0">Activité</p>
        <div class="list-activities-search d-flex max-h-8">
          <div className='d-flex flex-column'>
            {listActivities && [...listActivities.slice(0, Math.ceil(listActivities.length/2))].map(activity => (
              <div class="activity-search d-flex ms-4">
                <input type="checkbox" id={activity._id} name={activity.name} value={activity.name} onChange={(e) => updateSearchFilter(e, 'activities')} checked={selectedActivities && selectedActivities.includes(activity.name)}/> 
                <label htmlFor={activity._id} class="ms-1">{activity.name}</label>
              </div>
            ))}
          </div>
          <div className='d-flex flex-column'>
            {listActivities && [...listActivities.slice(Math.ceil(listActivities.length/2))].map(activity => (
              <div class="activity-search d-flex ms-4">
                <input type="checkbox" id={activity._id} name={activity.name} value={activity.name} onChange={(e) => updateSearchFilter(e, 'activities')} checked={selectedActivities && selectedActivities.includes(activity.name)}/>
                <label htmlFor={activity._id} class="ms-1">{activity.name}</label>
              </div>
            ))}
          </div>
        </div>

        <p class="ms-2 mb-0 mt-3">Pays</p>
        <div class="d-flex">
          <div class="d-flex flex-column ms-4">
            <div class="d-flex">
              <input type="checkbox" id="mali" name="mali" value="Mali" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Mali")}/>
              <label htmlFor="mali" class="ms-1">Mali</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="niger" name="niger" value="Niger" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Niger")}/>
              <label htmlFor="niger" class="ms-1">Niger</label>
            </div>
          </div>
          <div class="d-flex flex-column ms-4">
            <div class="d-flex">
              <input type="checkbox" id="togo" name="togo" value="Togo" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Togo")}/>
              <label htmlFor="togo" class="ms-1">Togo</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="benin" name="benin" value="Bénin" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Bénin")}/>
              <label htmlFor="benin" class="ms-1">Bénin</label>
            </div>
          </div>
          <div class="d-flex flex-column ms-4">
            <div class="d-flex">
              <input type="checkbox" id="senegal" name="senegal" value="Sénégal" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Sénégal")}/>
              <label htmlFor="senegal" class="ms-1">Sénégal</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="civ" name="civ" value="Côte-Ivoire" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Côte-Ivoire")}/>
              <label htmlFor="civ" class="ms-1">Côte d'Ivoire</label>
            </div>
          </div>
          <div class="d-flex flex-column ms-4">
            <div class="d-flex">
              <input type="checkbox" id="guinee" name="guinee" value="Guinée-Bissau" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Guinée-Bissau")}/>
              <label htmlFor="guinee" class="ms-1">Guinée-Bissau</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="burkina" name="burkina" value="Burkina-Faso" onChange={(e) => updateSearchFilter(e, 'countries')} checked={selectedCountries && selectedCountries.includes("Burkina-Faso")}/>
              <label htmlFor="burkina" class="ms-1">Burkina-Faso</label>
            </div>
          </div>
        </div>
        
        <p class="ms-2 mb-0 mt-3">Type de marché</p>
        <div class="d-flex">
          <div class="d-flex flex-column ms-4">
            <div class="d-flex">
              <input type="checkbox" id="ongoing-tenders" name="ongoing-tenders" value="Marché en cours" onChange={(e) => updateSearchFilter(e, 'marketTypes')} checked={selectedMarketTypes && selectedMarketTypes.includes("Marché en cours")}/>
              <label htmlFor="ongoing-tenders" class="ms-1">Marché en cours</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="company-tenders" name="company-tenders" value="Marché en entreprise" onChange={(e) => updateSearchFilter(e, 'marketTypes')} checked={selectedMarketTypes && selectedMarketTypes.includes("Marché en entreprise")}/>
              <label htmlFor="company-tenders" class="ms-1">Marché d'entreprise</label>
            </div>
          </div>
          <div class="d-flex flex-column ms-4">
            <div class="d-flex">
              <input type="checkbox" id="expired-tenders" name="expired-tenders" value="Marché en expire" onChange={(e) => updateSearchFilter(e, 'marketTypes')} checked={selectedMarketTypes && selectedMarketTypes.includes("Marché en expire")}/>
              <label htmlFor="expired-tenders" class="ms-1">Marché en expiré</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="office-tenders" name="office-tenders" value="Marché en bureau" onChange={(e) => updateSearchFilter(e, 'marketTypes')} checked={selectedMarketTypes && selectedMarketTypes.includes("Marché en bureau")}/>
              <label htmlFor="office-tenders" class="ms-1">Marché de bureau</label>
            </div>
          </div>
        </div>
        <p class="ms-2 mb-0 mt-3">Mots clés</p>
        <div action="" class="form-search-default">
          <input type="search" name="hero-search-bar" id="hero-search-bar"
            class="search-bar" onChange={e => setSearchText(e.target.value)} value={searchText} placeholder="Mot clé (les mots clés que l'offre doit contenir)" />
            <button type="button" onClick={e => updateSearchFilter(e, 'keywords')}>Ajouter un mot clé</button>
        </div>
        <div className='d-flex flex-column mt-3 ms-2 summary-search'>
          <p className='fw-semibold'>Vous recherchez les offres:</p>
          <p>
            {selectedActivities && selectedActivities.length > 0 && ` d'activité ${selectedActivities.join(', ')}`}
            {selectedCountries.length > 0 && ` dans les pays ${selectedCountries.join(', ')}`}
            {selectedMarketTypes.length > 0 && ` de type ${selectedMarketTypes.join(', ')}`}
            {selectedKeywords.length > 0 && ` avec les mots clés ${selectedKeywords.join(', ')}`}
          </p>
        </div>
        <ul className='mt-2 tags d-flex gap-1'>
          {selectedKeywords.map(keyword => (
            <li className='keyword tag'>
              <span>{keyword}</span>
              <button type="button" onClick={_ => {removeKeyword(keyword)}}>X</button>
            </li>
          ))}
        </ul>
        <div class="d-flex mt-4">
          <button type="submit" onClick={_ => searchTender(selectedCountries, selectedActivities, selectedMarketTypes, selectedKeywords, true)}
          class="button-default">Rechercher</button>
        </div>
      </section>
      
    </>
  )
}

export default SearchTender
