# Lecture 11: Scheduling

Practice questions for the **Scheduling** lecture. For full notes, see the [Study Guide: Scheduling](../study-guide/scheduling.md).

<details>
<summary>Key points for exam</summary>

- cron: time-based; crontab -e/-l/-r; format: minute hour day month weekday command
- Named: @reboot, @daily, @hourly, etc.; use absolute paths; MAILTO for notifications
- Anacron: for systems that may be off; runs when up (daily/weekly/monthly)
- systemd timers: .timer unit, OnCalendar=; systemctl list-timers, enable timer.timer
- Cron assumes system is on at scheduled time; missed runs are skipped

</details>

---

<div class="learning-question" data-correct="0" data-explanation="Cron is a time-based job scheduler. You edit the crontab with crontab -e; the format is: minute hour day month weekday command. cron assumes the system is running at the scheduled time.">
  <p><strong>Q1.</strong> What is cron?</p>
  <label><input type="radio" name="l11q1" value="0"> A time-based job scheduler (run commands at specified times)</label><br>
  <label><input type="radio" name="l11q1" value="1"> A mail transfer agent</label><br>
  <label><input type="radio" name="l11q1" value="2"> A text editor</label><br>
  <label><input type="radio" name="l11q1" value="3"> A filesystem type</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Crontab format: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-7), then the command. So the five time fields come first.">
  <p><strong>Q2.</strong> What is the order of the five time fields in a crontab entry?</p>
  <label><input type="radio" name="l11q2" value="0"> hour minute day month weekday</label><br>
  <label><input type="radio" name="l11q2" value="1"> day month weekday hour minute</label><br>
  <label><input type="radio" name="l11q2" value="2"> minute hour day month weekday</label><br>
  <label><input type="radio" name="l11q2" value="3"> weekday day month hour minute</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="crontab -e edits your crontab; crontab -l lists it; crontab -r removes it. Do not edit files in /var/spool/cron manually.">
  <p><strong>Q3.</strong> How do you edit your user crontab?</p>
  <label><input type="radio" name="l11q3" value="0"> Edit /etc/crontab directly</label><br>
  <label><input type="radio" name="l11q3" value="1"> crontab -e</label><br>
  <label><input type="radio" name="l11q3" value="2"> cron --edit</label><br>
  <label><input type="radio" name="l11q3" value="3"> systemctl edit cron</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Anacron runs periodic jobs (daily, weekly, monthly) but does not assume the system is always on. If the system was off at the scheduled time, anacron runs the job when it is next up. Good for laptops or machines that reboot.">
  <p><strong>Q4.</strong> When is Anacron preferred over cron?</p>
  <label><input type="radio" name="l11q4" value="0"> When you need sub-minute precision</label><br>
  <label><input type="radio" name="l11q4" value="1"> When you need to run every second</label><br>
  <label><input type="radio" name="l11q4" value="2"> When you only run at reboot</label><br>
  <label><input type="radio" name="l11q4" value="3"> When the system may be off at the scheduled time (e.g. daily jobs on a laptop)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="systemd timers are unit files (.timer) that trigger .service units on a schedule. Use systemctl list-timers, systemctl enable timer.timer, and journalctl -u timer.timer. They integrate with systemd.">
  <p><strong>Q5.</strong> What are systemd timers?</p>
  <label><input type="radio" name="l11q5" value="0"> A systemd-based way to run units on a schedule (alternative to cron)</label><br>
  <label><input type="radio" name="l11q5" value="1"> A type of cron job</label><br>
  <label><input type="radio" name="l11q5" value="2"> A clock daemon</label><br>
  <label><input type="radio" name="l11q5" value="3"> A mail delivery timer</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="@daily (or @midnight) runs once per day at midnight. Other named times: @hourly, @weekly, @monthly, @yearly, @reboot.">
  <p><strong>Q6.</strong> In crontab, what does @daily mean?</p>
  <label><input type="radio" name="l11q6" value="0"> Every hour</label><br>
  <label><input type="radio" name="l11q6" value="1"> Every minute</label><br>
  <label><input type="radio" name="l11q6" value="2"> Once per day (at midnight)</label><br>
  <label><input type="radio" name="l11q6" value="3"> Only on weekdays</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Use absolute paths in crontab because cron runs with a minimal environment (e.g. PATH may not include /usr/local/bin). Relative paths and commands can fail with 'command not found'.">
  <p><strong>Q7.</strong> Why should scheduled commands in crontab use absolute paths?</p>
  <label><input type="radio" name="l11q7" value="0"> Cron requires it by default</label><br>
  <label><input type="radio" name="l11q7" value="1"> Cron's PATH is minimal; relative paths may not be found</label><br>
  <label><input type="radio" name="l11q7" value="2"> Absolute paths are faster</label><br>
  <label><input type="radio" name="l11q7" value="3"> Only root can use relative paths</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="0 2 * * * means: minute 0, hour 2, every day of month, every month, every day of week — i.e. every day at 2:00 AM.">
  <p><strong>Q8.</strong> What does the crontab entry '0 2 * * * /usr/local/bin/backup.sh' do?</p>
  <label><input type="radio" name="l11q8" value="0"> Runs backup.sh every day at 2:00 AM</label><br>
  <label><input type="radio" name="l11q8" value="1"> Runs backup.sh every 2 minutes</label><br>
  <label><input type="radio" name="l11q8" value="2"> Runs backup.sh only in February</label><br>
  <label><input type="radio" name="l11q8" value="3"> Runs backup.sh twice a day</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="If the system is off when a cron job is scheduled, that run is skipped. Cron does not catch up. Use Anacron for daily/weekly/monthly jobs on machines that may be off (e.g. laptops).">
  <p><strong>Q9.</strong> What happens to a cron job if the system is powered off at the scheduled time?</p>
  <label><input type="radio" name="l11q9" value="0"> It runs as soon as the system boots</label><br>
  <label><input type="radio" name="l11q9" value="1"> It runs twice at the next scheduled time</label><br>
  <label><input type="radio" name="l11q9" value="2"> That run is skipped; cron does not catch up</label><br>
  <label><input type="radio" name="l11q9" value="3"> Cron sends an email to the admin</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man 5 crontab`, `man crontab` — crontab format and command.
- **Arch Wiki – [Cron](https://wiki.archlinux.org/title/Cron), [systemd/Timers](https://wiki.archlinux.org/title/Systemd/Timers):** cron and systemd timers; distribution-agnostic.
- **systemd timers:** `man systemd.timer` — OnCalendar syntax and options.
