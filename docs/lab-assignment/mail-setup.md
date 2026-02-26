# Mail Server Setup

## Overview

Install and configure Postfix (SMTP) and Dovecot (IMAP) on the mail server.

## Prerequisites

- Mail server VM created (IP: `10.[room].[group].13`)
- DNS configured with MX record pointing to mail server
- DNS resolving correctly

## Installation

### Step 1: Install Postfix and Dovecot

1. **SSH to mail server:**
   ```bash
   ssh username@10.[room].[group].13
   ```

2. **Update package list:**
   ```bash
   sudo apt update
   ```
   - Wait for update to complete

3. **Install Postfix (will prompt for configuration):**
   ```bash
   sudo apt install postfix -y
   ```
   - If prompted during installation:
     - **General type of mail configuration:** Select "Internet Site"
     - **System mail name:** Enter `[login].it387g.nsa.his.se` (replace [login])
     - Press Tab to move between options, Enter to confirm

4. **Install Dovecot packages:**
   ```bash
   sudo apt install dovecot-core dovecot-imapd -y
   ```
   - No configuration prompts for Dovecot

5. **Verify installations:**
   ```bash
   which postfix
   which dovecot
   systemctl status postfix
   systemctl status dovecot
   ```
   - Both services should be installed
   - Services may be inactive (we'll configure them next)
   - **📸 Screenshot Point:** Take screenshot showing both packages installed

## Postfix Configuration

### Step 2: Backup Original Configuration

1. **Backup main.cf:**
   ```bash
   sudo cp /etc/postfix/main.cf /etc/postfix/main.cf.orig
   ```

2. **Verify backup:**
   ```bash
   ls -l /etc/postfix/main.cf*
   ```

### Step 3: Edit Postfix Configuration

1. **Open main.cf for editing:**
   ```bash
   sudo nano /etc/postfix/main.cf
   ```

2. **Find and modify these settings (use Ctrl+W to search):**

   **a) Find `myhostname` line:**
   - Search: `Ctrl+W`, type `myhostname`, Enter
   - Change to: `myhostname = mail.[login].it387g.nsa.his.se`
   - Replace `[login]` with your actual login

   **b) Find `mydomain` line:**
   - Search: `Ctrl+W`, type `mydomain`, Enter
   - Change to: `mydomain = [login].it387g.nsa.his.se`

   **c) Find `myorigin` line:**
   - Search: `Ctrl+W`, type `myorigin`, Enter
   - Change to: `myorigin = $mydomain`

   **d) Find `inet_interfaces` line:**
   - Search: `Ctrl+W`, type `inet_interfaces`, Enter
   - Change to: `inet_interfaces = all`

   **e) Find `mydestination` line:**
   - Search: `Ctrl+W`, type `mydestination`, Enter
   - Change to: `mydestination = $myhostname, localhost.$mydomain, $mydomain`

   **f) Find `mynetworks` line:**
   - Search: `Ctrl+W`, type `mynetworks`, Enter
   - Change to: `mynetworks = 127.0.0.0/8, [::1]/128, 10.[room].[group].0/24`
   - Replace `[room]` and `[group]` with your values

   **g) Find or add `smtpd_recipient_restrictions`:**
   - Search: `Ctrl+W`, type `smtpd_recipient_restrictions`, Enter
   - If found, modify; if not found, add after `mynetworks` line:
   ```bash
   smtpd_recipient_restrictions = 
       permit_mynetworks,
       permit_sasl_authenticated,
       reject_unauth_destination
   ```
   - **CRITICAL:** This prevents open relay!

   **h) Find or add `home_mailbox`:**
   - Search: `Ctrl+W`, type `home_mailbox`, Enter
   - If found, change to: `home_mailbox = Maildir/`
   - If not found, add: `home_mailbox = Maildir/`

3. **Save and exit:**
   - Press `Ctrl+O` to save
   - Press `Enter` to confirm
   - Press `Ctrl+X` to exit

