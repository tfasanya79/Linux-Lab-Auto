# Lecture 10: Mail

Practice questions for the **Mail** lecture. For full notes, see the [Study Guide: Mail](../study-guide/mail.md).

<details>
<summary>Key points for exam</summary>

- MUA (client), MSA/MTA (relay, e.g. Postfix), MDA (storage/retrieval, e.g. Dovecot)
- SMTP: 25 (server), 587 (submission), 465 (SMTPS); IMAP 143/993; POP3 110/995
- Flow: MUA → MSA → MTA (DNS MX) → MTA → MDA; MUA ← IMAP/POP3 ← MDA
- Postfix: /etc/postfix/main.cf; Dovecot: /etc/dovecot/; aliases: /etc/aliases, newaliases
- Prevent open relay: smtpd_recipient_restrictions (permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination)
- DNS: MX, A, PTR for deliverability

</details>

---

<div class="learning-question" data-correct="1" data-explanation="The MTA (Mail Transfer Agent) relays mail between servers. Examples: Postfix, Sendmail, Exim. The MUA is the client; the MDA stores and delivers mail for retrieval.">
  <p><strong>Q1.</strong> What is an MTA (Mail Transfer Agent)?</p>
  <label><input type="radio" name="l10q1" value="0"> The mail client (e.g. Thunderbird)</label><br>
  <label><input type="radio" name="l10q1" value="1"> The component that relays mail between servers (e.g. Postfix)</label><br>
  <label><input type="radio" name="l10q1" value="2"> The component that stores mail for retrieval (e.g. Dovecot)</label><br>
  <label><input type="radio" name="l10q1" value="3"> The DNS server</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="SMTP is used for sending mail (MUA to MSA/MTA, and between MTAs). Ports: 25 (server-to-server), 587 (submission), 465 (SMTPS). IMAP/POP3 are for retrieving mail.">
  <p><strong>Q2.</strong> Which protocol is used to send email between servers?</p>
  <label><input type="radio" name="l10q2" value="0"> IMAP</label><br>
  <label><input type="radio" name="l10q2" value="1"> POP3</label><br>
  <label><input type="radio" name="l10q2" value="2"> SMTP</label><br>
  <label><input type="radio" name="l10q2" value="3"> HTTP</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="IMAP is used to access mail stored on the server (centralized storage). Ports 143 (IMAP), 993 (IMAPS). POP3 downloads mail to the client. Both are used by the MUA to talk to the MDA.">
  <p><strong>Q3.</strong> Which protocol do clients use to access mail stored on the server (e.g. Dovecot)?</p>
  <label><input type="radio" name="l10q3" value="0"> IMAP (or POP3)</label><br>
  <label><input type="radio" name="l10q3" value="1"> SMTP only</label><br>
  <label><input type="radio" name="l10q3" value="2"> DNS</label><br>
  <label><input type="radio" name="l10q3" value="3"> FTP</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Postfix main configuration is in /etc/postfix/main.cf (myhostname, mydomain, mydestination, mynetworks, smtpd_recipient_restrictions, etc.). master.cf configures service parameters.">
  <p><strong>Q4.</strong> Where is the main Postfix configuration file?</p>
  <label><input type="radio" name="l10q4" value="0"> /etc/dovecot/dovecot.conf</label><br>
  <label><input type="radio" name="l10q4" value="1"> /etc/mail/postfix.conf</label><br>
  <label><input type="radio" name="l10q4" value="2"> /etc/aliases only</label><br>
  <label><input type="radio" name="l10q4" value="3"> /etc/postfix/main.cf</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Dovecot is an MDA (Mail Delivery Agent) that provides IMAP (and POP3) so users can retrieve mail. Postfix is the MTA that sends and receives mail between servers.">
  <p><strong>Q5.</strong> What is Dovecot typically used for?</p>
  <label><input type="radio" name="l10q5" value="0"> Relaying mail between servers (MTA)</label><br>
  <label><input type="radio" name="l10q5" value="1"> Storing and serving mail for retrieval (IMAP/POP3, MDA)</label><br>
  <label><input type="radio" name="l10q5" value="2"> Sending mail from the client (MUA)</label><br>
  <label><input type="radio" name="l10q5" value="3"> DNS lookups for MX records</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Email delivery depends on DNS: MX records point to mail servers, A records resolve those hostnames. Proper DNS (including PTR for reverse lookups) is important for deliverability.">
  <p><strong>Q6.</strong> Why is DNS important for email?</p>
  <label><input type="radio" name="l10q6" value="0"> MX and A records point to mail servers; MTAs use DNS to find where to deliver mail</label><br>
  <label><input type="radio" name="l10q6" value="1"> DNS encrypts email</label><br>
  <label><input type="radio" name="l10q6" value="2"> DNS stores the mail content</label><br>
  <label><input type="radio" name="l10q6" value="3"> DNS is not used for email</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="An open relay accepts and forwards mail from anyone to any destination, which is abused by spammers. You must restrict relay (e.g. permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination).">
  <p><strong>Q7.</strong> Why must you prevent Postfix from being an open relay?</p>
  <label><input type="radio" name="l10q7" value="0"> It slows down the server</label><br>
  <label><input type="radio" name="l10q7" value="1"> It disables IMAP</label><br>
  <label><input type="radio" name="l10q7" value="2"> Open relay allows anyone to send mail through your server (abuse, spam, blacklisting)</label><br>
  <label><input type="radio" name="l10q7" value="3"> It is required by Dovecot</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Mail aliases map addresses to local users or commands. They are defined in /etc/aliases; run newaliases after editing to rebuild the alias database.">
  <p><strong>Q8.</strong> Where are mail aliases (e.g. postmaster -> root) configured?</p>
  <label><input type="radio" name="l10q8" value="0"> /etc/postfix/main.cf</label><br>
  <label><input type="radio" name="l10q8" value="1"> /etc/aliases (then run newaliases)</label><br>
  <label><input type="radio" name="l10q8" value="2"> /etc/dovecot/aliases.conf</label><br>
  <label><input type="radio" name="l10q8" value="3"> /etc/hosts</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="MUA (Mail User Agent) is the client (Thunderbird, Roundcube, mutt). It sends mail via SMTP to the MSA/MTA and retrieves mail via IMAP/POP3 from the MDA.">
  <p><strong>Q9.</strong> What is an MUA?</p>
  <label><input type="radio" name="l10q9" value="0"> Mail User Agent — the mail client (e.g. Thunderbird, Roundcube)</label><br>
  <label><input type="radio" name="l10q9" value="1"> Mail server that relays between servers</label><br>
  <label><input type="radio" name="l10q9" value="2"> Mail server that stores mail for retrieval</label><br>
  <label><input type="radio" name="l10q9" value="3"> DNS record type</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man 5 aliases`, `man newaliases` — alias format; Postfix/Dovecot docs in /usr/share/doc/.
- **Arch Wiki – [Mail server](https://wiki.archlinux.org/title/Mail_server):** Postfix, Dovecot, concepts; distribution-agnostic.
- **Lab:** [Mail Setup](../lab-assignment/mail-setup.md), [Webmail Setup](../lab-assignment/webmail-setup.md) — course lab.
