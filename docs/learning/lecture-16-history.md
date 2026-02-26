# Lecture 16: History

Practice questions for the **History** lecture. Content is drawn from the [Study Guide: Introduction](../study-guide/introduction.md) (Linux history, philosophy, and course structure).

<details>
<summary>Key points for exam</summary>

- Unix vs UNIX: trademark (The Open Group) vs family of OSs; Unix-like: genetic, branded, functional
- Linux: kernel (1991, Linus Torvalds, GPL v2); distribution = kernel + software + package management
- Philosophy: everything is a file, small focused programs, composability, text config, open source
- Course: 17 lectures; Lab 4 HP, Exam 3.5 HP; man pages, CLI, permissions

</details>

---

<div class="learning-question" data-correct="2" data-explanation="UNIX (uppercase) is a trademark of The Open Group; they publish the Single UNIX Specification and certify systems. Unix (lowercase) refers to the family of operating systems descending from or resembling the original.">
  <p><strong>Q1.</strong> What is the difference between 'Unix' and 'UNIX' in common usage?</p>
  <label><input type="radio" name="l16q1" value="0"> They are the same</label><br>
  <label><input type="radio" name="l16q1" value="1"> UNIX is the kernel, Unix is the shell</label><br>
  <label><input type="radio" name="l16q1" value="2"> UNIX is the trademark/certification; Unix is the family of OSs</label><br>
  <label><input type="radio" name="l16q1" value="3"> Unix is only for servers</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Linus Torvalds started the Linux kernel in summer 1991 and released it October 5, 1991. It was originally going to be named 'Freax'; the name 'Linux' was chosen by the FTP server admin who hosted it.">
  <p><strong>Q2.</strong> When was the Linux kernel first released and by whom?</p>
  <label><input type="radio" name="l16q2" value="0"> 1991, by Linus Torvalds</label><br>
  <label><input type="radio" name="l16q2" value="1"> 1985, by Richard Stallman</label><br>
  <label><input type="radio" name="l16q2" value="2"> 1970, by Ken Thompson</label><br>
  <label><input type="radio" name="l16q2" value="3"> 2000, by the FSF</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="The Linux kernel is released under the GNU General Public License version 2 (GPL v2), which ensures the source remains free and requires derivative work to be shared under the same terms.">
  <p><strong>Q3.</strong> Under which license is the Linux kernel released?</p>
  <label><input type="radio" name="l16q3" value="0"> MIT License</label><br>
  <label><input type="radio" name="l16q3" value="1"> GNU General Public License version 2 (GPL)</label><br>
  <label><input type="radio" name="l16q3" value="2"> BSD License</label><br>
  <label><input type="radio" name="l16q3" value="3"> Proprietary</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Unix/Linux philosophy includes: everything is a file, small focused programs, composability, text-based configuration, and open source. Modularity, transparency, and documentation are also important.">
  <p><strong>Q4.</strong> Which idea is part of the Unix/Linux philosophy?</p>
  <label><input type="radio" name="l16q4" value="0"> One large program does everything</label><br>
  <label><input type="radio" name="l16q4" value="1"> Binary-only configuration</label><br>
  <label><input type="radio" name="l16q4" value="2"> No documentation</label><br>
  <label><input type="radio" name="l16q4" value="3"> Small, focused programs and composability; text-based config</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="'Everything is a file' means devices, processes, and many resources are represented as files (e.g. in /dev, /proc). This allows a consistent interface for reading and writing.">
  <p><strong>Q5.</strong> What does 'everything is a file' mean in Linux?</p>
  <label><input type="radio" name="l16q5" value="0"> Devices, processes, and many resources are represented as files</label><br>
  <label><input type="radio" name="l16q5" value="1"> Only regular files exist</label><br>
  <label><input type="radio" name="l16q5" value="2"> There are no directories</label><br>
  <label><input type="radio" name="l16q5" value="3"> Files are stored in the cloud only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Genetic UNIX means direct descent from the original Unix (e.g. BSD). Linux is functional Unix-like: it behaves like Unix but is neither genetic nor certified (branded) UNIX.">
  <p><strong>Q6.</strong> How is Linux classified relative to 'genetic UNIX'?</p>
  <label><input type="radio" name="l16q6" value="0"> Linux is genetic UNIX</label><br>
  <label><input type="radio" name="l16q6" value="1"> Linux is branded UNIX</label><br>
  <label><input type="radio" name="l16q6" value="2"> Linux is functional Unix-like (not genetic or branded)</label><br>
  <label><input type="radio" name="l16q6" value="3"> Linux is not Unix-like</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man intro` — short intro to section 1; `man -k keyword` to find pages.
- **Arch Wiki – [Linux](https://wiki.archlinux.org/title/Linux):** Kernel, history, philosophy; distribution-agnostic.
- **Linux Documentation Project:** [tldp.org](https://tldp.org/) — guides and HOWTOs (some may be dated).
