import web3 from './web3';
import CampaignFactory from './ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xbEe1e9319Ff7567e53da73fB3a3B07345837F7Fb'
);

export default instance;