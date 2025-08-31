require("dotenv").config({ quiet: true });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { isLoggedIn } = require("./middleware");
const twilio = require("twilio");
const PORT = process.env.PORT || 3000;

const dbUrl = process.env.ATLASDB_URL;

/*
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    from: "+17752577720",
    to: "+916355244352",
  });

  console.log(message.body);
}

createMessage();
*/

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "./public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("./home.ejs");
});

// Signup Routes
app.get("/signup", (req, res) => {
  res.render("./users/signup");
});

app.post("/signup", async (req, res, next) => {
  try {
    let { name, email, password, mobile, locality, city, state } = req.body;
    const newUser = new User({
      name,
      email,
      mobile,
      locality,
      city,
      state,
      username: email,
    });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.body);
      res.redirect("/");
    });
  } catch (e) {
    res.redirect("/signup");
  }
});

// Login Routes
app.get("/login", (req, res) => {
  res.render("./users/login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    console.log(req.session);
    res.redirect("/");
  }
);

app.get("/dashboard", isLoggedIn, async (req, res) => {
  const username = req.session.passport.user;
  let user = await User.findOne({ username: username });
  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${process.env.WEATHER_API_URL}?q=${user.city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      let result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      return result;
    } catch (err) {
      throw err;
    }
  };
  let weatherInfo = await getWeatherInfo();
  res.render("./users/dashboard", { user: user, weatherInfo: weatherInfo });
});

// Login Routes
app.get("/mlogin", (req, res) => {
  res.render("./manager/login.ejs");
});

app.post(
  "/mlogin",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    res.redirect("/");
  }
);

app.get("/mdashboard", (req, res) => {
  const mapToken = process.env.MAP_TOKEN;
  res.render("./manager/dashboard", { mapToken: mapToken });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