4. **Verify key settings:**
   ```bash
   grep -E "myhostname|mydomain|mydestination|mynetworks|smtpd_recipient_restrictions|home_mailbox" /etc/postfix/main.cf
   ```
   - **📸 Screenshot Point:** Take screenshot showing all key Postfix settings

### Step 4: Test Postfix Configuration

1. **Check configuration syntax:**
   ```bash
   sudo postfix check
   ```
   - Should return with no output (means no errors)
   - If errors appear, read them carefully and fix

2. **Test configuration:**
   ```bash
   sudo postfix -v
   ```
   - Shows verbose output
   - Look for any warnings or errors

3. **📸 Screenshot Point:** Take screenshot showing `postfix check` with no errors

### Step 5: Restart and Enable Postfix

1. **Restart Postfix:**
   ```bash
   sudo systemctl restart postfix
   ```

2. **Check service status:**
   ```bash
   sudo systemctl status postfix
   ```
   - Should show "active (running)" in green
   - **📸 Screenshot Point:** Take screenshot showing Postfix service is active

3. **Enable to start on boot:**
   ```bash
   sudo systemctl enable postfix
   ```

4. **Verify Postfix is listening:**
   ```bash
   ss -tuln | grep 25
   ```
   - Should show port 25 is listening
   - **📸 Screenshot Point:** Take screenshot showing port 25 is open

## Dovecot Configuration

### /etc/dovecot/dovecot.conf

Edit main configuration:

```bash
sudo nano /etc/dovecot/dovecot.conf
```

**Enable protocols:**
```bash
protocols = imap
```

### /etc/dovecot/conf.d/10-mail.conf

Configure mail location:

```bash
sudo nano /etc/dovecot/conf.d/10-mail.conf
```

```bash
mail_location = maildir:~/Maildir
```

### /etc/dovecot/conf.d/10-auth.conf

Configure authentication:

```bash
sudo nano /etc/dovecot/conf.d/10-auth.conf
```

```bash
disable_plaintext_auth = no
auth_mechanisms = plain login
```

### Test Configuration

```bash
# Check configuration
sudo doveconf

# Test configuration
sudo doveconf -n
```

### Restart Dovecot

```bash
sudo systemctl restart dovecot
sudo systemctl status dovecot
```

## User Accounts

### Create Mail Users

Create user accounts for employees (see student manual Table 3):

```bash
# Create users
sudo useradd -m -s /bin/bash lism
sudo useradd -m -s /bin/bash oljo
sudo useradd -m -s /bin/bash etbr
sudo useradd -m -s /bin/bash mida
sudo useradd -m -s /bin/bash lumi

# Set passwords
sudo passwd lism
sudo passwd oljo
# ... etc
```

## Mail Aliases

### /etc/aliases

Configure aliases to map email addresses to local users:

```bash
sudo nano /etc/aliases
```

**Add aliases:**
```bash
# System aliases
postmaster: root
webmaster: root

# User aliases (full email to username)
liam.smith@[login].it387g.nsa.his.se: lism
olivia.johnson@[login].it387g.nsa.his.se: oljo
ethan.brown@[login].it387g.nsa.his.se: etbr
mia.davis@[login].it387g.nsa.his.se: mida
lucas.miller@[login].it387g.nsa.his.se: lumi
```

**Rebuild alias database:**
```bash
sudo newaliases
```

## Testing Mail Server

### Step 8: Test SMTP with telnet

1. **Install telnet (if not installed):**
   ```bash
   sudo apt install telnet -y
   ```

2. **Connect to SMTP server:**
   ```bash
   telnet localhost 25
   ```

3. **You should see:**
   ```
   220 mail.[login].it387g.nsa.his.se ESMTP Postfix
   ```

4. **Send test commands (type each line and press Enter):**
   ```
   EHLO localhost
   ```
   - Should show server capabilities

5. **Set sender:**
   ```
   MAIL FROM: test@[login].it387g.nsa.his.se
   ```
   - Should respond: `250 2.1.0 Ok`

