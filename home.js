

var array = [["A1","B1","C1","D1"],
["A2","B2","C2","D2"],
["A3","B3","C3","D3"],
["A4","B4","C4","D4"],
["A5","B5","C5","D5"],
["A1","B1","C1","D1"],
["A2","B2","C2","D2"],
["A3","B3","C3","D3"],
["A4","B4","C4","D4"],
["A5","B5","C5","D5"]],
table = document.getElementById("table");

for(var i = 0; i < array.length; i++)
{
var newRow = table.insertRow(table.length);
for(var j = 0; j < array[i].length; j++)
{
var cell = newRow.insertCell(j);
cell.innerHTML = array[i][j];
}
}

function myFunction() {
    var x = document.getElementById("table");
      if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
      }
    } 

