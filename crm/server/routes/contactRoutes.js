const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const authMiddleware = require('../middleware/authMiddleware');
const Contact = require('../models/Contact');

const router = express.Router();


// Get all contacts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');
    
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single contact by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new contact
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newContact = new Contact({
      ...req.body,
      createdBy: req.user.id,
      leadCreated: new Date()
    });
    
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a contact
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;