import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'

const TenderDetails = ({user}) => {
  const {isAuthenticated, isLoading, loginWithRedirect} = useAuth0()

    // if it's redirection to tenders/:id
    const { id } = useParams(); 
    const [searchParams] = useSearchParams(); // Extract query parameters
    const [tender, setTender] = useState({})

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
  
    // Extract specific query parameters
    const eventType = searchParams.get('eventType');
    const source = searchParams.get('source');
    const userId = searchParams.get('userId');
    const userName = searchParams.get('userName');
    const dataId = searchParams.get('dataId');
    const dataName = searchParams.get('dataName');
    const emailId = searchParams.get('emailId');
    const startTracking = searchParams.get('validated');

    useEffect(()=> {
      if (id) {
        fetch(`/api/tenders/${id}`)
          .then((response) => {return response.json()})
          .then((tender) => {
            setTender(tender)
          })
          .catch((error) => console.error('Error fetching tender:', error));
      }
    }, [id])

  // Save analytical data if tracking is enabled
  useEffect(() => {
    if (startTracking && !(localStorage.getItem('isTester') === 'true')) {
      const payload = {
        eventType,
        source,
        userId,
        userName,
        dataId,
        dataName,
        emailId,
      };

      const saveAnalyticalData = async () => {
        try {
          await fetch('/api/analytical_data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        } catch (error) {
          console.error('Error saving analytical data:', error);
        }
      };

      saveAnalyticalData();
    }
  }, [startTracking, eventType, source, userId, userName, dataId, dataName, emailId]);

  const handleViewed = (tenderId) => {
    // userUuid, tenderId, isTenderViewed
    if(user?.uuid) {
      fetch(`/api/users/${user?.uuid}/preferences/tenders/viewed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userUuid: user?.uuid,
          tenderId,
          isTenderViewed: true
        })
      })
    }
  }

  if (isLoading)  return (<main className="tenders">Loading</main>)
  return (
    <>
    <main className="tenders">
    <div className="tenders-search-wrapper d-flex">
      <section className="tenders-result tender-section pt-4 mt-2">
      {tender?.dates && (
        <div className="tender pt-4 mt-4" data-tender-id={_id}>
        <div className="d-flex">
          <div className="tender-icon d-none">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7204 2.0565C11.9012 1.9832 12.1034 1.9832 12.2841 2.0565L21.5343 5.80757C21.8173 5.92235 22.0025 6.19727 22.0024 6.50269C22.0024 6.52588 22.0014 6.5489 21.9993 6.57168L21.9993 17.504C21.9993 17.8094 21.814 18.0843 21.531 18.1991L12.2911 21.9435C12.1932 21.9832 12.0918 22.0007 11.9925 21.9984C11.8967 21.9986 11.8005 21.9805 11.7092 21.9435L2.46929 18.1991C2.18621 18.0843 2.00098 17.8094 2.00098 17.504L2.00098 6.55341C2.00098 6.53749 2.00147 6.52169 2.00245 6.50602L2.00244 6.50268C2.00241 6.19728 2.18757 5.92235 2.47059 5.80758L11.7204 2.0565ZM12.7418 20.1424L20.4993 16.9986L20.4993 7.61708L12.7499 10.7576L12.7418 20.1424ZM3.50098 7.61522L3.50098 16.9986L11.2418 20.1356L11.2499 10.7557L3.50098 7.61522ZM12.0023 3.56085L4.74871 6.50238L12.0023 9.44206L19.2561 6.50238L12.0023 3.56085Z" fill="#5D3E30"></path> </g></svg>
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7204 2.0565C11.9012 1.9832 12.1034 1.9832 12.2841 2.0565L21.5343 5.80757C21.8173 5.92235 22.0025 6.19727 22.0024 6.50269C22.0024 6.52588 22.0014 6.5489 21.9993 6.57168L21.9993 17.504C21.9993 17.8094 21.814 18.0843 21.531 18.1991L12.2911 21.9435C12.1932 21.9832 12.0918 22.0007 11.9925 21.9984C11.8967 21.9986 11.8005 21.9805 11.7092 21.9435L2.46929 18.1991C2.18621 18.0843 2.00098 17.8094 2.00098 17.504L2.00098 6.55341C2.00098 6.53749 2.00147 6.52169 2.00245 6.50602L2.00244 6.50268C2.00241 6.19728 2.18757 5.92235 2.47059 5.80758L11.7204 2.0565ZM12.7418 20.1424L20.4993 16.9986L20.4993 7.61708L12.7499 10.7576L12.7418 20.1424ZM3.50098 7.61522L3.50098 16.9986L11.2418 20.1356L11.2499 10.7557L3.50098 7.61522ZM12.0023 3.56085L4.74871 6.50238L12.0023 9.44206L19.2561 6.50238L12.0023 3.56085Z" fill="#5D3E30"></path> </g></svg>
          </div>
          <h2 className="tender-title">
            <span className='w-[24px] h-[24px] tender-title-icon'>
              <img src="/logomini.png" alt="Logo Mini" />
            </span>
            {title}</h2>
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
        <div className="tender-buttons d-flex justify-content-between">
          <div>
              <a href={pdfUrl} target="_blank" rel="noreferrer" 
                className="dowload-file modal-only button-default mb-2"
                onClick={() => {
                  if (user?.isPremuim && isAuthenticated) {
                    handleViewed(_id);
                  }
                  window.open(pdfUrl, '_blank', 'noopener,noreferrer');
                }}>Accedez au document</a>
              <button className="find-partner modal-only button-default mb-2 d-none">Trouver un partenaire pour cet offre</button>
          </div>
          <NavLink to="/tenders" className='button-default pt'>
            Voir plus d'offres
          </NavLink>
          {(!user?.isPremuim && !isAuthenticated) && <button className="register button-default" onClick={_ => loginWithRedirect()}>Inscription / Connexion</button>}
          {(!user?.isPremuim && isAuthenticated) && <a className="register button-default" href="/payment">S'abonner maintenant</a>}
        </div>
      </div>
      )}

      </section>

    </div>
  </main>
    </>
  )
}

export default TenderDetails
