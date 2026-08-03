/*
 * LFCS Course — lfcs.learnlinuxforwork.com
 * Copyright (C) 2026 Shea's Tech
 * Licensed under the GNU AGPL v3.0 or later.
 */
(function () {
  "use strict";

  var K_PROG = "lfcs.progress.v1", K_THEME = "lfcs.theme.v1", K_OPEN = "lfcs.open.v1";
  var root = document.documentElement;

  /* ---------------------------------------------------------- theme ----- */
  function applyTheme(t) {
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t);
    else root.removeAttribute("data-theme");
  }
  function currentTheme() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  try { applyTheme(localStorage.getItem(K_THEME)); } catch (e) {}
  document.addEventListener("click", function (e) {
    if (!e.target.closest("[data-theme-toggle]")) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(K_THEME, next); } catch (err) {}
  });

  /* -------------------------------------------------------- progress ---- */
  var progress = {}, openState = {};
  try { progress = JSON.parse(localStorage.getItem(K_PROG) || "{}"); } catch (e) { progress = {}; }
  try { openState = JSON.parse(localStorage.getItem(K_OPEN) || "{}"); } catch (e) { openState = {}; }
  function saveProgress() { try { localStorage.setItem(K_PROG, JSON.stringify(progress)); } catch (e) {} }
  function saveOpen() { try { localStorage.setItem(K_OPEN, JSON.stringify(openState)); } catch (e) {} }

  /* --------------------------------------------------------- helpers ---- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function link(url, label, cls) {
    if (!url) return '<span class="' + (cls || "chip") + '">' + esc(label) + "</span>";
    return '<a class="' + (cls || "chip") + '" href="' + esc(url) +
      '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
  }
  var ICON_EXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
  var ICON_SCRIPT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>';
  var ICON_CHEV = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  function ring(pct, size) {
    size = size || 34;
    var r = (size - 5) / 2, c = 2 * Math.PI * r, on = (pct / 100) * c;
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '">' +
      '<circle class="ring__bg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="3.5"/>' +
      '<circle class="ring__fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="3.5" ' +
      'stroke-dasharray="' + on.toFixed(2) + " " + c.toFixed(2) + '"/></svg>';
  }
  function callout(c) {
    if (!c) return "";
    var kind = c.kind && c.kind !== "info" ? " callout--" + c.kind : "";
    var body = c.steps
      ? "<ol>" + c.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>"
      : c.bullets
        ? "<ul>" + c.bullets.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>"
        : "<p>" + c.text + "</p>";
    return '<div class="callout' + kind + '"><div class="callout__title">' + esc(c.title) + "</div>" + body + "</div>";
  }
  function table(cols, rows) {
    return '<div class="table-wrap"><table><thead><tr>' +
      cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div>";
  }
  function head(s) {
    return '<div class="section__head"><div class="section__eyebrow">' + esc(s.eyebrow) +
      "</div><h2>" + esc(s.title) + "</h2>" +
      (s.subtitle ? '<p class="section__sub">' + esc(s.subtitle) + "</p>" : "") + "</div>";
  }
  function prose(arr) {
    return '<div class="prose">' + (arr || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>";
  }


  function groupBlock(g) {
    return '<div class="lab-group"><div class="lab-group__head"><span class="lab-group__step">' +
      esc(g.step) + "</span><h3>" + esc(g.title) + "</h3></div>" +
      (g.intro ? '<p class="lab-group__intro">' + g.intro + "</p>" : "") +
      '<div class="card">' + g.items.map(function (it) {
        var meta = it.scriptUrl
          ? '<a class="script-link" href="' + esc(it.scriptUrl) + '" target="_blank" rel="noopener noreferrer" title="Open the ' + esc(it.name) + ' script">' +
            '<span class="script-link__btn">' + ICON_SCRIPT + '</span>' +
            '<span class="script-link__name">' + esc(it.meta || "") + '</span></a>'
          : esc(it.meta || "");
        return '<div class="lab-card"><div><div class="lab-card__name">' + link(it.url, it.name, "") + "</div>" +
          (it.sub ? '<div class="lab-card__sub">' + esc(it.sub) + "</div>" : "") + "</div>" +
          '<div class="lab-card__desc">' + it.desc + "</div>" +
          '<div class="lab-card__meta">' + meta + "</div></div>";
      }).join("") + "</div>" +
      (g.after ? '<div style="margin-top:14px"><h4 style="font-size:13.5px;margin-bottom:6px">' +
        esc(g.after.title) + '</h4><ul class="prose">' +
        g.after.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul></div>" : "") +
      "</div>";
  }

  /* ---------------------------------------------------------- render ---- */
  function render(d) {
    document.title = d.meta.title + " — " + d.meta.subtitle;
    var h = [];

    h.push('<section class="hero">' +
      '<div class="hero__kicker">' + esc(d.meta.org) + " · " + esc(d.meta.exam) + "</div>" +
      "<h1>" + esc(d.meta.title) + "</h1>" +
      '<p class="hero__lead">' + esc(d.meta.subtitle) + ". " + esc(d.meta.tagline) + "</p>" +
      '<div class="hero__stats">' + d.hero.stats.map(function (s) {
        return '<div class="stat"><div class="stat__v">' + esc(s.value) + '</div><div class="stat__l">' + esc(s.label) + "</div></div>";
      }).join("") + "</div>" +
      '<div class="hero__cta">' +
        '<a class="btn btn--primary" href="#the-plan">Start Week 1</a>' +
        '<a class="btn" href="#home-lab">Build the lab</a>' +
        '<a class="btn" href="lab/week-01.html">Open Lab Guide 1</a>' +
      "</div></section>");

    /* 01 overview */
    var o = d.overview;
    h.push('<section class="section" id="' + o.id + '">' + head(o) + prose(o.body) +
      '<h3 style="margin:20px 0 4px;font-size:15px">Where the hours go</h3><div class="rhythm">' +
      o.rhythm.map(function (r) {
        return '<div class="rhythm__row"><span class="rhythm__pct">' + esc(r.pct) + "</span>" +
          '<span class="rhythm__track"><span class="rhythm__fill" style="width:' + esc(r.pct) + '"></span></span>' +
          '<span class="rhythm__text">' + esc(r.text) + "</span></div>";
      }).join("") + "</div>" +
      '<h3 style="margin:20px 0 8px;font-size:15px">Pacing options</h3>' +
      table(o.pacing.headers, o.pacing.rows.map(function (r) { return r.map(esc); })) +
      callout(o.note) + "</section>");

    /* 02 the exam */
    var x = d.exam;
    h.push('<section class="section" id="' + x.id + '">' + head(x) + prose(x.body) +
      table(["", ""], x.facts.map(function (f) { return ["<strong>" + esc(f.k) + "</strong>", esc(f.v)]; })) +
      (x.domains ? '<h3 style="margin:20px 0 8px;font-size:15px">' + esc(x.domains.title) + "</h3>" +
        table(x.domains.headers, x.domains.rows) : "") +
      '<h3 style="margin:20px 0 8px;font-size:15px">' + esc(x.implications.title) + "</h3>" +
      '<ul class="prose">' + x.implications.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" +
      callout(x.note) + "</section>");

    /* 03 home lab */
    var hl = d.homelab;
    h.push('<section class="section" id="' + hl.id + '">' + head(hl) + prose(hl.body) +
      callout(hl.startHere) + callout(hl.budgetNote) +
      hl.groups.map(function (g) {
        return '<div class="lab-group"><div class="lab-group__head"><span class="lab-group__step">' +
          esc(g.step) + "</span><h3>" + esc(g.title) + "</h3></div>" +
          (g.intro ? '<p class="lab-group__intro">' + g.intro + "</p>" : "") +
          '<div class="card">' + g.items.map(function (it) {
            return '<div class="lab-card"><div><div class="lab-card__name">' + link(it.url, it.name, "") + "</div>" +
              (it.sub ? '<div class="lab-card__sub">' + esc(it.sub) + "</div>" : "") + "</div>" +
              '<div class="lab-card__desc">' + it.desc + "</div>" +
              '<div class="lab-card__meta">' + esc(it.meta || "") + "</div></div>";
          }).join("") + "</div>" +
          (g.after ? '<div style="margin-top:14px"><h4 style="font-size:13.5px;margin-bottom:6px">' +
            esc(g.after.title) + '</h4><ul class="prose">' +
            g.after.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul></div>" : "") +
          "</div>";
      }).join("") + "</section>");

    /* 04 self-managed cloud hosted labs */
    var cl = d.cloud;
    if (cl) {
      h.push('<section class="section" id="' + cl.id + '">' + head(cl) + prose(cl.body) +
        groupBlock({ step: "Providers", title: "Pick one and stick with it",
                     intro: "", columns: cl.columns, items: cl.items, after: cl.after }) +
        "</section>");
    }

    /* 05 certs */
    var c = d.certs;
    h.push('<section class="section" id="' + c.id + '">' + head(c) + prose(c.body) +
      c.items.map(function (it) {
        return '<div class="cert' + (it.featured ? " cert--featured" : "") + '">' +
          '<div class="cert__n">' + it.n + "</div><div class=\"cert__body\">" +
          '<div class="cert__name">' + esc(it.name) + "</div>" +
          '<div class="cert__meta"><span>' + link(it.codeUrl, it.code, "") + "</span><span>" +
          esc(it.level) + "</span><span>" + esc(it.timing) + "</span><span>" + esc(it.cost) + "</span></div>" +
          '<p style="font-size:13.4px;color:var(--text-2);margin:0 0 9px">' + esc(it.why) + "</p>" +
          '<div class="chips">' + it.prep.map(function (p) { return link(p.url, p.label, "chip"); }).join("") +
          "</div></div></div>";
      }).join("") +
      (c.dod ? '<div class="callout callout--warn" style="margin-top:18px"><div class="callout__title">' +
        esc(c.dod.title) + "</div>" +
        c.dod.intro.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
        "<ol>" + c.dod.requirements.map(function (r) { return "<li>" + r + "</li>"; }).join("") + "</ol>" +
        "<p><strong>" + esc(c.dod.pairing.title) + "</strong><br>" + c.dod.pairing.text + "</p>" +
        "</div>" + callout(c.dod.note) : "") +
      callout(c.note) + "</section>");

    /* 05 coverage */
    var cv = d.coverage;
    h.push('<section class="section" id="' + cv.id + '">' + head(cv) +
      '<p class="prose">' + cv.intro + "</p>" +
      table(cv.columns, cv.rows.map(function (r) {
        return [r[0], r[1], '<a class="chip chip--accent" href="#week-' + (r[2].length < 2 ? "0" + r[2] : r[2]) + '">Wk ' + r[2] + "</a>"];
      })) + "</section>");

    /* 06 weeks */
    var w = d.weeks;
    h.push('<section class="section" id="' + w.id + '">' + head(w) + "</section>");
    w.items.forEach(function (wk) { h.push(weekHTML(wk)); });

    /* 07 lab guides */
    var lb = d.labs;
    h.push('<section class="section" id="' + lb.id + '">' + head(lb) +
      '<p class="prose">' + lb.intro + "</p>" +
      '<div class="grid grid--3" style="margin:16px 0">' + w.items.map(function (wk) {
        return '<a class="res" href="lab/' + wk.id + '.html">' +
          '<div class="res__name">Lab ' + wk.n + " — " + esc(wk.title) + "</div>" +
          '<div class="res__desc">' + esc(wk.summary) + "</div></a>";
      }).join("") + "</div>" + callout(lb.note) +
      (lb.download ? '<div class="callout callout--success"><div class="callout__title">' +
        esc(lb.download.title) + "</div><p>" + esc(lb.download.text) +
        '</p><p><a class="btn btn--primary" href="' + esc(lb.download.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(lb.download.label) + "</a></p></div>" : "") + "</section>");

    /* 09 employer verification */
    var vf = d.verify;
    if (vf) {
      h.push('<section class="section" id="' + vf.id + '">' + head(vf) + prose(vf.body) +
        callout(vf.startHere) +
        vf.groups.map(function (g) {
          return '<div class="lab-group"><div class="lab-group__head"><span class="lab-group__step">' +
            esc(g.step) + "</span><h3>" + esc(g.title) + "</h3></div>" +
            (g.intro ? '<p class="lab-group__intro">' + g.intro + "</p>" : "") +
            '<div class="card">' + g.items.map(function (it) {
              var tag = it.url ? "a" : "div";
              var attrs = it.url ? ' href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer"' : "";
              return "<" + tag + ' class="lab-card"' + attrs + "><div><div class=\"lab-card__name\">" + esc(it.name) + "</div>" +
                (it.sub ? '<div class="lab-card__sub">' + esc(it.sub) + "</div>" : "") + "</div>" +
                '<div class="lab-card__desc">' + it.desc + "</div>" +
                '<div class="lab-card__meta">' + esc(it.meta || "") + "</div></div></" + tag + ">";
            }).join("") + "</div></div>";
        }).join("") +
        (vf.note ? '<div class="callout callout--success"><div class="callout__title">' +
          esc(vf.note.title) + "</div><p>" + esc(vf.note.text) +
          '</p><p><a class="btn btn--primary" href="' + esc(vf.note.url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(vf.note.label) + "</a></p></div>" : "") +
        "</section>");
    }

    /* 10 resources */
    var rs = d.resources;
    h.push('<section class="section" id="' + rs.id + '">' + head(rs) +
      rs.groups.map(function (g) {
        return '<div class="res-group"><h3>' + esc(g.category) + '</h3><div class="grid grid--2">' +
          g.items.map(function (it) {
            return '<a class="res" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' +
              '<div class="res__name">' + esc(it.name) + ICON_EXT + "</div>" +
              '<div class="res__desc">' + esc(it.desc) + "</div></a>";
          }).join("") + "</div></div>";
      }).join("") + "</section>");

    /* 11 costs */
    var co = d.costs;
    h.push('<section class="section" id="' + co.id + '">' + head(co) +
      table(co.columns, co.rows) + callout(co.note) + "</section>");

    /* 12 exam day */
    var ed = d.examday;
    h.push('<section class="section" id="' + ed.id + '">' + head(ed) +
      '<div class="card card--pad">' + ed.tips.map(function (t) {
        return '<div class="tip"><span class="tip__arrow">&rarr;</span><div class="tip__text"><b>' +
          esc(t.head) + "</b> " + esc(t.text) + "</div></div>";
      }).join("") + "</div>" +
      '<h3 style="margin:22px 0 8px;font-size:15px">' + esc(ed.checklist.title) + "</h3>" +
      '<ul class="prose">' + ed.checklist.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" +
      callout(ed.note) + "</section>");

    /* 13 why I built this */
    var sy = d.story;
    if (sy) {
      h.push('<section class="section" id="' + sy.id + '">' + head(sy) +
        '<div class="story">' +
          '<div class="story__aside">' +
            '<img class="story__photo" src="' + esc(sy.photo) + '" alt="' + esc(sy.photoAlt) + '"' +
            (sy.photoFallback ? ' onerror="this.onerror=null;this.src=\'' + esc(sy.photoFallback) + '\'"' : "") + '>' +
            '<div class="story__links">' +
              (sy.linkedin ? '<a class="chip" href="' + esc(sy.linkedin) + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>' : "") +
              (sy.youtube ? '<a class="chip" href="' + esc(sy.youtube) + '" target="_blank" rel="noopener noreferrer">YouTube</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="story__body prose">' +
            sy.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
            '<blockquote class="story__quote">' +
              sy.quote.map(function (q) { return "<p>" + esc(q) + "</p>"; }).join("") +
            "</blockquote>" +
            '<p style="color:var(--text-3);font-size:13px">' + esc(sy.closing) + "</p>" +
          "</div>" +
        "</div></section>");
    }

    /* 14 credits */
    var cr = d.credits;
    if (cr) {
      h.push('<section class="section" id="' + cr.id + '">' + head(cr) + prose(cr.body) +
        table(cr.columns, cr.rows) + callout(cr.note) + "</section>");
    }

    document.getElementById("main").innerHTML = h.join("");
    document.getElementById("nav").innerHTML = navHTML(d);
    wire();
    recalcAll();
  }

  function weekHTML(wk) {
    var total = wk.tasks.length;
    var open = openState[wk.id] === true || (openState[wk.id] === undefined && wk.n === 1);
    return '<div class="phase' + (open ? " is-open" : "") + '" id="' + wk.id + '" data-week="' + wk.id + '" data-total="' + total + '">' +
      '<button class="phase__head" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
        '<span class="phase__badge"><b>' + wk.n + "</b><span>week</span></span>" +
        '<span class="phase__meta"><span class="phase__title">' + esc(wk.title) + "</span>" +
        '<span class="phase__sub">' + esc(wk.domain) + "</span></span>" +
        '<span class="phase__right"><span class="phase__count" data-count>0/' + total + "</span>" +
        '<span class="phase__ring" data-ring>' + ring(0) + "</span>" +
        '<span class="phase__chev">' + ICON_CHEV + "</span></span></button>" +
      '<div class="phase__body"><div class="week">' +
        '<div class="week__head"><span class="week__right">' +
          '<a class="week__lab" href="lab/' + wk.id + '.html">' + ICON_EXT + "Lab guide</a>" +
          '<span class="week__hrs">' + esc(wk.hours) + " hrs</span></span></div>" +
        '<p style="color:var(--text-2);font-size:13.8px;margin:0 0 12px">' + esc(wk.summary) + "</p>" +
        '<ul class="tasks">' + wk.tasks.map(function (t, i) {
          var id = wk.id + ":" + i;
          return '<li class="task"><input type="checkbox" id="' + id + '" data-task="' + wk.id + '"' +
            (progress[id] ? " checked" : "") + '><label for="' + id + '">' + esc(t) + "</label></li>";
        }).join("") + "</ul>" +
        '<div style="margin:14px 0 10px"><h4 style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);margin-bottom:6px">LFCS objectives covered</h4>' +
        '<ul style="margin:0;padding-left:18px">' + wk.objectives.map(function (ob) {
          return '<li style="font-size:12.8px;color:var(--text-2);margin-bottom:3px">' + esc(ob) + "</li>";
        }).join("") + "</ul></div>" +
      "</div></div></div>";
  }

  function navHTML(d) {
    var groups = [
      { label: "Start here", links: [
        { href: "#" + d.overview.id, text: d.overview.title },
        { href: "#" + d.exam.id, text: d.exam.title },
        { href: "#" + d.homelab.id, text: d.homelab.title },
        { href: "#" + d.cloud.id, text: d.cloud.title },
        { href: "#" + d.certs.id, text: d.certs.title },
        { href: "#" + d.coverage.id, text: d.coverage.title }
      ]},
      { label: "The 12-week plan", links: d.weeks.items.map(function (wk) {
        return { href: "#" + wk.id, text: wk.title, n: wk.n, week: wk.id };
      })},
      { label: "Reference", links: [
        { href: "#" + d.labs.id, text: d.labs.title },
        { href: "#" + d.verify.id, text: d.verify.title },
        { href: "#" + d.resources.id, text: d.resources.title },
        { href: "#" + d.costs.id, text: d.costs.title },
        { href: "#" + d.examday.id, text: d.examday.title },
        { href: "#story", text: "Why I Built This Guide" },
        { href: "#credits", text: "Credits and Trademarks" }
      ]}
    ];
    return groups.map(function (g) {
      return '<div class="sidebar__group"><div class="sidebar__label">' + esc(g.label) + "</div>" +
        g.links.map(function (l) {
          return '<a class="navlink" href="' + l.href + '"' + (l.week ? ' data-navweek="' + l.week + '"' : "") + ">" +
            (l.n != null ? '<span class="navlink__n">' + l.n + "</span>" : "") + "<span>" + esc(l.text) + "</span>" +
            (l.week ? '<span class="navlink__pct" data-navpct>0%</span>' : "") + "</a>";
        }).join("") + "</div>";
    }).join("");
  }

  /* ------------------------------------------------------------ wire ---- */
  function wire() {
    document.querySelectorAll(".phase__head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ph = btn.closest(".phase");
        var isOpen = ph.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        openState[ph.dataset.week] = isOpen;
        saveOpen();
      });
    });
    document.querySelectorAll("input[data-task]").forEach(function (cb) {
      cb.addEventListener("change", function () {
        if (cb.checked) progress[cb.id] = 1; else delete progress[cb.id];
        saveProgress(); recalcAll();
      });
    });
    document.querySelectorAll("[data-navweek]").forEach(function (a) {
      a.addEventListener("click", function () {
        var ph = document.getElementById(a.dataset.navweek);
        if (ph && !ph.classList.contains("is-open")) {
          ph.classList.add("is-open");
          ph.querySelector(".phase__head").setAttribute("aria-expanded", "true");
          openState[ph.dataset.week] = true; saveOpen();
        }
      });
    });
    var reset = document.getElementById("reset");
    if (reset) reset.addEventListener("click", function () {
      if (!window.confirm("Clear all checked tasks? This only affects this browser.")) return;
      progress = {}; saveProgress();
      document.querySelectorAll("input[data-task]").forEach(function (cb) { cb.checked = false; });
      recalcAll();
    });
    var menu = document.getElementById("menu"), sidebar = document.getElementById("sidebar"), scrim = document.getElementById("scrim");
    if (menu) {
      function close() { sidebar.classList.remove("is-open"); scrim.classList.remove("is-open"); }
      menu.addEventListener("click", function () {
        sidebar.classList.toggle("is-open"); scrim.classList.toggle("is-open");
      });
      scrim.addEventListener("click", close);
      sidebar.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    }
    var links = Array.prototype.slice.call(document.querySelectorAll(".navlink"));
    var targets = links.map(function (l) { return document.querySelector(l.getAttribute("href")); }).filter(Boolean);
    if ("IntersectionObserver" in window && targets.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-70px 0px -70% 0px", threshold: 0 });
      targets.forEach(function (t) { io.observe(t); });
    }
  }

  function recalcAll() {
    var done = 0, total = 0;
    document.querySelectorAll(".phase").forEach(function (ph) {
      var boxes = ph.querySelectorAll("input[data-task]"), d = 0;
      boxes.forEach(function (b) { if (b.checked) d++; });
      done += d; total += boxes.length;
      var pct = boxes.length ? Math.round((d / boxes.length) * 100) : 0;
      ph.querySelector("[data-count]").textContent = d + "/" + boxes.length;
      ph.querySelector("[data-ring]").innerHTML = ring(pct);
      var nl = document.querySelector('[data-navweek="' + ph.dataset.week + '"]');
      if (nl) {
        nl.querySelector("[data-navpct]").textContent = pct + "%";
        nl.classList.toggle("is-done", pct === 100);
      }
    });
    var pct = total ? Math.round((done / total) * 100) : 0;
    var fill = document.getElementById("overallFill"), label = document.getElementById("overallLabel");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = pct + "% · " + done + "/" + total;
  }

  /* ------------------------------------------------------------ boot ---- */
  fetch("data/lfcs.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(render)
    .catch(function (err) {
      document.getElementById("main").innerHTML =
        '<div class="callout callout--danger"><div class="callout__title">Could not load course data</div><p>' +
        esc(err.message) + ". If you opened this file directly from disk, run a local server instead: " +
        "<code>python3 -m http.server 8000</code> then visit <code>http://localhost:8000</code>.</p></div>";
    });
})();
