import React, { useState } from 'react'
import './home.css'
import '../../App.css'
import Hero from '../../components/Home/Hero'
import ListCountries from '../../components/Home/ListCountries'
import ListActivities from '../../components/Home/ListActivities'
import About from '../../components/Home/About'
import Pricing from '../../components/Pricing/Pricing'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'
import Meeting from '../../components/Home/Meeting'


const Home = () => {
  const [listCountries, setListCountries] = useState([])
  const [listActivities, setListActivities] = useState([])
  return (
    <div>
      <Hero listCountries={listCountries} listActivities={listActivities} />
      <section class="country-activty">
        <h2>Trouver des marchées adaptées au entreprise <br/>et Bureau en afrique de l'ouest</h2>
        <ListCountries onGetData={data => setListCountries([...data])} />
        <ListActivities onGetData={data => setListActivities([...data])} />
      </section>
      <About />
      <Pricing />
      <Meeting />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
