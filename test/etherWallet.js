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
    assert(parseInt(balance) === 100);
  });

  it("Should return ether balance of smart contract" async () => {
    const balance = await etherWallet.balanceOf();
    assert(parseInt(balance) === 100)
  });

  it("Should transfer ether to another wallet from owner", async () => {
    await etherWallet.send(accounts[1], 50, {from: accounts[0]});
    const balanceWallet = await web3.eth.getBalance(etherWallet.address);
  });
});
