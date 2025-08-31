
-----

# Project Sentinel: AI-Powered Coastal Defense

([https://img.shields.io/badge/License-MIT-green.svg](https://www.google.com/search?q=https://img.shields.io/badge/License-MIT-green.svg))]([https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT))
([https://img.shields.io/badge/Backend-Node.js-blue?logo=nodedotjs](https://www.google.com/search?q=https://img.shields.io/badge/Backend-Node.js-blue%3Flogo%3Dnodedotjs))]([https://nodejs.org/](https://nodejs.org/))
[](https://ejs.co/)
[](https://maplibre.org/)
[](https://www.twilio.com/)

**Project Sentinel** is a web-based platform designed to transform coastal threat management from a reactive to a proactive process. It provides disaster management officials with a powerful "command center" to simulate coastal threats and deliver hyper-local, actionable intelligence to communities and stakeholders.

At its core is the **AI-Powered Consequence Simulation Engine**, which moves beyond simple warnings to answer the critical question: ***"So what does this threat actually mean for us, right here, right now?"*** [1]

-----

## 📌 The Problem: The Coastal Threat Gap

Coastal regions are vital for biodiversity and blue carbon storage but face escalating threats like storm surges, pollution, and illegal activities.[1] Traditional warning systems are often too broad or too late, failing to provide the specific, actionable information needed to protect lives, infrastructure, and sensitive ecosystems. This creates a dangerous "threat gap" between a known danger and an effective response.[1]

## 💡 Our Solution: From Prediction to Consequence Simulation

Project Sentinel closes this gap with a dual-interface system designed for both strategic planning and community safety.

  * **For Managers:** A secure web dashboard that allows officials to visualize their coastal region, simulate threat scenarios using pre-defined data, and understand the cascading impacts on specific infrastructure and registered communities.[1]
  * **For the Community:** A mobile-first portal for citizens to register for alerts, view local environmental data, and receive timely, hyper-local warnings that are clear and actionable.[1]

For this hackathon, we have built a fully functional prototype that demonstrates this entire workflow using simulated threat data.

-----

## ✨ Key Features

| Citizen Portal | Manager Dashboard |
| :--- | :--- |
| ✅ **Secure User Signup & Login** | ✅ **Secure, Separate Manager Login** |
| ✅ **Personalized Dashboard** with local status | ✅ **AI Threat Simulation Controls** (Moderate & Severe) |
| ✅ **Recent Announcements & Alerts** feed | ✅ **Dynamic Map Visualization** of threat zones |
| ✅ **Local Blue Carbon Ecosystem** health stats | ✅ **Registered Community Data Table** (Sortable) |
| | ✅ **Detailed Impact Assessment** panel |
| | ✅ **Targeted SMS Alert Dispatch** system |

-----

## 🌎 Hackathon Relevance: Protecting Blue Carbon Ecosystems

This project directly addresses the hackathon's theme of protecting **Blue Carbon Ecosystems**.[1]

  * **Direct Protection:** The system is designed to provide early warnings for threats like pollution and storm surges that can devastate vital habitats like mangroves and seagrass beds.
  * **Quantified Impact:** Our simulation engine includes a "Blue Carbon Risk" assessment, which estimates the potential carbon release from habitat damage. This provides tangible, data-driven metrics for conservation and policy-making.
  * **Community Empowerment:** By engaging the community, we create a network of local guardians who are better informed and prepared to protect their coastal environment.[1]

-----

## 🛠️ Technology Stack

| Category | Technology/Service | Purpose |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | To build the server, handle routing, and serve data. |
| **Frontend** | EJS (Embedded JavaScript) | For server-side rendering of dynamic HTML pages. |
| **Database** | MongoDB (with Mongoose) | To store user and manager credentials and profiles. |
| **Mapping** | MapLibre GL JS | For rendering interactive, dynamic maps. |
| **Alerting** | Twilio API | To dispatch real-time SMS alerts. |
| **Data** | GeoJSON, JSON | To store and serve infrastructure and simulation data. |

-----

## 📂 Project Structure

The project is a monolithic Node.js application using the MVC (Model-View-Controller) pattern.

```
/sentinel/
├── 📁 data/
│   ├── infrastructure.geojson
│   ├── moderate_flood.geojson
│   ├── moderate_impact.json
│   ├── severe_flood.geojson
│   └── severe_impact.json
├── 📁 models/
│   ├── manager.js
│   └── user.js
├── 📁 public/
│   └── css/
│       └── style.css
├── 📁 views/
│   ├── 📁 layouts/
│   │   └── boilerplate.ejs
│   ├── 📁 manager/
│   │   ├── dashboard.ejs
│   │   └── login.ejs
│   ├── 📁 users/
│   │   ├── dashboard.ejs
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── home.ejs
├── 📄 app.js
├── 📄 package.json
└── 🔒.env
```

-----

## 🚀 Getting Started: Installation & Setup

Follow these steps to run the project locally.

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/sentinel.git
cd sentinel
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables.

```
# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# Your MapTiler API Key for map tiles
MAPTILER_API_KEY=your_maptiler_api_key

# Your Twilio Account SID, Auth Token, and Phone Number
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 4\. Run the Application

Start the Express server. The application will be accessible at `http://localhost:3000`.

```bash
node app.js
```

-----

## 📸 Demo Walkthrough

To experience the full functionality of our prototype, follow this story:

1.  **Visit the Homepage:** Start at the homepage to understand the project's mission.
2.  **Register as a Citizen:** Navigate to the **Community Signup** page. Register a new user (e.g., "Asha Patel") in the **Porbandar** locality.
3.  **Login as a Manager:** Go to the **Manager Login** page and log in to access the command center.
4.  **View the Community:** On the dashboard, observe the "Registered Community" table. You will see the user you just created.
5.  **Simulate a Moderate Threat:** In the "Control Center," click the **"Simulate Moderate Threat"** button.
      * Observe the map: A flood zone appears over the Porbandar area.
      * Check the Impact Panel: See the detailed analysis, including the specific risks to `Hope Hospital` and `Porbandar Port`.
6.  **Simulate a Severe Threat:** Now, click the **"Simulate Severe Threat"** button.
      * Observe the map: The flood zone expands dramatically to cover the entire coastline, including the critical Mundra industrial hub.
      * Check the Impact Panel: The analysis updates to show "High" risk to `Mundra Port` and the `Mundra Thermal Power Station`.
7.  **Dispatch the Alert:** In the "Issue Community Alert" section, select the "Porbandar Area" target, type a warning message, and click **"Dispatch Alert."** This will trigger the live SMS to the number you registered.

-----

## 🔮 Future Roadmap

Our hackathon prototype lays the foundation for a fully autonomous, AI-driven system. The future roadmap includes:

  * **Real-Time Data Ingestion:** Integrating live data streams from IoT sensors, weather APIs, and satellite feeds.[1]
  * **AI-Powered Anomaly Detection:** Using LSTM autoencoder models to automatically detect anomalies in sensor data that indicate a looming threat.
  * **Dynamic Consequence Simulation:** Replacing static GeoJSON files with a Transformer-based AI model that generates hyper-local impact predictions in real-time.
  * **Human-in-the-Loop Feedback:** Creating a system for experts to validate or correct AI predictions, which will be used to continuously retrain and improve the model through active learning.[2]