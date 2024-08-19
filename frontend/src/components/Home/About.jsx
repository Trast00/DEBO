import React from 'react'

const About = () => {
  return (
    <>
    <section class="about">
      <div class="sections">
        <div class="img-container">
          <div class="img-wrapper">
            <img src="/images/about/about1_img.png" alt="Recevez des apples d'offres dans votre emails" />
          </div>
        </div>
        <div class="content">
          <h2>Recevez des appels d'offres choisie et adapté a votre entreprise directement dans votre boite mail</h2>
          <p> recevez quotidiennement des emails personnalisés avec des opportunités rigoureusement sélectionnées pour votre entreprise. Accédez également à tous les appels d'offres via notre dashboard dédié.</p>
          <button class="button-default d-none">Pourquoi Nous choisir pour trouver vos appels d'offres ?</button>
        </div>
      </div>
      <div class="sections">
        <div class="img-container">
          <div class="img-wrapper">
            <img src="/images/about/about_2.png" alt="Dashboard available" />
          </div>
        </div>
        <div class="content">
          <h2>Accédez et gérez tous les appels d'offres grâce à un panel dédié</h2>
          <p>Sur ce panel, vous pourrez effectuer des <strong>recherches</strong>, <strong>masquer</strong> les appels d'offres qui ne vous intéressent plus ou <strong>enregistrer</strong> ceux qui captent particulièrement votre attention.</p>
          <button class="button-default d-none">Pourquoi nous choisir pour trouver vos appels d'offres ?</button>
        </div>
      </div>
      <div class="sections">
        <div class="img-container">
          <div class="img-wrapper">
            <img src="/images/about/about_3.jpg" className='rounded-md' alt="Connectez vous et faite des groupement avec des entreprise ouest africaine"/>
          </div>
        </div>
        <div class="content">
        <h2>Dynamisez vos partenariats avec notre soutien actif</h2>
        <p>Contactez-nous pour identifier des partenaires stratégiques. Nous mettrons en relation votre entreprise avec d'autres entités et professionnels prêts à collaborer. <strong>(Service en développement)</strong></p>
          <button class="button-default d-none">Pourquoi Nous choisir pour trouver vos appels d'offres ?</button>
        </div>
      </div>
    </section>
    </>
  )
}

export default About
