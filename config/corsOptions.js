const corsOptions = {
  origin: (origin, callback) => {
    if (
      origin === 'http://localhost:3001' ||
      origin === 'https://finance-gfwg.onrender.com' ||
      !origin
    )
      callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
