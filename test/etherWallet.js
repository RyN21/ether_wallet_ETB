const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', () => {
  let etherWallet = null;
  before(async () => {
    etherWallet = await EtherWallet.deployed();
  });
  it()
});

//Create test to check if owner variable in smart contract is set properly
