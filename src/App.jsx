import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import RobotScene from './components/RobotScene'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      {/* <RobotScene /> */}
      <Hero />
      <Services />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default App
