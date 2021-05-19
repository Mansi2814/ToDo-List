function add(){
    var tit = document.getElementById("title").value
    var desc = document.getElementById("description").value
    console.log(tit)
    console.log(desc)
    if(localStorage.getItem("items") == null){
        jsonarray = []
        jsonarray.push([tit, desc])
        localStorage.setItem('items',JSON.stringify(jsonarray))
    }
    else{
        jsonarray = JSON.parse(localStorage.getItem("items"))
        jsonarray.push([tit,desc])
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
        data += `<tr><th scope="row">${i+1}</th><td>${jsonarray[i][0]}</td><td>${jsonarray[i][1]}</td><td><button class="btn btn-primary btn-sm" onclick="del(${i})">Delete</button></td></tr>`
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

setTimeout(function() {update()},0)
