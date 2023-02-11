const express = require('express');
const router = express.Router();
const { getComplaints, addComplaint, deleteComplaint } = require('../controllers/complaints');

router
  .route('/')
  .get(getComplaints)
  .post(addComplaint);

router
  .route('/:id')
  .delete(deleteComplaint);

module.exports = router;