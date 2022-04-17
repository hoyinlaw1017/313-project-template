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
        
        
        if (dpval != null || slpval != null || ftpval != null || rpval != null){

            nameCell.setAttribute('data-label', "School Name");
            nameCell.innerHTML = filteredResult.E;
        
            districtCell.setAttribute('data-label', "School District");
            districtCell.innerHTML = filteredResult.U;
        
            ftCell.setAttribute('data-label', "School Finicial Type");
            ftCell.innerHTML = filteredResult.W;
        
            webpCell.setAttribute('data-label', "School Webpage");
            webpCell.innerHTML = filteredResult.AE;
    
        }else{
    
            nameCell.setAttribute('data-label', "School Name");
            nameCell.innerHTML = data.E;
        
            districtCell.setAttribute('data-label', "School District");
            districtCell.innerHTML = data.U;
        
            ftCell.setAttribute('data-label', "School Finicial Type");
            ftCell.innerHTML = data.W;
        
            webpCell.setAttribute('data-label', "School Webpage");
            webpCell.innerHTML = data.AE;
        
        }
    

        function addFilteredRow(filteredResult){
            var tcontent = document.getElementById("tcontent");
            var row = tcontent.insertRow();
            var nameCell = row.insertCell();
            var districtCell = row.insertCell();
            var ftCell = row.insertCell();
            var webpCell = row.insertCell();
        
            nameCell.setAttribute('data-label', "School Name");
            nameCell.innerHTML = filteredResult.E;
        
            districtCell.setAttribute('data-label', "School District");
            districtCell.innerHTML = filteredResult.U;
        
            ftCell.setAttribute('data-label', "School Finicial Type");
            ftCell.innerHTML = filteredResult.W;
        
            webpCell.setAttribute('data-label', "School Webpage");
            webpCell.innerHTML = filteredResult.AE;
        }
        