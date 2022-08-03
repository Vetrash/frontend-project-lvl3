import getList from "../getList.js";

export default (posts) =>{
    if(posts.length === 0) {return ''}
    const post = document.querySelector(".posts")
    post.textContent = "";  
    const h2 = document.createElement('h2');
    h2.classList.add("card-title", "h4", "rounded-0");
    h2.textContent = 'Посты';
    post.appendChild(h2); 
    const list =  getList(posts, 'post')
    post.appendChild(list)
}