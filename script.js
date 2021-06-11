function add(){
    var tit = document.getElementById("title").value
    var desc = document.getElementById("description").value
    var countdowndate = document.getElementById("datepicker").value
    var countdowntime = document.getElementById("timepicker").value
    var date = remainingtime(countdowntime, countdowndate)
    console.log(date)
    if(localStorage.getItem("items") == null){
        jsonarray = []
        jsonarray.push([tit, desc, date, countdowntime, countdowndate])
        localStorage.setItem('items',JSON.stringify(jsonarray))
    }
    else{
        jsonarray = JSON.parse(localStorage.getItem("items"))
        jsonarray.push([tit,desc, date, countdowntime, countdowndate])
        localStorage.setItem('items',JSON.stringify(jsonarray))
    }
    update()
}

function update(){
    if (localStorage.getItem("items") == null){
        jsonarray = []
    }
    else{
    jsonarray = JSON.parse(localStorage.getItem("items"))
    }
    var data = ''
    for (var i = 0; i < jsonarray.length; i++) {
        data += `<tr><th scope="row">${i+1}</th><td>${jsonarray[i][0]}</td><td>${jsonarray[i][1]}</td><td>${countdown(jsonarray[i][2])}</td><td><button class="btn btn-primary btn-sm" onclick="del(${i})">Delete</button></td></tr>`
    }
    document.getElementById("content").innerHTML = data
}

function del(val){
    jsonarray = JSON.parse(localStorage.getItem("items"))
    //remove the val index from arr
    jsonarray.splice(val,1)
    localStorage.setItem('items',JSON.stringify(jsonarray))
    update()
}

function clearstorage(){
    console.log("clearing")
    localStorage.clear()
    update()
}

function remainingtime(countdowntime,countdowndate){

    var date1 = new Date(countdowndate);
    date1 = date1.getTime();
    var date2 = new Date();
    date2 = date2.getTime();
    var h = Number(countdowntime.slice(0,2))
        if (h == 12){
            h = 00;
        }
    if (countdowntime.slice(6,7) == 'P'){ 
    var date = ((h+12)*60*60*1000 + Number(countdowntime.slice(3,5))*60*1000 + date1) - date2;
    }
    else{
        var date = ((h)*60*60*1000 + Number(countdowntime.slice(3,5))*60*1000 + date1) - date2;
    }
    return date
}
function updatedtime(){
    if(localStorage.getItem("items") != null){
        jsonarray = JSON.parse(localStorage.getItem("items"))
        for (var j = 0; j < jsonarray.length; j++){ 
        jsonarray[j][2] = remainingtime(jsonarray[j][3], jsonarray[j][4]);
        }
        localStorage.setItem('items',JSON.stringify(jsonarray))
        update();
    }
}  

function countdown(time){
    var seconds = 1000
    var minutes = seconds*60
    var hours = minutes*60
    var days = hours*24
    var clock = `${addzero(time/days)}d ${addzero((time%days)/hours)}:${addzero(((time%days)%hours)/minutes)}:${addzero((((time%days)%hours)%minutes)/seconds)}`
    return clock
}
function addzero(i){
    i = Math.floor(i)
    if (i<0){
        return "00"
    }

    else if (i<10 && i>=0){
        return "0"+i
    }
    else{
        return i
    }
}

setInterval(function() {updatedtime()}, 1000)
setInterval(function(){update()}, 1000)
