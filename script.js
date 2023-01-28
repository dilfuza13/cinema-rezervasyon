const container = document.querySelector('.container');
const count = document.querySelector('#count');
const amount = document.querySelector('#amount');
const select = document.getElementById('movie');
const reserveButton = document.getElementById('reserve-button');
const seats = document.querySelectorAll('.seat:not(.reserved)');
let selectedSeats;

getFromLocalStorage();
calculateTotal();


container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        // varsa siler yoksa ekler.
        e.target.classList.toggle('selected');
        calculateTotal();


    }

});

select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];
    selectedSeats.forEach(seat => selectedSeatsArr.push(seat));
    seats.forEach(seat => seatsArr.push(seat));
    // [1, 3, 5]
    let selectedSeatIndexs = selectedSeatsArr.map(seat => seatsArr.indexOf(seat));
    console.log(selectedSeatIndexs);


    let selectedSeatCount = container.querySelectorAll('.seat:not(.reserved).selected').length;
    count.innerText = selectedSeatCount;
    amount.innerHTML = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);

}





reserveButton.addEventListener('click', reserveSeats);


function reserveSeats() {
    selectedSeats = container.querySelectorAll('.seat.selected');
    selectedSeats.forEach(seat => seat.classList.add('reserved'));
    count.innerHTML = "";
    amount.innerHTML = "";
}

