# Lecture 1: Introduction

Practice questions for the **Introduction** lecture. For full notes, see the [Study Guide: Introduction](../study-guide/introduction.md).

<details>
<summary>Key points for exam</summary>

- Unix vs UNIX (trademark vs family of OSs); Unix-like: genetic, branded, functional
- Linux = kernel (hardware, scheduler, memory, filesystems); not user-space apps
- Linus Torvalds, 1991, GPL v2; name "Freax" → "Linux"
- Distribution: curates software, package management, default config, boot
- Update schemes: calendar-based, stable, rolling (e.g. Debian, Ubuntu, Arch)
- Philosophy: everything is a file, small focused programs, composability, text config, open source
- Getting started: CLI, man pages, basic commands

</details>

---

<div class="learning-question" data-correct="1" data-explanation="Linux is the kernel—the core that manages hardware, processes, and memory. User-space programs like shells and browsers run on top of the kernel.">
  <p><strong>Q1.</strong> What is Linux?</p>
  <label><input type="radio" name="l1q1" value="0"> A complete operating system including desktop applications</label><br>
  <label><input type="radio" name="l1q1" value="1"> An operating system kernel</label><br>
  <label><input type="radio" name="l1q1" value="2"> A type of Unix certified by The Open Group</label><br>
  <label><input type="radio" name="l1q1" value="3"> A desktop environment</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Linux is functionally Unix-like (behaves like Unix) but is neither genetically derived from original Unix nor officially certified as UNIX by The Open Group.">
  <p><strong>Q2.</strong> How is Linux classified among Unix-like systems?</p>
  <label><input type="radio" name="l1q2" value="0"> Genetic UNIX (direct descent from original Unix)</label><br>
  <label><input type="radio" name="l1q2" value="1"> Branded UNIX (certified by The Open Group)</label><br>
  <label><input type="radio" name="l1q2" value="2"> Functional UNIX (behaves like Unix but neither genetic nor branded)</label><br>
  <label><input type="radio" name="l1q2" value="3"> Linux is not Unix-like</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Linus Torvalds created the Linux kernel in 1991 as a student project. He still oversees kernel development today.">
  <p><strong>Q3.</strong> Who created the Linux kernel?</p>
  <label><input type="radio" name="l1q3" value="0"> Richard Stallman</label><br>
  <label><input type="radio" name="l1q3" value="1"> Linus Torvalds</label><br>
  <label><input type="radio" name="l1q3" value="2"> Dennis Ritchie</label><br>
  <label><input type="radio" name="l1q3" value="3"> Ken Thompson</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="The Linux kernel is released under the GNU General Public License version 2 (GPL v2), which ensures the source code remains free and open.">
  <p><strong>Q4.</strong> Under which license is the Linux kernel released?</p>
  <label><input type="radio" name="l1q4" value="0"> GNU General Public License version 2 (GPL)</label><br>
  <label><input type="radio" name="l1q4" value="1"> MIT License</label><br>
  <label><input type="radio" name="l1q4" value="2"> BSD License</label><br>
  <label><input type="radio" name="l1q4" value="3"> Proprietary</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="A Linux distribution packages the kernel with software, package management, and default configurations so users get a complete, usable system.">
  <p><strong>Q5.</strong> What is a Linux distribution?</p>
  <label><input type="radio" name="l1q5" value="0"> Another name for the Linux kernel</label><br>
  <label><input type="radio" name="l1q5" value="1"> A type of Unix certification</label><br>
  <label><input type="radio" name="l1q5" value="2"> A desktop environment only</label><br>
  <label><input type="radio" name="l1q5" value="3"> A project that packages the kernel with software, package management, and configurations</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Linux was originally going to be called 'Freax'. The name 'Linux' was chosen by the FTP server administrator who hosted the first public release.">
  <p><strong>Q6.</strong> What was the Linux kernel originally planned to be named?</p>
  <label><input type="radio" name="l1q6" value="0"> Freax</label><br>
  <label><input type="radio" name="l1q6" value="1"> GNU/Linux</label><br>
  <label><input type="radio" name="l1q6" value="2"> Minix</label><br>
  <label><input type="radio" name="l1q6" value="3"> Unix</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="UNIX (uppercase) is the trademark of The Open Group; they publish the Single UNIX Specification and certify systems. Unix (lowercase) refers to the family of OSs descending from or resembling the original.">
  <p><strong>Q7.</strong> What does 'UNIX' (uppercase) typically refer to?</p>
  <label><input type="radio" name="l1q7" value="0"> The Linux kernel</label><br>
  <label><input type="radio" name="l1q7" value="1"> The trademark and certification by The Open Group</label><br>
  <label><input type="radio" name="l1q7" value="2"> Any open-source operating system</label><br>
  <label><input type="radio" name="l1q7" value="3"> Only BSD</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="'Everything is a file' means devices, processes, and many resources are represented as files (e.g. in /dev, /proc). This allows a consistent interface for reading and writing.">
  <p><strong>Q8.</strong> What does the Unix/Linux philosophy 'everything is a file' mean?</p>
  <label><input type="radio" name="l1q8" value="0"> Devices, processes, and many resources are represented as files</label><br>
  <label><input type="radio" name="l1q8" value="1"> Only regular files exist on the system</label><br>
  <label><input type="radio" name="l1q8" value="2"> Files are stored in the cloud</label><br>
  <label><input type="radio" name="l1q8" value="3"> There are no directories</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man intro` — short intro to section 1; use `man -k keyword` to find pages. Authoritative, offline.
- **Arch Wiki – [Linux](https://wiki.archlinux.org/title/Linux):** Conceptual overview, distribution-agnostic.
- **Linux Documentation Project:** [tldp.org](https://tldp.org/) — guides and HOWTOs (some may be dated).
