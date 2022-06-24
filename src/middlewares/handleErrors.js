const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: 'id user is malformed' }),
  ValidatonError: (res, { message }) =>
    res.status(409).send({ error: message }),
  ValidationError: (res, error) => res.status(400).json(error.errors),
  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),
  TokenExpirerError: (res) => res.status(401).json({ error: 'token expired' }),
  defaultError: (res, error) => {
    console.error(error.name);
    res.status(500).end();
  },
};

const handleErrors = (error, req, res, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(res, error);
};

module.exports = handleErrors;
