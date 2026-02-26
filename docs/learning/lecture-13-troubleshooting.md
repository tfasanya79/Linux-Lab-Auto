# Lecture 13: Troubleshooting

Practice questions for the **Troubleshooting** lecture. For full notes, see the [Study Guide: Troubleshooting](../study-guide/troubleshooting.md).

<details>
<summary>Key points for exam</summary>

- man command, man 5 file (file formats), man -k keyword (apropos); sections 1=user, 5=file format, 8=admin
- Hardware: dmesg, journalctl -k; lscpu, free, lsblk, lspci, lsusb, ip link
- Services: systemctl status, journalctl -u; config test: postfix check, named-checkzone, apache2ctl configtest
- Network: ip addr/route, ping, dig; ss -tuln; config errors often show file:line: message
- Methodology: identify, gather info (logs/config), isolate, test fixes, document

</details>

---

<div class="learning-question" data-correct="0" data-explanation="man pages (manual pages) are the authoritative documentation for commands, config files, and libraries. Use man command or man 5 configfile; they are stored in /usr/share/man and work offline.">
  <p><strong>Q1.</strong> What are man pages used for?</p>
  <label><input type="radio" name="l13q1" value="0"> Documentation for commands, config files, and libraries (authoritative, offline)</label><br>
  <label><input type="radio" name="l13q1" value="1"> Managing user accounts</label><br>
  <label><input type="radio" name="l13q1" value="2"> Viewing system logs</label><br>
  <label><input type="radio" name="l13q1" value="3"> Installing packages</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="man -k keyword (or apropos keyword) searches man page names and short descriptions for a keyword. Useful when you don't know the exact command name.">
  <p><strong>Q2.</strong> How do you search man pages for a keyword?</p>
  <label><input type="radio" name="l13q2" value="0"> man search keyword</label><br>
  <label><input type="radio" name="l13q2" value="1"> grep keyword /usr/share/man</label><br>
  <label><input type="radio" name="l13q2" value="2"> man -k keyword or apropos keyword</label><br>
  <label><input type="radio" name="l13q2" value="3"> man --search keyword</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="man 5 refers to file formats (e.g. crontab(5), passwd(5)). man 1 is user commands; man 8 is admin commands. Same name can exist in different sections, so specify the section when needed.">
  <p><strong>Q3.</strong> What does 'man 5 crontab' show?</p>
  <label><input type="radio" name="l13q3" value="0"> The crontab command usage</label><br>
  <label><input type="radio" name="l13q3" value="1"> The crontab file format (section 5 = file formats)</label><br>
  <label><input type="radio" name="l13q3" value="2"> The cron daemon</label><br>
  <label><input type="radio" name="l13q3" value="3"> Only section 5 of the crontab command</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="dmesg shows kernel ring buffer messages (hardware detection, drivers, errors). journalctl -k shows kernel messages in the journal. Use them to diagnose hardware or driver issues.">
  <p><strong>Q4.</strong> Which command shows kernel messages (e.g. hardware detection, driver errors)?</p>
  <label><input type="radio" name="l13q4" value="0"> dmesg or journalctl -k</label><br>
  <label><input type="radio" name="l13q4" value="1"> lsmod only</label><br>
  <label><input type="radio" name="l13q4" value="2"> uname -a</label><br>
  <label><input type="radio" name="l13q4" value="3"> cat /proc/kmsg</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Configuration errors often show as filename:line_number: error message. Check that file and line for syntax errors (missing quotes, brackets). Use the appropriate config test tool (e.g. postfix check, named-checkzone).">
  <p><strong>Q5.</strong> A log says '/etc/bind/db.example:17: near '.': extra input text'. What should you do?</p>
  <label><input type="radio" name="l13q5" value="0"> Reboot the server</label><br>
  <label><input type="radio" name="l13q5" value="1"> Delete the file</label><br>
  <label><input type="radio" name="l13q5" value="2"> Run apt update</label><br>
  <label><input type="radio" name="l13q5" value="3"> Check line 17 of /etc/bind/db.example for a syntax error</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="systemctl status servicename shows whether the service is running, enabled, and recent log lines. journalctl -u servicename shows full logs. Use both to diagnose why a service won't start.">
  <p><strong>Q6.</strong> A service won't start. What should you check first?</p>
  <label><input type="radio" name="l13q6" value="0"> Only the firewall</label><br>
  <label><input type="radio" name="l13q6" value="1"> Only the package list</label><br>
  <label><input type="radio" name="l13q6" value="2"> systemctl status servicename and journalctl -u servicename</label><br>
  <label><input type="radio" name="l13q6" value="3"> dmesg only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="For network issues: check interface (ip link, ip addr), routes (ip route), connectivity (ping gateway, ping 8.8.8.8), DNS (dig, resolv.conf), and firewall (ufw status).">
  <p><strong>Q7.</strong> When troubleshooting network connectivity, which steps are useful?</p>
  <label><input type="radio" name="l13q7" value="0"> Only restart the service</label><br>
  <label><input type="radio" name="l13q7" value="1"> Check interface, routes, ping gateway/DNS, and firewall</label><br>
  <label><input type="radio" name="l13q7" value="2"> Only check /etc/hosts</label><br>
  <label><input type="radio" name="l13q7" value="3"> Only run apt upgrade</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Identify the problem, gather info (logs, status, config), reproduce, isolate the cause, test fixes one at a time, and document what worked. Check logs first; read error messages carefully.">
  <p><strong>Q8.</strong> What is a good troubleshooting approach?</p>
  <label><input type="radio" name="l13q8" value="0"> Identify problem, gather info (logs/config), isolate cause, test fixes, document</label><br>
  <label><input type="radio" name="l13q8" value="1"> Change everything at once</label><br>
  <label><input type="radio" name="l13q8" value="2"> Ignore error messages</label><br>
  <label><input type="radio" name="l13q8" value="3"> Reinstall the system first</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man man`, `man -k keyword` — finding and reading man pages; use for every command and config file.
- **Arch Wiki – [General troubleshooting](https://wiki.archlinux.org/title/General_troubleshooting):** Logs, boot, network; distribution-agnostic.
- **Lab:** [Lab Troubleshooting](../lab-assignment/troubleshooting.md) — course-specific issues and solutions.
