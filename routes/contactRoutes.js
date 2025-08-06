const express=require('express');
const router=express.Router();

const {getcontacts,
    getcontact,
    createcontact,
    updatecontact,
    deletecontact} = require('../controllers/contactcontroller');

router.route('/').get(getcontacts).post(createcontact);

router.route('/:id').get(getcontact).put(updatecontact).delete(deletecontact);

module.exports = router;