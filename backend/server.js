const express = require("express")
const cors = require("cors")
const axios = require("axios")
const cheerio = require("cheerio")
const nodemailer = require("nodemailer")
const jsonData = require("./credentials.json")

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
)
app.use(express.json())

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: jsonData.sender_email,
    pass: jsonData.sender_password,
  },
})

app.post("/api/send-email", async (req, res) => {
  try {
    const { email, artistInput } = req.body
    const artists = artistInput.split(",").map((artist) => ({
      name: artist.trim(),
      titles: [],
      featured: [],
    }))

    // Fetch and parse chart data
    const response = await axios.get(
      "https://www.popvortex.com/music/charts/top-rap-songs.php"
    )
    const $ = cheerio.load(response.data)

    artists.forEach((artist) => {
      const artistName = artist.name
      const artistRegex = new RegExp(`\\b${artistName}\\b`, "i")

      // If featured
      $("cite.title").each(function (i, element) {
        if (i >= 25) return false
        if (artistRegex.test($(this).text())) {
          artist.featured.push({
            name: $(this).next("em.artist").text(),
            titles: [$(this).text()],
          })
        }
      })

      // If artist
      $("em.artist").each(function (i, element) {
        if (i >= 25) return false
        if (artistRegex.test($(this).text())) {
          artist.titles.push($(this).prev("cite.title").text())
        }
      })
    })

    const featuredArtist = []
    const mainArtist = []

    artists.forEach((artist) => {
      if (artist.titles.length > 0) {
        mainArtist.push({
          name: artist.name,
          titles: artist.titles,
        })
      }

      if (artist.featured.length > 0) {
        artist.featured.forEach((feature) => {
          featuredArtist.push({
            name: feature.name,
            titles: feature.titles,
          })
        })
      }
    })

    const mainArtistNames = mainArtist.map((artist) => artist.name)
    let artistNamesFormatted
    if (mainArtistNames.length > 2) {
      artistNamesFormatted = `${mainArtistNames
        .slice(0, -1)
        .join(", ")}, and ${mainArtistNames.slice(-1)}`
    } else {
      artistNamesFormatted = mainArtistNames.join(" and ")
    }

    // Build email content
    let emailText = ""
    let emailHtml = ""

    mainArtist.forEach((artist) => {
      artist.titles.forEach((title) => {
        emailText += `${artist.name}: ${title}\n`
        emailHtml += `<p><b>${artist.name}</b>: <i>${title}</i></p>`
      })
    })

    featuredArtist.forEach((artist) => {
      artist.titles.forEach((title) => {
        emailText += `${artist.name}: ${title}\n`
        emailHtml += `<p><b>${artist.name}</b>: <i>${title}</i></p>`
      })
    })

    if (mainArtist.length === 0 && featuredArtist.length === 0) {
      return res.status(404).json({
        error:
          "None of the specified artists were found in the current charts.",
      })
    }

    const mailOptions = {
      from: jsonData.from,
      to: email, // Use the email provided in the request
      subject: `Your artist(s) are: ${artistNamesFormatted}`,
      text: emailText,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: "Email sent successfully!" })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
