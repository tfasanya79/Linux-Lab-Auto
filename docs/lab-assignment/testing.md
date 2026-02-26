# Testing and Verification

## Overview

Comprehensive testing procedures to verify all components are working correctly.

## DNS Testing

### Forward Lookup

```bash
# Test A records
dig ns1.[login].it387g.nsa.his.se
dig ns2.[login].it387g.nsa.his.se
dig mail.[login].it387g.nsa.his.se
dig webmail.[login].it387g.nsa.his.se
dig mgmt.[login].it387g.nsa.his.se

# Test MX record
dig MX [login].it387g.nsa.his.se
```

### Reverse Lookup

```bash
# Test PTR records
dig -x 10.[room].[group].11
dig -x 10.[room].[group].12
dig -x 10.[room].[group].13
dig -x 10.[room].[group].14
dig -x 10.[room].[group].22
```

### Zone Transfer

```bash
# Test zone transfer (from ns2)
dig @10.[room].[group].11 AXFR [login].it387g.nsa.his.se
```

## Mail Server Testing

### SMTP Testing

```bash
# Test SMTP connection
telnet mail.[login].it387g.nsa.his.se 25

# Commands:
EHLO test.com
MAIL FROM: test@[login].it387g.nsa.his.se
RCPT TO: oljo@[login].it387g.nsa.his.se
DATA
Subject: Test

Test message body.
.
QUIT
```

### IMAP Testing

```bash
# Test IMAP connection
telnet mail.[login].it387g.nsa.his.se 143

# Commands:
a1 LOGIN oljo password
a2 LIST "" "*"
a3 SELECT INBOX
a4 FETCH 1 BODY[]
a5 LOGOUT
```

### Open Relay Test

**CRITICAL:** Verify server is NOT an open relay!

```bash
telnet mail.[login].it387g.nsa.his.se 25
```

Try to relay without authentication:
```
EHLO external.com
MAIL FROM: test@external.com
RCPT TO: external@example.com
```

**Should be REJECTED!**

### Send Test Email

```bash
# Using mail command
echo "Test message" | mail -s "Test Subject" oljo@[login].it387g.nsa.his.se

# Send to external
echo "Test message" | mail -s "Test" autoreply@nsa.his.se
```

## Webmail Testing

### Access Webmail

1. Open browser
2. Navigate to: `http://webmail.[login].it387g.nsa.his.se`
3. Should see Roundcube login page

### Login Test

1. Username: `oljo`
2. Password: User's password
3. Should successfully log in

### Send Email Test

1. Click "Compose"
2. To: `autoreply@nsa.his.se`
3. From: Should show `olivia.johnson@[login].it387g.nsa.his.se`
4. Subject: "Test"
5. Body: "This is a test message"
6. Click "Send"
7. Should show success message

### Receive Email Test

1. Wait a few minutes for autoreply
2. Click "Refresh" or check inbox
3. Should see email from `autoreply@nsa.his.se`
4. Open email
5. Should see fortune cookie in response

## SSH Testing

### Passwordless Authentication

From management machine:

```bash
# Test SSH to each server
ssh user@10.[room].[group].11 "hostname && whoami"
ssh user@10.[room].[group].12 "hostname && whoami"
ssh user@10.[room].[group].13 "hostname && whoami"
ssh user@10.[room].[group].14 "hostname && whoami"
```

**Should execute without password prompt!**

## Network Testing

### Connectivity

```bash
# Ping all machines
ping -c 4 10.[room].[group].11
ping -c 4 10.[room].[group].12
ping -c 4 10.[room].[group].13
ping -c 4 10.[room].[group].14
ping -c 4 10.[room].[group].22
```

### Port Testing

```bash
# Test DNS (port 53)
dig @10.[room].[group].11 google.com

# Test SMTP (port 25)
telnet mail.[login].it387g.nsa.his.se 25

# Test IMAP (port 143)
telnet mail.[login].it387g.nsa.his.se 143

# Test HTTP (port 80)
curl http://webmail.[login].it387g.nsa.his.se
```

## Demonstration Checklist

