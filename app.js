//Init. the search option checkboxes
function clearSearchOption(){
    $("#districtPicker").selectpicker('deselectAll');
    $("#schoolLevelPicker").selectpicker('deselectAll');
    $("#finTypePicker").selectpicker('deselectAll');
    $("#religionPicker").selectpicker('deselectAll');
}

//To get the pickers value to do filtering
function getPickervalue(){
    var dpval = $("#districtPicker").val();
    var slpval = $("#schoolLevelPicker").val();
    var ftpval = $("#finTypePicker").val();
    var rpval = $("#religionPicker").val();
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
    schoolData.forEach(addRow);
}

function addRow(data) {
    var tcontent = document.getElementById("tcontent");
    var row = tcontent.insertRow();

    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "School Name");
    nameCell.innerHTML = data.E;

    var districtCell = row.insertCell();
    districtCell.setAttribute('data-label', "School District");
    districtCell.innerHTML = data.G;

    var ftCell = row.insertCell();
    ftCell.setAttribute('data-label', "School Finicial Type");
    ftCell.innerHTML = data.W;

    var webpCell = row.insertCell();
    webpCell.setAttribute('data-label', "School Webpage");
    webpCell.innerHTML = data.AE;
}
