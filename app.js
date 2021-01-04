// selects html elements
const CLEAR = document.querySelector(".refresh");
const BULLET = document.querySelector(".bullet");
const ADD_BUTTON = document.querySelector(".add");
const INPUT = document.querySelector("input");
const TODO_LIST = document.querySelector(".content > ul");
const DATE = document.querySelector("time.date");

// gets and sets date
let todayDate = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
DATE.innerHTML = todayDate.toLocaleDateString("en-GB", options);

let list;
let id;
if (localStorage.getItem("tododata") == null) {
	list = [];
	id = 0;
} else {
	list = JSON.parse(localStorage.getItem("tododata"));
	/* duplicate id issue when id = list.length was used
	cause when the page is being refreshed the id is obtained from
	the todoData and some items might have been deleted */
	// array containing the ids
	let maxList = list.map((item) => item.id);
	id = Math.max(...maxList) + 1;
	updateTodo();
}

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
	// save the changes made to the list to localStorage
	localStorage.setItem("tododata", JSON.stringify(list));
}

function deleteTodo (id) {
	var removeIndex = list.map((item) => item.id).indexOf(id);
	list.splice(removeIndex, 1);
	// console.log(list);
	updateTodo ();
	// save the changes made to the list to localStorage
	localStorage.setItem("tododata", JSON.stringify(list));
}

function updateTodo () {
	TODO_LIST.innerHTML = "";
	for (var i = 0; i < list.length; i++) {
		var item = list[i].name;
		var id = list[i].id;
		var done = list[i].done;
		let itemElement;
		if (done) {
			itemElement = `
			<li id = ${id} class = "done">
				<i class="fas fa-check-circle bullet"></i>
				${item}
				<i class="far fa-trash-alt delete"></i>
			</li>`
		}else {
			itemElement = `
			<li id = ${id}>
				<i class="far fa-circle bullet"></i>
				${item}
				<i class="far fa-trash-alt delete"></i>
			</li>`
		}
		// adds itemElement as the lastchild of TODO_LIST
		TODO_LIST.insertAdjacentHTML("beforeend", itemElement);
	}
}

ADD_BUTTON.addEventListener("click", () => addToDo(INPUT.value));
// deletes task when delete buttton is being clicked
TODO_LIST.addEventListener("click", (event) => {
	var target = event.target;
	// console.log(target);
	// gets the value of id attributes of li element and converts it to number
	var targetId = parseInt(target.parentElement.getAttribute("id"));
	if (target.classList.contains("delete")) {
		console.log(targetId);
		deleteTodo(targetId);
	} else if (target.classList.contains("bullet")) {
		// gets the correct index of the targetId in the list 
		// (cause some items might have deleted)
		var changeId = list.map((item) => item.id).indexOf(targetId);
		if (target.classList.contains("fa-circle")) {
			target.setAttribute("class", "fas fa-check-circle bullet");
			target.parentElement.classList.add("done");
			// change the done value of the li objects in the list to true
			list[changeId].done = true;
		} else {
			// change the done value of the li objects in the list to false
			list[changeId].done = false;
			target.setAttribute("class", "far fa-circle bullet");
			target.parentElement.classList.remove("done")
		}
		// save the changes made to the list to localStorage
		localStorage.setItem("tododata", JSON.stringify(list));
	}
	}
);

CLEAR.addEventListener("click", () => {
	localStorage.clear();
	location.reload();
}

);