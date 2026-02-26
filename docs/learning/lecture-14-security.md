# Lecture 14: Security

Practice questions for the **Security** lecture. For full notes, see the [Study Guide: Security](../study-guide/security.md).

<details>
<summary>Key points for exam</summary>

- SSH: encrypted login, exec, file transfer (scp, sftp); OpenSSH; Protocol 2 only (disable v1)
- Key-based auth: private key on client, public key in ~/.ssh/authorized_keys on server; ssh-keygen, ssh-copy-id
- sshd_config: Protocol 2, PasswordAuthentication, PermitRootLogin, Port; reload sshd
- ufw: allow/deny ports; iptables (lower-level); run services as non-root (User= in systemd)
- Best: keep updated, strong passwords or keys, firewall, limit sudo, monitor logs

</details>

---

<div class="learning-question" data-correct="1" data-explanation="SSH (Secure Shell) provides encrypted remote login, remote command execution, and secure file transfer (scp, sftp). It replaced unencrypted tools like telnet and rlogin.">
  <p><strong>Q1.</strong> What does SSH provide?</p>
  <label><input type="radio" name="l14q1" value="0"> Unencrypted remote login only</label><br>
  <label><input type="radio" name="l14q1" value="1"> Encrypted remote login, command execution, and file transfer</label><br>
  <label><input type="radio" name="l14q1" value="2"> Only file transfer</label><br>
  <label><input type="radio" name="l14q1" value="3"> Only DNS lookups</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="For public key auth, the private key stays on the client; the public key must be on the server in ~/.ssh/authorized_keys (for the user you log in as). Never share the private key.">
  <p><strong>Q2.</strong> Where must the public key be placed for SSH public key authentication?</p>
  <label><input type="radio" name="l14q2" value="0"> On the client only</label><br>
  <label><input type="radio" name="l14q2" value="1"> In /etc/ssh/authorized_keys</label><br>
  <label><input type="radio" name="l14q2" value="2"> In ~/.ssh/authorized_keys on the server (in the target user's home)</label><br>
  <label><input type="radio" name="l14q2" value="3"> In /etc/passwd</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="ssh-keygen -t rsa -b 4096 (or ed25519) creates a key pair. ssh-copy-id user@host copies the public key to the server. Then you can log in without a password (if password auth is still allowed or you use the key).">
  <p><strong>Q3.</strong> How do you set up SSH key-based authentication?</p>
  <label><input type="radio" name="l14q3" value="0"> ssh-keygen to create keys, then ssh-copy-id (or copy pub key to authorized_keys)</label><br>
  <label><input type="radio" name="l14q3" value="1"> Only change the password</label><br>
  <label><input type="radio" name="l14q3" value="2"> Edit /etc/ssh/sshd_config only</label><br>
  <label><input type="radio" name="l14q3" value="3"> Run ssh-install</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Server-side SSH daemon config is in /etc/ssh/sshd_config. You can set Protocol 2, PasswordAuthentication no, PermitRootLogin no, Port, etc. Reload with systemctl reload sshd (or ssh).">
  <p><strong>Q4.</strong> Where is the SSH server (sshd) configuration file?</p>
  <label><input type="radio" name="l14q4" value="0"> ~/.ssh/config</label><br>
  <label><input type="radio" name="l14q4" value="1"> /etc/ssh/ssh_config</label><br>
  <label><input type="radio" name="l14q4" value="2"> /etc/sshd.conf</label><br>
  <label><input type="radio" name="l14q4" value="3"> /etc/ssh/sshd_config</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="SSH protocol version 1 has known weaknesses; it should be disabled. Use Protocol 2 only in sshd_config. OpenSSH and modern deployments use protocol 2.">
  <p><strong>Q5.</strong> Why should SSH protocol version 1 be disabled?</p>
  <label><input type="radio" name="l14q5" value="0"> It is faster than version 2</label><br>
  <label><input type="radio" name="l14q5" value="1"> It has known security weaknesses; protocol 2 should be used instead</label><br>
  <label><input type="radio" name="l14q5" value="2"> It is not supported by OpenSSH</label><br>
  <label><input type="radio" name="l14q5" value="3"> It is required for Windows only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Security best practices: keep system updated, use strong passwords or keys, disable unused services, use a firewall, monitor logs, limit sudo access, and run services as non-root when possible.">
  <p><strong>Q6.</strong> Which is a good security practice?</p>
  <label><input type="radio" name="l14q6" value="0"> Use SSH keys, keep system updated, use firewall, limit sudo</label><br>
  <label><input type="radio" name="l14q6" value="1"> Disable all firewalls</label><br>
  <label><input type="radio" name="l14q6" value="2"> Allow root login with password over SSH</label><br>
  <label><input type="radio" name="l14q6" value="3"> Never apply updates</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="ufw (Uncomplicated Firewall) is a front-end for iptables. ufw allow 22/tcp allows SSH; ufw enable turns it on; ufw status shows rules. Use it to restrict which ports are open.">
  <p><strong>Q7.</strong> What is ufw used for?</p>
  <label><input type="radio" name="l14q7" value="0"> User account management</label><br>
  <label><input type="radio" name="l14q7" value="1"> Package updates only</label><br>
  <label><input type="radio" name="l14q7" value="2"> Configuring a firewall (allow/deny ports and addresses)</label><br>
  <label><input type="radio" name="l14q7" value="3"> DNS configuration</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Running services as a non-root user (e.g. www-data) limits damage if the service is compromised. Use User= and Group= in systemd unit files; limit capabilities and filesystem access.">
  <p><strong>Q8.</strong> Why run a network service as a non-root user?</p>
  <label><input type="radio" name="l14q8" value="0"> It is faster</label><br>
  <label><input type="radio" name="l14q8" value="1"> Root cannot bind to ports</label><br>
  <label><input type="radio" name="l14q8" value="2"> It is required by systemd</label><br>
  <label><input type="radio" name="l14q8" value="3"> To limit damage if the service is compromised (principle of least privilege)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man ssh`, `man sshd_config`, `man ssh-keygen` — SSH client, server config, key generation.
- **Arch Wiki – [SSH](https://wiki.archlinux.org/title/SSH):** Key-based auth, hardening; distribution-agnostic.
- **RFC 4251:** SSH protocol — [tools.ietf.org](https://tools.ietf.org/html/rfc4251) (protocol overview if needed).
