# Lab Assignment Checklist

Use this checklist to verify you've completed all requirements.

## Environment Setup

- [ ] Proxmox installed and accessible
- [ ] All VMs created (ns1, ns2, mail, webmail, mgmt)
- [ ] Debian installed on all VMs
- [ ] Network connectivity verified between all machines
- [ ] Hostnames configured correctly

## Network Configuration

- [ ] IP addresses configured on all machines
- [ ] /etc/hosts updated on all machines
- [ ] Network connectivity tested (ping works)
- [ ] Gateway accessible

## DNS Setup

### Master Server (ns1)

- [ ] Bind9 installed
- [ ] /etc/bind/named.conf.options configured
- [ ] /etc/bind/named.conf.local configured
- [ ] Forward zone file (db.[login]) created
- [ ] Reverse zone file (db.10) created
- [ ] Zone files syntax checked (named-checkzone)
- [ ] Bind9 service running
- [ ] Forward lookups working
- [ ] Reverse lookups working
- [ ] MX record configured

### Slave Server (ns2)

- [ ] Bind9 installed
- [ ] /etc/bind/named.conf.local configured as slave
- [ ] Zone transfer working
- [ ] Bind9 service running
- [ ] Can resolve DNS queries

### DNS Verification

- [ ] All A records resolve correctly
- [ ] MX record resolves correctly
- [ ] PTR records resolve correctly
- [ ] Zone transfer works
- [ ] All machines use both DNS servers

## Mail Server Setup

### Postfix

- [ ] Postfix installed
- [ ] /etc/postfix/main.cf configured
- [ ] myhostname set correctly
- [ ] mydestination includes domain
- [ ] mynetworks configured
- [ ] smtpd_recipient_restrictions configured
- [ ] Postfix service running
- [ ] SMTP accessible (port 25)
- [ ] NOT an open relay (tested)
- [ ] Can send emails
- [ ] Can receive emails

### Dovecot

- [ ] Dovecot installed
- [ ] /etc/dovecot/dovecot.conf configured
- [ ] Mail location configured
- [ ] Authentication configured
- [ ] Dovecot service running
- [ ] IMAP accessible (port 143)
- [ ] Can authenticate users
- [ ] Mailboxes accessible

### User Accounts

- [ ] All user accounts created (lism, oljo, etbr, mida, lumi)
- [ ] Passwords set for all users
- [ ] Mail aliases configured in /etc/aliases
- [ ] newaliases executed
- [ ] Email addresses map to users correctly

## Webmail Setup

- [ ] MariaDB installed
- [ ] Roundcube installed
- [ ] Apache configured
- [ ] Roundcube accessible via web browser
- [ ] Database connection working
- [ ] IMAP server configured in Roundcube
- [ ] SMTP server configured in Roundcube
- [ ] Can log in to webmail
- [ ] Can send emails via webmail
- [ ] Can receive emails via webmail

## SSH Setup

- [ ] SSH key pair generated on mgmt
- [ ] Public key copied to ns1
- [ ] Public key copied to ns2
- [ ] Public key copied to mail
- [ ] Public key copied to webmail
- [ ] Passwordless SSH works to all servers
- [ ] Public key saved for report

## Testing

### DNS Testing

- [ ] Forward lookups work for all hosts
- [ ] Reverse lookups work for all IPs
- [ ] MX record resolves
- [ ] Zone transfer works

### Mail Testing

- [ ] Can send email via SMTP
- [ ] Can receive email via IMAP
- [ ] Open relay test passes (rejects unauthorized relay)
- [ ] Can send email to autoreply@nsa.his.se
- [ ] Can receive autoreply

### Webmail Testing

- [ ] Webmail accessible
- [ ] Can log in as olivia.johnson@[login].it387g.nsa.his.se
- [ ] Can send email via webmail
- [ ] Can receive email via webmail
- [ ] Autoreply received and viewable
- [ ] Fortune cookie visible in autoreply

### SSH Testing

- [ ] Passwordless SSH works from mgmt to ns1
- [ ] Passwordless SSH works from mgmt to ns2
- [ ] Passwordless SSH works from mgmt to mail
- [ ] Passwordless SSH works from mgmt to webmail

## Demonstration Requirements

- [ ] Can send email as olivia.johnson@[login].it387g.nsa.his.se via webmail to autoreply@nsa.his.se
- [ ] Can show autoreply from autoreply@nsa.his.se with fortune cookie
- [ ] Can demonstrate passwordless SSH from mgmt to servers

## Documentation

- [ ] Configuration files backed up
- [ ] Notes taken during setup
- [ ] Public SSH key saved
- [ ] Screenshots taken at all critical points (see Screenshot Guide)
- [ ] Screenshots organized by component (DNS, Mail, Webmail, SSH)
- [ ] Demonstration screenshots prepared (webmail, fortune cookie, SSH)
- [ ] Logs reviewed and documented

## Report Preparation

- [ ] DNS records documented (A, MX, PTR, NS)
- [ ] Protocols explained (SMTP, IMAP, SSH, HTTP)
- [ ] Concepts explained (mailbox, user, aliases)
- [ ] Public key ready to include
- [ ] Report structure planned
- [ ] Diagrams/flowcharts prepared (recommended)

## Final Verification

- [ ] All DNS records resolve correctly
- [ ] Mail server sends and receives emails
- [ ] Mail server is NOT an open relay (tested and documented)
- [ ] Webmail is accessible and functional
- [ ] Can send email via webmail to autoreply@nsa.his.se
- [ ] Can receive and view autoreply with fortune cookie
- [ ] Passwordless SSH works from mgmt to all servers
- [ ] All services are running
- [ ] No errors in logs
- [ ] All critical screenshots taken (see Screenshot Guide)
- [ ] Demonstration screenshots ready (webmail, fortune cookie, SSH)
- [ ] Public SSH key ready to include in report
- [ ] All tests pass
- [ ] Ready for demonstration
- [ ] Ready to write report

## Common Issues to Check

- [ ] DNS zone files have correct serial numbers
- [ ] All placeholders replaced ([login], [room], [group])
- [ ] Firewall allows necessary ports
- [ ] Services are enabled to start on boot
- [ ] Time synchronization working (NTP)
- [ ] Disk space sufficient
- [ ] Logs not filling up disk

---

**Remember**: Complete each section before moving to the next. Don't proceed until each component is working!
