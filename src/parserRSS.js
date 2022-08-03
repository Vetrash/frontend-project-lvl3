import containsObject from "./containsObject.js";

export default async(state, data)=>{
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "application/xml");
    const item = doc.querySelectorAll('item');
    const feedTitle = doc.querySelector('title').textContent;
    const feedDescription = doc.querySelector('description').textContent;
    if( !containsObject(feedTitle,'title', state.feeds)){
        state.feeds.push({title:feedTitle, description:feedDescription}) 
    } 
    
    for (const elem of item){
        const title = elem.children[0].innerHTML;
        const link = elem.children[2].innerHTML;
        const description =elem.children[3].innerHTML        
            if( !containsObject(title,'title', state.posts)){
                state.posts.push({title, link, description, viewed: false})
            } 
    }          
}
