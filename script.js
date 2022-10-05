var elements = {
    dateTimeH2: $("#dateTime")
}

elements.dateTimeH2.text(moment().format("MMM Do, YYYY [at] hh:mm:ss a"));
setInterval(function(){
    elements.dateTimeH2.text(moment().format("MMM Do, YYYY [at] hh:mm:ss a"));
},1000);