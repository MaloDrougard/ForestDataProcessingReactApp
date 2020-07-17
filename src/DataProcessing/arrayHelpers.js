

/**
 * Return a hash code of the array
 * @param  array 
 */
function hashArray(array){
    var hash = 0;
    let s = JSON.stringify(array);
    if (s.length == 0) return hash;
    let char;  
    for (let i = 0; i < s.length; i++) {
        char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
} 

function csvArrayToObjArray(csvArray, headersArray){
    let objectArray = []; 
    csvArray.forEach(a => {
        let record = {};
        for(let i= 0; i < headersArray.length; i++ ){
            record[headersArray[i]] = a[i]            
        }
        objectArray.push(record);          
    })
    return objectArray; 
}


function addIndexToArray(array){
    let counter = 0; 
    array.forEach(r => {
             r.i = counter;
             counter++; 
    })
}




export {csvArrayToObjArray, addIndexToArray, hashArray} ; 