/*
 * LFCS Course — lab guide theme toggle, copy-to-clipboard, and script download
 * Copyright (C) 2026 Shea's Tech. Licensed under the GNU AGPL v3.0 or later.
 */
(function () {
  "use strict";
  var root = document.documentElement, K = "lfcs.theme.v1";
  function cur() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return fallbackCopy(text);
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-theme-toggle]")) {
      var next = cur() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(K, next); } catch (err) {}
      return;
    }

    var copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      var src = document.getElementById(copyBtn.getAttribute("data-copy"));
      if (!src) return;
      var label = copyBtn.querySelector("[data-copy-label]");
      copyText(src.innerText).then(function () {
        copyBtn.classList.add("is-copied");
        if (label) { var was = label.textContent; label.textContent = "Copied"; setTimeout(function () { label.textContent = was; copyBtn.classList.remove("is-copied"); }, 1600); }
      }).catch(function () {
        if (label) { var was = label.textContent; label.textContent = "Copy failed"; setTimeout(function () { label.textContent = was; }, 1600); }
      });
      return;
    }

    var dlBtn = e.target.closest("[data-download]");
    if (dlBtn) {
      var srcEl = document.getElementById(dlBtn.getAttribute("data-download"));
      if (!srcEl) return;
      var blob = new Blob([srcEl.innerText], { type: "text/x-sh" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = dlBtn.getAttribute("data-filename") || "script.sh";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
  });
})();
