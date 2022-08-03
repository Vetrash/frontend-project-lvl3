import validate from "./validator.js";
import i18n from 'i18next';
import resources from './resource/index.js'
import parserRSS from "./parserRSS.js";
import axios from "axios";
import renderPost from "./renders/Rpost.js"
import renderFeed from "./renders/Rfeed.js"
import getDataRSS from "./getDataRSS.js";
import loger from "./loger.js";
import buttonsEvent from "./watcher/buttonsEvent.js";

const form = document.querySelector('.rss-form');
const input = document.querySelector('input.form-control');

export default () => {
    i18n.init({lng: 'ru', resources});
    const state = {
        form: {      
        value: null,
        valid: false,
        error: null,
        },
        feeds: [],
        posts: [],
        RSS: [],   
    };     

const valid = (e) =>{
    state.form.value = e.target.value;      
    //validate(state);    
}
input.addEventListener('input', valid);

const watcher = () => {
    getDataRSS(state)
        .then(()=>{                      
            renderPost(state.posts);
            renderFeed(state.feeds);
        })           
    setTimeout(watcher, 5000)
}

const submit = async (e) => {    
   e.preventDefault();
   await validate(state)
   .then(()=>{        
    if (state.form.valid === true) {        
        state.RSS.push(state.form.value)
        input.classList.remove("border","border-3","border-danger")
        input.value = "";
        input.focus();
        loger('sending')
        getDataRSS(state)
        .then(()=>{
                  if(state.form.error === null) {
                    loger('finished');
                  } else {
                    loger(state.form.error);
                  }     
            renderPost(state.posts);
            buttonsEvent(state);
            renderFeed(state.feeds);
        })
        .catch(
            loger('errorLoadAll')
        )              
    } else {        
        input.classList.add("border","border-3","border-danger")     
        loger(state.form.error)  
    }
   })
   setTimeout(watcher, 5000)  
}
form.addEventListener('submit', submit);

}


