const appState = {
	filter: 'ALL',
	listItems:[]
}

document.body.addEventListener('click', handleClick)
document.body.addEventListener('change', handleChange)
document.body.addEventListener('submit', handleSubmit)

function render(){
	return `
		<form name="OurForm">
			<input type="text" name="Thomas" placeholder="What you gon' do?">
		</form>
		${appState.listItems.filter(filterItem).map(renderItem).join('')}
		<div class="filters">
			<button data-filter-button="INCOMPLETE">Incomplete</button>
			<button data-filter-button="COMPLETE">Completed</button>
			<button data-filter-button="ALL">All</button>
		</div>
	`
}

function filterItem(listItem){
	if(appState.filter === "ALL"){
		return true
	}else if(appState.filter == "COMPLETE")	{
		return listItem.isComplete 
	}else{
		return !listItem.isComplete
	}
}

function renderItem(listItem, index){
	return `
		<div class="toDoItem">
			<label class="${listItem.isComplete ? 'complete' : 'incomplete'}">
				<input data-checkbox-button=${index} type="checkbox" ${listItem.isComplete ? 'checked' : ''}>
				<span class="toDoText">${listItem.title}</span>
				<button data-remove-button=${index}>X</button>
			</label>
		</div>
		`
}

function mountToDOM(){
	document.body.querySelector('#app').innerHTML = render()
	document.querySelector("[name=Thomas]").focus()
}

function handleClick(event){
	const { removeButton, filterButton } = event.target.dataset
 	if(filterButton){
		appState.filter = filterButton
		mountToDOM()
	}else if(removeButton){
		appState.listItems.splice(removeButton, 1)
		mountToDOM()
	}
}

function handleChange(event){
	const { checkboxButton } = event.target.dataset
	if(checkboxButton){
		appState.listItems[checkboxButton].isComplete = event.target.checked
		mountToDOM()
	}
}

function handleSubmit(event){
	const titleOfItem = document.querySelector("[name=Thomas]").value.trim()
	if(titleOfItem){
		appState.listItems.push({
			title: titleOfItem,
			isComplete : false
		})
		mountToDOM()
	}
}

mountToDOM()