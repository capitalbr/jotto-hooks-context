import axios from "axios";

// export const getSecretWord = (setSecretWord) => {
  //   return axios.get("http://localhost:3030").then(res  => {
    //     setSecretWord(res.data);
    //   });
    // };
    
// We should strive to think asynchronously but sometimes it's better to use the
// async await syntax.  Just make sure your not making a bunch of API calls sequentially
// that could have been done in parallel
// this style has a more synchrolous feel which can be dangerous if your not 
// careful

export const getSecretWord = async (setSecretWord) => {
  const response = await axios.get("http://localhost:3030");
  setSecretWord(response.data);
}


export default {
  getSecretWord,
}