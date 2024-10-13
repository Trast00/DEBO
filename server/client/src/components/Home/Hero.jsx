import React from 'react'
import './hero.css'
import { useNavigate } from 'react-router-dom';

const normalizeText = (text) => {
  // Normalize the text, remove diacritics, convert to lower case, and remove all spaces
  return typeof text === 'string' ? 
         text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, "") : 
         '';
};

// Function to find a partial match in any given list of objects with names
const findPartialMatch = (list, keyword) => {
  const normalizedKeyword = normalizeText(keyword);
  const matchedItem = list.find(item =>
      normalizeText(item.name).includes(normalizedKeyword)
  );
  return matchedItem ? matchedItem.name : null;
};

const Hero = ({listActivities, listCountries}) => {
  const navigate = useNavigate();

  const onSearchTender = (e) => {
    e.preventDefault();
    let keyword = e.target["hero-search-bar"].value;

    if (keyword === '') {
      navigate(`/tenders`);
      return;
    } else {

      // Use the new function to check both lists
      let finalKeyword = findPartialMatch(listCountries, keyword) || 
                         findPartialMatch(listActivities, keyword) || 
                         keyword;
      // Navigate to the tender page with the possibly updated keyword
      navigate(`/tenders?keyword=${encodeURIComponent(finalKeyword)}`);
    }

};
  return (
    <>
    <section class="hero">
      <div class="bg-img">
        <img src="/images/home/hero-img.png" alt="Les meilleurs appelles d'offres a traves UEMOA" />
      </div>
      <div class="hero-texts">
        <h4>Ne manquez plus aucun appel d’offres</h4>
        <h1>Retrouvez tous les appels d'offres des 8 pays de l'UEMOA</h1>
        <p>Trouvez des marchés publics et privés près de chez vous dans les 8 pays de l'UEMOA (Mali, Niger, Togo, Bénin, Sénégal, Côte d'Ivoire, Guinée-Bissau) avec une entreprise à l'écoute des besoins de l'Afrique de l'Ouest.
          <br/>
          <br/>
          Recherchez pour tester notre service
        </p>
      </div>
      <div class="hero-search-bar">
        <form onSubmit={e => onSearchTender(e)} class="form-search-default">
          <input type="search" name="hero-search-bar" id="hero-search-bar"
            class="search-bar" placeholder="Recherché 'Comptabilité'"/>
            <button type="submit" disabled={(listCountries.lengh === 0 || listActivities.lengh ===0)}>Rechercher</button>
        </form>
      </div>
      <br/>
      <p>Commencez maintenant et sécurisez votre prochaine grande affaire.</p>
      <button className='default-button button-default'>S'abonner maintenant</button>
    </section>
    </>
  )
}

export default Hero