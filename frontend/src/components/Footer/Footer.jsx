import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <React.Fragment>
    <section class="container-fluid text-light footer wow fadeIn" data-wow-delay="0.1s">
      <div class="container py-5 px-lg-5">
          <div class="row g-5">
              <div class="col-md-6 col-lg-3">
                  <h4 class="mb-4">Adresse</h4>
                  <p><i class="fa fa-map-marker-alt me-3"></i>Niamana, Bamako</p>
                  <p><i class="fa fa-phone-alt me-3"></i>+223 74 46 98 59</p>
                  <p><i class="fa fa-envelope me-3"></i>debo@deboinfo.com</p>
                  <div class="d-flex pt-2">
                    <a class="btn btn-social" href="https://wa.me/22374469859"><i class="fab fa-whatsapp"></i></a>
                    <a class="btn btn-social" href="#"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-social" href="#"><i class="fab fa-linkedin-in"></i></a>
                  </div>
              </div>
              <div class="col-md-6 col-lg-3">
                  <h4 class="mb-4">Lien Rapide</h4>
                  <a class="btn btn-link" href="">S'abonner</a><br />
                  <a class="btn btn-link" href="">Pourquoi nous choisir</a><br />
                  <a class="btn btn-link" href="">LND</a> <br />
                  <a class="btn btn-link" href="">Terms & Condition</a><br />
              </div>
              
          </div>
      </div>

    </section>
    </React.Fragment>
  );
}
export default Footer
