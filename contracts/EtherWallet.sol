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
      return;
    }
    revert('sender is not allowed');
  }

  function balanceOf() view public returns(uint) {
    // 'this' represents the smart contract
    // before solidity 0.5.0 the syntax was...
    // 'return this.balance;'
    // as of solidity 0.5.0, must explicitly transfer 'this' to an address type
    return address(this).balance;
  }
};
