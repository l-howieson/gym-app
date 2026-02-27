function dayToList() {
    const selectedDays = [];
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(box => {
        if (box.checked) {
            selectedDays.push(box.value);
        }
    });

    return selectedDays;
}

function outputSelectedDays() {
    const selectedDays = dayToList();
    const list = document.getElementById("selectedDaysOutput");

    list.innerHTML = ""; // clear previous results

    selectedDays.forEach(day => {
        const listItem = document.createElement("li");
        listItem.textContent = day;
        list.appendChild(listItem);
    });
}