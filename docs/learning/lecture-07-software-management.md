# Lecture 7: Software Management

Practice questions for the **Software Management** lecture. For full notes, see the [Study Guide: Software Management](../study-guide/software-management.md).

<details>
<summary>Key points for exam</summary>

- Distribution: curates software, package management, default config; update schemes: calendar, stable, rolling
- Package: archive with files, metadata, scripts; apt/dpkg (Debian), yum/dnf/rpm (RHEL), pacman (Arch)
- apt update (package list), apt upgrade (packages), apt full-upgrade (may remove/install); apt install/remove/purge
- dpkg -i (install .deb), -L (list files), -S (file to package); apt --fix-broken install
- Repositories: /etc/apt/sources.list, sources.list.d/; deb uri distribution [components]
- Snap, Flatpak: alternative package formats

</details>

---

<div class="learning-question" data-correct="2" data-explanation="A Linux distribution curates software, provides package management, default configurations, and puts components together so the system boots. It is not just the kernel or a single application.">
  <p><strong>Q1.</strong> What is a Linux distribution?</p>
  <label><input type="radio" name="l7q1" value="0"> The Linux kernel plus one desktop environment</label><br>
  <label><input type="radio" name="l7q1" value="1"> A type of package file</label><br>
  <label><input type="radio" name="l7q1" value="2"> A project that curates software, provides package management, and default configurations</label><br>
  <label><input type="radio" name="l7q1" value="3"> A security update only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="apt update refreshes the list of available packages from configured repositories. You should run it before installing or upgrading so you get the latest package lists.">
  <p><strong>Q2.</strong> What does 'apt update' do?</p>
  <label><input type="radio" name="l7q2" value="0"> Updates the package list from repositories</label><br>
  <label><input type="radio" name="l7q2" value="1"> Upgrades all installed packages</label><br>
  <label><input type="radio" name="l7q2" value="2"> Installs a specific package</label><br>
  <label><input type="radio" name="l7q2" value="3"> Removes unused dependencies</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="dpkg is the low-level package manager for Debian/Ubuntu; it installs .deb files directly. apt is the higher-level tool that resolves dependencies and uses repositories.">
  <p><strong>Q3.</strong> Which tool installs a local .deb file directly?</p>
  <label><input type="radio" name="l7q3" value="0"> apt install</label><br>
  <label><input type="radio" name="l7q3" value="1"> dpkg -i</label><br>
  <label><input type="radio" name="l7q3" value="2"> apt get</label><br>
  <label><input type="radio" name="l7q3" value="3"> snap install</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Repository configuration is stored in /etc/apt/sources.list and files under /etc/apt/sources.list.d/. Format: deb [options] uri distribution [components].">
  <p><strong>Q4.</strong> Where is APT repository configuration stored?</p>
  <label><input type="radio" name="l7q4" value="0"> /etc/dpkg/sources.list</label><br>
  <label><input type="radio" name="l7q4" value="1"> /var/lib/apt/</label><br>
  <label><input type="radio" name="l7q4" value="2"> /usr/share/apt/</label><br>
  <label><input type="radio" name="l7q4" value="3"> /etc/apt/sources.list and /etc/apt/sources.list.d/</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="apt remove uninstalls the package but keeps configuration files. apt purge removes the package and its configuration files. Use purge when you want a clean removal.">
  <p><strong>Q5.</strong> What is the difference between 'apt remove' and 'apt purge'?</p>
  <label><input type="radio" name="l7q5" value="0"> remove keeps config files; purge removes package and config</label><br>
  <label><input type="radio" name="l7q5" value="1"> purge only removes dependencies</label><br>
  <label><input type="radio" name="l7q5" value="2"> They are the same</label><br>
  <label><input type="radio" name="l7q5" value="3"> remove requires reboot; purge does not</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="A rolling release updates software components as soon as new versions are available (e.g. Arch). Calendar-based and stable releases have fixed release cycles or stability gates.">
  <p><strong>Q6.</strong> What is a rolling release distribution?</p>
  <label><input type="radio" name="l7q6" value="0"> One that releases twice a year</label><br>
  <label><input type="radio" name="l7q6" value="1"> One that never updates</label><br>
  <label><input type="radio" name="l7q6" value="2"> One that updates packages as soon as new versions are available</label><br>
  <label><input type="radio" name="l7q6" value="3"> One that only updates the kernel</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="apt --fix-broken install (or apt -f install) resolves broken dependencies, e.g. after installing a .deb with dpkg -i that had unmet dependencies.">
  <p><strong>Q7.</strong> How can you fix broken package dependencies after a dpkg install?</p>
  <label><input type="radio" name="l7q7" value="0"> dpkg --fix-deps</label><br>
  <label><input type="radio" name="l7q7" value="1"> sudo apt --fix-broken install</label><br>
  <label><input type="radio" name="l7q7" value="2"> apt upgrade only</label><br>
  <label><input type="radio" name="l7q7" value="3"> Reboot the system</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="apt upgrade installs available upgrades without removing packages. apt full-upgrade may remove or install packages to resolve dependencies (like dist-upgrade). Use full-upgrade for major upgrades.">
  <p><strong>Q8.</strong> What is the difference between 'apt upgrade' and 'apt full-upgrade'?</p>
  <label><input type="radio" name="l7q8" value="0"> They are identical</label><br>
  <label><input type="radio" name="l7q8" value="1"> full-upgrade only updates the kernel</label><br>
  <label><input type="radio" name="l7q8" value="2"> full-upgrade may remove/install packages to resolve dependencies; upgrade does not</label><br>
  <label><input type="radio" name="l7q8" value="3"> upgrade requires reboot</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="dpkg -L packagename lists files installed by the package. dpkg -S /path/to/file finds which package owns a file. Useful for finding config or binary locations.">
  <p><strong>Q9.</strong> Which command lists files installed by a package?</p>
  <label><input type="radio" name="l7q9" value="0"> dpkg -L packagename</label><br>
  <label><input type="radio" name="l7q9" value="1"> apt list packagename</label><br>
  <label><input type="radio" name="l7q9" value="2"> apt show packagename</label><br>
  <label><input type="radio" name="l7q9" value="3"> dpkg -i packagename</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man apt`, `man dpkg`, `man 5 sources.list` — APT/dpkg syntax and options.
- **Arch Wiki – [pacman](https://wiki.archlinux.org/title/Pacman):** Package management concepts (compare with apt/dpkg).
- **Debian:** [Debian Administrator's Handbook – Package management](https://debian-handbook.info/browse/stable/sect.apt-get.html) — apt, dpkg, repositories.
