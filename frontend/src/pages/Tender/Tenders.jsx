import React from 'react'
import './tender.css'
import SearchTender from '../../components/Tender/SearchTender'
import Tender from '../../components/Tender/Tender'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'


const Tenders = ({user}) => {
  const {isAuthenticated, loginWithRedirect, isLoading} = useAuth0()
  // if user not authenticated, redirect to login page
  if (!isLoading && !isAuthenticated) {
    console.log('Not authenticated')
    loginWithRedirect()
  }

  // if user is authenticated, but not subscribed (guest user), redirect to payement page
  if (user && user.isPremuim === false) {
    console.log('Not subscribed')
    window.location.href = '/payement'
  }

  const listTenderFake = [
    {
      _id: '668d92a5be02af43719f2ca8',
      title: 'Google creation',
      description: 'QSDFDS  FDSF  DSFDS FDFDSF DSSFDSFDS',
      country: 'Mali',
      field: 'Telecommunication',
      dates: {
        publish: '2024-07-16',
        expire: '2024-07-20'
      },
      buyer: 'Welcom world',
      pdfUrl: 'https://www.youtube.com/',
      tags: [ 'gagne', 'eat', 'babouche' ],
      budget: 15000
    },
    {
      _id: '668d95d0be02af43719f2ca9',
      title: 'Good appar',
      description: 'dsf fdsf gsgsgsdfdsf dsfds fds',
      country: 'Benin',
      field: 'Telecommunication',
      dates: {
        publish: '2024-07-10T00:00:00.000Z',
        expire: '2024-07-27T00:00:00.000Z'
      },
      buyer: 'Welcom world',
      pdfUrl: 'https://www.youtube.com/',
      tags: [ 'ga', 'fa' ],
      budget: 15000
    }
  ]

  const [listTender, setListTender] = useState([])
  const [listAllTender, setListAllTender] = useState([])
  const [listTenderHidden, setListTenderHidden] = useState([])
  const [listTenderSaved, setListTenderSaved] = useState([])

  const showTenders = (resultTenders, order) => {
    console.log('All resulted tender:', resultTenders)
    const searchOrder = order || 'viewed'
    setListAllTender(resultTenders)
    const tenders = resultTenders.filter(tender => !user.preference.hiddenTender[tender._id])
    console.log("tender not hidden:", tenders)
    // split the list between hidden and saved tenders
    setListTenderHidden(resultTenders.filter(tender => user.preference.hiddenTender[tender._id]))
    console.log("tender hidden:", listTenderHidden)
    setListTenderSaved(tenders.filter(tender => user.preference.savedTender[tender._id]))
    // sort the list by non viewed tender first
    if (searchOrder === 'viewed') {
      setListTender(tenders.sort((a, b) => {
        return user.preference.viewedTender[a._id] - user.preference.viewedTender[b._id]
      }))
    }
    if (searchOrder === 'budget') {
      setListTender(tenders.sort((a, b) => {
        return a.budget - b.budget
      }))
    }
    if (searchOrder === 'recent-published') {
      setListTender(tenders.sort((a, b) => {
        return a.dates.publish - b.dates.publish
      }))}
    if (searchOrder === 'recent-expired') {
      setListTender(tenders.sort((a, b) => {
        return a.dates.expire - b.dates.expire
      }))
    }
    console.log('Tenders:', listTender)
  }

  const[popupMessage, setPopupMessage] = useState('')

  const showPopupMessage = (message) => {
    setPopupMessage(message)
    setTimeout(() => {
      setPopupMessage('')
    }, 4000);
  }

  const updateHiddenTenderById = (id) => {
    showPopupMessage('Offre cachée', id)
    user.preference.hiddenTender[id] = true
    setListTenderHidden([...listTenderHidden, listTender.find(tender => tender._id === id)])
    setListTender(listTender.filter(tender => tender._id !== id))

  }

  const updateSaveTenderById = (id, isSaved) => {
    showPopupMessage('Offre sauvegardée', id)
    user.preference.savedTender[id] = isSaved
    setListTenderSaved([...listTenderSaved, listTender.find(tender => tender._id === id)])
  }

  if (isLoading || !user || !user?.uuid)  return (<main className="tenders">Loading</main>)

  return (
    <>
    <main className="tenders">
    {popupMessage !== '' && (<p className="notification success">{popupMessage}</p>)}
    <div className="tenders-search-wrapper d-flex">
      <SearchTender showSearchResult={result=> showTenders(result)} isLoading={!user} /> 
      <section className="tenders-result tender-section mt-2">
        <div className='tender-result-header'>
          <div>
            {listTender.length > 0 
            ? <p>Resultat : +{listTender.length} marché trouvé</p>
            : <p>Aucun marché trouvé</p>}
          </div>
          <div>
            {listTenderHidden.length > 0 && (
              <button>cliquez ici pour voir les {listTenderHidden.length} resultat  cachée</button>
            )}
          </div>
        </div>
        {/*<p>Resultat : +16 marché trouvé</p>*/}
        <ul className="result-list">
          {user && listTender.map(tender => (
            <li>
              <Tender tender={tender} userUuid={user.uuid} updateHiddenTenderById={updateHiddenTenderById} updateSaveTenderById={updateSaveTenderById}
              isSaved={user?.preference?.savedTender[tender._id]} 
              isHidden={user?.preference?.hiddenTender[tender._id]}/>
            </li>
          )
          )}
        </ul>
      </section>

      <section className="pagination d-flex justify-content-between">
        <button>Precedant</button>
        <div>1/1</div>
        <button>Suivant</button>
      </section>
    </div>
  </main>
  <div className="modal-tender modal-default d-none">
    <div className="modal-tender-wrapper">
      <button type="button" className="close button-default">X</button>
      <div className="tender">
        <div className="d-flex it align-items-center">
          <div className="tender-icon"></div>
          <h2 className="tender-title">Etude de faisabilité de l'engagement des utilisateurs</h2>
        </div>
        <div>
          <p className="tender-description">Trouvez des marchés publics et privés près de chez vous dans les +8 Pays 
            de l'UEMOA (Mali, Niger, Togo, Bénin, Sénégal, Côte d'Ivoire, Guinée-Bissau)
            dans les domaine du BTP, Télécommunication, Compatbilité</p>
        </div>
        <p className="buyer-name-wrapper">
          Buyer: 
          <span className="buyer-name">
            World word Wide internation ONG
          </span>
        </p>
        <div className="tag-wrapper">
          <ul className="tags d-flex">
            <li className="tag">Marché en cours</li>
            <li className="tag">Forage</li>
            <li className="tag">Construction de routes</li>
            <li className="tag">+10 années de creation</li>
          </ul>
        </div>
        <div className="info-wrapper d-flex">
          <div className="info">
            <p>Localisation:</p>
            <p id="tender-localisation">Mali</p>
          </div>
          <div className="info">
            <p>Date de publication:</p>
            <p id="tender-publish-date">01/01/2024</p>
          </div>
          <div className="info">
            <p>Date de expiration:</p>
            <p id="tender-localisation">01/01/2024</p>
          </div>
          <div className="info">
            <p>Budget:</p>
            <p id="tender-budget">10.000.000 fcfa</p>
          </div>
        </div>
        <div className="tender-buttons d-flex justify-content-between">
          <button className="show button-default">Voir plus</button>
          <div className="d-flex gap-1">
            <button className="dowload-file modal-only button-default">Telecharger le document</button>
            <button className="find-partner modal-only button-default">Trouver un partenaire pour cet offre</button>
          </div>
          <div>
            <button className="save-data button-default-icon">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" style={{ fill: "#000000" }}> <g fill="#803d3b" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(8,8)"><path d="M7,5v23l1.59375,-1.1875l7.40625,-5.5625l7.40625,5.5625l1.59375,1.1875v-23zM9,7h14v17l-6.40625,-4.8125l-0.59375,-0.4375l-0.59375,0.4375l-6.40625,4.8125z"></path></g></g> </svg>
            </button>
            <button className="save-data button-default-icon">R
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" style={{ fill: "#000000" }}> <g fill="#803d3b" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(8,8)"><path d="M7,5v23l1.59375,-1.1875l7.40625,-5.5625l7.40625,5.5625l1.59375,1.1875v-23zM9,7h14v17l-6.40625,-4.8125l-0.59375,-0.4375l-0.59375,0.4375l-6.40625,4.8125z"></path></g></g> </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Tenders