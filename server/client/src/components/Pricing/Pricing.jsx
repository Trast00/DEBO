import React from 'react'
import './pricing.css'
import { NavLink } from 'react-router-dom'

const Pricing = () => {
  return (
    <>
    <section className="w-full py-5 pricing" id="pricing">
      <div className="container py-5 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h5 className="text-primary-gradient fw-medium">Tarifs</h5>
              <h2 className="mb-5">Choisissez une formule</h2>
          </div>
          <div className="tab-class text-center pricing wow fadeInUp" data-wow-delay="0.1s">
              <ul className="d-none nav nav-pills d-inline-flex justify-content-center bg-primary-gradient rounded-pill mb-5">
                  <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="pill" href="#tab-1">Restez information des appels d'offre dans les pays de l'UEMOA</button>
                  </li>
                  <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="pill" href="#tab-2">Montage de Manifestation d'intérêt</button>
                  </li>
              </ul>
              <div className="tab-content text-start">
                  <div id="tab-1" className="tab-pane fade show p-0 active">
                      <div className="row g-4">
                          <div className="col-lg-4">
                              <div className="rounded card-item">
                                  <div className="border-bottom p-4 mb-4">
                                      <h4 className="text-primary-gradient mb-1">1 Mois</h4>
                                      <span>20.000 Fcfa</span>
                                  </div>
                                  <div className="p-4 pt-0">
                                    <h3 className="mb-3">
                                        20.000<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>Fcfa</small><small
                                            className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Mois</small>
                                    </h3>
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou remboursé</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <div className="d-flex justify-content-between mb-3"><span>Service client disponible 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <NavLink to="/payment" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4 button-default">S'abonner</NavLink>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="rounded card-item">
                              <div className="border-bottom p-4 mb-4">
                                  <h4 className="text-primary-gradient mb-1">6 Mois</h4>
                                  <span>90.000 Fcfa</span>
                              </div>
                              <div className="p-4 pt-0">
                                <h3 className="mb-3">
                                    15.000<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>Fcfa</small><small
                                        className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Mois</small>
                                </h3>
                                <div className="d-flex justify-content-between mb-3"><span>Satisfait ou remboursé</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                <div className="d-flex justify-content-between mb-3"><span>Service client disponible 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                <NavLink to="/payment" className="btn btn-secondary-gradient rounded-pill py-2 px-4 mt-4 button-default">S'abonner</NavLink>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                              <div className="rounded card-item">
                                <div className="border-bottom p-4 mb-4">
                                    <h4 className="text-primary-gradient mb-1">12 Mois</h4>
                                    <span>120.000 Fcfa</span>
                                </div>
                                <div className="p-4 pt-0">
                                  <h3 className="mb-3">
                                      10.000<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>Fcfa</small><small
                                          className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Mois</small>
                                  </h3>
                                  <div className="d-flex justify-content-between mb-3"><span>Satisfait ou remboursé</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                  <div className="d-flex justify-content-between mb-3"><span>Service client disponible 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                  <NavLink to="/payment" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4 button-default">S'abonner</NavLink>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div id="tab-2" className="tab-pane fade p-0">
                      <div className="row g-4">
                          <div className="col-lg-4">
                              <div className="rounded card-item">
                                  <div className="border-bottom p-4 mb-4">
                                      <h4 className="text-primary-gradient mb-1">10 MI</h4>
                                  </div>
                                  <div className="p-4 pt-0">
                                    <h3 className="mb-3">
                                        50.000<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>Fcfa</small><small
                                            className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}></small>
                                    </h3>
                                      <div className="d-flex justify-content-between mb-3"><span>10 Manifestation d'intérêt</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou remboursé</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                        <div className="d-flex justify-content-between mb-3"><span>Service client disponible 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      
                                      
                                      <NavLink to="/payment" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">S'abonner</NavLink>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4">
                              <div className="rounded border card-item">
                                  <div className="border-bottom p-4 mb-4">
                                      <h4 className="text-primary-gradient mb-1">25 MI</h4>
                                  </div>
                                  <div className="p-4 pt-0">
                                    <h3 className="mb-3">
                                        85.000<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>Fcfa</small><small
                                            className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Mois</small>
                                    </h3>
                                      <div className="d-flex justify-content-between mb-3"><span>25 Manifestation d'intérêt</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou remboursé</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                        <div className="d-flex justify-content-between mb-3"><span>Service client disponible 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      
                                      
                                      <NavLink to="/payment" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">S'abonner</NavLink>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4">
                              <div className="card-item rounded">
                                  <div className="border-bottom p-4 mb-4">
                                      <h4 className="text-primary-gradient mb-1">50 MI</h4>
                                  </div>
                                  <div className="p-4 pt-0">
                                    <h3 className="mb-3">
                                        100.000<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>Fcfa</small><small
                                            className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Mois</small>
                                    </h3>
                                      <div className="d-flex justify-content-between mb-3"><span>50 Manifestation d'intérêt</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou remboursé</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                        <div className="d-flex justify-content-between mb-3"><span>Service client disponible 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      
                                      <NavLink to="/payment" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">S'abonner</NavLink>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            <p className='pt-4'> 
              <span className='px-2'><svg fill="#803D3B" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" stroke="#803D3B"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M26,2c3,0,5.43,3.29,8.09,4.42s6.82.51,8.84,2.65,1.51,6.07,2.65,8.84S50,23,50,26s-3.29,5.43-4.42,8.09-.51,6.82-2.65,8.84-6.07,1.53-8.84,2.65S29,50,26,50s-5.43-3.29-8.09-4.42-6.82-.51-8.84-2.65-1.53-6.07-2.65-8.84S2,29,2,26s3.29-5.43,4.42-8.09.51-6.82,2.65-8.84,6.07-1.53,8.84-2.65S23,2,26,2Zm0,7.58A16.42,16.42,0,1,0,42.42,26h0A16.47,16.47,0,0,0,26,9.58Zm7.62,9.15,1.61,1.52a1.25,1.25,0,0,1,0,1.51L25.08,33.07a2.07,2.07,0,0,1-1.61.7,2.23,2.23,0,0,1-1.61-.7L16.37,27.6a1,1,0,0,1-.1-1.42l.1-.11L18,24.56a1.1,1.1,0,0,1,1.54-.07l.07.07,3.89,4,8.59-9.8A1.1,1.1,0,0,1,33.62,18.73Z"></path></g></svg></span> 
              <strong>Satisfait ou remboursé sur votre premier abonnement :</strong> obtenez un remboursement en remplissant le formulaire ci-dessous.</p>
          </div>
      </div>
    </section>
    </>
  )
}

export default Pricing
