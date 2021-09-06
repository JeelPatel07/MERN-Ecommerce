const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "b97njbpj548gsp42",
  publicKey: "y8p8y4cpx2x8g3zy",
  privateKey: "60da745fa95de402cd9179a5267638fc",
});

exports.getToken = () => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
exports.processPayment = () => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      //  deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
        if(err){
            res.status(500).json(error)
        }
        else{
            res.json(result)
        }
    }
  );
};
