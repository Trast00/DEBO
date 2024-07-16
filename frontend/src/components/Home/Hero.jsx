import React from 'react'
import './hero.css'

const Hero = () => {
  return (
    <>
          <section class="hero">
      <div class="bg-img">
      </div>
      <div class="hero-texts">
        <h4>Ne manquer plus aucun appels d'offres</h4>
        <h1>Retrouvez touts les appels d'offre des 8 pays de l'UEMOA</h1>
        <p>Trouvez des marchés publics et privés près de chez vous dans les +8 Pays 
          de l'UEMOA (Mali, Niger, Togo, Bénin, Sénégal, Côte d'Ivoire, Guinée-Bissau)
          dans les domaine du BTP, Télécommunication, Compatbilité</p>
      </div>
      <div class="hero-search-bar">
        <form action="" class="form-search-default">
          <input type="search" name="hero-search-bar" id="hero-search-bar"
            class="search-bar" placeholder="Recherché 'Comptabilité'"/>
            <button type="submit">AS</button>
        </form>
      </div>
    </section>
    </>
  )
}

export default Hero