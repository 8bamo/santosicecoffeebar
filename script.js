const form = document.querySelector("#event-form");
const feedback = document.querySelector("#form-feedback");

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      feedback.textContent = "Bitte fülle die markierten Felder vollständig aus.";
      feedback.className = "form-feedback is-error";
      return;
    }

    const data = new FormData(form);
    const recipient = form.dataset.recipient || "";
    const subject = `Eventanfrage ${data.get("occasion") || "Santos"}`;
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `E-Mail: ${data.get("email") || ""}`,
      `Telefon: ${data.get("phone") || ""}`,
      `Firma/Anlass: ${data.get("occasion") || ""}`,
      `Datum: ${data.get("date") || ""}`,
      `Personenzahl: ${data.get("guests") || ""}`,
      "",
      "Details:",
      `${data.get("message") || ""}`
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

    feedback.textContent = "E-Mail wird vorbereitet. Falls kein Mailprogramm aufgeht, bitte E-Mail-Adresse im Code anpassen.";
    feedback.className = "form-feedback is-success";
    window.location.href = mailto;
  });
}
