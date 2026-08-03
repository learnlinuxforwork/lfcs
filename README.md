<div align="center">

<img src="https://free.learnlinuxforwork.com/assets/img/ST-Brain-Logo.png" alt="Shea's Tech" width="120">

# LFCS Course

### Zero to Linux Foundation Certified System Administrator

**Twelve weeks. Twelve hands-on lab guides. Every exam domain — on two distro families.**
Built for people who can't drop $3,000 on a training course.

[**lfcs.learnlinuxforwork.com**](https://lfcs.learnlinuxforwork.com) · [Why I built this](https://lfcs.learnlinuxforwork.com/#story)

[![Exam](https://img.shields.io/badge/exam-LFCS-2f5fd6?style=flat-square)](https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/)
[![Platform](https://img.shields.io/badge/platform-distro--neutral-2f5fd6?style=flat-square)](https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/)
[![License](https://img.shields.io/badge/license-AGPL--3.0--or--later-2f5fd6?style=flat-square)](https://learnlinuxforwork.com/license)
[![Cost](https://img.shields.io/badge/cost-%240-2f5fd6?style=flat-square)](#what-it-costs)
[![Tracking](https://img.shields.io/badge/tracking-none-2f5fd6?style=flat-square)](#features)
[![PRs](https://img.shields.io/badge/PRs-welcome-2f5fd6?style=flat-square)](#contributing)

<br>

| 12 | 12 | 5 | $0 |
|:--:|:--:|:--:|:--:|
| **weeks** | **lab guides** | **exam domains** | **to start** |

</div>

---

## Quick start

```bash
git clone https://github.com/learnlinuxforwork/lfcs.git && cd lfcs
python3 -m http.server 8000       # read the course at localhost:8000
```

Then open [Lab Guide 1](lab/week-01.html) and start typing — on whichever distro you
have running.

---

## The one thing that makes this course different

> **The LFCS is graded independent of distribution.**

No specific Linux distro is required or assumed on exam day. Most study material quietly
picks one distro and hopes it's close enough. This course doesn't: **every lab guide gives
you the command on Ubuntu/Debian and the command on Rocky/RHEL, side by side**, until the
underlying concept is what you know — not a memorized command line for one family.

---

## What's inside

**Fourteen sections**, built to the same shape as the
[RHCSA course](https://rhcsa.learnlinuxforwork.com) and the
[AWS DevOps course](https://free.learnlinuxforwork.com):

| # | Section | What it gives you |
|:--|:--|:--|
| 01 | How This Course Works | Pacing options from 6 to 18 weeks, and where the hours actually go |
| 02 | What the LFCS Actually Is | Format, the five domains and their weightings, what the graders care about |
| 03 | Build Your Home Lab | Hypervisors, VM sizing, an Ubuntu + Rocky two-machine topology |
| 04 | Self-Managed Cloud Hosted Labs | The same lab on GCP, DigitalOcean, AWS, or Vultr |
| 05 | The Certification Ladder | Linux Essentials, LFCS, RHCSA, LFCE — how they fit together |
| 06 | Exam Domain Coverage Map | All five Linux Foundation domains mapped to the week that covers them |
| 07 | The 12-Week Plan | Checkable tasks, progress saved in your browser |
| 08 | Lab Guides | Twelve standalone guides — dual-distro commands, verification, break/fix |
| 09 | Employer Verification | An optional paid track for a certificate an employer can check |
| 10 | Core Resource List | Free and low-cost resources, all linked |
| 11 | Estimated Costs | Honest numbers, optional items marked |
| 12 | Exam Day | Habits that get you there, plus the morning-of checklist |
| 13 | Why I Built This Guide | The reason this is free |
| 14 | Credits and Trademarks | Everyone whose work this stands on |

---

## The twelve weeks

| Week | Focus | LFCS domain |
|:--:|:--|:--|
| 1 | Shell, Permissions, and Text Processing | Essential Commands |
| 2 | Git, Services, and Performance Troubleshooting | Essential Commands |
| 3 | Users, Groups, and Access Control | Users and Groups |
| 4 | Packages, the Kernel, and Backups | Operations Deployment |
| 5 | Processes and Scheduled Work | Operations Deployment |
| 6 | Virtual Machines, Containers, and SELinux/AppArmor | Operations Deployment |
| 7 | Partitions, LVM, and Filesystems | Storage |
| 8 | Remote Storage and Performance Monitoring | Storage |
| 9 | IP Addressing, DNS, and SSH | Networking |
| 10 | Firewalls, Routing, Bonding, and Load Balancing | Networking |
| 11 | Integration and Break/Fix Week | All five domains |
| 12 | Mock Exam, Remediation, and Exam Day | All of it, under exam conditions |

---

## The twelve lab guides

Every week has a standalone guide. Same shape each time: what you're building, the real
commands on **both** distro families, how to verify it, and a **break/fix drill** where
you sabotage the system on purpose and repair it.

| | Guide | Time | You'll break and fix |
|:--:|:--|:--|:--|
| 1 | [Shell, Permissions, and Text Processing](lab/week-01.html) | 8–10 h | A directory you `chmod 000`'d and locked yourself out of |
| 2 | [Git, Services, and Performance Troubleshooting](lab/week-02.html) | 8–10 h | A systemd unit missing its `ExecStart` after an edit |
| 3 | [Users, Groups, and Access Control](lab/week-03.html) | 8–10 h | A malformed `sudoers.d` file — recovered the safe way, via `visudo -c` |
| 4 | [Packages, the Kernel, and Backups](lab/week-04.html) | 8–10 h | A `sysctl` change that never survives reboot |
| 5 | [Processes and Scheduled Work](lab/week-05.html) | 8–10 h | A masked systemd timer that silently refuses to start |
| 6 | [VMs, Containers, and SELinux/AppArmor](lab/week-06.html) | 8–10 h | An SELinux context relabeled back to `default_t` |
| 7 | [Partitions, LVM, and Filesystems](lab/week-07.html) | 10–12 h | A bad UUID in `/etc/fstab` |
| 8 | [Remote Storage and Performance Monitoring](lab/week-08.html) | 8–10 h | The NFS server going away out from under a mounted client |
| 9 | [IP Addressing, DNS, and SSH](lab/week-09.html) | 8–10 h | An SSH port change that locks you out |
| 10 | [Firewalls, Routing, Bonding, and Load Balancing](lab/week-10.html) | 10–12 h | A firewall silently dropping traffic to a working service |
| 11 | [Integration and Break/Fix Week](lab/week-11.html) | 10–12 h | Five things, blind, across all five domains |
| 12 | [Mock Exam and Exam Day](lab/week-12.html) | 10–12 h | Booking the exam before you can pass a clean mock |

---

## Build the home lab

Two virtual machines, one from each distro family:

| | Role | Why this one |
|:--|:--|:--|
| **Ubuntu Server** | Guest — Debian family | Free, no account. Ships `apt`, `netplan`, and AppArmor. |
| **Rocky Linux** | Guest — RPM family | Free, no account. Ships `dnf`, `NetworkManager`, and SELinux. |
| **Any hypervisor host** | Host | VirtualBox, VMware Workstation Pro, KVM, or UTM — pick whichever matches your hardware. |

If your laptop can't spare the RAM, rent the same two machines from
[Google Cloud](https://console.cloud.google.com/), [DigitalOcean](https://cloud.digitalocean.com/),
[AWS](https://console.aws.amazon.com/), or [Vultr](https://my.vultr.com/) instead — see
[section 04](https://lfcs.learnlinuxforwork.com/#cloud-labs) for details.

---

## Run it locally

No build step, no dependencies, no framework.

```bash
git clone https://github.com/learnlinuxforwork/lfcs.git
cd lfcs
python3 -m http.server 8000
```

Open <http://localhost:8000>. Opening `index.html` over `file://` won't work — the page
fetches `data/lfcs.json` and browsers block that over the file protocol.

---

## Features

- **Dark and light mode** — follows your system, toggle overrides it, choice persists
- **Progress tracking** — every task checkable, per-week rings, overall bar. Stored in `localStorage`
- **No tracking, no cookies, no analytics, no third-party scripts.** Zero JS dependencies
- **Dual-distro lab guides** — Ubuntu/Debian and Rocky/RHEL commands side by side, not one distro quietly favored
- **Prints cleanly** — every lab guide is print-ready if you'd rather work from paper

---

## What it costs

| Item | Estimate |
|:--|:--|
| This course and all 12 lab guides | **$0** |
| Ubuntu Server and Rocky Linux | **$0** |
| Lab VMs on hardware you already own | **$0** |
| [LFCS exam](https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/) | $445 |
| Cloud lab, if your laptop can't host VMs | ~$10–20/month, less if you destroy it between sessions |
| LPI Linux Essentials confidence builder | ~$120 · optional |
| killer.sh simulator sessions | Included with the exam purchase |

---

## Why this exists

> This was built for that fundi in Kenya, that hustler in Nigeria, the determined in
> Rwanda or Ethiopia. The hungry surviving in the UAE. The Indonesian or Filipino brother
> or sister — determined, but never given a chance or guidance.

Shea is 100% self-taught. He left the U.S. Navy — where he served as a Hospital Corpsman
and Fleet Marine Force combat medic — with no IT experience and no money for bootcamps.
This course exists because the LFCS deserved a free, genuinely distro-neutral course to
match its own distro-neutral promise.

[Read the whole story →](https://lfcs.learnlinuxforwork.com/#story)

---

## Deployment

Push to `main` → [`.github/workflows/pages.yml`](.github/workflows/pages.yml) validates
`data/lfcs.json`, confirms all twelve lab guides exist, runs the scope check, and deploys
to GitHub Pages at [lfcs.learnlinuxforwork.com](https://lfcs.learnlinuxforwork.com).

First-time setup:

1. **Settings → Pages → Source:** GitHub Actions
2. **Settings → Pages → Custom domain:** `lfcs.learnlinuxforwork.com`, then tick *Enforce HTTPS*
3. DNS: `CNAME` record `lfcs` → `learnlinuxforwork.github.io`

The [`CNAME`](CNAME) file keeps the domain set across deploys — don't delete it.

---

## Project structure

```
.
├── index.html                    the UI shell
├── assets/
│   ├── css/style.css             design tokens + dark/light themes
│   └── js/{app,lab}.js           renderer, progress tracking, theme toggle
├── data/lfcs.json                ← all course content lives here
├── lab/week-01..12.html          the 12 lab guides
└── .github/workflows/pages.yml   validate → check labs → deploy
```

**To change course content, edit [`data/lfcs.json`](data/lfcs.json).**

---

## Contributing

Corrections, dead-link fixes, and clearer task wording are all welcome.

1. Fork and branch
2. Edit `data/lfcs.json` (or the CSS/JS for interface changes)
3. Validate: `python3 -c "import json;json.load(open('data/lfcs.json'))"`
4. Open a PR describing what changed and why

Keep the tone plain and practical. Keep resources free or genuinely low-cost.

---

## Content and licensing

All course text and lab guides are **original work**, written for this repository. They
are built from the
[Linux Foundation's published LFCS domains](https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/)
— the authoritative statement of what the exam covers — and from hands-on practice.
**No third-party book, course, or training material is reproduced here.**

Licensed under the **[GNU AGPL v3.0 or later](https://learnlinuxforwork.com/license)**. See also [LICENSE](LICENSE). Free forever.

---

## Credits and trademarks

This is an independent, community-written study guide. It is **not affiliated with,
sponsored by, endorsed by, or certified by** the Linux Foundation or any other
organisation named here.

| Mark | Belongs to |
|:--|:--|
| Linux Foundation, LFCS, LFCE | [The Linux Foundation](https://www.linuxfoundation.org/) |
| Ubuntu | [Canonical Ltd.](https://ubuntu.com/) |
| Debian | Software in the Public Interest, Inc. |
| Rocky Linux | [Rocky Enterprise Software Foundation](https://rockylinux.org/) |
| Red Hat, RHEL, RHCSA, EX200 | [Red Hat, Inc.](https://www.redhat.com/) |
| SELinux | U.S. National Security Agency, developed with Red Hat, Inc. |
| AppArmor | [Canonical Ltd.](https://apparmor.net/) |
| VirtualBox | [Oracle Corporation](https://www.virtualbox.org/) |
| VMware Workstation Pro, Fusion | [Broadcom Inc.](https://www.vmware.com/) |
| Docker | [Docker, Inc.](https://www.docker.com/) |
| Podman | [Red Hat, Inc.](https://podman.io/) and the Podman community |
| HAProxy | HAProxy Technologies |
| Git | Software Freedom Conservancy |
| OpenLDAP | The OpenLDAP Foundation |
| killer.sh | [killer.sh](https://killer.sh/) |
| Linux | Linus Torvalds |

Full credit table in [section 14](https://lfcs.learnlinuxforwork.com/#credits).
If you own one of these marks and want the wording changed,
[open an issue](https://github.com/learnlinuxforwork/lfcs/issues) and it will be fixed.

---

<div align="center">

### Related

[**RHCSA Course**](https://rhcsa.learnlinuxforwork.com) · 12 weeks, Red Hat–specific<br>
[**AWS DevOps Course**](https://free.learnlinuxforwork.com) · 54 weeks, Linux to AWS DevOps<br>
[**Learn Linux For Work**](https://www.learnlinuxforwork.com) · structured, work-focused Linux training<br>
[**Doc Linux**](https://learnlinuxforwork.com/doc-linux) · command reference and syntax lookups

<br>

Built by **Shea** · [Shea's Tech](https://www.sheastech.io) · [LinkedIn](https://www.linkedin.com/in/sheastech/) · [YouTube](https://www.youtube.com/@sheastech?sub_confirmation=1)

*If anything here is wrong, report it and we'll fix it.*

</div>
