const requestRouter = require('express').Router();
const {
  checkRequest,
  getAllRequest,
} = require('../controllers/request.controllers');
const validateUser = require('../middlewares/validateUser');

requestRouter.get('/', getAllRequest);

requestRouter.post('/:id/check', validateUser, checkRequest);

module.exports = requestRouter;