6. **Set recipient:**
   ```
   RCPT TO: oljo@[login].it387g.nsa.his.se
   ```
   - Should respond: `250 2.1.5 Ok`
   - Replace `oljo` with actual username if different

7. **Start data:**
   ```
   DATA
   ```
   - Should respond: `354 End data with <CR><LF>.<CR><LF>`

8. **Enter email:**
   ```
   Subject: Test

   This is a test message.
   .
   ```
   - Type subject, press Enter twice
   - Type message body
   - Type single period (.) on new line and press Enter
   - Should respond: `250 2.0.0 Ok: queued as [message-id]`

9. **Quit:**
   ```
   QUIT
   ```
   - Should respond: `221 2.0.0 Bye`

10. **📸 Screenshot Point:** Take screenshot of successful telnet SMTP test showing email queued

### Test IMAP

```bash
telnet localhost 143
```

**Commands:**
```
a1 LOGIN oljo password
a2 LIST "" "*"
a3 SELECT INBOX
a4 LOGOUT
```

### Test from External Client

Use Mozilla Thunderbird or similar:

- **SMTP Server:** `mail.[login].it387g.nsa.his.se`
- **Port:** 25
- **IMAP Server:** `mail.[login].it387g.nsa.his.se`
- **Port:** 143

### Test Sending to External

Send email to `autoreply@nsa.his.se`:

```bash
echo "Test message" | mail -s "Test" autoreply@nsa.his.se
```

## Open Relay Test

**CRITICAL:** Verify your server is NOT an open relay!

### Step 9: Open Relay Test (CRITICAL!)

**This is ESSENTIAL - your server must NOT be an open relay!**

1. **Connect to SMTP from external perspective:**
   ```bash
   telnet mail.[login].it387g.nsa.his.se 25
   ```
   - Or from another machine: `telnet 10.[room].[group].13 25`

2. **Try to relay to external domain (should FAIL):**
   ```
   EHLO test.com
   ```
   - Should show server greeting

3. **Set external sender:**
   ```
   MAIL FROM: test@test.com
   ```
   - Should respond: `250 2.1.0 Ok`

4. **Try to send to external domain (THIS SHOULD BE REJECTED):**
   ```
   RCPT TO: external@example.com
   ```
   - **MUST respond:** `554 5.7.1 <external@example.com>: Relay access denied`
   - **If it says "250 Ok" instead, you have an OPEN RELAY - FIX IMMEDIATELY!**

5. **Quit:**
   ```
   QUIT
   ```

6. **📸 Screenshot Point:** Take screenshot showing relay access denied (proving NOT an open relay)

**If relay was allowed (BAD!):**
- Check `smtpd_recipient_restrictions` in main.cf
- Make sure it includes `reject_unauth_destination`
- Reload Postfix: `sudo systemctl reload postfix`
- Test again

## Logs

### View Mail Logs

```bash
# Postfix logs
sudo tail -f /var/log/mail.log

# Dovecot logs
sudo tail -f /var/log/mail.log | grep dovecot

# Filter for errors
sudo grep -i error /var/log/mail.log
```

## Common Issues

### Mail Not Sending

1. Check Postfix is running: `systemctl status postfix`
2. Check DNS MX record: `dig MX [login].it387g.nsa.his.se`
3. Check firewall: `sudo ufw status`
4. Check logs: `journalctl -u postfix`

### Mail Not Receiving

1. Check DNS MX record points to mail server
2. Check Postfix is listening: `ss -tuln | grep 25`
3. Check mydestination includes your domain
4. Check logs for errors

### Authentication Failures

1. Verify user accounts exist
2. Check passwords are set
3. Check Dovecot configuration
4. Review authentication logs

## Next Steps

Once mail server is working:

1. Test sending and receiving emails
2. Verify NOT an open relay
3. Proceed to [Webmail Setup](webmail-setup.md)

---

**Remember**: Always test that your mail server is NOT an open relay!
