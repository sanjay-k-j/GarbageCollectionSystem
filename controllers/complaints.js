const Garbage = require('../models/Garbage')

exports.getComplaints = async (req, res, next) => {
  try {
    const complaints = await Garbage.find();

    return res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

exports.addComplaint = async (req, res, next) => {
  try {
    const complaint = await Garbage.create(req.body);

    return res.status(201).json({
      success: true,
      data: complaint
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Garbage.findById(req.params.id);

    if(!complaint) {
      return res.status(404).json({
        success: false,
        error: 'No complaint found'
      });
    }

    await complaint.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}