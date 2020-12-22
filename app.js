// selects html elements
const CLEAR = document.querySelector(".refresh");
const BULLET = document.querySelector(".bullet");
const ADD_BUTTON = document.querySelector(".add");
const INPUT = document.querySelector("input");
const TODO_LIST = document.querySelector(".content > ul");

let list = [];
let id = 0;

localStorage.setItem("tododata", JSON.stringify(list));
// function to add items to todo list
function addToDo (item, done) {
	if (item == "") {return ;}
		let itemElement = `
		<li id = ${id}>
			<i class="far fa-circle bullet"></i>
			${item}
			<i class="far fa-trash-alt delete"></i>
		</li>`
		// adds itemElement as the lastchild of TODO_LIST
		TODO_LIST.insertAdjacentHTML("beforeend", itemElement);
	// appends the item to the list
	list.push({
		name: item,
		id: id,
		done: false}
	)
	console.log(list)
	id++
	console.log(id);
	INPUT.value = "";
	localStorage.setItem("tododata", JSON.stringify(list));
}

function deleteTodo (id) {
	var removeIndex = list.map((item) => item.id).indexOf(id);
	list.splice(removeIndex, 1);
	console.log(list);
	updateTodo ();
	localStorage.setItem("tododata", JSON.stringify(list));
}

function updateTodo () {
	TODO_LIST.innerHTML = "";
	for (var i = 0; i < list.length; i++) {
		var item = list[i].name;
		var id = list[i].id;
		var done = list[i].done;
		let itemElement = `
		<li id = ${id}>
			<i class="far fa-circle bullet"></i>
			${item}
			<i class="far fa-trash-alt delete"></i>
		</li>`
		// adds itemElement as the lastchild of TODO_LIST
		TODO_LIST.insertAdjacentHTML("beforeend", itemElement);
	}
}

ADD_BUTTON.addEventListener("click", () => addToDo(INPUT.value));
// deletes task when delete buttton is being clicked
TODO_LIST.addEventListener("click", (event) => {
	var target = event.target;
	console.log(target)
	if (target.classList.contains("delete")) {
		console.log("delete");
		// gets the value of id attributes of li element and converts it to number
		var targetId = parseInt(target.parentElement.getAttribute("id"));
		console.log(targetId);
		deleteTodo(targetId);
	} else if (target.classList.contains("bullet")) {
		console.log("bullet");
		if (target.classList.contains("fa-circle")) {
			target.setAttribute("class", "fas fa-check-circle bullet");
			target.parentElement.classList.add("done")
		} else {
			target.setAttribute("class", "far fa-circle bullet");
			target.parentElement.classList.remove("done")
		}
	}
		
	}
);