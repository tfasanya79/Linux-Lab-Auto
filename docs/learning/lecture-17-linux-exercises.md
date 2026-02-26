# Lecture 17: Linux Exercises

This page offers a short **recap quiz** across topics from earlier lectures. There is no dedicated study guide for "Linux Exercises"; use it to reinforce what you learned in the course and in the lab.

For full notes, use the [Study Guide](../study-guide/index.md) and [Lab Assignment](../lab-assignment/index.md) sections.

<details>
<summary>Key points for exam</summary>

- Recap: systemctl (services), UID 0 (root), SIGTERM before SIGKILL, UUID in fstab, apt update then install
- Lab: DNS, mail, webmail, SSH; report PDF; placeholders [login], [room], [group]; demo checklist
- Commands: man, systemctl, journalctl, ip, ss, apt, mount, useradd, crontab, ssh

</details>

---

<div class="learning-question" data-correct="1" data-explanation="systemctl is the main command for managing systemd services: start, stop, restart, enable, disable, status. Use it for modern service management.">
  <p><strong>Q1.</strong> Which command do you use to start a systemd service?</p>
  <label><input type="radio" name="l17q1" value="0"> service start servicename</label><br>
  <label><input type="radio" name="l17q1" value="1"> systemctl start servicename</label><br>
  <label><input type="radio" name="l17q1" value="2"> start servicename</label><br>
  <label><input type="radio" name="l17q1" value="3"> init start servicename</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Root has UID 0. Normal users are typically 1000+; system accounts 1-999. Only root (UID 0) has full control over the system.">
  <p><strong>Q2.</strong> What is the UID of the root user?</p>
  <label><input type="radio" name="l17q2" value="0"> 0</label><br>
  <label><input type="radio" name="l17q2" value="1"> 1</label><br>
  <label><input type="radio" name="l17q2" value="2"> 1000</label><br>
  <label><input type="radio" name="l17q2" value="3"> 65534</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="SIGTERM asks the process to terminate gracefully (clean up). SIGKILL (kill -9) forces immediate termination and cannot be caught. Prefer SIGTERM first.">
  <p><strong>Q3.</strong> Before using kill -9 (SIGKILL), what should you try?</p>
  <label><input type="radio" name="l17q3" value="0"> Reboot the system</label><br>
  <label><input type="radio" name="l17q3" value="1"> kill -1</label><br>
  <label><input type="radio" name="l17q3" value="2"> kill PID or kill -TERM (SIGTERM) to allow graceful exit</label><br>
  <label><input type="radio" name="l17q3" value="3"> Nothing; always use kill -9</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="UUID in /etc/fstab is stable when device names (e.g. sda/sdb) change. Use lsblk -f or blkid to get UUIDs. Prefer UUID over /dev/sdX for mounting at boot.">
  <p><strong>Q4.</strong> Why use UUID instead of /dev/sda1 in /etc/fstab?</p>
  <label><input type="radio" name="l17q4" value="0"> UUID is shorter</label><br>
  <label><input type="radio" name="l17q4" value="1"> /dev/sda1 is not supported</label><br>
  <label><input type="radio" name="l17q4" value="2"> UUID is required for LVM only</label><br>
  <label><input type="radio" name="l17q4" value="3"> Device names can change; UUID stays the same</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="apt update refreshes the package list from repositories. apt upgrade installs available upgrades. Run update before upgrade or install to get current package info.">
  <p><strong>Q5.</strong> What is the correct order before installing a package?</p>
  <label><input type="radio" name="l17q5" value="0"> apt upgrade then apt install</label><br>
  <label><input type="radio" name="l17q5" value="1"> apt update then apt install</label><br>
  <label><input type="radio" name="l17q5" value="2"> apt install only</label><br>
  <label><input type="radio" name="l17q5" value="3"> dpkg -i only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Study Guide:** [Study Guide index](../study-guide/index.md) — all 17 topics; use for full exam scope.
- **Lab Assignment:** [Lab index](../lab-assignment/index.md), [Checklist](../lab-assignment/checklist.md) — practical exam prep.
- **Quick Reference:** [Commands](../quick-reference/commands.md), [Files and locations](../quick-reference/files-locations.md) — quick lookup.
