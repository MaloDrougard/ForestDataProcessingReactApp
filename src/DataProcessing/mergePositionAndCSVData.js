
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




export {csvArrayToObjArray, addIndexToArray} ; 