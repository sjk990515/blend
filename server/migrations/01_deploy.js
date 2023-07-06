const Milege = artifacts.require('Milege')

module.exports = function(deployer){
    deployer.deploy(Mileage)
    .then(function(){
        console.log('Contract Deploy')
    })
}