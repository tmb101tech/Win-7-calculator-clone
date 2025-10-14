var screen = document.getElementById("display");
var btns = document.querySelectorAll(".btn-number");
var operators = ["+", "-", "*", "/"];
var restart = false;


screen.onkeypress = display;

for (var i = 0; i <btns.length; i++) {
	
	if (btns[i].value == "=") {
		btns[i].onclick = calculate;
	}
	else if(btns[i].value == "C")
		btns[i].onclick = clearAll;
	else if(btns[i].value == "CE")
		btns[i].onclick = CEClear;
	else {
		btns[i].onclick = display;
	}
}

function display(e) {
	//Prevent non numeric characters
	if (e.charCode < 48 || e.charCode > 57)
		e.preventDefault();
	
	
	if (restart) {
		screen.value = "0";
		restart = false;
	}
	
	if (screen.value =="0") {
		screen.value ="";
	}
	
	if (!isNaN(e.target.value) || e.target.value == "/" || e.target.value == "+" || e.target.value == "-" || e.target.value == "(" || e.target.value == ")" || e.target.value == "*" || e.target.value == "#" || e.target.value == "." || e.target.value =="%") {
		
		var operator = operators[getLastOperatorIndex()];
		
		if (isNaN(e.target.value) && screen.value.length - 1 == screen.value.lastIndexOf(operator)) {
			var value = screen.value.substring(0, screen.value.lastIndexOf(operator)) + e.target.value; 
			screen.value = value;
		}
		else {
			if (e.charCode >= 48 && e.charCode <= 57) {
				//Do nothing
			}
			else {
				screen.value += e.target.value;
			}
			
		}

	}
		
}

function calculate(e) {
	restart = true;
	var answer = eval(screen.value);
	screen.value += "=" + answer;
}

function clearAll(e) {
	screen.value = "0";
}

function CEClear(e) {
	var operator = operators[getLastOperatorIndex()];
	
	if (screen.value.lastIndexOf(operator) == -1) {
		screen.value = "0";
	}
	else {
		var value = screen.value.substring(0, screen.value.lastIndexOf(operator) + 1);
		screen.value = value;
	}
	
}

function getLastOperatorIndex() {
	var operator = "+";
	
	var biggestIndex = screen.value.lastIndexOf(operators[0]);
	var optIndex = 0;
	
	for (var i = 1; i < operators.length; i++) {
		var index = screen.value.lastIndexOf(operators[i]);
		
		if (index > biggestIndex) {
			biggestIndex = index;
			operator = operators[i];
			optIndex = i;
		}
	}
	
	return optIndex;
}
