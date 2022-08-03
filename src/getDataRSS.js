import axios from "axios";
import parserRSS from "./parserRSS.js";

export default async (state) =>{    
    for (const elem of state.RSS){        
    await  axios.get(elem)
            .then((res)=>{                       
              parserRSS(state, res.data)                
            })
            .catch(()=>{
              state.form.error = 'errorLoadOne';
            })
    } 
}