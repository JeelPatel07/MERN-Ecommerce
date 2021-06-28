const Product = require('../models/product');
const formidable = require("formidable");
const _ = require('lodash');
const fs = require("fs");
const { formidable } = require('formidable');


exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
    if(err){
        return res.status(400).json({
            err:"Product not found"
        })
    }
    req.product = product;
    next();
    })

}
exports.createProduct = (req,res) =>{

  let form  = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req,(err,fields,file)=>{
      if(err){
          return res.status(400).json({
              err:"Problem with image"
          })
      }

      //restrictions on fields
      let product = new Product(fields)


      //handle file 
      if(file.photo){
          if(file.photo.size > 3000000){
              return res.status(400).json({
                  err:"File size too big!"
              })
          }
          product.photo.data = fs.readFileSync(file.photo.path)
          product.photo.contentType = file.photo.type
      }
      //save  to db
      product.save((err,product)=>{
          if(err){
              return res.status(400).json({
                  err:"Saving t-shirt in DB failed!!"
              })
          }
          res.json(product);
      })
  })


}