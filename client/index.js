import Web3 from 'web3';
import EtherWallet from '../build/contracts/EtherWallet.json';

let web3;
let etherWallet;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(
    EtherWallet.abi,
    EtherWallet
      .networks[networkId]
      .address
  );
};

const initApp = () => {
  const $deposit = document.getElemebtById('deposit');
  const $depositResult = document.getElemebtById('deposit-result');


  const $balance = document.getElemebtById('balance');
  let accounts = []

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts
    });

  const refreshBalance = () => {
    etherWallet.methods
      .balanceOf()
      .call()
      .then(result => {
        $balance.innerHTML = result;
      });
  };
  refreshBalance();

  $deposit.addEventListener('submit', e => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
      .deposit()
      .send({from: accounts[0], value: amount})
      .then(result => {
        $depositResult.innerHTML = `You deposited ${amount} wei!`;
        refreshBalance();
      })
      .catch(() => {
        $depositResult.innerHTML = `Ooops... an error occured while trying to make a deposit`;
      });
  });

};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_etherWallet => {
      etherWallet = _etherWallet;
      initApp();
    })
    .catch(e => console.log(e.message));
});
