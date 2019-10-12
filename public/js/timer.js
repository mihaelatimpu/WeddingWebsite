function getWeddingDate() {
	var weddingDate = new Date();
	weddingDate.set
}

function setTimer() {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var currentTime = new Date();
	var weddingDate = new Date('May 2, 2020');

	const remainingDays = Math.round(Math.abs((weddingDate - currentTime) / oneDay));

	var htmlElement = document.getElementById("timer_days");
	htmlElement.innerText = remainingDays;
	// body...
}