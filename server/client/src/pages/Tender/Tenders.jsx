import React from 'react'
import './tender.css'
import SearchTender from '../../components/Tender/SearchTender'
import Tender from '../../components/Tender/Tender'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'


const Tenders = ({user}) => {
  const {isAuthenticated, isLoading} = useAuth0()
  const [currentPage, setCurrentPage] = useState(1)
  
  // if user not authenticated, redirect to login page

  // if user is authenticated, but not subscribed (guest user), redirect to payment page
  if (user && user.isPremuim === false) {
    
  }

  const [listTender, setListTender] = useState([])
  const [listAllTender, setListAllTender] = useState([])
  const [listTenderHidden, setListTenderHidden] = useState([])
  const [listTenderSaved, setListTenderSaved] = useState([])

  const showTenders = (resultTenders, order) => {
    setCurrentPage(1)
    const searchOrder = order || 'last added'
    setListAllTender(resultTenders)
    
    if (!user) {
      setListTender(resultTenders)
      return
    }
    let tenders = resultTenders
    if (!canSeeHiddenTender) {
      tenders = resultTenders.filter(tender => !user.preference.hiddenTender[tender._id])
    }
    // split the list between hidden and saved tenders
    setListTenderHidden(resultTenders.filter(tender => user.preference.hiddenTender[tender._id]))
    setListTenderSaved(tenders.filter(tender => user.preference.savedTender[tender._id]))
    // sort the list by non viewed tender first
    if (searchOrder === 'viewed') {
      setListTender(tenders.sort((a, b) => {
        return user.preference.viewedTender[a._id] - user.preference.viewedTender[b._id]
      }))
    }

    if (searchOrder === 'budget') {
      setListTender(tenders.sort((a, b) => {
        return a.budget.value - b.budget.value
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
  }

  const[popupMessage, setPopupMessage] = useState('')

  const showPopupMessage = (message) => {
    setPopupMessage(message)
    setTimeout(() => {
      setPopupMessage('')
    }, 4000);
  }

  const [canSeeHiddenTender, setCanSeeHiddenTender] = useState(false)
  const updateHiddenTenderById = (id, isHidden) => {
    const message = isHidden ? 'Offre cachée' : 'Offre retirée des cachées'
    showPopupMessage(message, id)
    user.preference.hiddenTender[id] = isHidden
    listAllTender.filter(tender => tender._id === id)[0].isHidden = isHidden
    
    setListTenderHidden([...listTenderHidden, listAllTender.find(tender => tender._id === id && listTenderHidden.filter(tender => tender._id !== id))])
    if (!canSeeHiddenTender) {
      setListTender(listTender.filter(tender => tender._id !== id))
    }
    showTenders(listAllTender, 'viewed')
  }

  const updateSaveTenderById = (id, isSaved) => {
    const message = isSaved ? 'Offre sauvegardée' : 'Offre retirée des sauvegardes'
    showPopupMessage(message, id)
    user.preference.savedTender[id] = isSaved
    // ^put the tender saved as tru
    listAllTender.filter(tender => tender._id === id)[0].isSaved = isSaved
    setListTenderSaved([...listTenderSaved, listTender.find(tender => tender._id === id && listTenderSaved.filter(tender => tender._id !== id))])
    showTenders(listAllTender, 'viewed')
  }

  const [openModal, setOpenModal] = useState(false)
  const [tenderModal, setTenderModal] = useState({})
  const showModal = (tender) => {
    setOpenModal(true)
    setTenderModal(tender)
  }

  if (isLoading)  return (<main className="tenders">Loading</main>)

  return (
    <>
    <main className="tenders">
    {popupMessage !== '' && (<p className="notification success">{popupMessage}</p>)}
    <div className="tenders-search-wrapper d-flex">
      <SearchTender showSearchResult={result=> {
        setCanSeeHiddenTender(false)
        showTenders(result)
        }} isLoading={!user} userUuid={user?.uuid}
        email={user?.email} isPremuim={user?.isPremuim} /> 
      <section className="tenders-result tender-section mt-2">
        <div className='tender-result-header'>
          <div>
            {listTender.length > 0 
            ? <p>Résultat : +{listTender.length} marchés trouvés</p>
            : <p>Aucun marché trouvé</p>}
          </div>
          <div>
            {listTenderHidden.length > 0 && (
              <button onClick={_ => {
                setCanSeeHiddenTender(!canSeeHiddenTender)
                showTenders(listAllTender, 'viewed')
              }}>
                {canSeeHiddenTender ?`cliquez ici pour voir les ${listTenderHidden.length} resultat  cachée`
                : `cliquez ici pour cacher les ${listTenderHidden.length} resultat cachée`}
              </button>
            )}
          </div>
        </div>
        <ul className="result-list">
          {listTender.slice((currentPage * 10) - 10, currentPage * 10).map(tender => (
            <li>
              <Tender tender={tender} userUuid={user?.uuid} updateHiddenTenderById={updateHiddenTenderById} updateSaveTenderById={updateSaveTenderById}
              isSaved={user?.preference?.savedTender[tender._id]} 
              isHidden={user?.preference?.hiddenTender[tender._id]}
              showModal={showModal} isPremuim={user?.isPremuim}/>
            </li>
          )
          )}
        </ul>
      </section>

      <section className="pagination d-flex justify-content-between">
        {currentPage > 1 && <button onClick={_ => setCurrentPage(currentPage-1)}>Precedant</button>}
        <div>page {currentPage}/{Math.ceil(listTender.length/10)}</div>
        { currentPage < Math.ceil(listTender.length/10) && <button onClick={_ => setCurrentPage(currentPage+1)}>Suivant</button>}
      </section>
    </div>
  </main>
  <div className={`modal-tender modal-default ${(!openModal && 'd-none')}`}>
    <div className="modal-tender-wrapper">
      <button type="button" className="close button-default" onClick={_ => setOpenModal(false)}>X</button>
      {tenderModal.dates && (<Tender tender={tenderModal} userUuid={user.uuid} updateHiddenTenderById={updateHiddenTenderById} updateSaveTenderById={updateSaveTenderById}
              isSaved={user?.preference?.savedTender[tenderModal._id]} 
              isHidden={user?.preference?.hiddenTender[tenderModal._id]}
              showModal={showModal}
              isPremuim={user?.isPremuim} />)}
    </div>
  </div>
    </>
  )
}

export default Tenders