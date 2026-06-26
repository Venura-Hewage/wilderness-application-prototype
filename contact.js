//make sure that that the html is loaded before you can use the submit button.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  //listens to the submit button is clicked event.
  form.addEventListener("submit", (event) => {
    //? Prevent the default browser behaviour of refreshing/navigating the page on submit.
    event.preventDefault();

    //removes the whitespaces and stores the values of the fields into variables
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    //check if all fields are not empty before it can be submitted and gives a warning if it is.
    if (!name || !email || !message) {
      showErrorMessage("⚠️ Please fill out all fields before submitting.");
      return;
    }

    //checks if the email is of a valid format
    if (!isValidEmail(email)) {
      showErrorMessage("⚠️Invalid email format. Please enter a valid email");
      return;
    }

    try {
      //format the values form the form into string and gives each one a new line.
      const submissionText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

      //turns the data into string and stores into the local storage
      localStorage.setItem("submissionText", JSON.stringify(submissionText));

      //files downloads with the txt file created from the text that was forrmatted.
      triggerTextDownload(submissionText, "submission.txt");

      //gives a notification message it was downloaded
      showSuccessMessage();

      //clears the form fields
      form.reset();
    } catch (err) {
      //log a error if something goes wrong is storing into localstorage
      console.error(err);
      showErrorMessage(
        "There was a problem submitting your message. Please try again.",
      );
    }
  });

  //creates the txt file from the values in the fomrm.
  function triggerTextDownload(text, filename = "submission.txt") {
    //generates blob of the text and makes type of plain tex.
    const blob = new Blob([text], { type: "text/plain" });

    //makes a object url of the blob.
    const url = URL.createObjectURL(blob);

    //creates a link to the  blob url.
    const link = document.createElement("a");
    link.href = url;
    //makes it so that the file is downloaded rather than be navigated to another page.
    link.download = filename;

    //adds a link to th DOM  and makes it so that the link triggers  the download  as if it was clicked
    document.body.appendChild(link);
    link.click();

    //removes the link from the DOM onced  the download is complete
    document.body.removeChild(link);

    //removes the url from memory after a short delay.
    //? 5000ms gives the browser time to initiate the download before the URL is released.
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  //Gives success alert/message after the form is succesfully submitted , stored in local storage and downloaded.

  function showSuccessMessage() {
    const alert = document.createElement("div");

    alert.className =
      "alert alert-success alert-dismissible fade show fixed-alert d-flex align-items-center";
    alert.innerHTML = `
			<i class="bi bi-check-circle-fill me-2 fs-5"></i>
			<span>Your message has been successfully submitted and saved locally.</span>
			<button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
		`;
    document.body.appendChild(alert);

    //dismisses the sucessful alert/message.
    setTimeout(() => {
      alert.classList.remove("show");
      alert.remove();
    }, 4000);
  }

  //creates a custom error message.
  function showErrorMessage(customMessage) {
    //gets the form container.
    const container = document.querySelector(".container");
    const alert = document.createElement("div");

    alert.className =
      "alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3";
    alert.innerHTML = `
			<i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
			<span>${customMessage}</span>
			<button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
		`;

    //makes sure the error alert pops ups on top of the form.
    container.insertBefore(alert, container.lastElementChild);
  }

  //valiates that email is in a valid format.
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
