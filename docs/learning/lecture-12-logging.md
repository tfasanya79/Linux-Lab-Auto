# Lecture 12: Logging

Practice questions for the **Logging** lecture. For full notes, see the [Study Guide: Logging](../study-guide/logging.md).

<details>
<summary>Key points for exam</summary>

- Syslog: facility (source) + severity (level); message format; /dev/log
- rsyslog: /etc/rsyslog.conf; filter by facility/priority; forward to remote
- journalctl: -u unit, -f, -b, -k, -p err, --since/--until; systemd journal
- logger "message"; tail -f, grep in /var/log; logrotate: rotate, compress, delete old
- Log locations: /var/log/syslog, auth.log, mail.log, apache2/, nginx/

</details>

---

<div class="learning-question" data-correct="1" data-explanation="Syslog is the standard logging mechanism; it defines message format (facility, severity, timestamp, hostname, app, message). Implementations include rsyslog. systemd journal is a separate, modern logging system.">
  <p><strong>Q1.</strong> What is Syslog?</p>
  <label><input type="radio" name="l12q1" value="0"> A command to view the system clock</label><br>
  <label><input type="radio" name="l12q1" value="1"> A standard logging mechanism (format and protocol for log messages)</label><br>
  <label><input type="radio" name="l12q1" value="2"> A type of filesystem</label><br>
  <label><input type="radio" name="l12q1" value="3"> A network protocol for email</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="journalctl is the command to view and filter systemd journal logs. Examples: journalctl -u servicename, journalctl -f (follow), journalctl -b (since boot), journalctl -p err.">
  <p><strong>Q2.</strong> Which command is used to view systemd journal logs?</p>
  <label><input type="radio" name="l12q2" value="0"> syslog</label><br>
  <label><input type="radio" name="l12q2" value="1"> dmesg only</label><br>
  <label><input type="radio" name="l12q2" value="2"> journalctl</label><br>
  <label><input type="radio" name="l12q2" value="3"> logview</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Facility indicates the source/category (e.g. LOG_MAIL, LOG_CRON, LOG_AUTH). Severity indicates importance (LOG_DEBUG, LOG_INFO, LOG_ERR, etc.). Both are part of the log message format.">
  <p><strong>Q3.</strong> In Syslog, what do 'facility' and 'severity' represent?</p>
  <label><input type="radio" name="l12q3" value="0"> Facility = source/category of the message; severity = level of importance</label><br>
  <label><input type="radio" name="l12q3" value="1"> Facility = file path; severity = file size</label><br>
  <label><input type="radio" name="l12q3" value="2"> Facility = username; severity = password</label><br>
  <label><input type="radio" name="l12q3" value="3"> They are the same thing</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="logger sends messages to the system log (e.g. syslog or journal). Example: logger 'message', logger -t tag 'message', logger -p mail.info 'message'.">
  <p><strong>Q4.</strong> How do you write a message to the system log from the command line?</p>
  <label><input type="radio" name="l12q4" value="0"> echo message > /var/log/syslog</label><br>
  <label><input type="radio" name="l12q4" value="1"> log message</label><br>
  <label><input type="radio" name="l12q4" value="2"> journalctl add message</label><br>
  <label><input type="radio" name="l12q4" value="3"> logger 'message'</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="tail -f /var/log/syslog follows the log file (shows new lines as they are written). tail -n N shows the last N lines. Useful for watching logs in real time.">
  <p><strong>Q5.</strong> How do you follow a log file in real time (see new entries as they appear)?</p>
  <label><input type="radio" name="l12q5" value="0"> head -f /var/log/syslog</label><br>
  <label><input type="radio" name="l12q5" value="1"> tail -f /var/log/syslog</label><br>
  <label><input type="radio" name="l12q5" value="2"> cat /var/log/syslog</label><br>
  <label><input type="radio" name="l12q5" value="3"> less /var/log/syslog</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="journalctl -u servicename shows logs for that systemd unit. -f follows, -b is since boot, -p err filters by priority.">
  <p><strong>Q6.</strong> How do you view journal logs for a specific systemd service?</p>
  <label><input type="radio" name="l12q6" value="0"> journalctl -u servicename</label><br>
  <label><input type="radio" name="l12q6" value="1"> journalctl /etc/systemd/system/servicename</label><br>
  <label><input type="radio" name="l12q6" value="2"> tail -f /var/log/servicename</label><br>
  <label><input type="radio" name="l12q6" value="3"> systemctl log servicename</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Log rotation (e.g. logrotate) rotates, compresses, and optionally deletes old log files so they do not fill the disk. Configured in /etc/logrotate.conf and /etc/logrotate.d/.">
  <p><strong>Q7.</strong> What is log rotation used for?</p>
  <label><input type="radio" name="l12q7" value="0"> Rotating the system clock</label><br>
  <label><input type="radio" name="l12q7" value="1"> Encrypting log files</label><br>
  <label><input type="radio" name="l12q7" value="2"> Limiting log file size/age (rotate, compress, delete old) to prevent disk full</label><br>
  <label><input type="radio" name="l12q7" value="3"> Sending logs to a remote server only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="rsyslog is a common Syslog implementation (e.g. on Debian). It can filter by facility/priority, write to files, and forward to remote collectors. Configuration is in /etc/rsyslog.conf.">
  <p><strong>Q8.</strong> What is rsyslog?</p>
  <label><input type="radio" name="l12q8" value="0"> A type of systemd timer</label><br>
  <label><input type="radio" name="l12q8" value="1"> A mail server</label><br>
  <label><input type="radio" name="l12q8" value="2"> A shell</label><br>
  <label><input type="radio" name="l12q8" value="3"> A Syslog implementation that filters and stores log messages</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Syslog severity levels (low to high): DEBUG, INFO, NOTICE, WARNING, ERR, CRIT, ALERT, EMERG. Facility identifies source (e.g. mail, auth, cron). Both are part of the log message format.">
  <p><strong>Q9.</strong> What do 'facility' and 'severity' mean in Syslog?</p>
  <label><input type="radio" name="l12q9" value="0"> Facility = source/category (e.g. mail, cron); severity = importance level (e.g. err, info)</label><br>
  <label><input type="radio" name="l12q9" value="1"> Facility = file path; severity = file size</label><br>
  <label><input type="radio" name="l12q9" value="2"> They are the same</label><br>
  <label><input type="radio" name="l12q9" value="3"> Facility = username; severity = password</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man journalctl`, `man logger`, `man 5 rsyslog.conf` — journal, logger, rsyslog config.
- **Arch Wiki – [systemd/Journal](https://wiki.archlinux.org/title/Systemd/Journal):** journalctl, persistence; distribution-agnostic.
- **RFC 5424:** Syslog protocol — [tools.ietf.org](https://tools.ietf.org/html/rfc5424) (protocol details if needed).
