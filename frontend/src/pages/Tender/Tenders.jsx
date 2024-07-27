import React, { useContext } from 'react'
import './tender.css'
import SearchTender from '../../components/Tender/SearchTender'
import Tender from '../../components/Tender/Tender'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'


const Tenders = (user) => {
  const {isAuthenticated, loginWithRedirect, isLoading} = useAuth0()
  // get user data from context

  if (!isLoading && !isAuthenticated) {
    console.log('Not authenticated')
    loginWithRedirect()
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

  const [listTender, setListTender] = useState(listTenderFake)
  
  const showSearchResult = (result) => {
    setListTender(result)
  }

  if (isLoading)  return (<main class="tenders">Loading</main>)

  return (
    <>
      <main class="tenders">
    <div class="tenders-search-wrapper d-flex">
      <SearchTender showSearchResult={result=> showSearchResult(result)} /> 
      <section class="tenders-result tender-section mt-2">
        {listTender.length > 0 
        ? <p>Resultat : +{listTender.length} marché trouvé</p>
        : <p>Aucun marché trouvé</p>}
        {}
        {/*<p>Resultat : +16 marché trouvé</p>*/}
        <ul class="result-list">
          {listTender.map(tender => (
            <li>
              <Tender tender={tender} />
            </li>
          ))}
        </ul>
      </section>

      <section class="pagination d-flex justify-content-between">
        <button>Precedant</button>
        <div>1/1</div>
        <button>Suivant</button>
      </section>
    </div>
  </main>
  <div class="modal-tender modal-default d-none">
    <div class="modal-tender-wrapper">
      <button type="button" class="close button-default">X</button>
      <div class="tender">
        <div class="d-flex it align-items-center">
          <div class="tender-icon"></div>
          <h2 class="tender-title">Etude de faisabilité de l'engagement des utilisateurs</h2>
        </div>
        <div>
          <p class="tender-description">Trouvez des marchés publics et privés près de chez vous dans les +8 Pays 
            de l'UEMOA (Mali, Niger, Togo, Bénin, Sénégal, Côte d'Ivoire, Guinée-Bissau)
            dans les domaine du BTP, Télécommunication, Compatbilité</p>
        </div>
        <p class="buyer-name-wrapper">
          Buyer: 
          <span class="buyer-name">
            World word Wide internation ONG
          </span>
        </p>
        <div class="tag-wrapper">
          <ul class="tags d-flex">
            <li class="tag">Marché en cours</li>
            <li class="tag">Forage</li>
            <li class="tag">Construction de routes</li>
            <li class="tag">+10 années de creation</li>
          </ul>
        </div>
        <div class="info-wrapper d-flex">
          <div class="info">
            <p>Localisation:</p>
            <p id="tender-localisation">Mali</p>
          </div>
          <div class="info">
            <p>Date de publication:</p>
            <p id="tender-publish-date">01/01/2024</p>
          </div>
          <div class="info">
            <p>Date de expiration:</p>
            <p id="tender-localisation">01/01/2024</p>
          </div>
          <div class="info">
            <p>Budget:</p>
            <p id="tender-budget">10.000.000 fcfa</p>
          </div>
        </div>
        <div class="tender-buttons d-flex justify-content-between">
          <button class="show button-default">Voir plus</button>
          <div class="d-flex gap-1">
            <button class="dowload-file modal-only button-default">Telecharger le document</button>
            <button class="find-partner modal-only button-default">Trouver un partenaire pour cet offre</button>
          </div>
          <div>
            <button class="save-data button-default-icon">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" style={{ fill: "#000000" }}> <g fill="#803d3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(8,8)"><path d="M7,5v23l1.59375,-1.1875l7.40625,-5.5625l7.40625,5.5625l1.59375,1.1875v-23zM9,7h14v17l-6.40625,-4.8125l-0.59375,-0.4375l-0.59375,0.4375l-6.40625,4.8125z"></path></g></g> </svg>
            </button>
            <button class="save-data button-default-icon">R
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" style={{ fill: "#000000" }}> <g fill="#803d3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(8,8)"><path d="M7,5v23l1.59375,-1.1875l7.40625,-5.5625l7.40625,5.5625l1.59375,1.1875v-23zM9,7h14v17l-6.40625,-4.8125l-0.59375,-0.4375l-0.59375,0.4375l-6.40625,4.8125z"></path></g></g> </svg>
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