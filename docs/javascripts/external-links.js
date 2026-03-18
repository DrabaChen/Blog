(() => {
  const isExternal = (url) => {
    try {
      const u = new URL(url, window.location.href);
      return u.origin !== window.location.origin;
    } catch {
      return false;
    }
  };

  const upgrade = (a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#")) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (!isExternal(href)) return;

    a.setAttribute("target", "_blank");
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href]').forEach(upgrade);
  });
})();

