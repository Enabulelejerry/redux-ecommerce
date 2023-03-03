import React, { useEffect,useState } from 'react'

import { FeaturedProducts, Hero, Services, Contact } from '../components'
import { useAuth0 } from '@auth0/auth0-react'
const HomePage = () => {

 
  return <main>
    <Hero/>
    <FeaturedProducts />
    <Services />
    <Contact />
  </main>
}
 
export default HomePage
