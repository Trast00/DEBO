import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Tender = ({tender, isHidden=false, isSaved, userUuid, updateHiddenTenderById, updateSaveTenderById, showModal, isPremuim}) => {
  const {
    _id,
    title,
    description,
    buyer,
    tags,
    country,
    dates,
    budget,
    pdfUrl,
  } = tender;

  //import redirect with auth
  const {loginWithRedirect, isAuthenticated} = useAuth0()

  const [isHiddenTender, setIsHiddenTender] = React.useState(isHidden)
  const [isSavedTender, setIsSavedTender] = React.useState(isSaved)

  const handleHide = (value) => {
    setIsHiddenTender(value)
    fetch(`/api/users/${userUuid}/preferences/tenders/hidden`, {
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
        updateHiddenTenderById(_id, value)
      }
    })
  }

  const handleSave = (value) => {
    setIsSavedTender(value)
    fetch(`/api/users/${userUuid}/preferences/tenders/saved`, {
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
        updateSaveTenderById(_id, value)
      }
    })
  }

  return (
    <div className="tender">
      <div className="d-flex">
        <div className="tender-icon d-none">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7204 2.0565C11.9012 1.9832 12.1034 1.9832 12.2841 2.0565L21.5343 5.80757C21.8173 5.92235 22.0025 6.19727 22.0024 6.50269C22.0024 6.52588 22.0014 6.5489 21.9993 6.57168L21.9993 17.504C21.9993 17.8094 21.814 18.0843 21.531 18.1991L12.2911 21.9435C12.1932 21.9832 12.0918 22.0007 11.9925 21.9984C11.8967 21.9986 11.8005 21.9805 11.7092 21.9435L2.46929 18.1991C2.18621 18.0843 2.00098 17.8094 2.00098 17.504L2.00098 6.55341C2.00098 6.53749 2.00147 6.52169 2.00245 6.50602L2.00244 6.50268C2.00241 6.19728 2.18757 5.92235 2.47059 5.80758L11.7204 2.0565ZM12.7418 20.1424L20.4993 16.9986L20.4993 7.61708L12.7499 10.7576L12.7418 20.1424ZM3.50098 7.61522L3.50098 16.9986L11.2418 20.1356L11.2499 10.7557L3.50098 7.61522ZM12.0023 3.56085L4.74871 6.50238L12.0023 9.44206L19.2561 6.50238L12.0023 3.56085Z" fill="#5D3E30"></path> </g></svg>
        </div>
        <h2 className="tender-title">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7204 2.0565C11.9012 1.9832 12.1034 1.9832 12.2841 2.0565L21.5343 5.80757C21.8173 5.92235 22.0025 6.19727 22.0024 6.50269C22.0024 6.52588 22.0014 6.5489 21.9993 6.57168L21.9993 17.504C21.9993 17.8094 21.814 18.0843 21.531 18.1991L12.2911 21.9435C12.1932 21.9832 12.0918 22.0007 11.9925 21.9984C11.8967 21.9986 11.8005 21.9805 11.7092 21.9435L2.46929 18.1991C2.18621 18.0843 2.00098 17.8094 2.00098 17.504L2.00098 6.55341C2.00098 6.53749 2.00147 6.52169 2.00245 6.50602L2.00244 6.50268C2.00241 6.19728 2.18757 5.92235 2.47059 5.80758L11.7204 2.0565ZM12.7418 20.1424L20.4993 16.9986L20.4993 7.61708L12.7499 10.7576L12.7418 20.1424ZM3.50098 7.61522L3.50098 16.9986L11.2418 20.1356L11.2499 10.7557L3.50098 7.61522ZM12.0023 3.56085L4.74871 6.50238L12.0023 9.44206L19.2561 6.50238L12.0023 3.56085Z" fill="#5D3E30"></path> </g></svg>
          {title}</h2>
      </div>
      {(isPremuim && isAuthenticated)? (
        <>
        <div>
          <p className="tender-description">{description}</p>
        </div>
        <p className="buyer-name-wrapper">
          Buyer: <span className="buyer-name">{buyer}</span>
        </p>
        </>
      ): (
        <div className='cannot-see-wrapper'>
          <div className='px-2'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas iure sapiente culpa omnis debitis, corporis quisquam animi! Voluptas animi ullam nulla distinctio nihil, maxime perferendis ad quo? Optio, ratione facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas iure sapiente culpa omnis debitis, corporis quisquam animi! Voluptas animi ullam nulla distinctio nihil, <br/> maxime perferendis ad quo? Optio, ratione facere.
            </p>
            <p className="buyer-name-wrapper">
              Buyer: <span className="buyer-name">Le Buyer est masquée</span>
            </p>
          </div>
          <div className='cannot-see-overlay'>
            <div className='pb-2'>
              <svg width="24px" height="24px" viewBox="-6 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#5D3E30" stroke="#5D3E30">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>locked</title>
                  <desc>Created with Sketch Beta.</desc>
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icon-Set-Filled" transform="translate(-524.000000, -309.000000)" fill="#5D3E30">
                      <path d="M540,323.014 C538.327,321.755 536.255,321 534,321 C531.746,321 529.673,321.755 528,323.014 L528,317 C528,313.687 530.687,311 534,311 C537.313,311 540,313.687 540,317 L540,323.014 L540,323.014 Z M535,334 C535,334.553 534.553,335 534,335 C533.447,335 533,334.553 533,334 L533,330 C533,329.448 533.447,329 534,329 C534.553,329 535,329.448 535,330 L535,334 L535,334 Z M542,325.019 L542,317 C542,312.582 538.418,309 534,309 C529.582,309 526,312.582 526,317 L526,325.019 C524.75,326.688 524,328.754 524,331 C524,336.523 528.478,341 534,341 C539.522,341 544,336.523 544,331 C544,328.754 543.25,326.688 542,325.019 L542,325.019 Z" id="locked"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <p>Vous devez être inscrit avec un compte premium pour voir cette offre.</p>
          </div>
        </div>
      )}
      <div className="tag-wrapper">
        <ul className="tags d-flex">
          {tags && tags.map(tag => (
            <li className="tag" key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="info-wrapper d-flex">
        <div className="info me-1">
          <p>Localisation:</p>
          <p>{country}</p>
        </div>
        <div className="info me-1">
          <p>Date de publication:</p>
          <p>{dates.publish.split('T')[0]}</p>
        </div>
        <div className="info me-1">
          <p>Date d'expiration:</p>
          <p>{dates.expire.split('T')[0]}</p>
        </div>
        {budget && budget.value > 0 && (
          <div className="info">
            <p>Budget:</p>
            <p>{budget.value} {budget.currency}</p>
          </div>
          )}
      </div>
      {(!isPremuim && !isAuthenticated) && (<p className='text-primary-dark'>*Vous devez être inscrit avec un compte premium pour voir cette offre.</p>)}
      {(!isPremuim && isAuthenticated) && (<p className='text-primary-dark'>*Vous devez être abonné pour voir cette offre.</p>)}
      <div className="tender-buttons d-flex justify-content-between">
        {(!isPremuim && !isAuthenticated) && <button className="register button-default" onClick={_ => loginWithRedirect()}>Inscription / Connexion</button>}
        {(!isPremuim && isAuthenticated) && <a className="register button-default" href="/payment">S'abonner maintenant</a>}
        {isPremuim && (
          <>
          <button className="show button-default" onClick={_ => showModal(tender)}>Voir plus</button>
          <div>
              <a href={pdfUrl} target="_blank" rel="noreferrer" className="dowload-file modal-only button-default mb-2">Telecharger le document</a>
              <button className="find-partner modal-only button-default mb-2 d-none">Trouver un partenaire pour cet offre</button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Tender;
