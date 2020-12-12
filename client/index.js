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

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(
    Crud.abi,
    Crud
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $deposit = document.getElemebtById('deposit')
  const $depositResult = document.getElemebtById('create-result')
  let accounts = []

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts
    });

  $deposit.addEventListener('submit', e => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
      .deposit(amount)
      .send({from: accounts[0]})
      .then(() => {
        $depositResult.innerHTML = `You deposited #{amount}!`;
      })
      .catch(() => {
        $depositResult.innerHTML = "An error occured";
      })
  })
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp();
    })
    .catch(e => console.log(e.message));
});
