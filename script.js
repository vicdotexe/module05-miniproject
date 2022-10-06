// get static elements
var elements = {
    dateTimeH2: $("#dateTime"),
    tBody: $("#tableBody"),
    nameInput: $("#nameInput"),
    typeInput: $("#typeInput"),
    rateInput: $("#rateInput"),
    dateInput: $("#datePicker"),
    submitButton: $("#submitButton")

}

// date input gets a date picker
$("#datePicker").datepicker();

// reset to default values on modal open
$("#exampleModal").on("shown.bs.modal", function(){
    elements.nameInput.val("");
    elements.typeInput.val("");
    elements.rateInput.val("");
    elements.dateInput.val(moment().format("MM/DD/YYYY"));
})

// set up an interval for time update
elements.dateTimeH2.text(moment().format("MMM Do, YYYY [at] h:mm:ss a"));
setInterval(function(){
    elements.dateTimeH2.text(moment().format("MMM Do, YYYY [at] h:mm:ss a"));
},1000);

elements.submitButton.on("click", onSubmit);

function onSubmit(){
    var data = {};
    data.name = elements.nameInput.val();
    data.type = elements.typeInput.val();
    data.rate = elements.typeInput.val();
    data.due = elements.dateInput.val();

    prev = JSON.parse(localStorage.getItem("projects"));

    if (!prev){
        prev = {};
        prev.nextId = 0;
        prev.projects = []
    }

    data.id = prev.nextId;
    prev.nextId++;
    prev.projects.push(data);

    var obj = JSON.stringify(prev);
    localStorage.setItem("projects", obj)

    elements.tBody.append(createTableRow(data));
}

function createTableRow(data){
    var tr = $("<tr>");

    var name = $("<td>");
    name.text(data.name);
    tr.append(name);

    var type = $("<td>");
    type.text(data.type);
    tr.append(type);

    var rate = $("<td>");
    rate.text(data.rate);
    tr.append(rate);

    var due = $("<td>");
    due.text(data.due);
    tr.append(due);

    var days = $("<td>");
    var nowMoment = moment();
    var dueMoment = moment(data.due, "MM/DD/YYYY");
    days.text(nowMoment.diff(dueMoment, "days"));
    tr.append(days);

    var pot = $("<td>");
    tr.append(pot);

    var del = $("<td>")
    del.addClass("delBtn");
    del.text("X");
    del.on("click", ()=>{
        tr.remove();
        removeFromStorage(data.id);
    });
    tr.append(del);

    return tr;
}

function removeFromStorage(id){
    var hist = JSON.parse(localStorage.getItem("projects"));
    console.log(hist);
    index = 0;
    for(var i = 0; i < hist.projects; i++){
        if (hist.projects[i].id == id){
            hist.projects.splice(data.id, 1);
        }
    }
    hist.projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(hist));
}


var prev = JSON.parse(localStorage.getItem("projects"));

if (prev){
    prev.projects.forEach((x) => {
        elements.tBody.append(createTableRow(x));
    })
}

