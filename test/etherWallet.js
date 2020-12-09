const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', (accounts) => {
  let etherWallet = null;
  before(async () => {
    etherWallet = await EtherWallet.deployed();
  });
  it("Should set account[0] as owner", async () => {
    const owner = await etherWallet.owner();
    assert(owner === accounts[0]);
  });

  it("Should deposit ether to etherWallet", async () => {
    await etherWallet.deposit({
      from: accounts[0],
      value: 100
    });
    const balance = await web3.eth.getBalance(etherWallet.address);
  });
});
