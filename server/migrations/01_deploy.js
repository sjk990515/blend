const Mileage = artifacts.require('Mileage');

module.exports = function (deployer) {
   deployer.deploy(Mileage).then(function () {
      console.log('Contract Deploy');
   });
};
