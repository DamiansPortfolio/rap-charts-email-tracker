# Rap Chart Email Tracker

A Node.js/React application that tracks and emails users when their favorite rap artists appear on PopVortex's Top 25 chart, either as main or featured artists.

## Features

- Real-time web scraping of PopVortex's top rap charts
- Tracks both main artist and featured artist appearances
- Automated email notifications with formatted HTML content
- User-friendly React frontend interface
- Support for tracking multiple artists simultaneously

## Prerequisites

Before installation, make sure you have:
1. Node.js installed on your computer
2. A Gmail account
3. Gmail App Password (not your regular Gmail password)

## How to Get Gmail App Password
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to App Passwords
5. Select 'Mail' and 'Other (Custom name)'
6. Create a name for your app (e.g., "Rap Chart Tracker")
7. Copy the generated 16-character password

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DamiansPortfolio/rap-charts-email-tracker.git
cd rap-charts-email-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install express cors axios cheerio nodemailer
```

3. Create credentials.json in the backend folder:
```json
{
  "from": "Your Name <your-gmail@gmail.com>",
  "sender_email": "your-gmail@gmail.com",
  "sender_password": "your-16-char-app-password"
}
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server (from the backend directory):
```bash
node server.js
```
You should see: "Server running on port 5001"

2. In a new terminal, start the frontend (from the frontend directory):
```bash
npm start
```
The app will open in your browser at http://localhost:3000

## How to Use

1. Enter your email address in the email field
2. Enter artist names separated by commas (e.g., "Drake, Travis Scott, Future")
3. Click "Send Updates"
4. Check your email for the results

### Example Email Format:
```
Your artist(s) are: Drake and Travis Scott

Drake: Rich Flex
Drake: Jimmy Cooks
Travis Scott: SICKO MODE

Featured Appearances:
Future: WAIT FOR U (feat. Drake)
```

## Troubleshooting

Common issues and solutions:

1. **"Error: Invalid login"**
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify your email address in credentials.json matches your Gmail account

2. **"Port already in use" error**
   - Kill all Node processes: `killall node`
   - Try starting the server again

3. **No email received**
   - Check your spam folder
   - Verify the artist names are spelled correctly
   - Make sure the artists are currently in the top 25 rap songs

## Project Structure

```
rap-charts-email-tracker/
├── backend/
│   ├── server.js
│   ├── credentials.json
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Security Considerations

- Never commit credentials.json to version control
- Keep your Gmail App Password secure
- Use environment variables for sensitive data in production

## Contributing

Feel free to contribute to this project:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:
1. Check the console logs in your browser
2. Check the terminal running your backend server
3. Verify your Gmail App Password is correct
4. Make sure both frontend and backend servers are running

## Author

[Damian Rozycki](https://github.com/damiansportfolio) - Software Developer

Recent Computer Science graduate passionate about building practical web applications and automation tools. Constantly exploring new technologies and looking for opportunities in software development. This project showcases my skills in:
- Full-stack development (Node.js, React)
- RESTful API design
- Web scraping and automation
- Email integration
- User interface design

Feel free to check out my other projects on my [GitHub profile](https://github.com/damiansportfolio) or reach out for collaboration opportunities!
