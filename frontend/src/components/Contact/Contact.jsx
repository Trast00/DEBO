import React from 'react'
import './contact.css'

const Contact = () => {
  return (
    <>
            <div class="contact w-full py-5" id="contact">
          <div class="container py-5 px-lg-5">
              <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                  <h5 class="text-primary-gradient fw-medium">Pour toute question ou requête, n'hésitez pas</h5>
                  <h2 class="mb-5">Contactez-nous</h2>
              </div>
              <div class="row justify-content-center">
                  <div class="col-lg-9">
                      <div class="wow fadeInUp" data-wow-delay="0.3s">
                          <form action="https://formspree.io/f/xzblkrvw" method="POST">
                              <div class="row g-3">
                                  <div class="col-md-6">
                                      <div class="form-floating">
                                          <input type="text" class="form-control" id="name" name="name" placeholder="Your Name"/>
                                          <label htmlFor="name">Votre nom</label>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-floating">
                                          <input type="email" class="form-control" id="email" name="email" placeholder="Your Email"/>
                                          <label htmlFor="email">Votre email</label>
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="form-floating">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="form-floating">
                                        <textarea class="form-control" placeholder="Leave a message here" name="message" id="message" style={{ height: '150px' }}></textarea>
                                          <label htmlFor="message">Message</label>
                                      </div>
                                  </div>
                                  <div class="col-12 text-center">
                                      <button class="btn btn-primary-gradient rounded-pill py-3 px-5 button-default" type="submit">Envoyez</button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Contact
