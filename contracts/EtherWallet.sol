pragma solidity ^0.5.0;

contract EtherWallet {
  address public owner;

  constructor(address _owner) public {
    owner = _owner;
  }

  function deposit() payable public {
    // no logic needed
  }

  function send(address to, uint amount) public {
    if(msg.sender == owner) {
      to.transfer(amount);
    }
  }
};
