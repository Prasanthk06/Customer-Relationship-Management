const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  emailid: {
    type: String
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  pincode: {
    type: String
  },
  district: {
    type: String
  },
  state: {
    type: String
  },
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'Interested', 'Not Interested', 'Enrolled', 'Rejected', 'Non Contactable']
  },
  subStatus: {
    type: String
  },
  nextFollowUp: {
    type: Date
  },
  leadCreated: {
    type: Date,
    default: Date.now()
  },
  source: {
    type: String
  },
  group: {
    type: String
  },
  chitAmount: {
    type: String
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);