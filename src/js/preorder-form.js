const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initPreorderForm() {
  const form = document.querySelector("#preorder-form");
  const email = document.querySelector("#email");
  const error = document.querySelector("#email-error");
  const successState = document.querySelector("#success-state");
  const resetButton = document.querySelector("[data-reset-form]");

  if (!form || !email || !error || !successState) return;

  const showError = (message) => {
    error.textContent = message;
    email.setAttribute("aria-invalid", "true");
  };

  const clearError = () => {
    error.textContent = "";
    email.removeAttribute("aria-invalid");
  };

  email.addEventListener("input", clearError);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailValue = email.value.trim();

    if (!emailValue) {
      showError("Enter an email address to continue.");
      email.focus();
      return;
    }

    if (!EMAIL_PATTERN.test(emailValue)) {
      showError("Enter a valid email address, such as rider@example.com.");
      email.focus();
      return;
    }

    email.value = "";
    clearError();
    form.hidden = true;
    successState.hidden = false;
    successState.focus();
  });

  resetButton?.addEventListener("click", () => {
    successState.hidden = true;
    form.hidden = false;
    form.reset();
    clearError();
    email.focus();
  });
}
