# Lecture 2: Lab Assignment

Practice questions for the **Lab Assignment** lecture. For full details, see the [Lab Assignment Guide](../lab-assignment/index.md).

<details>
<summary>Key points for exam</summary>

- Report: single PDF via Canvas, filename [login].pdf; A4, 11pt, TOC, numbered sections
- Placeholders: [login], [room], [group] = your login, room number, computer group
- IP scheme: 10.[room].[group].X (e.g. ns1: .11, ns2: .12, mail: .13, webmail: .14, mgmt: .22)
- Demo: send email via webmail to autoreply@nsa.his.se; show fortune cookie reply; passwordless SSH
- Report content: DNS (MX, A), protocols (SMTP, IMAP, SSH, HTTP), mailbox/aliases, public key
- Components: DNS (Bind9), mail (Postfix/Dovecot), webmail (Roundcube), SSH

</details>

---

<div class="learning-question" data-correct="0" data-explanation="The lab report must be submitted as a single PDF via Canvas. The filename should be your login (e.g. [login].pdf).">
  <p><strong>Q1.</strong> How should the lab report be submitted?</p>
  <label><input type="radio" name="l2q1" value="0"> As a single PDF via Canvas, filename [login].pdf</label><br>
  <label><input type="radio" name="l2q1" value="1"> As multiple Word documents via email</label><br>
  <label><input type="radio" name="l2q1" value="2"> As printed paper in class</label><br>
  <label><input type="radio" name="l2q1" value="3"> As a ZIP file containing config files only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Placeholders [login], [room], and [group] must be replaced with your university login, room number, and computer group number (e.g. domain: [login].it387g.nsa.his.se, IP: 10.[room].[group].X).">
  <p><strong>Q2.</strong> What do the placeholders [login], [room], and [group] represent?</p>
  <label><input type="radio" name="l2q2" value="0"> Optional labels you can leave as-is</label><br>
  <label><input type="radio" name="l2q2" value="1"> Only used in DNS zone files</label><br>
  <label><input type="radio" name="l2q2" value="2"> Your university login, room number, and computer group number</label><br>
  <label><input type="radio" name="l2q2" value="3"> Server hostnames</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="You must demonstrate: (1) sending email via webmail to autoreply@nsa.his.se, (2) showing the response with the fortune cookie, and (3) passwordless SSH from the management machine to the servers.">
  <p><strong>Q3.</strong> Which is part of the demonstration checklist?</p>
  <label><input type="radio" name="l2q3" value="0"> Submitting the report before the demo</label><br>
  <label><input type="radio" name="l2q3" value="1"> Sending email via webmail and showing the autoreply with fortune cookie</label><br>
  <label><input type="radio" name="l2q3" value="2"> Installing Proxmox during the demo</label><br>
  <label><input type="radio" name="l2q3" value="3"> Showing only DNS resolution</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="The report should include DNS records (e.g. MX, A), protocols (SMTP, IMAP, SSH, HTTP), concepts (mailbox, user, aliases), and your public key from the management machine. Format: A4, 11pt, black on white, table of contents, numbered sections.">
  <p><strong>Q4.</strong> What should the lab report cover?</p>
  <label><input type="radio" name="l2q4" value="0"> DNS records, protocols, concepts (mailbox, aliases), and your public key; A4, 11pt, TOC</label><br>
  <label><input type="radio" name="l2q4" value="1"> Only screenshots of each VM</label><br>
  <label><input type="radio" name="l2q4" value="2"> Only configuration file contents with no explanation</label><br>
  <label><input type="radio" name="l2q4" value="3"> A video walkthrough only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="The assignment involves setting up DNS (Bind9 master/slave), a mail server (Postfix + Dovecot), webmail (Roundcube), and SSH with passwordless authentication—all on Debian VMs.">
  <p><strong>Q5.</strong> What does the lab assignment require you to set up?</p>
  <label><input type="radio" name="l2q5" value="0"> Only a web server</label><br>
  <label><input type="radio" name="l2q5" value="1"> Only DNS</label><br>
  <label><input type="radio" name="l2q5" value="2"> Only mail and webmail</label><br>
  <label><input type="radio" name="l2q5" value="3"> DNS (Bind9), mail server (Postfix/Dovecot), webmail (Roundcube), and SSH</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="The IP addressing scheme is 10.[room].[group].X. So if room is 209 and group is 30, machines use 10.209.30.X (e.g. ns1: 10.209.30.11, mgmt: 10.209.30.22).">
  <p><strong>Q6.</strong> What is the lab IP addressing scheme?</p>
  <label><input type="radio" name="l2q6" value="0"> 192.168.1.X</label><br>
  <label><input type="radio" name="l2q6" value="1"> 10.[room].[group].X</label><br>
  <label><input type="radio" name="l2q6" value="2"> 172.16.0.X</label><br>
  <label><input type="radio" name="l2q6" value="3"> 8.8.8.X</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Lab Assignment Guide:** [Lab index](../lab-assignment/index.md), [Checklist](../lab-assignment/checklist.md), [Troubleshooting](../lab-assignment/troubleshooting.md) — course material.
- **Debian:** [Debian Administrator's Handbook](https://debian-handbook.info/) — general Debian admin (networking, DNS, mail concepts).
- **Bind9:** `man named` — authoritative DNS daemon; see lab [DNS Setup](../lab-assignment/dns-setup.md) for config.
