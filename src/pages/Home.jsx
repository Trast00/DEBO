import React from 'react'
import '../components/utils/utils.css';
import './home.css';


const Home = () => {
  return (
    <>
    <section className='column hero'>
        <header className='row'>
            <div className='flex-center logo'>
                <img src="" alt="Logo de Debo" />
                <h1>
                    <a href="#" className='no-style'>Debo Service</a>
                </h1>
            </div>
            <div>
                <p>Contact</p>
                <p>dickoallassane1997@gmail.com</p>
                <p>+223 94369736</p>
            </div>
        </header>
        <main className='flex-center column max-content-flex '>
            <p className='subheading'>Informez vous des appels d'offres</p>
            <h2>A Traver l'UEMOA</h2>
            <button className='btn-hero'>Pourquoi Nous Rejoindre ?</button>
        </main>
    </section>
    <ul className='card services flex-center'>
        <li className='flex-center column max-content-flex service'>
            <div className="flex-center max-content-flex">
                <img src="#" alt="icons" />
            </div>
            <p>Nos Experts</p>
        </li>
        <div className="divisor"></div>
        <li className='flex-center column max-content-flex service'>
            <div className="flex-center max-content-flex">
                <img src="#" alt="icons" />
            </div>
            <p>Nos Experts</p>
        </li>
        <div className="divisor"></div>
        <li className='flex-center column max-content-flex service'>
            <div className="flex-center max-content-flex">
                <img src="#" alt="icons" />
            </div>
            <p>Nos Experts</p>
        </li>
    </ul>

    <section className='features-sections'>
        <div className='row wrap feature'>
            <div className='max-content-flex flex-center'>
                <img src="#" alt="image 1" />
            </div>
            <div className='max-content-flex flex-center column feature-content'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat tempora distinctio soluta aut amet fugit blanditiis rerum officia. Rerum fugiat alias, necessitatibus provident deserunt nulla quibusdam eius accusantium eveniet vero!</p>
                <button className='btn-hero-reversed'>En Savoir Plus</button>
            </div>
        </div>
        <div className='row wrap feature'>
            <div className='max-content-flex flex-center'>
                <img src="#" alt="image 1" />
            </div>
            <div className='max-content-flex flex-center column'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat tempora distinctio soluta aut amet fugit blanditiis rerum officia. Rerum fugiat alias, necessitatibus provident deserunt nulla quibusdam eius accusantium eveniet vero!</p>
                <button className='btn-hero-reversed'>En Savoir Plus</button>
            </div>
        </div>
        <div className='row wrap feature'>
            <div className='max-content-flex flex-center'>
                <img src="#" alt="image 1" />
            </div>
            <div className='max-content-flex flex-center column'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat tempora distinctio soluta aut amet fugit blanditiis rerum officia. Rerum fugiat alias, necessitatibus provident deserunt nulla quibusdam eius accusantium eveniet vero!</p>
                <button className='btn-hero-reversed'>En Savoir Plus</button>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default Home
