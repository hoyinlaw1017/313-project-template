if (dpval != null || slpval != null || ftpval != null || rpval != null){
        //To get the pickers value to do filtering
        var dpval = $("#districtPicker").val();
        var slpval = $("#schoolLevelPicker").val();
        var ftpval = $("#finTypePicker").val();
        var rpval = $("#religionPicker").val();
                        
        console.log(`${dpval},${slpval},${ftpval},${rpval}`);
        
    
        //filter
        var filteredResult = Object.values(data).filter(
            data =>
            data.E === dpval &&
            data.U === slpval &&
            data.W === ftpval &&
            data.AE === rpval
        );
    
        console.log(`result: ${filteredResult}`);
    