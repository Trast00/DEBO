import React from 'react';

const Tender = ({tender, isHidden=false, isSaved, userUuid, updateHiddenTenderById, updateSaveTenderById}) => {
  const {
    _id,
    title,
    description,
    buyer,
    tags,
    country,
    dates,
    budget
  } = tender;

  const [isHiddenTender, setIsHiddenTender] = React.useState(isHidden)
  const [isSavedTender, setIsSavedTender] = React.useState(isSaved)

  const handleHide = (value) => {
    setIsHiddenTender(value)
    fetch(`http://localhost:3000/users/${userUuid}/preferences/tenders/hidden`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userUuid,
        tenderId: _id,
        isTenderHidden: value
      })
    }).then(result => {
      if (result.ok) {
        updateHiddenTenderById(_id)
      }
    })
  }

  const handleSave = (value) => {
    setIsSavedTender(value)
    fetch(`http://localhost:3000/users/${userUuid}/preferences/tenders/saved`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userUuid,
        tenderId: _id,
        isTenderSaved: value
      })
    }).then(result => {
      if (result.ok) {
        updateSaveTenderById(_id)
      }
    })
  }

  return (
    <div className="tender">
      <div className="d-flex it align-items-center">
        <div className="tender-icon"></div>
        <h2 className="tender-title">{title}</h2>
      </div>
      <div>
        <p className="tender-description">{description}</p>
      </div>
      <p className="buyer-name-wrapper">
        Buyer: <span className="buyer-name">{buyer}</span>
      </p>
      <div className="tag-wrapper">
        <ul className="tags d-flex">
          {tags && tags.map(tag => (
            <li className="tag" key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="info-wrapper d-flex">
        <div className="info">
          <p>Localisation:</p>
          <p>{country}</p>
        </div>
        <div className="info">
          <p>Date de publication:</p>
          <p>{dates.publish.split('T')[0]}</p>
        </div>
        <div className="info">
          <p>Date d'expiration:</p>
          <p>{dates.expire.split('T')[0]}</p>
        </div>
        <div className="info">
          <p>Budget:</p>
          <p>{budget}</p>
        </div>
      </div>
      <div className="tender-buttons d-flex justify-content-between">
        <button className="show button-default">Voir plus</button>
        <div>
          <button className="dowload-file modal-only button-default">Telecharger le document</button>
          <button className="find-partner modal-only button-default">Trouver un partenaire pour cet offre</button>
        </div>
        <div>
          <button className="save-data button-default-icon ml-1" onClick={_ => handleSave(!isSavedTender)}>
            { isSavedTender ? (
              <svg width="18px" height="18px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#803D3B" stroke-width="0.00028"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.25 3.5C7.45507 3.5 6 4.95507 6 6.75V24.75C6 25.0348 6.16133 25.2951 6.41643 25.4217C6.67153 25.5484 6.97638 25.5197 7.20329 25.3475L14 20.1914L20.7967 25.3475C21.0236 25.5197 21.3285 25.5484 21.5836 25.4217C21.8387 25.2951 22 25.0348 22 24.75V6.75C22 4.95507 20.5449 3.5 18.75 3.5H9.25Z" fill="#803D3B"></path> </g></svg>
              ): (
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#803D3B" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
            )}
          </button>
          <button className="save-data hide-data button-default-icon" onClick={_ => handleHide(!isHiddenTender)}>
            {isHiddenTender ? (
              <svg fill="#803D3B" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                      <path 
                          d="M960 1277.853c-175.297 0-317.951-142.654-317.951-317.951 0-175.297 142.654-317.951 317.951-317.951 175.297 0 317.951 142.654 317.951 317.951 0 175.297-142.654 317.95-317.951 317.95Zm948.342-341.585C1720.645 558.648 1357.332 324 960 324c-397.333 0-760.645 234.648-948.342 612.268L0 959.902l11.658 23.634c187.697 377.62 551.01 612.268 948.342 612.268 397.333 0 760.645-234.648 948.342-612.268L1920 959.902l-11.658-23.634Z"
                          fillRule="evenodd"
                      ></path>
                  </g>
              </svg>
              ) : (
              <svg fill="#803D3B" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                      <g>
                          <path d="M51.8,25.1c-1.6-3.2-3.7-6.1-6.3-8.4L37,25.1c0,0.3,0,0.6,0,0.9c0,6.1-4.9,11-11,11c-0.3,0-0.6,0-0.9,0 l-5.4,5.4c2,0.4,4.1,0.7,6.2,0.7c11.3,0,21.1-6.6,25.8-16.1C52.1,26.3,52.1,25.7,51.8,25.1z"></path>
                          <path d="M48.5,5.6l-2.1-2.1C45.8,2.9,44.7,3,44,3.8l-7.3,7.3C33.4,9.7,29.8,9,26,9C14.7,9,4.9,15.6,0.2,25.1 c-0.3,0.6-0.3,1.3,0,1.8c2.2,4.5,5.5,8.2,9.6,11L3.8,44c-0.7,0.7-0.8,1.8-0.3,2.4l2.1,2.1C6.2,49.1,7.3,49,8,48.2L48.2,8 C49,7.3,49.1,6.2,48.5,5.6z M15,26c0-6.1,4.9-11,11-11c2,0,3.8,0.5,5.4,1.4l-3,3C27.6,19.2,26.8,19,26,19c-3.9,0-7,3.1-7,7 c0,0.8,0.2,1.6,0.4,2.4l-3,3C15.5,29.8,15,28,15,26z"></path>
                      </g>
                  </g>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tender;
