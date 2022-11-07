function isObjectEmpty(object) { // чи порожній об'єкт
    const keys = Object.keys(object);
    
    if (keys.length > 0) {
        return false;
    }
    return true;
};

function isObjectsEquals(object1, object2) { // порівняння об'єктів
    for(const property in object1){
        if(object1.hasOwnProperty(property)){
            if(object1[property] !== object2[property]){
                return false;
            }
        }
    }
    for(const property in object2){
        if(object2.hasOwnProperty(property)){
            if(object1[property] !== object2[property]){
                return false;
            }
        }
    }
    return true;
};

function objectsEquality(object1, object2) { // перетин об'єктів
    const equality = {};

    for(const property in object1){
        if(object1.hasOwnProperty(property)){
            if(object1[property] === object2[property]){
                equality[property] = object1[property];
            }
        }
    } 

    return equality;
};

function findInObjectByKey(object, key) { // значення за ключем
    if (object[key]) {
        return object[key];
    }
    return null;  
};