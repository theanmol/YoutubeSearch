var bg = chrome.extension.getBackgroundPage();
function onClicked(event) {
	bg.SearchOpt = event.target.value;
}

document.addEventListener('DOMContentLoaded', function () {

	if (bg.SearchOpt === "1") {
		document.getElementById("1").checked = true;
		console.log("setting one")

	} else {
		console.log("setting two")
		document.getElementById("2").checked = true;
	}

	document.getElementById("1").addEventListener("click", onClicked);
	document.getElementById("2").addEventListener("click", onClicked);
});

