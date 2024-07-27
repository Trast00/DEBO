import React from 'react';

const Tender = ({tender}) => {
  const {
    title,
    description,
    buyer,
    tags,
    country,
    dates,
    budget
  } = tender;
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
        Buyer:
        <span className="buyer-name">
          {buyer}
        </span>
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
          <p>{dates.publish}</p>
        </div>
        <div className="info">
          <p>Date d'expiration:</p>
          <p>{dates.expire}</p>
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
          <button className="save-data button-default-icon">
            {/* SVG icon */}
            S
          </button>
          <button className="save-data hide-data button-default-icon">
            {/* SVG icon show/hide icons wiht font awesome */}
            R
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tender;
