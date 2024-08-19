import React, { useState } from 'react'
import './payement.css'
import Footer from '../../components/Footer/Footer';

const Payement = () => {
  // write the code so that the user can choose a subscription plan and fill in their information
  const [step, setStep] = useState(1)
  const subscriptionPlans = [
    {
      type: 'subscription',
      name: 'basic',
      pricePerMonth: "20.000",
      nbrMonths: 1,
      totalPrice: "20.000",
      currency: "Fcfa",
      description: '',
      bullets: [
        "Satisfait ou rembourser",
        "Service Client 7j/7",
      ],
    },
    {
      type: 'subscription',
      name: 'popular',
      pricePerMonth: "15.000",
      nbrMonths: 6,
      totalPrice: "90.000",
      currency: "Fcfa",
      description: '',
      bullets: [
        "Satisfait ou rembourser",
        "Service Client 7j/7",
      ],
    },
    {
      type: 'subscription',
      name: 'premium',
      pricePerMonth: "10.000",
      nbrMonths: 12,
      totalPrice: "120.000",
      currency: "Fcfa",
      description: '',
      bullets: [
        "Satisfait ou rembourser",
        "Service Client 7j/7",
      ],
    },
  ]

  const manifestationPlans = [
    {
      type: 'manifestation',
      name: 'basic',
      pricePerMonth: "50.000",
      nbrManifestation: 10,
      currency: "Fcfa",
      description: '',
      bullets: [
        "Jusqu'a 10 Manifestation d'intérêt",
        "Satisfait ou rembourser",
        "Service Client 7j/7",
      ],
    },
    {
      type: 'manifestation',
      name: 'popular',
      pricePerMonth: "85.000",
      nbrManifestation: 25,
      currency: "Fcfa",
      description: '',
      bullets: [
        "Jusqu'a 25 Manifestation d'intérêt",
        "Satisfait ou rembourser",
        "Service Client 7j/7",
      ],
    },
    {
      type: 'manifestation',
      name: 'premium',
      pricePerMonth: "100.000",
      nbrManifestation: 50,
      currency: "Fcfa",
      description: '',
      bullets: [
        "Jusqu'a 50 Manifestation d'intérêt",
        "Satisfait ou rembourser",
        "Service Client 7j/7",
      ],
    },
  ]

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    paymentType: '',
    "message": '',
    plan: {},
    totals: {
      subTotal: 0,
      discount: 0,
      finalTotal: 0,
    }
  });

  const [showDiscountMessage, setShowDiscountMessage] = useState(false);

  const handleSubscription = (plan) => {
    setCheckoutData({ ...checkoutData, plan, 
      totals: { subTotal: plan.totalPrice, discount: 0, finalTotal: plan.totalPrice } 
    });
    setStep(2)
  }

  
  return (
    <>
      <main className="payement">
        <div className="container">
          <h1 className="d-none">Abonnement</h1>
        </div>
        <div className={step===1?"container d-none step-2": "container step-2"}>
          <button className="go-step-1" onClick={()=> setStep(1)}>
            <span className='pb-1'><svg width="16px" height="16px" viewBox="0 0 1024 1024" class="icon mb-1" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#803D3B"></path></g></svg></span> 
            Retour au choix de formule</button>
        </div>
        <section className={step===1?"step-1 w-full pricing": "step-1 w-full pricing d-none"} id="pricing">
          <div className="container px-lg-5">
            <div className="wow fadeInUp" data-wow-delay="0.1s">
              <h3 className="mb-5 ">Abonnement: Choisissez une formule</h3>
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
                <div id={`tab-1`} className="tab-pane fade show p-0 active">
                  <div className="row g-4">
                  {subscriptionPlans.map(plan => (
                    <div className="col-lg-4">
                      <div className="rounded card-item">
                        <div className="border-bottom p-4 mb-4">
                          <h4 className="text-primary-gradient mb-1">{plan.nbrMonths} Mois</h4>
                          <span>{plan.totalPrice} {plan.currency}</span>
                        </div>
                        <div className="p-4 pt-0">
                          <h3 className="mb-3">
                            {plan.pricePerMonth}<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>{plan.currency}</small><small
                              className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Mois</small>
                          </h3>
                            {plan.bullets.map(bullet => (
                              <div className="d-flex justify-content-between mb-3"><span>{bullet}</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                            ))}
                          <button className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4 button-default go-step-2" onClick={()=> handleSubscription(plan)}>S'abonner</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>


                <div id="tab-2" className="tab-pane fade p-0">
                  <div className="row g-4">
                    {manifestationPlans.map(plan => (
                      <div className="col-lg-4">
                        <div className="rounded card-item">
                          <div className="border-bottom p-4 mb-4">
                            <h4 className="text-primary-gradient mb-1">{plan.nbrManifestation} MI</h4>
                          </div>
                          <div className="p-4 pt-0">
                            <h3 className="mb-3">
                              {plan.pricePerMonth}<small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>{plan.currency}</small><small
                                className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}></small>
                            </h3>
                            {plan.bullets.map(bullet => (
                              <div className="d-flex justify-content-between mb-3"><span>{bullet}</span><i className="fa fa-check text-primary-gradient pt-1"></i></div>
                            ))}
                            <button className="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4 button-default go-step-2" onClick={()=> handleSubscription(plan)}>S'abonner</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className='pt-4'> 
              <span className='px-2'><svg fill="#803D3B" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" stroke="#803D3B"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M26,2c3,0,5.43,3.29,8.09,4.42s6.82.51,8.84,2.65,1.51,6.07,2.65,8.84S50,23,50,26s-3.29,5.43-4.42,8.09-.51,6.82-2.65,8.84-6.07,1.53-8.84,2.65S29,50,26,50s-5.43-3.29-8.09-4.42-6.82-.51-8.84-2.65-1.53-6.07-2.65-8.84S2,29,2,26s3.29-5.43,4.42-8.09.51-6.82,2.65-8.84,6.07-1.53,8.84-2.65S23,2,26,2Zm0,7.58A16.42,16.42,0,1,0,42.42,26h0A16.47,16.47,0,0,0,26,9.58Zm7.62,9.15,1.61,1.52a1.25,1.25,0,0,1,0,1.51L25.08,33.07a2.07,2.07,0,0,1-1.61.7,2.23,2.23,0,0,1-1.61-.7L16.37,27.6a1,1,0,0,1-.1-1.42l.1-.11L18,24.56a1.1,1.1,0,0,1,1.54-.07l.07.07,3.89,4,8.59-9.8A1.1,1.1,0,0,1,33.62,18.73Z"></path></g></svg></span> 
              <strong>Satisfait ou remboursé sur votre premier abonnement :</strong> obtenez un remboursement en remplissant le formulaire ci-dessous.</p>
            </div>
          </div>
        </section>

        <div className={step===2?"step-2 w-full": "step-2 w-full d-none"}>
          <div className="contact w-full" id="contact">
            <div className="container">
              <h3>Informations sur vous</h3>
              <p>Note: ces informations seront utilisées pour vous contacter afin de confirmer votre abonnement, assurez-vous qu'elles sont correctes.</p>
              <div className="row">
                <div className="col-lg-9">
                  <div className="wow fadeInUp" data-wow-delay="0.3s">
                    <form action="https://formspree.io/f/xzblkrvw" method="POST" 
                    >
                      <div className="row g-3">
                      <div className="col-md-6">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="name" name="name" placeholder="Votre Nom Complet" required />
                            <label htmlFor="text">Votre nom</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input type="email" className="form-control" id="email" name="email" placeholder="Votre Email" required />
                            <label htmlFor="email">Votre email</label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="compagny-name" name="compagny-name" placeholder="Nom de l'entreprise" required />
                            <label htmlFor="email">Nom de l'entreprise</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <h3>Choisissez une méthode de paiement</h3>
                          <div className="list-radio">
                            <div className="radio-item">
                              <input className="custom-radio" type="radio" id="bank" name="payment-type" value="Virement Bancaire" />
                              <label className="custom-radio-label" htmlFor="bank">Virement Bancaire</label>
                            </div>
                            <div className="radio-item">
                              <input className="custom-radio" type="radio" id="orange-money" name="payment-type" value="Orange Money" />
                              <label className="custom-radio-label" htmlFor="orange-money">Orange Money</label>
                            </div>
                            <div className="radio-item">
                              <input className="custom-radio" type="radio" id="mtn" name="payment-type" value="MTN" />
                              <label className="custom-radio-label" htmlFor="mtn">MTN</label>
                            </div>
                            <div className="radio-item">
                              <input className="custom-radio" type="radio" id="moov" name="payment-type" value="Moov" />
                              <label className="custom-radio-label" htmlFor="moov">Moov</label>
                            </div>
                            <div className="radio-item">
                              <input className="custom-radio" type="radio" id="wertern-union" name="payment-type" value="Uertern Union" />
                              <label className="custom-radio-label" htmlFor="wertern-union">Wertern Union</label>
                            </div>
                            <div className="radio-item">
                              <input className="custom-radio" type="radio" id="money-gram" name="payment-type" value="Money Gram" />
                              <label className="custom-radio-label" htmlFor="money-gram">Money Gram</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <h3>Avez-vous un message ou une question pour nous ? (optionnel)</h3>
                          <div className="form-floating">
                            <textarea className="form-control" placeholder="Laissez un message ici" name="message" id="message" style={{ height: '150px' }}></textarea>
                            <label htmlFor="message">Laissez un message ici</label>
                          </div>
                        </div>
                        <div className="discount d-none col-12">
                          <h5 className="d-none">Appliquez un coupon de réduction</h5>
                          <div className="form-search-default">
                            <input type="search" name="discount-input" id="discount-input"
                              className="search-bar" placeholder="Applique un coupon de reduction" />
                            <button type="button" onClick={()=>{setShowDiscountMessage(true)}}>Appliquer</button>
                          </div>
                          <p>aaa</p>
                        </div>
                        <div className="order-summary col-12">
                          <h3>Résumé de commande</h3>
                          <div className="d-flex justify-content-between">
                            <p>Montant total:</p>
                            <p>{checkoutData.totals.subTotal} <span className="currency">{checkoutData.plan.currency}</span></p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>Remise:</p>
                            <p>{checkoutData.totals.discount} <span className="currency">{checkoutData.plan.currency}</span></p>
                          </div>
                          <div className="d-flex justify-content-end">
                            <div className="form-search-default">
                              <input type="search" name="discount-input" id="discount-input"
                                className="search-bar" placeholder="Applique un coupon de reduction" />
                              <button type="button" onClick={()=>{setShowDiscountMessage(true)}}>Appliquer</button>
                            </div>
                          </div>
                          {showDiscountMessage && (
                            <div className="d-flex justify-content-end">
                              <p className='text-error-color'>Code promo invalid</p>
                            </div>
                          )}
                          <div className="order-total d-flex justify-content-between">
                            <p>Total:</p>
                            <p>{checkoutData.totals.finalTotal} <span className="currency">{checkoutData.plan.currency}</span></p>
                          </div>
                        </div>
                        <div className='d-none'>
                          <input type="text" name="plan" value={checkoutData.plan.name} />
                          <input type="text" name="sub-total" value={checkoutData.totals.subTotal} />
                          <input type="text" name="discount" value={checkoutData.totals.discount} />
                          <input type="text" name="final-total" value={checkoutData.totals.finalTotal} />
                        </div>
                        <div className="col-12 text-center">
                          <p>Vous serez contacté moins de 24 heures après votre demande de devis</p>
                          <button className="btn btn-primary-gradient rounded-pill py-3 px-5 button-default" 
                            type="submit">Demander un devis</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default Payement