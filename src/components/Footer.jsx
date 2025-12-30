import { motion } from 'framer-motion'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-brand">
            <h3 className="footer-logo gradient-text">NetDevTech</h3>
            <p className="footer-domain">netdevtech.io</p>
            <p className="footer-tagline">
              Transforming businesses with AI-powered solutions
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><a href="#automations">Automations</a></li>
                <li><a href="#lead-engagement">Lead Engagement</a></li>
                <li><a href="#ai-chatbots">AI Chatbots</a></li>
                <li><a href="#ai-calling">AI Calling Agents</a></li>
                <li><a href="#api">API Integrations</a></li>
                <li><a href="#blockchain">Blockchain Services</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <ul>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="mailto:info@netdevtech.io">info@netdevtech.io</a></li>
              </ul>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="GitHub">💻</a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NetDevTech. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
