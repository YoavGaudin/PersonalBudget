import axios from "axios";

export default axios.create({
  baseURL: 'https://personal-budjet.firebaseio.com',
  params: {auth: 'U9cpgReNR2TdDemcGgA8b5XRv6qhrs2ysLskLLBT'}
})
