const Product = require("../models/product");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);
    console.log(product )

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req,res) =>{
  req.product.photo = undefined;
  return res.json(req.product);
}

exports.photo = (req,res,next) =>{
  if(req.product.photo.data){
    res.set("Content-Type",req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}

exports.deleteProduct = (req,res)=>{
   const product = req.product
   product.remove((err,deletedproduct)=>{
      if(err){
        return res.status(400).json({
          err:"Failed to delete the product"
        })
      }
      res.json({
        message:"Deletion was successful",deletedproduct
      })
   })
}

exports.updateProduct = (req,res)=>{
  const product = req.product;

}
