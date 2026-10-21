(() => {
  const form = document.getElementById("completion-form");
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const fields = document.getElementById("completion-fields");
  const status = document.getElementById("completion-status");
  const name = form.elements.namedItem("name");
  const email = form.elements.namedItem("email");
  let endpoint;
  let submitting = false;
  let completed = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!endpoint || submitting || completed) return;

    name.value = name.value.trim();
    email.value = email.value.trim();
    if (!form.reportValidity()) return;

    const payload = {
      courseId: form.dataset.courseId,
      courseVersion: form.dataset.courseVersion,
      name: name.value,
      email: email.value,
      confirmed: form.elements.namedItem("confirmed").checked,
      confirmationText: document.getElementById("completion-statement").textContent,
      submittedAt: new Date().toISOString()
    };

    submitting = true;
    fields.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sender bekreftelsen …";
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        redirect: "error",
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      if (!response.ok) throw new Error("Submission failed");
      completed = true;
      form.reset();
      status.textContent = "Takk! Registreringstjenesten har mottatt bekreftelsen din.";
    } catch {
      fields.disabled = false;
      status.textContent = "Kunne ikke bekrefte registreringen. Opplysningene er beholdt i skjemaet. Prøv igjen, eller kontakt kursansvarlig hvis problemet fortsetter.";
    } finally {
      window.clearTimeout(timeout);
      submitting = false;
      form.removeAttribute("aria-busy");
    }
  });

  if (!form.dataset.endpoint.trim()) return;
  try {
    endpoint = new URL(form.dataset.endpoint, window.location.href);
    if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) {
      throw new Error("Invalid endpoint");
    }
  } catch {
    endpoint = undefined;
    status.textContent = "Registrering er ikke tilgjengelig. Kontakt kursansvarlig.";
    return;
  }

  button.disabled = false;
  status.textContent = "Fyll ut opplysningene og bekreft gjennomført opplæring før du sender inn.";
})();
