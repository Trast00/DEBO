import React from 'react'
import './home.css'
import '../../App.css'
import Hero from '../../components/Home/Hero'
import ListCountries from '../../components/Home/ListCountries'
import ListActivities from '../../components/Home/ListActivities'
import About from '../../components/Home/About'
import Pricing from '../../components/Pricing/Pricing'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  return (
    <div>
      <Hero />
      <section class="country-activty">
        <h2>Disposé de marché adapté a bos besoin</h2>
        <ListCountries />
        <ListActivities />
      </section>
      <About />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
