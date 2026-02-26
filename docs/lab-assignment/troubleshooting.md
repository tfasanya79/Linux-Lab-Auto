# Troubleshooting Guide

## Common Issues and Solutions

### DNS Issues

#### Zone Not Loading

**Symptoms:**
- Bind9 starts but zone doesn't load
- Errors in logs about zone file

**Solutions:**
1. Check zone file syntax:
   ```bash
   sudo named-checkzone [login].it387g.nsa.his.se /etc/bind/db.[login]
   ```

2. Check file permissions:
   ```bash
   ls -l /etc/bind/db.[login]
   sudo chmod 644 /etc/bind/db.[login]
   ```

3. Check zone file path in named.conf.local

4. Check logs:
   ```bash
   sudo journalctl -u bind9 | tail -20
   ```

#### DNS Not Resolving

**Symptoms:**
- Can't resolve hostnames
- dig returns SERVFAIL

**Solutions:**
1. Check DNS servers are running:
   ```bash
   systemctl status bind9
   ```

2. Check /etc/resolv.conf:
   ```bash
   cat /etc/resolv.conf
   ```

3. Test directly:
   ```bash
   dig @10.[room].[group].11 ns1.[login].it387g.nsa.his.se
   ```

4. Check firewall:
   ```bash
   sudo ufw status
   sudo ufw allow 53/tcp
   sudo ufw allow 53/udp
   ```

#### Zone Transfer Fails

**Symptoms:**
- Slave can't transfer zone from master

**Solutions:**
1. Check allow-transfer on master:
   ```bash
   grep allow-transfer /etc/bind/named.conf.local
   ```

2. Verify slave can reach master:
   ```bash
   ping 10.[room].[group].11
   ```

3. Check firewall allows port 53

4. Test zone transfer:
   ```bash
   dig @10.[room].[group].11 AXFR [login].it387g.nsa.his.se
   ```

### Mail Server Issues

#### Mail Not Sending

**Symptoms:**
- Emails not delivered
- Connection refused

**Solutions:**
1. Check Postfix is running:
   ```bash
   systemctl status postfix
   ```

2. Check DNS MX record:
   ```bash
   dig MX [login].it387g.nsa.his.se
   ```

3. Check Postfix configuration:
   ```bash
   sudo postfix check
   ```

4. Check logs:
   ```bash
   sudo tail -f /var/log/mail.log
   ```

5. Test SMTP:
   ```bash
   telnet localhost 25
   ```

#### Mail Not Receiving

**Symptoms:**
- Emails not arriving
- Bounce messages

**Solutions:**
1. Check DNS MX record points to mail server

2. Check mydestination in main.cf:
   ```bash
   grep mydestination /etc/postfix/main.cf
   ```

3. Check Postfix is listening:
   ```bash
   ss -tuln | grep 25
   ```

4. Check firewall:
   ```bash
   sudo ufw allow 25/tcp
   ```

5. Review mail logs for errors

#### Open Relay Detected

**Symptoms:**
- Can relay emails without authentication
- Security issue!

**Solutions:**
1. Check smtpd_recipient_restrictions:
   ```bash
   grep smtpd_recipient_restrictions /etc/postfix/main.cf
   ```

2. Should include:
   ```
   permit_mynetworks,
   permit_sasl_authenticated,
   reject_unauth_destination
   ```

3. Reload Postfix:
   ```bash
   sudo systemctl reload postfix
   ```

4. Test again with telnet

#### Authentication Failures

**Symptoms:**
- Can't log in to IMAP
- Authentication errors in logs

**Solutions:**
1. Verify user exists:
   ```bash
   id username
   ```

2. Check password is set:
   ```bash
   sudo passwd username
   ```

3. Check Dovecot configuration:
   ```bash
   sudo doveconf
   ```

4. Test IMAP:
   ```bash
   telnet localhost 143
   ```

### Webmail Issues

#### Cannot Access Webmail

**Symptoms:**
- Browser can't connect
- 404 or connection refused

**Solutions:**
1. Check Apache is running:
   ```bash
   systemctl status apache2
   ```

2. Check DNS:
   ```bash
   dig webmail.[login].it387g.nsa.his.se
   ```

3. Check firewall:
   ```bash
   sudo ufw allow 80/tcp
   ```

4. Check Apache logs:
   ```bash
   sudo tail -f /var/log/apache2/error.log
   ```

#### Login Fails

**Symptoms:**
- Can't log in to Roundcube
- Authentication error

