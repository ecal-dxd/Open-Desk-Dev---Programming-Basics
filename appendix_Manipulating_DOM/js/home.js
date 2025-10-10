window.onload = async () => {
	const homeText = document.getElementById("home-button");
	const imageHome = document.getElementById("image-home");
	let imageCounter = 0;
	function changeImage() {
		let imageToTake = imageCounter;
		if (imageCounter < 10) {
			imageToTake = "0" + imageCounter;
		} else if (imageCounter >= 30) {
			imageCounter = 0;
		}
		imageHome.setAttribute("src", "./assets/images/" + imageToTake + ".jpeg");
		imageCounter++;
	}

	homeText.addEventListener("click", changeImage);
};
