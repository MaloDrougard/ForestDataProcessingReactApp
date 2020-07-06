function csvArrayToObjArray(csvArray){
    let objectArray = []; 
    csvArray.forEach(a => {
        let record = {};
        record.id = a[0];
        record.length = a[1];
        record.width = a[2];
        record.lat = a[3];
        record.long = a[4];
        objectArray.push(record);          
    })
    return objectArray; 
}


function merge (base, csvPosition ) {

    base.forEach(b => {
        let found = csvPosition.find(a => a[11] == b.id);
        if(found) {
            let x = found[6] + found[8] / 2.0;  
            let y = found[7] + found[9] / 2.0
            b.pxPosition = {x: x, y: y};  
        }
    });
}

export {csvArrayToObjArray, merge} ; 