**Solutions:**
1. Check IMAP server in Roundcube config:
   ```bash
   grep default_host /etc/roundcube/config.inc.php
   ```

2. Test IMAP connection:
   ```bash
   telnet mail.[login].it387g.nsa.his.se 143
   ```

3. Check Roundcube logs:
   ```bash
   sudo tail -f /var/log/roundcube/errors.log
   ```

4. Verify user credentials

#### Cannot Send Email

**Symptoms:**
- Email sending fails in webmail
- SMTP errors

**Solutions:**
1. Check SMTP server in Roundcube config:
   ```bash
   grep smtp_server /etc/roundcube/config.inc.php
   ```

2. Test SMTP:
   ```bash
   telnet mail.[login].it387g.nsa.his.se 25
   ```

3. Check Postfix is running

4. Review mail logs

### SSH Issues

#### Still Prompts for Password

**Symptoms:**
- SSH asks for password despite key setup

**Solutions:**
1. Check authorized_keys permissions:
   ```bash
   ls -la ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

2. Check .ssh directory permissions:
   ```bash
   chmod 700 ~/.ssh
   ```

3. Verify public key is in authorized_keys:
   ```bash
   cat ~/.ssh/authorized_keys
   ```

4. Check SSH server logs:
   ```bash
   sudo journalctl -u ssh | tail -20
   ```

5. Test with verbose mode:
   ```bash
   ssh -v user@host
   ```

#### Permission Denied

**Symptoms:**
- SSH connection refused
- Permission denied errors

**Solutions:**
1. Check SSH service:
   ```bash
   systemctl status ssh
   ```

2. Check firewall:
   ```bash
   sudo ufw allow 22/tcp
   ```

3. Check SSH server configuration:
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

4. Restart SSH:
   ```bash
   sudo systemctl restart ssh
   ```

### Network Issues

#### Cannot Reach Machines

**Symptoms:**
- Ping fails
- Connection refused

**Solutions:**
1. Check IP configuration:
   ```bash
   ip addr show
   ```

2. Check routes:
   ```bash
   ip route show
   ```

3. Check firewall:
   ```bash
   sudo ufw status
   ```

4. Verify network configuration:
   ```bash
   cat /etc/network/interfaces
   ```

#### DNS Not Working

**Symptoms:**
- Can't resolve hostnames
- Name resolution fails

**Solutions:**
1. Check /etc/resolv.conf:
   ```bash
   cat /etc/resolv.conf
   ```

2. Test DNS servers:
   ```bash
   dig @10.[room].[group].11 google.com
   ```

3. Check DNS servers are running

4. Verify network connectivity to DNS servers

## Reading Logs

### DNS Logs

```bash
# View Bind9 logs
sudo journalctl -u bind9 -f

# Check for errors
sudo journalctl -u bind9 | grep -i error

# View last 50 lines
sudo journalctl -u bind9 -n 50
```

### Mail Logs

```bash
# View mail logs
sudo tail -f /var/log/mail.log

# Filter for Postfix
sudo tail -f /var/log/mail.log | grep postfix

# Filter for Dovecot
sudo tail -f /var/log/mail.log | grep dovecot

# Search for errors
sudo grep -i error /var/log/mail.log
```

### Webmail Logs

```bash
# Roundcube errors
sudo tail -f /var/log/roundcube/errors.log

# Apache errors
sudo tail -f /var/log/apache2/error.log

# Apache access
sudo tail -f /var/log/apache2/access.log
```

### System Logs

```bash
# System log
sudo tail -f /var/log/syslog

# Kernel messages
sudo dmesg | tail -20

# systemd journal
journalctl -f
```

## Log Entry Patterns

### Error with File and Line Number

```
filename:line_number: error message
```

**Example:**
```
/etc/bind/db.example:17: near '.': extra input text
```

**Solution:** Check the specified file at the line number for syntax errors.

### Service Status Messages

```
service[PID]: message
```

**Example:**
```
named[1234]: zone loaded
postfix/smtpd[5678]: connect from host
```

**Solution:** Check service status and configuration.

## Getting Help

### Before Asking for Help

1. **Check logs** - Most issues are logged
2. **Read error messages** - They often tell you what's wrong
3. **Test components** - Isolate the problem
4. **Review configuration** - Check for typos
5. **Search documentation** - Check man pages and guides

### When Asking for Help

Provide:
- What you're trying to do
- What error message you're seeing
- Relevant log entries
- What you've already tried
- Configuration snippets (remove passwords!)

---

**Remember**: Most issues can be solved by checking logs and configuration files!
