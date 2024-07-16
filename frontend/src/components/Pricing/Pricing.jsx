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
              <ul className="nav nav-pills d-inline-flex justify-content-center bg-primary-gradient rounded-pill mb-5">
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
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou rembourser</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <div className="d-flex justify-content-between mb-3"><span>Service Client 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      <NavLink to="payement.html" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4 button-default">S'abonner</NavLink>
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
                                <div className="d-flex justify-content-between mb-3"><span>Satisfait ou rembourser</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                <div className="d-flex justify-content-between mb-3"><span>Service Client 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                <NavLink to="/payement" className="btn btn-secondary-gradient rounded-pill py-2 px-4 mt-4 button-default">S'abonner</NavLink>
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
                                  <div className="d-flex justify-content-between mb-3"><span>Satisfait ou rembourser</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                  <div className="d-flex justify-content-between mb-3"><span>Service Client 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                  <NavLink to="/payement" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4 button-default">S'abonner</NavLink>
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
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou rembourser</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                        <div className="d-flex justify-content-between mb-3"><span>Service Client 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      
                                      
                                      <NavLink to="/payement" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">S'abonner</NavLink>
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
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou rembourser</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                        <div className="d-flex justify-content-between mb-3"><span>Service Client 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      
                                      
                                      <NavLink to="/payement" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">S'abonner</NavLink>
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
                                      <div className="d-flex justify-content-between mb-3"><span>Satisfait ou rembourser</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                        <div className="d-flex justify-content-between mb-3"><span>Service Client 7j/7</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                                      
                                      <NavLink to="/payement" className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">S'abonner</NavLink>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default Pricing
