# Dovecot: Configuration Template

## Main Configuration File
`/etc/dovecot/dovecot.conf`

### Enable Protocols

```bash
# Enable IMAP (and optionally POP3)
protocols = imap
# protocols = imap pop3  # if you want POP3 too
```

## Mail Location
`/etc/dovecot/conf.d/10-mail.conf`

```bash
# Maildir format
mail_location = maildir:~/Maildir

# Alternative: mbox format
# mail_location = mbox:~/mail:INBOX=/var/mail/%u
```

## Authentication
`/etc/dovecot/conf.d/10-auth.conf`

```bash
# Disable plaintext auth (set to yes for testing, no for production with SSL)
disable_plaintext_auth = no

# Authentication mechanisms
auth_mechanisms = plain login
```

## SSL/TLS (Optional for Lab)

```bash
# For lab assignment, SSL not required
# But if configuring:
# ssl = required
# ssl_cert = </path/to/cert
# ssl_key = </path/to/key
```

## Testing Configuration

```bash
# Check configuration
sudo doveconf

# Test configuration (dry run)
sudo doveconf -n

# Reload configuration
sudo systemctl reload dovecot
```

## Notes

- **mail_location**: Must match Postfix mailbox location
- **disable_plaintext_auth**: Set to `no` for lab (no SSL required)
- **auth_mechanisms**: `plain login` for basic authentication

## Testing IMAP

```bash
# Test IMAP connection
telnet localhost 143

# Commands:
a1 LOGIN username password
a2 LIST "" "*"
a3 SELECT INBOX
a4 LOGOUT
```
