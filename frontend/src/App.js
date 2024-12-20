import React, { useState } from "react"
import "./App.css"

function App() {
  const [email, setEmail] = useState("")
  const [artists, setArtists] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: "", message: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: "", message: "" })

    try {
      const response = await fetch("http://localhost:5001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          artistInput: artists,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email")
      }

      setStatus({
        type: "success",
        message: "Email sent successfully! Check your inbox.",
      })
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Failed to send email. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='app-container'>
      <div className='card'>
        <h1>Music Chart Email Updates</h1>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Your Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='form-group'>
            <label>Artists (comma-separated)</label>
            <input
              type='text'
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
              placeholder='e.g. Drake, Travis Scott'
              required
            />
          </div>

          <button type='submit' disabled={loading} className='submit-button'>
            {loading ? "Sending..." : "Send Updates"}
          </button>
        </form>

        {status.type && (
          <div
            className={`alert ${
              status.type === "error" ? "alert-error" : "alert-success"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
