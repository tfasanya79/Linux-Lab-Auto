# Mail Servers

## How Does Electronic Mail Work?

### Mail Components

**Actors:**

- **MUA (Mail User Agent)** - 'Mail client'
  - Examples: Thunderbird, Roundcube, Mutt, KMail, Outlook

- **MSA (Mail Submission Agent)** - 'Mail server that accepts mails for relaying'
  - Accepts mail from MUA

- **MTA (Mail Transfer Agent)** - 'Mail server that relays mail'
  - Examples: Postfix, Sendmail, Courier, Exim
  - Relays mail between servers

- **MDA (Mail Delivery Agent)** - 'Mail server that delivers mail'
  - Examples: Dovecot, Cyrus, Courier
  - Stores mail for retrieval

### Protocols

- **SMTP** - Between MUA and MSA/MTA, and in between MTAs
  - Ports: 25 (server-to-server), 587 (submission), 465 (SMTPS)

- **IMAP** - Used to access mail from MDA (centralized storage)
  - Ports: 143 (IMAP), 993 (IMAPS)

- **POP3** - Used to access mail from MDA (download)
  - Ports: 110 (POP3), 995 (POP3S)

## Email Flow

1. **Alice's MUA** sends email via SMTP to **Alice's MSA**
2. **Alice's MTA** looks up MX record for destination domain via DNS
3. **Alice's MTA** sends email via SMTP to **Bob's MTA**
4. **Bob's MTA** delivers to **Bob's MDA**
5. **Bob's MUA** retrieves email via IMAP/POP3 from **Bob's MDA**

### Working DNS is Important!

Email delivery depends on proper DNS configuration:
- MX records point to mail servers
- A records resolve mail server hostnames
- Reverse DNS (PTR records) help with deliverability

## Postfix (SMTP Server)

### Installation

```bash
sudo apt install postfix
```

### Configuration Files

- `/etc/postfix/main.cf` - Main configuration
- `/etc/postfix/master.cf` - Service configuration

### Basic Configuration

```bash
# Set hostname
myhostname = mail.example.com

# Set domain
mydomain = example.com
myorigin = $mydomain

# Network interfaces
inet_interfaces = all

# Accepted domains
mydestination = $myhostname, localhost.$mydomain, $mydomain

# Relay restrictions
mynetworks = 127.0.0.0/8, [::1]/128, 10.0.0.0/8
```

### Testing Postfix

```bash
# Check configuration
sudo postfix check

# Test configuration
sudo postfix -v

# Reload configuration
sudo systemctl reload postfix

# View logs
sudo tail -f /var/log/mail.log
```

### Testing with telnet

```bash
telnet localhost 25
EHLO localhost
MAIL FROM: test@example.com
RCPT TO: user@example.com
DATA
Subject: Test

This is a test message.
.
QUIT
```

## Dovecot (IMAP Server)

### Installation

```bash
sudo apt install dovecot-core dovecot-imapd
```

### Configuration Files

- `/etc/dovecot/dovecot.conf` - Main configuration
- `/etc/dovecot/conf.d/` - Additional configuration files

### Basic Configuration

```bash
# Protocols
protocols = imap

# Mail location
mail_location = mbox:~/mail:INBOX=/var/mail/%u

# Authentication
auth_mechanisms = plain login
```

### Testing Dovecot

```bash
# Check configuration
sudo doveconf

# Test configuration
sudo doveconf -n

# Reload configuration
sudo systemctl reload dovecot
```

## Mail Aliases

### /etc/aliases

Map email addresses to local users:

```
# System aliases
postmaster: root
webmaster: root

# User aliases
admin: user1
support: user1, user2
```

### Update Aliases

```bash
# Edit aliases file
sudo nano /etc/aliases

# Rebuild alias database
sudo newaliases
```

## Mailboxes

### Mailbox Formats

- **mbox** - Single file per mailbox
- **Maildir** - Directory structure (one file per message)

### Maildir Structure

```
~/Maildir/
├── cur/
├── new/
└── tmp/
```

## Security Considerations

### Open Relay Prevention

**Important:** Configure Postfix to NOT act as an open relay!

```bash
# Restrict relay
smtpd_recipient_restrictions = 
    permit_mynetworks,
    permit_sasl_authenticated,
    reject_unauth_destination
```

### Authentication

- Use SASL for SMTP authentication
- Use SSL/TLS for encrypted connections
- Configure SPF, DKIM, DMARC for better deliverability

## Testing Mail Configuration

### Send Test Email

```bash
# Using mail command
echo "Test message" | mail -s "Test" user@example.com

# Using sendmail
echo "Test message" | sendmail user@example.com
```

### Check Mail Logs

```bash
# Postfix logs
sudo tail -f /var/log/mail.log

# Dovecot logs
sudo tail -f /var/log/mail.log | grep dovecot
```

## Common Issues

### Mail Not Sending

- Check Postfix configuration
- Verify DNS MX records
- Check firewall rules
- Review mail logs

### Mail Not Receiving

- Check DNS MX records
- Verify Postfix is listening
- Check firewall rules
- Review mail logs

### Authentication Failures

- Verify user accounts exist
- Check password configuration
- Review authentication logs

## Best Practices

1. **Prevent open relay** - Critical for security
2. **Use authentication** - Require authentication for sending
3. **Monitor logs** - Watch for issues
4. **Configure SPF/DKIM** - Improve deliverability
5. **Use SSL/TLS** - Encrypt connections
6. **Regular backups** - Protect mail data

## Common Commands Summary

```bash
# Postfix
sudo systemctl status postfix
sudo postfix check
sudo systemctl reload postfix

# Dovecot
sudo systemctl status dovecot
sudo doveconf
sudo systemctl reload dovecot

# Mail
mail
echo "test" | mail -s "subject" user@example.com
```

## Next Steps

- Learn about [Lab Assignment Mail Setup](../lab-assignment/mail-setup.md)
- Understand [Webmail Setup](../lab-assignment/webmail-setup.md)
- Study [Troubleshooting](troubleshooting.md)

---

**Remember**: Always test that your mail server is not an open relay!
