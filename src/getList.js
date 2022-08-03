
export default (items, type) => {    
    if(items.length === 0 || !type in ['post', 'feed']) {return ""}
    
    const ul = document.createElement('ul');
    ul.classList.add("list-group", "border-0", "rounded-0");
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add("list-group-item", "border-0","border-end-0");
        if (type === 'post'){
            li.classList.add("d-flex", "justify-content-between", "align-items-start");
            const a = document.createElement('a');
            if (item.viewed === false){
                a.classList.add("fw-bold")
            } else{
                a.classList.add("fw-normal", "link-secondary")
            }            
            a.textContent = item.title;
            a.setAttribute("href", item.link);
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.classList.add("btn", "btn-outline-primary", "btn-sm")
            button.setAttribute("data-id", index);
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#modal");
            
            button.textContent = 'Просмотр';
            //button.addEventListener('click',showed)
           
            li.appendChild(a);
            li.appendChild(button);
        }      
        if (type === 'feed'){        
            const h3 = document.createElement('h3');
            h3.classList.add("h6","m-0")
            h3.textContent = item.title;
            const p = document.createElement('p');
            p.classList.add("m-0", "small", "text-black-50")
            p.textContent = item.description;        
            li.appendChild(h3);
            li.appendChild(p);
        }
        
        ul.appendChild(li);
    })
    //console.log(ul)
    return ul
}
