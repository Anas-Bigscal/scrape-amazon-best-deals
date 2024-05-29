const Router = require('express');
const { scrapeData } = require('../controllers/amazonDeal.controller')
const amazonRouter = Router();


amazonRouter.get('/amazonDeal', scrapeData);


exports.amazonRouter = amazonRouter;