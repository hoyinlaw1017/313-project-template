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
        status = "Hello!";
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
    //To get the pickers value to do filtering
    var dpval = $("#districtPicker").val();
    var slpval = $("#schoolLevelPicker").val();
    var ftpval = $("#finTypePicker").val();
    var rpval = $("#religionPicker").val();

    if (dpval != null || slpval != null || ftpval != null || rpval != null){
        console.log(`${dpval},${slpval},${ftpval},${rpval}`); 
        filter(schoolData);
    } else {schoolData.forEach(addRow);
        }    
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

function filter(schoolData){
    //To get the pickers value to do filtering
    var dpval = $("#districtPicker").val();
    var slpval = $("#schoolLevelPicker").val();
    var ftpval = $("#finTypePicker").val();
    var rpval = $("#religionPicker").val();

    
    //filter
    var filteredResult = Object.values(schoolData).filter(
        data =>
        data.U === dpval &&
        data.Y === slpval &&
        data.W === ftpval &&
        data.AG === rpval
    );

    console.log(`result: ${filteredResult}`);

    if (filteredResult != null){
        var tcontent = document.getElementbyId("tcontent");
        tcontent.disabled = true;
    }

    filteredResult.forEach(addFilteredRow);
}

function addFilteredRow(filteredResult){
    var filteredcontent = document.getElementById("filteredcontent");
    var row = filteredcontent.insertRow();
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

function getData(){
    const localStorage = window.localStorage;
    if (localStorage) {
        const schoolData = localStorage.getItem("schoolData");
        if (schoolData) {
                filter(JSON.parse(schoolData));
            }
        }

}