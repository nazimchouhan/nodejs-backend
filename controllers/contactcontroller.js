const asynchandler = require('express-async-handler');

const contact = require('../model/contactModel');


//@desc get contacts
//@route GET /api/contacts
//@access Public
const getcontacts= asynchandler(async (req, res) => {
    const contacts = await contact.find({});
    res.status(200).json({ contacts });
});
    
//@desc get contacts
//@route GET /api/contacts/:id
//@access Public
const getcontact = asynchandler(async (req, res) => {
    const singleContact = await contact.findById(req.params.id);
    if (!singleContact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ contact: singleContact });
});

//@desc get contacts
//@route POST /api/contacts
//@access Public
const createcontact = asynchandler(async (req, res) => {
    console.log(`The request body is: ${JSON.stringify(req.body)}`);
    const{email, name, phone} = req.body;
    console.log(`Email: ${email}, Name: ${name}, Phone: ${phone}`);
    if(!email || !name || !phone) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const newContact = await contact.create({
        email,
        name,
        phone
    });
    res.status(200).json({  message: "User created" });
});

//@desc get contacts
//@route PUT /api/contacts/:id
//@access Public
const updatecontact = asynchandler(async (req, res) => {
    const { email, name, phone } = req.body;
    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ contact: updatedContact });
});


//@desc get contacts
//@route DELETE /api/contacts/:id
//@access Public
const deletecontact = asynchandler(async (req, res) => {
    const deletedContact = await contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: `Delete Contact with ID: ${req.params.id}` });
});

module.exports = {
    getcontacts,
    getcontact,
    createcontact,
    updatecontact,
    deletecontact
}