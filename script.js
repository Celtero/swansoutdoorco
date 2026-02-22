(function(){
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.querySelector(".navbtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu){
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      menu.hidden = expanded;
    });
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        btn.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });
  }

  const form = document.getElementById("leadForm");
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const town = String(fd.get("town") || "").trim();
      const details = String(fd.get("details") || "").trim();

      const msgLines = [
        "Quote request - Swan's Lawn & Landscaping",
        "",
        `Name: ${name}`,
        `Callback #: ${phone}`,
        town ? `Town: ${town}` : null,
        details ? `Details: ${details}` : null,
        "",
        "Sent from swansoutdoorco.com"
      ].filter(Boolean);

      const message = encodeURIComponent(msgLines.join("\n"));
      const number = "14026763522";
      const smsUrl = `sms:${number}?&body=${message}`;
      const smsUrlAlt = `sms:${number}?body=${message}`;
      const fallbackUrl = `tel:+${number}`;

      window.open(smsUrl, "_self");
      setTimeout(() => {
        try { window.location.href = smsUrlAlt; } catch(e){}
        setTimeout(() => { window.location.href = fallbackUrl; }, 350);
      }, 250);
    });
  }
})();