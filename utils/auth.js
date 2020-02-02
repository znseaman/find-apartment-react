const Session = require("../utils/session");
const User = require("../models/user");
const scrapeListings = require("../crons/craigslist/scrape");

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        email
      }
    });
    if (existingUser) {
      return next({
        statusCode: 409,
        field: "email",
        message: "This email has been taken"
      });
    }

    const user = await User.create({
      email,
      password
    });

    // setup initial search settings for new user
    const {
      city,
      baseHost: base_host,
      hasPic: has_pic,
      category,
      maxPrice: max_price,
      minPrice: min_price,
      postedToday: posted_today
    } = require("./userPreferences");
    const userPreferences = {
      type: "craigslist",
      base_host,
      city,
      category,
      has_pic,
      max_price,
      min_price,
      posted_today,
      userId: user.id
    };

    // make them just a little different from the default
    userPreferences.min_price = 4000;
    userPreferences.max_price = 5000;

    const SearchSetting = require("../models/search_setting");
    const search_setting = await SearchSetting.create(
      userPreferences
    );

    // get listings for a newly created user
    scrapeListings(user.id);

    Session.set_session(email, res)
      .then(() => {
        res.json({ msg: "Successfully created user!" });
      })
      .catch(error => {
        next(error);
      });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      return next({
        statusCode: 400,
        field: "email",
        message: "Incorrect email/password"
      });
    }

    if (!user.verifyPassword(password)) {
      return next({
        statusCode: 400,
        field: "password",
        message: "Incorrect email/password"
      });
    }

    Session.set_session(email, res, user.session_id)
      .then(() => {
        res.json({ message: "Successful login!" });
      })
      .catch(error => {
        next(error);
      });

  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { email, id: session_id } = Session.parse(req.cookies.session_str);

  try {
    await User.update({
      session_id: null
    },
      {
        where: {
          email, session_id
        }
      });

    res.clearCookie("session_str");
    res.json({ msg: "Successful logout" })
  } catch (error) {
    next(error);
  }
}

const protect = async (req, res, next) => {
  try {
    const { session_str } = req.cookies;
    if (!Session.verify(session_str)) {
      res.clearCookie("session_str");
      return next({
        statusCode: 401,
        message: "Not Authorized"
      });
    }

    const { email, id: session_id } = Session.parse(session_str);

    const user = await User.findOne({
      where: {
        email,
        session_id
      }
    });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  protect,
};
