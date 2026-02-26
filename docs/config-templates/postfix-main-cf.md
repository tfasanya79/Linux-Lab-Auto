# Postfix: main.cf Template

## File Location
`/etc/postfix/main.cf`

## Key Configuration Sections

### Hostname and Domain

```bash
# Replace [login] with your university login
myhostname = mail.[login].it387g.nsa.his.se
mydomain = [login].it387g.nsa.his.se
myorigin = $mydomain
```

### Network Configuration

```bash
# Listen on all interfaces
inet_interfaces = all
```

### Accepted Domains

```bash
# Domains for which this server accepts mail
# Replace [login] with your university login
mydestination = $myhostname, localhost.$mydomain, $mydomain
```

### Network Restrictions

```bash
# Networks allowed to relay without authentication
# Replace [room] and [group] with your values
mynetworks = 127.0.0.0/8, [::1]/128, 10.[room].[group].0/24
```

### Relay Restrictions (CRITICAL)

```bash
# Prevent open relay - only allow:
# 1. Mail from mynetworks
# 2. Authenticated users
# 3. Mail to mydestination
smtpd_recipient_restrictions = 
    permit_mynetworks,
    permit_sasl_authenticated,
    reject_unauth_destination
```

### Mailbox Location

```bash
# Use Maildir format
home_mailbox = Maildir/
```

## Placeholders to Replace

- `[login]` - Your university login (e.g., `a24login`)
- `[room]` - Your room number (e.g., `209`)
- `[group]` - Your computer group number (e.g., `30`)

## Testing Configuration

```bash
# Check configuration syntax
sudo postfix check

# Test configuration
sudo postfix -v

# Reload configuration
sudo systemctl reload postfix
```

## Important Notes

- **mydestination**: Must include your domain for mail delivery
- **mynetworks**: Only trusted networks can relay
- **smtpd_recipient_restrictions**: Critical for preventing open relay
- **home_mailbox**: Maildir format works well with Dovecot

## Security Warning

**ALWAYS test that your server is NOT an open relay!**

Test with:
```bash
telnet mail.[login].it387g.nsa.his.se 25
```

Try to relay to external domain - should be REJECTED!
