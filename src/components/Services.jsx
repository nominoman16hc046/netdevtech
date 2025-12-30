import { useEffect, useState } from 'react'
import './Services.css'

function Services() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.querySelector('.services')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: '⚡',
      title: 'Automations',
      description: 'Streamline your business processes with intelligent automation solutions that save time and reduce human error.',
      color: '#6366f1'
    },
    {
      icon: '🎯',
      title: 'Lead Engagement Platforms',
      description: 'Convert visitors into customers with sophisticated lead capture and engagement tools powered by AI.',
      color: '#8b5cf6'
    },
    {
      icon: '🤖',
      title: 'AI Chatbots',
      description: 'Deploy intelligent conversational agents that provide 24/7 customer support and drive engagement.',
      color: '#ec4899'
    },
    {
      icon: '📞',
      title: 'AI Calling Agents',
      description: 'Revolutionize customer communication with AI-powered voice agents for sales and support.',
      color: '#f59e0b'
    },
    {
      icon: '🔗',
      title: 'API Integrations',
      description: 'Seamlessly connect your systems and applications with custom API solutions and integrations.',
      color: '#10b981'
    },
    {
      icon: '⛓️',
      title: 'Blockchain Services',
      description: 'Build secure, decentralized solutions with cutting-edge blockchain technology and smart contracts.',
      color: '#06b6d4'
    }
  ]

  return (
    <section className="services" id="services">
      <div className="container">
        <div className={`services-header ${isVisible ? 'fade-in-up' : ''}`}>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions to accelerate your digital transformation
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card glass ${isVisible ? 'fade-in-up' : ''}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                '--service-color': service.color
              }}
            >
              <div className="service-icon" style={{ color: service.color }}>
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <button className="service-btn" style={{ borderColor: service.color, color: service.color }}>
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
