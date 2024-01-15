const express = require('express');
const hotelCompaniesController = require('../controllers/hotelCompaniesController');
const router = express.Router();

router.get('/:id', hotelCompaniesController.getCompany)
router.post('/create', hotelCompaniesController.createCompany);
router.put('/update/:id', hotelCompaniesController.updateCompany);
router.delete('/delete/:id', hotelCompaniesController.deleteCompany);
router.get('/user/:userId', hotelCompaniesController.getAllCompaniesByUserId);

module.exports = router;
