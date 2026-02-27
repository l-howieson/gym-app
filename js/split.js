function ToggleDay() {
    const dayList = [];
    const dayButtons = document.querySelectorAll('.day-button');

    for (let i = 0; i < dayButtons.length; i++) {
        if (dayButtons[i].classList.contains('selected')) {
            dayList.push(dayButtons[i].id);
        }
    }
    return dayList;
}



