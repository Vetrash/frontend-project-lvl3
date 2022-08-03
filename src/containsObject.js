export default (value,key, list) =>{    
    for (const elem of list){ 
       if (elem[key] === value) {            
            return true;
        } 
    };   
    return false
}

  