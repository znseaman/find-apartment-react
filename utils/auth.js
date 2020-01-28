const Session = require("../utils/session");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        email
      }
    });
    if (existingUser) {
      throw Error('Email taken');
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

    Session.set_session(email, res)
      .then(() => {
        res.json({ msg: "Successfully created user!" });
      })
      .catch(error => {
        next(error);
      });

  } catch (error) {
    res.status(401).json({
      type: "error",
      msg: "This email has been taken"
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw Error('no auth');
    }

    if (!user.verifyPassword(password)) {
      throw Error('no auth');
    }

    Session.set_session(email, res, user.session_id)
      .then(() => {
        res.json({ msg: "Successful login!" });
      })
      .catch(error => {
        next(error);
      });

  } catch (error) {
    res.status(400).json({
      type: "error",
      msg: "Incorrect email/password"
    });
  }
};

const protect = async (req, res, next) => {
  try {
    const { session_str } = req.cookies;
    if (!Session.verify(session_str)) {
      throw Error('not auth');
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
    res.clearCookie("session_str");
    res.status(401).end();
  }
};

module.exports = {
  signup,
  login,
  protect,
};
