//* Wait for the full HTML document to be parsed before running any JS.
//? This ensures all DOM elements (e.g. the form) are available to query.
document.addEventListener("DOMContentLoaded", () => {
  //* Grab the form element by its ID so we can attach a submit listener to it.
  const form = document.getElementById("contactForm");

  //* Listen for the form's submit event (triggered by the submit button or pressing Enter).
  form.addEventListener("submit", (event) => {
    //? Prevent the default browser behaviour of refreshing/navigating the page on submit.
    event.preventDefault();

    //* Read each field's current value and strip leading/trailing whitespace.
    //? Using form.fieldName.value is shorthand for accessing the named input inside the form.
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    //* Basic validation — all three fields must be non-empty strings.
    //? If any field is empty, show an error and exit early without submitting.
    if (!name || !email || !message) {
      showErrorMessage("⚠️ Please fill out all fields before submitting.");
      return;
    }

    if (!isValidEmail(email)) {
      showErrorMessage("⚠️Invalid email format. Please enter a valid email");
      return;
    }

    try {
      //* Format the submission as a plain-text string using a template literal.
      //? \n inserts a newline character so each field appears on its own line in the file.
      const submissionText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

      //* Persist the submission to localStorage so it survives page refreshes.
      //? JSON.stringify wraps the string in quotes, making it valid JSON for storage.
      localStorage.setItem("submissionText", JSON.stringify(submissionText));

      //* Trigger the file download using the formatted text.
      triggerTextDownload(submissionText, "submission.txt");

      //* Notify the user that their submission was successful.
      showSuccessMessage();

      //* Clear all form fields ready for a new submission.
      form.reset();
    } catch (err) {
      //! If anything in the try block throws (e.g. localStorage is full/blocked),
      //? log the technical details to the console and show a friendly error to the user.
      console.error(err);
      showErrorMessage(
        "There was a problem submitting your message. Please try again.",
      );
    }
  });

  //* Creates a temporary downloadable .txt file from the provided text string.
  //? A Blob is a file-like object of raw data; here we use it to hold plain text.
  //? URL.createObjectURL() generates a temporary in-memory URL pointing to that Blob.
  function triggerTextDownload(text, filename = "submission.txt") {
    //* Create a Blob containing the text, typed as plain text so the OS handles it correctly.
    const blob = new Blob([text], { type: "text/plain" });

    //* Generate a temporary object URL that points to the Blob in memory.
    const url = URL.createObjectURL(blob);

    //* Dynamically create an anchor element to act as a download trigger.
    const link = document.createElement("a");
    link.href = url; // Point the link at the in-memory Blob URL.
    link.download = filename; // Tell the browser to download rather than navigate, using this filename.

    //* The link must be in the DOM before it can be programmatically clicked.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link immediately after triggering the download.

    //* Revoke the object URL after a short delay to free up the memory it holds.
    //? 5000ms gives the browser time to initiate the download before the URL is released.
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  //* Builds and displays a dismissible Bootstrap success alert fixed to the top of the page.
  //? The alert auto-removes itself after 4 seconds.
  function showSuccessMessage() {
    const alert = document.createElement("div");

    //? Bootstrap classes: alert-success = green styling, alert-dismissible = close button support,
    //? fade show = CSS transition, fixed-alert = our custom positioning class from the stylesheet.
    alert.className =
      "alert alert-success alert-dismissible fade show fixed-alert d-flex align-items-center";
    alert.innerHTML = `
			<i class="bi bi-check-circle-fill me-2 fs-5"></i>
			<span>Your message has been successfully submitted and saved locally.</span>
			<button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
		`;
    document.body.appendChild(alert);

    //* After 4 seconds, remove the "show" class to trigger Bootstrap's fade-out transition,
    //? then remove the element from the DOM entirely once it has faded.
    setTimeout(() => {
      alert.classList.remove("show");
      alert.remove();
    }, 4000);
  }

  //* Builds and inserts a dismissible Bootstrap error alert into the .container element.
  //? Accepts a custom message string so it can be reused for different error scenarios.
  function showErrorMessage(customMessage) {
    //* Target the .container div so the alert appears inline near the form.
    const container = document.querySelector(".container");
    const alert = document.createElement("div");

    //? alert-danger = red Bootstrap styling, d-flex + align-items-center = icon and text alignment,
    //? mt-3 = top margin to separate it from form content.
    alert.className =
      "alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3";
    alert.innerHTML = `
			<i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
			<span>${customMessage}</span>
			<button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
		`;

    //* Insert the alert before the last child of .container (the form card),
    //? so it appears above the form rather than after it.
    container.insertBefore(alert, container.lastElementChild);
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
