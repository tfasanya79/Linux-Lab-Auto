# My Assignment Quick Reference

## Personal Details

- **Login:** a25timfa
- **Room:** 204
- **Group:** 2
- **Domain:** a25timfa.it387g.nsa.his.se

## Quick IP Reference

| Machine | IP Address | Hostname |
|---------|------------|----------|
| ns1 | 10.204.2.11 | ns1.a25timfa.it387g.nsa.his.se |
| ns2 | 10.204.2.12 | ns2.a25timfa.it387g.nsa.his.se |
| mail | 10.204.2.13 | mail.a25timfa.it387g.nsa.his.se |
| webmail | 10.204.2.14 | webmail.a25timfa.it387g.nsa.his.se |
| mgmt | 10.204.2.22 | mgmt.a25timfa.it387g.nsa.his.se |

## Quick Commands

### SSH Commands

```bash
ssh user@10.204.2.11  # ns1
ssh user@10.204.2.12  # ns2
ssh user@10.204.2.13  # mail
ssh user@10.204.2.14  # webmail
ssh user@10.204.2.22  # mgmt
```

### DNS Test Commands

```bash
# Forward lookups
dig ns1.a25timfa.it387g.nsa.his.se
dig mail.a25timfa.it387g.nsa.his.se
dig webmail.a25timfa.it387g.nsa.his.se

# Reverse lookups
dig -x 10.204.2.11
dig -x 10.204.2.13

# MX record
dig MX a25timfa.it387g.nsa.his.se
```

### Mail Test Commands

```bash
# SMTP test
telnet mail.a25timfa.it387g.nsa.his.se 25

# IMAP test
telnet mail.a25timfa.it387g.nsa.his.se 143
```

### Service Status Commands

```bash
# DNS (on ns1/ns2)
systemctl status bind9
journalctl -u bind9 -n 20

# Mail (on mail server)
systemctl status postfix
systemctl status dovecot
tail -f /var/log/mail.log

# Webmail (on webmail server)
systemctl status apache2
systemctl status mariadb
```

## Webmail Access

- **URL:** http://webmail.a25timfa.it387g.nsa.his.se
- **Test User:** oljo (olivia.johnson@a25timfa.it387g.nsa.his.se)
- **Test Email To:** autoreply@nsa.his.se

## Configuration File Locations

### DNS (ns1 - 10.204.2.11)
- `/etc/bind/named.conf.options`
- `/etc/bind/named.conf.local`
- `/etc/bind/db.a25timfa`
- `/etc/bind/db.10`

### Mail (mail - 10.204.2.13)
- `/etc/postfix/main.cf`
- `/etc/dovecot/dovecot.conf`
- `/etc/dovecot/conf.d/10-mail.conf`
- `/etc/dovecot/conf.d/10-auth.conf`
- `/etc/aliases`

### Webmail (webmail - 10.204.2.14)
- `/etc/roundcube/config.inc.php`
- `/etc/apache2/sites-available/webmail.conf`

## Zone Information

- **Forward Zone:** a25timfa.it387g.nsa.his.se
- **Reverse Zone:** 2.204.10.in-addr.arpa
- **Zone Files:**
  - Forward: `/etc/bind/db.a25timfa`
  - Reverse: `/etc/bind/db.10`

## Mail Users

| Username | Email Address |
|----------|---------------|
| oljo | olivia.johnson@a25timfa.it387g.nsa.his.se |
| lism | liam.smith@a25timfa.it387g.nsa.his.se |
| etbr | ethan.brown@a25timfa.it387g.nsa.his.se |
| mida | mia.davis@a25timfa.it387g.nsa.his.se |
| lumi | lucas.miller@a25timfa.it387g.nsa.his.se |

---

**Keep this page open while working on your lab assignment!**
