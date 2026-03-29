const form = document.querySelector("#event-form");
const feedback = document.querySelector("#form-feedback");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxBackdrop = document.querySelector("#lightbox-backdrop");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

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

const closeLightbox = () => {
  if (!lightbox || lightbox.hidden) {
    return;
  }

  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
};

if (lightbox && lightboxImage && lightboxCaption && lightboxClose && lightboxBackdrop) {
  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const imageUrl = trigger.getAttribute("href");
      const caption = trigger.dataset.lightboxCaption || "";
      const image = trigger.querySelector("img");
      const alt = image ? image.alt : caption;

      if (!imageUrl) {
        return;
      }

      lightboxImage.src = imageUrl;
      lightboxImage.alt = alt || "Vergrößerte Ansicht";
      lightboxCaption.textContent = caption;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightboxClose.focus();
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}
