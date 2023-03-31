function CE(Name, nameClass, type, insert) {
    let element = document.createElement(Name);
    type == "id" ? element.id = nameClass : element.className = nameClass;
    
    if (insert) {
        element.innerHTML = insert
    }
    return element;
}