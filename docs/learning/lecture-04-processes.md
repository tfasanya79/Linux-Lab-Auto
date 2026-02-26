# Lecture 4: Processes

Practice questions for the **Processes** lecture. For full notes, see the [Study Guide: Processes](../study-guide/processes.md).

<details>
<summary>Key points for exam</summary>

- PID, PPID; PID 1 = init/systemd (ancestor of all)
- States: R (running), S (sleeping), D (uninterruptible), T (stopped), Z (zombie)
- Signals: SIGTERM (graceful), SIGKILL (cannot catch), SIGTSTP (Ctrl+Z), SIGCONT
- nice: -20 to 19; higher = lower CPU priority; only root can decrease (increase priority)
- kill, pkill, killall; jobs, fg, bg; ulimit
- /proc/PID/: status, cmdline, fd; ps, top, htop, pstree

</details>

---

<div class="learning-question" data-correct="1" data-explanation="The first process started by the kernel is init (or systemd); it has PID 1 and is the ancestor of all other processes.">
  <p><strong>Q1.</strong> Which process has PID 1?</p>
  <label><input type="radio" name="l4q1" value="0"> The kernel</label><br>
  <label><input type="radio" name="l4q1" value="1"> init (or systemd)</label><br>
  <label><input type="radio" name="l4q1" value="2"> The first user login</label><br>
  <label><input type="radio" name="l4q1" value="3"> cron</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="PPID is the Parent Process ID. Every process (except PID 1) has a parent; the kernel assigns PPID so you can build a process tree.">
  <p><strong>Q2.</strong> What does PPID mean?</p>
  <label><input type="radio" name="l4q2" value="0"> Primary Process ID</label><br>
  <label><input type="radio" name="l4q2" value="1"> Priority Process ID</label><br>
  <label><input type="radio" name="l4q2" value="2"> Parent Process ID</label><br>
  <label><input type="radio" name="l4q2" value="3"> Public Process ID</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="SIGKILL (signal 9) cannot be caught, blocked, or ignored. The process is terminated immediately. Use it as a last resort when SIGTERM fails.">
  <p><strong>Q3.</strong> What is true about SIGKILL?</p>
  <label><input type="radio" name="l4q3" value="0"> It cannot be caught or ignored; the process is terminated immediately</label><br>
  <label><input type="radio" name="l4q3" value="1"> It asks the process to shut down gracefully</label><br>
  <label><input type="radio" name="l4q3" value="2"> It pauses the process (like Ctrl+Z)</label><br>
  <label><input type="radio" name="l4q3" value="3"> It is the same as SIGTERM</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="SIGTERM asks the process to terminate gracefully so it can clean up. You should try SIGTERM before using SIGKILL (kill -9).">
  <p><strong>Q4.</strong> Which signal should you try first when stopping a process?</p>
  <label><input type="radio" name="l4q4" value="0"> SIGKILL</label><br>
  <label><input type="radio" name="l4q4" value="1"> SIGTERM</label><br>
  <label><input type="radio" name="l4q4" value="2"> SIGSTOP</label><br>
  <label><input type="radio" name="l4q4" value="3"> SIGHUP</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Pressing Ctrl+Z in the terminal sends SIGTSTP, which stops the process and puts it in the background in a stopped state. You can resume with fg or bg.">
  <p><strong>Q5.</strong> What does Ctrl+Z do to a foreground process?</p>
  <label><input type="radio" name="l4q5" value="0"> Kills the process</label><br>
  <label><input type="radio" name="l4q5" value="1"> Sends SIGTERM</label><br>
  <label><input type="radio" name="l4q5" value="2"> Sends SIGKILL</label><br>
  <label><input type="radio" name="l4q5" value="3"> Stops the process and puts it in the background (SIGTSTP)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="A higher nice value (e.g. 19) means the process is 'nicer' to others and gets lower CPU priority. Lower or negative values (e.g. -20) mean higher priority. Range is -20 to 19.">
  <p><strong>Q6.</strong> What does a higher nice value mean for CPU priority?</p>
  <label><input type="radio" name="l4q6" value="0"> Lower CPU priority (process is 'nicer' to other processes)</label><br>
  <label><input type="radio" name="l4q6" value="1"> Higher CPU priority</label><br>
  <label><input type="radio" name="l4q6" value="2"> No effect</label><br>
  <label><input type="radio" name="l4q6" value="3"> Same as root priority</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="A zombie (Z) process has terminated but has not been reaped by its parent. The kernel keeps a minimal entry until the parent calls wait(). Cleaning up usually means fixing or restarting the parent.">
  <p><strong>Q7.</strong> What is a zombie process?</p>
  <label><input type="radio" name="l4q7" value="0"> A process that is sleeping</label><br>
  <label><input type="radio" name="l4q7" value="1"> A process with highest priority</label><br>
  <label><input type="radio" name="l4q7" value="2"> A process that has terminated but has not been reaped by its parent</label><br>
  <label><input type="radio" name="l4q7" value="3"> A process running in the background</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Process states include Running (R), Sleeping (S), Uninterruptible sleep (D), Stopped (T), and Zombie (Z). Only root can increase priority (lower nice value).">
  <p><strong>Q8.</strong> Which of these is a valid process state?</p>
  <label><input type="radio" name="l4q8" value="0"> Pending</label><br>
  <label><input type="radio" name="l4q8" value="1"> Stopped (T)</label><br>
  <label><input type="radio" name="l4q8" value="2"> Idle</label><br>
  <label><input type="radio" name="l4q8" value="3"> Queued</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="After Ctrl+Z the process is stopped in the background. fg brings it to foreground; bg runs it in background (still stopped until it continues). jobs lists shell jobs.">
  <p><strong>Q9.</strong> After pressing Ctrl+Z, how do you bring the stopped job back to the foreground?</p>
  <label><input type="radio" name="l4q9" value="0"> bg</label><br>
  <label><input type="radio" name="l4q9" value="1"> kill -CONT</label><br>
  <label><input type="radio" name="l4q9" value="2"> fg (or fg %jobnumber)</label><br>
  <label><input type="radio" name="l4q9" value="3"> restart</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="ulimit shows/sets per-process limits (e.g. open files, processes). ulimit -a shows all. Limits can be set in /etc/security/limits.conf for persistence. Only root can raise hard limits.">
  <p><strong>Q10.</strong> What does 'ulimit' control?</p>
  <label><input type="radio" name="l4q10" value="0"> Per-process resource limits (e.g. open files, max processes)</label><br>
  <label><input type="radio" name="l4q10" value="1"> Only CPU time</label><br>
  <label><input type="radio" name="l4q10" value="2"> Only memory</label><br>
  <label><input type="radio" name="l4q10" value="3"> System-wide disk quota</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="The /proc filesystem is virtual; it exposes kernel and process info. /proc/PID/ has status, cmdline, fd, cwd, exe, etc. Processes can be inspected without special privileges (for own or readable entries).">
  <p><strong>Q11.</strong> What is /proc used for?</p>
  <label><input type="radio" name="l4q11" value="0"> Storing user configuration</label><br>
  <label><input type="radio" name="l4q11" value="1"> Exposing kernel and process information (e.g. /proc/PID/status, cmdline)</label><br>
  <label><input type="radio" name="l4q11" value="2"> Storing cron jobs</label><br>
  <label><input type="radio" name="l4q11" value="3"> Boot scripts only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man kill`, `man ps`, `man nice`, `man proc` — signals, process listing, priority, /proc layout.
- **Arch Wiki – [Process management](https://wiki.archlinux.org/title/Process_management):** Signals, nice, background jobs; distribution-agnostic.
- **Signals:** `man 7 signal` — list of signals and default actions.
