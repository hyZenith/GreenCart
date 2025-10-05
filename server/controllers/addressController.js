

// add address :: /api/address/add

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
       const {address, userId} = req.body;
        await Address.create({...address, userId})
        res.status(200).json({message: 'Address added successfully'})
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: 'Internal server error'}) 
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