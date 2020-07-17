
/**
 * Specific function to merge the csv data and the markers data of the virtualization forest project 
 * 
 */
function mergeMarkersAndExcel(markers, excel){
    let trees = []; 
    markers.forEach(
        i => {
            let found = excel.find(a => (a.id !== "" && a.id === i.value ) );
            console.log(found); 
            let temp = {};
            if(found) {
                temp.id = found.id;
                temp.length = found.length;
                temp.width = found.width; 
                temp.lat = found.lat; 
                temp.long = found.long; 

                temp.pxPosition = {x: i.x + (i.dx/2), y: i.y + (i.dy/2)}; 
                trees.push(temp); 
            }
            
    });
    return trees; 
}

export default mergeMarkersAndExcel; 
