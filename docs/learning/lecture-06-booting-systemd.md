# Lecture 6: Booting and systemd

Practice questions for the **Booting and systemd** lecture. For full notes, see the [Study Guide: Booting and systemd](../study-guide/booting-systemd.md).

<details>
<summary>Key points for exam</summary>

- init = PID 1, first process, ancestor of all; on modern systems = systemd
- systemd units: .service, .target, .mount, .socket, .timer; systemctl start/stop/enable/disable/status
- Targets: multi-user.target, graphical.target, rescue.target; get-default, set-default
- Unit files: /etc/systemd/system/, ~/.config/systemd/user/; [Unit], [Service], [Install]
- journalctl: -u unit, -f, -b, -k, --since; systemd-analyze, systemd-analyze blame

</details>

---

<div class="learning-question" data-correct="1" data-explanation="init is the first user-space process started by the kernel. It has PID 1, is the ancestor of all other processes, and is responsible for bringing the system up (and shutting it down).">
  <p><strong>Q1.</strong> What is init?</p>
  <label><input type="radio" name="l6q1" value="0"> The Linux kernel</label><br>
  <label><input type="radio" name="l6q1" value="1"> The first process (PID 1), ancestor of all other processes</label><br>
  <label><input type="radio" name="l6q1" value="2"> A service manager only, not PID 1</label><br>
  <label><input type="radio" name="l6q1" value="3"> The bootloader</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="PID 1 is always the init process (traditionally /sbin/init). On most modern Linux systems this is systemd.">
  <p><strong>Q2.</strong> Which process always has PID 1?</p>
  <label><input type="radio" name="l6q2" value="0"> init (or systemd)</label><br>
  <label><input type="radio" name="l6q2" value="1"> kernel</label><br>
  <label><input type="radio" name="l6q2" value="2"> The first user login shell</label><br>
  <label><input type="radio" name="l6q2" value="3"> GRUB</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="systemd uses unit files. Service units have the .service extension and define how to run a daemon. Other types include .target, .mount, .socket, .timer.">
  <p><strong>Q3.</strong> What is a systemd unit?</p>
  <label><input type="radio" name="l6q3" value="0"> A CPU core</label><br>
  <label><input type="radio" name="l6q3" value="1"> A user account</label><br>
  <label><input type="radio" name="l6q3" value="2"> A configuration entity (e.g. .service, .target) that systemd manages</label><br>
  <label><input type="radio" name="l6q3" value="3"> A partition</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="systemctl is the main command to manage systemd: start, stop, restart, enable, disable, status. Example: sudo systemctl start nginx.">
  <p><strong>Q4.</strong> Which command do you use to start or stop a systemd service?</p>
  <label><input type="radio" name="l6q4" value="0"> systemctl (e.g. systemctl start servicename)</label><br>
  <label><input type="radio" name="l6q4" value="1"> service only</label><br>
  <label><input type="radio" name="l6q4" value="2"> initctl</label><br>
  <label><input type="radio" name="l6q4" value="3"> runlevel</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Targets group units (like old runlevels). Examples: multi-user.target (no GUI), graphical.target (with GUI), rescue.target (single-user). systemctl get-default shows the default target.">
  <p><strong>Q5.</strong> What is a systemd target?</p>
  <label><input type="radio" name="l6q5" value="0"> A CPU scheduling policy</label><br>
  <label><input type="radio" name="l6q5" value="1"> A group of units (like a runlevel), e.g. multi-user.target or graphical.target</label><br>
  <label><input type="radio" name="l6q5" value="2"> A filesystem mount point</label><br>
  <label><input type="radio" name="l6q5" value="3"> A user group</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="journalctl is the command to view systemd's journal (logs). Examples: journalctl -u servicename, journalctl -f (follow), journalctl -b (since boot).">
  <p><strong>Q6.</strong> How do you view logs managed by systemd?</p>
  <label><input type="radio" name="l6q6" value="0"> Only /var/log/syslog</label><br>
  <label><input type="radio" name="l6q6" value="1"> dmesg only</label><br>
  <label><input type="radio" name="l6q6" value="2"> journalctl (e.g. journalctl -u servicename, journalctl -f)</label><br>
  <label><input type="radio" name="l6q6" value="3"> systemctl log</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Enable means the service will start at boot (depending on target). Disable removes that. Start/stop affect the current run only.">
  <p><strong>Q7.</strong> What does 'systemctl enable servicename' do?</p>
  <label><input type="radio" name="l6q7" value="0"> Starts the service immediately</label><br>
  <label><input type="radio" name="l6q7" value="1"> Stops the service</label><br>
  <label><input type="radio" name="l6q7" value="2"> Shows the service status</label><br>
  <label><input type="radio" name="l6q7" value="3"> Configures the service to start at boot (when its target is reached)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="systemd starts services in parallel where possible and respects dependencies (After=, WantedBy=), which speeds up boot compared to traditional sequential init.">
  <p><strong>Q8.</strong> How does systemd differ from traditional SysV init regarding boot?</p>
  <label><input type="radio" name="l6q8" value="0"> systemd starts units in parallel and handles dependencies; init started scripts sequentially</label><br>
  <label><input type="radio" name="l6q8" value="1"> There is no difference</label><br>
  <label><input type="radio" name="l6q8" value="2"> systemd is slower</label><br>
  <label><input type="radio" name="l6q8" value="3"> systemd does not support services</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="System unit files go in /etc/systemd/system/ (and /usr/lib/systemd/system/ for packaged units). User units go in ~/.config/systemd/user/. Edit then run systemctl daemon-reload.">
  <p><strong>Q9.</strong> Where do custom systemd service unit files belong?</p>
  <label><input type="radio" name="l6q9" value="0"> /etc/init.d/</label><br>
  <label><input type="radio" name="l6q9" value="1"> /etc/systemd/system/ (or /usr/lib/systemd/system/)</label><br>
  <label><input type="radio" name="l6q9" value="2"> /var/lib/systemd/</label><br>
  <label><input type="radio" name="l6q9" value="3"> /boot/systemd/</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="journalctl -b shows logs since last boot; -f follows; -u servicename filters by unit; -p err shows errors; --since/--until filter by time. The journal is systemd's logging system.">
  <p><strong>Q10.</strong> What does 'journalctl -b' show?</p>
  <label><input type="radio" name="l6q10" value="0"> Only kernel messages</label><br>
  <label><input type="radio" name="l6q10" value="1"> Only the last 100 lines</label><br>
  <label><input type="radio" name="l6q10" value="2"> Logs since the last boot</label><br>
  <label><input type="radio" name="l6q10" value="3"> Only failed services</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man systemctl`, `man systemd.unit`, `man journalctl` — service control, unit file format, journal.
- **Arch Wiki – [systemd](https://wiki.archlinux.org/title/Systemd):** Units, targets, journal; distribution-agnostic.
- **freedesktop – [systemd documentation](https://www.freedesktop.org/wiki/Software/systemd/):** Official docs for unit syntax and options.
