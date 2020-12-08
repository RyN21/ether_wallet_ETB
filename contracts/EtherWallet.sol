pragma solidity ^0.5.0;

contract EtherWallet {
  function deposit() payable public {
    // no logic needed
  }

  function send(address to, uint amount) public {
    to.transfer(amount);
  }
};
