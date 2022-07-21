import axios from "axios";

export const start = ()=> {
    axios.get('https://www.youtube.com/').then(resp => {

        console.log("this is start working : ",resp.data);
    });
}
