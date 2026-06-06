let products=require('../models/productmodel.js');

exports.createproducts= async (req, res) => {
  try {
    const { title, price, image } = req.body;
    await products.create({ title, price, image });
    res.json({ "message": "Product added successfully!" });
  } catch (error)
  {
    res.json({"error": error.message });
  }
};

exports.getproducts= async (req, res) => {
  try {
    let maxlimit=req.query.limit;
    let shipment=req.query.location;
    let allproducts = await products.find().limit(maxlimit);
    res.json(allproducts);
  } catch (error) {
    res.status(200).json({"error": error.message });
  }
};

exports.updateproducts=async (req, res) => {
  try {
    let productid = req.params.id;
    await products.findByIdAndUpdate(productid, req.body);
    res.json({ "message": "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({"error": error.message });
  }
};
exports.deleteproducts=async (req, res) => {
  try {
    let productid = req.params.id;
    await products.findByIdAndDelete(productid);
    res.json({ "message": "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({"error": error.message });
  }
};
exports.InsertMany=async(req,res)=>{
   try {
    await products.insertMany(req.body);
    res.json({ "message": "Products added successfully!" });
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }

};