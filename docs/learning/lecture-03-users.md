# Lecture 3: Users

Practice questions for the **Users** lecture. For full notes, see the [Study Guide: Users](../study-guide/users.md).

<details>
<summary>Key points for exam</summary>

- UID: root=0, system=1–999, normal≥1000, nobody=65534 (or 99)
- /etc/passwd: username, x, UID, GID, comment, home, shell; /etc/shadow = encrypted passwords (root only)
- /etc/group: groupname, x, GID, members; GID scheme matches UID
- PAM: /etc/pam.d/; pluggable auth for login, sudo, etc.
- su = switch user (needs target password); sudo = run as root (your password, audit trail); prefer sudo
- sudoers: /etc/sudoers (visudo); useradd, usermod, userdel, passwd, groupadd, gpasswd
- Only root: set clock, raise limits, network config, privileged ports, assume any UID, shutdown

</details>

---

<div class="learning-question" data-correct="1" data-explanation="The root user always has UID 0. This is a fixed convention in Unix/Linux; the superuser is always UID 0.">
  <p><strong>Q1.</strong> What is the UID of the root user?</p>
  <label><input type="radio" name="l3q1" value="0"> 1000</label><br>
  <label><input type="radio" name="l3q1" value="1"> 0</label><br>
  <label><input type="radio" name="l3q1" value="2"> 65534</label><br>
  <label><input type="radio" name="l3q1" value="3"> 1</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Normal (human) user accounts use UIDs from 1000 upward. System/daemon accounts typically use 1–999; root is 0; nobody is often 65534.">
  <p><strong>Q2.</strong> In which UID range are normal (human) user accounts typically created?</p>
  <label><input type="radio" name="l3q2" value="0"> 1000 and above</label><br>
  <label><input type="radio" name="l3q2" value="1"> 1–999</label><br>
  <label><input type="radio" name="l3q2" value="2"> 0 only</label><br>
  <label><input type="radio" name="l3q2" value="3"> 65534</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="The nobody user (UID 65534 or 99) is used for network filesystems and services to represent remote or unprivileged users without a matching local account.">
  <p><strong>Q3.</strong> What is the 'nobody' user typically used for?</p>
  <label><input type="radio" name="l3q3" value="0"> The default login when no username is given</label><br>
  <label><input type="radio" name="l3q3" value="1"> Running the graphical desktop</label><br>
  <label><input type="radio" name="l3q3" value="2"> Representing remote/unprivileged users (e.g. network filesystems) without a local account</label><br>
  <label><input type="radio" name="l3q3" value="3"> System daemons only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="PAM (Pluggable Authentication Modules) provides configurable authentication for applications. Configuration lives in /etc/pam.d/ per service.">
  <p><strong>Q4.</strong> What does PAM provide?</p>
  <label><input type="radio" name="l3q4" value="0"> Pluggable, configurable authentication for applications (e.g. login, sudo)</label><br>
  <label><input type="radio" name="l3q4" value="1"> Only password hashing</label><br>
  <label><input type="radio" name="l3q4" value="2"> Only group membership</label><br>
  <label><input type="radio" name="l3q4" value="3"> Disk quotas</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="sudo lets you run commands as root (or another user) using your own password and leaves an audit trail. Prefer sudo over logging in as root.">
  <p><strong>Q5.</strong> Why is sudo preferred over logging in as root?</p>
  <label><input type="radio" name="l3q5" value="0"> sudo is faster than su</label><br>
  <label><input type="radio" name="l3q5" value="1"> Better audit trail and you use your own password; principle of least privilege</label><br>
  <label><input type="radio" name="l3q5" value="2"> root account is always disabled</label><br>
  <label><input type="radio" name="l3q5" value="3"> sudo does not require a password</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="/etc/passwd holds account info (username, UID, GID, comment, home, shell). The actual encrypted passwords are stored in /etc/shadow, which is readable only by root.">
  <p><strong>Q6.</strong> Where are encrypted passwords stored?</p>
  <label><input type="radio" name="l3q6" value="0"> In /etc/passwd</label><br>
  <label><input type="radio" name="l3q6" value="1"> In /etc/group</label><br>
  <label><input type="radio" name="l3q6" value="2"> In /etc/sudoers</label><br>
  <label><input type="radio" name="l3q6" value="3"> In /etc/shadow</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="System accounts use UIDs in the range 1–999 for daemons and services (e.g. sshd, www-data). They usually have login disabled.">
  <p><strong>Q7.</strong> Which UID range is typically used for system/daemon accounts?</p>
  <label><input type="radio" name="l3q7" value="0"> 1–999</label><br>
  <label><input type="radio" name="l3q7" value="1"> 0</label><br>
  <label><input type="radio" name="l3q7" value="2"> 1000–1999</label><br>
  <label><input type="radio" name="l3q7" value="3"> 65534</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="The sudoers file (/etc/sudoers) defines who may run which commands as root. Edit it with visudo to avoid syntax errors and locking yourself out.">
  <p><strong>Q8.</strong> Which file controls who can use sudo and what they can run?</p>
  <label><input type="radio" name="l3q8" value="0"> /etc/passwd</label><br>
  <label><input type="radio" name="l3q8" value="1"> /etc/shadow</label><br>
  <label><input type="radio" name="l3q8" value="2"> /etc/sudoers</label><br>
  <label><input type="radio" name="l3q8" value="3"> /etc/pam.d/sudo</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Groups have a GID; users can belong to multiple groups with one primary (in /etc/passwd). Group membership is used for file access control. /etc/group lists groupname:x:GID:members.">
  <p><strong>Q9.</strong> What is the purpose of groups in Linux?</p>
  <label><input type="radio" name="l3q9" value="0"> Only to run cron jobs</label><br>
  <label><input type="radio" name="l3q9" value="1"> To group users for access control; each user has a primary group and can be in others</label><br>
  <label><input type="radio" name="l3q9" value="2"> To store passwords</label><br>
  <label><input type="radio" name="l3q9" value="3"> Only for the root user</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="useradd adds a new user (e.g. useradd -m -s /bin/bash name). userdel removes a user (-r removes home). usermod modifies (shell, groups, home, lock). passwd sets password.">
  <p><strong>Q10.</strong> Which command adds a new user with a home directory?</p>
  <label><input type="radio" name="l3q10" value="0"> useradd -m (e.g. useradd -m -s /bin/bash username)</label><br>
  <label><input type="radio" name="l3q10" value="1"> adduser only (Debian wrapper)</label><br>
  <label><input type="radio" name="l3q10" value="2"> usercreate</label><br>
  <label><input type="radio" name="l3q10" value="3"> newuser</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Only root can perform system-wide actions: set system clock, raise resource limits, configure network (IP), listen on ports &lt;1024, assume any UID/GID, reboot/shutdown. Normal users cannot.">
  <p><strong>Q11.</strong> Which can only root do?</p>
  <label><input type="radio" name="l3q11" value="0"> Read /etc/passwd</label><br>
  <label><input type="radio" name="l3q11" value="1"> Run any command in their home directory</label><br>
  <label><input type="radio" name="l3q11" value="2"> Set system clock, listen on port 22, assume another user's UID</label><br>
  <label><input type="radio" name="l3q11" value="3"> Use sudo</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="su - switches to another user (e.g. root) and requires that user's password. sudo runs a command as root using your password and logs who did what. Prefer sudo for audit trail.">
  <p><strong>Q12.</strong> What is the main difference between 'su -' and 'sudo'?</p>
  <label><input type="radio" name="l3q12" value="0"> They are the same</label><br>
  <label><input type="radio" name="l3q12" value="1"> su requires target user's password; sudo uses your password and logs the command</label><br>
  <label><input type="radio" name="l3q12" value="2"> sudo only works for root</label><br>
  <label><input type="radio" name="l3q12" value="3"> su is only for login shells</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man 5 passwd`, `man 5 shadow`, `man 8 useradd`, `man 8 usermod`, `man 8 groupadd`, `man sudoers` — authoritative syntax and options.
- **Arch Wiki – [Users and groups](https://wiki.archlinux.org/title/Users_and_groups):** UID/GID, files, commands; distribution-agnostic.
- **PAM:** [Linux-PAM](https://github.com/linux-pam/linux-pam) — PAM modules and configuration (see /etc/pam.d/).
