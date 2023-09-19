import React from 'react'
import '../components/utils/utils.css';
import './home.css';
import { RiTeamFill } from 'react-icons/ri'
import { BsNewspaper } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'


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
                <p>+223 94369736 | dickoallassane1997@gmail.com</p>
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
                <RiTeamFill />
            </div>
            <p>Nos Experts</p>
        </li>
        <div className="divisor"></div>
        <li className='flex-center column max-content-flex service'>
            <div className="flex-center max-content-flex">
                <BsNewspaper />
            </div>
            <p>Nos Experts</p>
        </li>
        <div className="divisor"></div>
        <li className='flex-center column max-content-flex service'>
            <div className="flex-center max-content-flex">
                <FaDollarSign />
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
                <RiTeamFill />
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
    <section className='flex-center column faq-sections'>
        <h2>Question Frequente</h2>

        <ul className='list-question'>
            <li className='column question'>
                <h4>What kind of work can I do on Focusmate?</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis maxime fugit porro quam eum numquam dignissimos, sit voluptatem soluta, nesciunt officia consequatur sed rem fuga tempora, perspiciatis corrupti? Neque, est.</p>
            </li>
            <li className='column question'>
                <h4>What kind of work can I do on Focusmate?</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis maxime fugit porro quam eum numquam dignissimos, sit voluptatem soluta, nesciunt officia consequatur sed rem fuga tempora, perspiciatis corrupti? Neque, est.</p>
            </li>
            <li className='column question'>
                <h4>What kind of work can I do on Focusmate?</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis maxime fugit porro quam eum numquam dignissimos, sit voluptatem soluta, nesciunt officia consequatur sed rem fuga tempora, perspiciatis corrupti? Neque, est.</p>
            </li>
        </ul>
    </section>

    <section className='flex-center column section contact-section'>
        <h2>Contactez Nous Dès Maintenant !</h2>
        <form action="" className='flex-center column'>
            <input type="email" name="email" id="email" placeholder='address email (eg lnd.afrique@gmail.com)' required />
            <textarea type="email" name="message" id="email" placeholder='Message' required/>
            <button type="submit" className='btn-hero-reversed flex-center'>Envoyer</button>
        </form>
    </section>
      
    </>
  )
}

export default Home
