const LegalTechContact = Object.freeze({
  number: "6285181760072",
  url(message = "Halo PIC Legal Tech Agency, saya ingin berkonsultasi.") {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  },
  configureLinks() {
    document.querySelectorAll("a[data-whatsapp]").forEach(link => {
      const subject = link.closest("article")?.querySelector("h3")?.textContent.trim();
      const message = link.dataset.message || (subject
        ? `Halo PIC Legal Tech Agency, saya ingin berdiskusi tentang ${subject}.`
        : "Halo PIC Legal Tech Agency, saya ingin berkonsultasi.");
      link.href = this.url(message);
    });
  }
});
LegalTechContact.configureLinks();
