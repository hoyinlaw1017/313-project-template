//Init. the search option checkboxes
function clearSearchOption(){
    $("#districtPicker").selectpicker('deselectAll');
    $("#schoolLevelPicker").selectpicker('deselectAll');
    $("#finTypePicker").selectpicker('deselectAll');
    $("#religionPicker").selectpicker('deselectAll');
}

//Handle the .json file
function initialize() {
    var status = "Greetings!";
    if (navigator.onLine) {
        status = "Hello! Please click the setting icon to start search.";
        retrieveschoolData();
    } else {
        const localStorage = window.localStorage;
        if (localStorage) {
            const schoolData = localStorage.getItem("schoolData");
            if (schoolData) {
                    displayschoolData(JSON.parse(schoolData));
                }
            }
        } 

    document.getElementById("status").innerHTML = status;

    document.body.addEventListener(
        "online",
        function () {
            document.getElementById("status").innerHTML = "Online";
        },
        false
        );
    document.body.addEventListener(
        "offline",
        function () {
            document.getElementById("status").innerHTML = "Offline";
        },
        false
        );
}

function retrieveschoolData() {
    const xhr = new XMLHttpRequest();
    const url = "schoolData.json";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var schoolData = JSON.parse(xhr.response).schoolData;
            displayschoolData(schoolData);

            // Store data data to localstorage
            const localStorage = window.localStorage;
            if (localStorage) {
                localStorage.setItem("schoolData", JSON.stringify(schoolData));
            }
        }
    };

    xhr.open("get", url);
    xhr.send();
}

function displayschoolData(schoolData) {
    schoolData.forEach(addRow);
}

function addRow(data) {
    var tcontent = document.getElementById("tcontent");
    var row = tcontent.insertRow();
    var nameCell = row.insertCell();
    var districtCell = row.insertCell();
    var ftCell = row.insertCell();
    var webpCell = row.insertCell();

    nameCell.setAttribute('data-label', "School Name");
    nameCell.innerHTML = data.E;
    
    districtCell.setAttribute('data-label', "School District");
    districtCell.innerHTML = data.U;
    
    ftCell.setAttribute('data-label', "School Finicial Type");
    ftCell.innerHTML = data.W;
    
    webpCell.setAttribute('data-label', "School Webpage");
    webpCell.innerHTML = data.AE;
}

function filter(data){
    //To get the pickers value to do filtering
    var dpval = $("#districtPicker").val();
    var slpval = $("#schoolLevelPicker").val();
    var ftpval = $("#finTypePicker").val();
    var rpval = $("#religionPicker").val();

    console.log(`Picker Value: ${dpval},${slpval},${ftpval},${rpval}`);
 
    //filter
    var filteredResult = Object.values(data).filter(
        schoolData =>
        schoolData.U == dpval &&
        schoolData.Y == slpval &&
        schoolData.W == ftpval &&
        schoolData.AG == rpval
    );

    console.log(`length: ${filteredResult.length}`);

    if (filteredResult.length !== 0){
        //hide original list
        document.getElementById("originalTable").classList.add("d-none");
        //Show result message
        document.getElementById("status").innerHTML = filteredResult.length + "RESULT FOUND!!!";

        $("#filteredTable tr").remove();

        for (var i = 0; i < filteredResult.length; i++){
            console.log(`${i}th result:
            ${filteredResult[i].E},
            ${filteredResult[i].U},
            ${filteredResult[i].W},
            ${filteredResult[i].AE}`);

            //Add new results to rows
            var filteredContent = document.getElementById("filteredContent");
            var row = filteredContent.insertRow();
            var nameCell = row.insertCell();
            var districtCell = row.insertCell();
            var ftCell = row.insertCell();
            var webpCell = row.insertCell();
    
            nameCell.setAttribute('data-label', "School Name");
            nameCell.innerHTML = filteredResult[i].E;
        
            districtCell.setAttribute('data-label', "School District");
            districtCell.innerHTML = filteredResult[i].U;
        
            ftCell.setAttribute('data-label', "School Finicial Type");
            ftCell.innerHTML = filteredResult[i].W;
        
            webpCell.setAttribute('data-label', "School Webpage");
            webpCell.innerHTML = filteredResult[i].AE;       
        }
    }else{
        //If No result found, show the original list and show message
        document.getElementById("originalTable").classList.remove("d-none");
        document.getElementById("filteredTable").classList.add("d-none");

        document.getElementById("status").innerHTML = "NO RESULT FOUND!!! Now showing the full list";
    } 
}

//To get the data and do the filtering
function getData(){
    const localStorage = window.localStorage;
    if (localStorage) {
        const schoolData = localStorage.getItem("schoolData");
        if (schoolData) {
            var parsedData = JSON.parse(schoolData);
            filter(parsedData);
        }
    }
}