Before demonstrating to supervisor, prepare these screenshots:

### 1. Email Sending

**Steps:**
1. Log into webmail as `olivia.johnson@[login].it387g.nsa.his.se`
2. Click "Compose" button
3. Fill in:
   - To: `autoreply@nsa.his.se`
   - Subject: "Test Email"
   - Body: "This is a test message."
4. Click "Send"
5. **📸 Screenshot:** Take screenshot showing email composition form with all fields filled
6. **📸 Screenshot:** Take screenshot showing "Message sent successfully" confirmation
7. Show supervisor the sent email in "Sent" folder

### 2. Email Receiving

**Steps:**
1. Wait 2-3 minutes for autoreply
2. Click "Inbox" in webmail
3. Look for email from `autoreply@nsa.his.se`
4. **📸 Screenshot:** Take screenshot showing inbox with autoreply email visible
5. Click on the email to open it
6. Scroll to find fortune cookie in the response
7. **📸 Screenshot:** Take screenshot showing fortune cookie text clearly visible
8. Show supervisor the received email with fortune cookie

### 3. SSH Authentication

**Steps:**
1. From management machine, open terminal
2. SSH to ns1:
   ```bash
   ssh user@10.[room].[group].11
   ```
3. **📸 Screenshot:** Take screenshot showing SSH connection WITHOUT password prompt
4. Execute command:
   ```bash
   hostname
   date
   ```
5. **📸 Screenshot:** Take screenshot showing command execution
6. Exit: `exit`
7. Repeat for ns2, mail, webmail
8. **📸 Screenshot:** Take screenshot showing SSH to all servers working
9. Show supervisor passwordless authentication working on all servers

### Screenshot Preparation

**Before demonstration, have these ready:**
- [ ] Webmail login page screenshot
- [ ] Email composition screenshot
- [ ] Email sent confirmation screenshot
- [ ] Inbox with autoreply screenshot
- [ ] Fortune cookie visible screenshot
- [ ] SSH passwordless authentication screenshots (all servers)
- [ ] Any other test result screenshots

**Organize screenshots:**
- Create a folder: `demonstration-screenshots/`
- Name files descriptively
- Have them ready to show supervisor

## Common Issues

### DNS Not Resolving

1. Check DNS servers are running
2. Verify zone files are correct
3. Check `/etc/resolv.conf`
4. Test with `dig @server domain`

### Mail Not Sending

1. Check Postfix is running
2. Verify DNS MX record
3. Check firewall rules
4. Review mail logs

### Mail Not Receiving

1. Check DNS MX record
2. Verify Postfix configuration
3. Check mail logs
4. Test with telnet

### Webmail Not Working

1. Check Apache is running
2. Verify Roundcube configuration
3. Check database connection
4. Review Roundcube logs

### SSH Still Prompts for Password

1. Check `~/.ssh/authorized_keys` permissions
2. Verify public key is correct
3. Check SSH server logs
4. Test with verbose mode: `ssh -v user@host`

## Log Review

### Check All Logs

```bash
# DNS logs
sudo journalctl -u bind9 | tail -20

# Mail logs
sudo tail -20 /var/log/mail.log

# Webmail logs
sudo tail -20 /var/log/roundcube/errors.log
sudo tail -20 /var/log/apache2/error.log

# SSH logs
sudo journalctl -u ssh | tail -20
```

## Final Verification

Before submitting:

- [ ] All DNS records resolve correctly
- [ ] Mail server sends and receives emails
- [ ] Mail server is NOT an open relay
- [ ] Webmail is accessible and functional
- [ ] Can send email via webmail to autoreply@nsa.his.se
- [ ] Can receive and view autoreply with fortune cookie
- [ ] Passwordless SSH works from mgmt to all servers
- [ ] All services are running
- [ ] No errors in logs

## Next Steps

Once all tests pass:

1. Review [Checklist](checklist.md)
2. Check [Troubleshooting](troubleshooting.md) if issues
3. Prepare for demonstration
4. Write lab report

---

**Remember**: Test everything thoroughly before demonstration!
