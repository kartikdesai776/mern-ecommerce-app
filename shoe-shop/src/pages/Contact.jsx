import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else {
      // Name validation: first letter capital, only letters and spaces allowed
      if (!/^[A-Z][a-zA-Z\s]*$/.test(formData.name)) {
        newErrors.name = 'Name must start with a capital letter and contain only letters and spaces'
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validate()) {
      alert('Form submitted successfully!')
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    }
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <div className="grid">
        <div className="col-6">
          <form
            className="card"
            style={{ padding: 16 }}
            onSubmit={handleSubmit}
            aria-label="Contact form"
            noValidate
          >
            <div className="form-row">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                aria-label="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <textarea
              className="input"
              rows={6}
              name="message"
              placeholder="Message"
              aria-label="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
            <div style={{ marginTop: 12 }}>
              <button className="btn" type="submit">Send</button>
            </div>
          </form>
        </div>
        <div className="col-6">
          <section className="card" style={{ padding: 16 }}>
            <h2>Company Info</h2>
            <p className="card-subtle">support@shoeshop.example — +1 (555) 123-4567</p>
          </section>
        </div>
      </div>
    </div>
  )
}
