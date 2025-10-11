

// add address :: /api/address/add

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
      console.log('addAddress body:', req.body);
      const {address, userId} = req.body;
      if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });
      const created = await Address.create({...address, userId});
      console.log('address created:', created);
      res.status(200).json({ success: true, message: 'Address added successfully' })
    } catch (error) {
      console.error('addAddress error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' }) 
    }
}


// get address :: /api/address/get
export const getAddress = async (req, res) => {
    try {
       const {userId} = req.body; 
       const addresses = await Address.find({userId}) 
       res.status(200).json(addresses)
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: 'Internal server error'}) 
    }
}