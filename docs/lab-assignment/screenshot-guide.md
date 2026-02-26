# Screenshot Guide for Lab Assignment

## Overview

While the student manual states "no screenshots" for configuration files in appendices, screenshots are **highly recommended** and **essential** for:

- Proving functionality works
- Demonstrating completion of requirements
- Showing test results
- Documenting the working system

## Screenshot Organization

**Recommended folder structure:**
```
screenshots/
├── environment/
├── dns/
├── mail/
├── webmail/
├── ssh/
└── testing/
```

## Critical Screenshot Points

### Environment Setup

1. **Proxmox VMs Created**
   - Screenshot: Proxmox web interface showing all 5 VMs (ns1, ns2, mail, webmail, mgmt)
   - When: After creating all VMs
   - Filename: `proxmox-all-vms.png`

2. **Debian Installation Complete**
   - Screenshot: Debian installer showing "Installation complete"
   - When: After each VM installation
   - Filename: `debian-install-complete-ns1.png` (repeat for each VM)

3. **Network Connectivity**
   - Screenshot: Terminal showing successful ping to all VMs
   - When: After network configuration
   - Filename: `network-ping-tests.png`

4. **SSH Access Working**
   - Screenshot: Terminal showing SSH connections to all VMs
   - When: After initial setup
   - Filename: `ssh-all-vms.png`

### DNS Setup

5. **Bind9 Configuration Files**
   - Screenshot: `named.conf.options` showing forwarders and recursion settings
   - When: After configuring DNS options
   - Filename: `dns-named-conf-options.png`

6. **Zone Configuration**
   - Screenshot: `named.conf.local` showing both forward and reverse zones
   - When: After zone configuration
   - Filename: `dns-named-conf-local.png`

7. **Forward Zone File**
   - Screenshot: `db.[login]` showing all A records and MX record
   - When: After creating zone file
   - Filename: `dns-forward-zone.png`

8. **Reverse Zone File**
   - Screenshot: `db.10` showing all PTR records
   - When: After creating reverse zone
   - Filename: `dns-reverse-zone.png`

9. **Zone Syntax Check**
   - Screenshot: `named-checkzone` output showing "OK"
   - When: After creating zone files
   - Filename: `dns-zone-check-forward.png`, `dns-zone-check-reverse.png`

10. **Bind9 Service Status**
    - Screenshot: `systemctl status bind9` showing "active (running)"
    - When: After starting Bind9
    - Filename: `dns-bind9-status.png`

11. **DNS Forward Lookup Test**
    - Screenshot: `dig` output showing A record resolution
    - When: After DNS is configured
    - Filename: `dns-forward-lookup-ns1.png`

12. **DNS Reverse Lookup Test**
    - Screenshot: `dig -x` output showing PTR record resolution
    - When: After DNS is configured
    - Filename: `dns-reverse-lookup.png`

13. **MX Record Test**
    - Screenshot: `dig MX` output showing mail server
    - When: After DNS is configured
    - Filename: `dns-mx-record.png`

### Mail Server Setup

14. **Postfix Configuration**
    - Screenshot: Key settings from `main.cf` (myhostname, mydestination, smtpd_recipient_restrictions)
    - When: After configuring Postfix
    - Filename: `mail-postfix-config.png`

15. **Postfix Service Status**
    - Screenshot: `systemctl status postfix` showing "active (running)"
    - When: After starting Postfix
    - Filename: `mail-postfix-status.png`

16. **Postfix Configuration Check**
    - Screenshot: `postfix check` with no errors
    - When: After configuring Postfix
    - Filename: `mail-postfix-check.png`

17. **SMTP Port Listening**
    - Screenshot: `ss -tuln | grep 25` showing port 25 is open
    - When: After starting Postfix
    - Filename: `mail-smtp-port.png`

18. **Dovecot Service Status**
    - Screenshot: `systemctl status dovecot` showing "active (running)"
    - When: After starting Dovecot
    - Filename: `mail-dovecot-status.png`

19. **Open Relay Test - REJECTED**
    - Screenshot: Telnet showing "Relay access denied" when trying to relay
    - When: After configuring Postfix
    - Filename: `mail-open-relay-test-rejected.png`
    - **CRITICAL:** This proves your server is secure!

20. **SMTP Test via Telnet**
    - Screenshot: Successful email send via telnet showing "queued"
    - When: After mail server is configured
    - Filename: `mail-smtp-telnet-test.png`

### Webmail Setup

21. **Roundcube Login Page**
    - Screenshot: Roundcube login interface
    - When: After webmail is installed
    - Filename: `webmail-login-page.png`

22. **Successful Login**
    - Screenshot: Roundcube interface after login showing mailbox
    - When: After logging in
    - Filename: `webmail-logged-in.png`

23. **Compose Email**
    - Screenshot: Email composition form with To: autoreply@nsa.his.se
    - When: When composing test email
    - Filename: `webmail-compose-email.png`

24. **Email Sent Confirmation**
    - Screenshot: "Message sent successfully" confirmation
    - When: After sending email
    - Filename: `webmail-sent-confirmation.png`

25. **Received Autoreply**
    - Screenshot: Inbox showing email from autoreply@nsa.his.se
    - When: After receiving autoreply
    - Filename: `webmail-received-autoreply.png`

26. **Fortune Cookie Visible**
    - Screenshot: Email content showing fortune cookie text clearly visible
    - When: After opening autoreply email
    - Filename: `webmail-fortune-cookie.png`
    - **CRITICAL:** This is required for demonstration!

### SSH Setup

27. **SSH Key Generated**
    - Screenshot: `ls -l ~/.ssh/` showing id_rsa and id_rsa.pub
    - When: After generating SSH key
    - Filename: `ssh-keys-generated.png`

28. **Public Key Content**
    - Screenshot: `cat ~/.ssh/id_rsa.pub` showing public key
    - When: After generating key (for report)
    - Filename: `ssh-public-key.png`

29. **Passwordless SSH Working**
    - Screenshot: SSH connection without password prompt
    - When: After setting up passwordless SSH
    - Filename: `ssh-passwordless-ns1.png`

30. **SSH to All Servers**
    - Screenshot: Multiple SSH connections showing no password prompts
    - When: After setting up passwordless SSH
    - Filename: `ssh-all-servers.png`

### Testing

31. **All Services Running**
    - Screenshot: `systemctl status` for all services showing active
    - When: Final verification
    - Filename: `testing-all-services.png`

32. **DNS Resolution from External**
    - Screenshot: `dig` from management machine showing all records resolve
    - When: Final DNS testing
    - Filename: `testing-dns-external.png`

33. **Mail Flow Test**
    - Screenshot: Complete email send/receive cycle
    - When: Final mail testing
    - Filename: `testing-mail-flow.png`

## Screenshot Best Practices

### Technical Requirements

- **Resolution:** Use at least 1920x1080 or higher
- **Format:** PNG or JPG (PNG preferred for text clarity)
- **File size:** Keep under 5MB per screenshot
- **Naming:** Use descriptive names (see examples above)

### Content Guidelines

- **Show full context:** Include terminal prompts, window titles, relevant UI elements
- **Highlight important parts:** Use arrows or annotations if needed
- **Capture complete output:** Don't crop important information
- **Show success clearly:** Make it obvious the test/operation succeeded

### Organization

- **Create folders:** Organize by component (DNS, Mail, Webmail, etc.)
- **Number sequentially:** If multiple screenshots of same step
- **Document in notes:** Keep a text file listing what each screenshot shows

## Screenshots for Report

### What to Include

- **Demonstration screenshots:** Webmail sending/receiving, fortune cookie
- **Test results:** DNS resolution, service status
- **Proof of functionality:** SSH working, services running

### What NOT to Include

- **Configuration files:** Use text/code blocks instead (as per manual)
- **Large log files:** Summarize in text instead
- **Personal information:** Redact if necessary

## Demonstration Checklist with Screenshots

When demonstrating to supervisor, have these screenshots ready:

1. ✅ Webmail login page
2. ✅ Composing email to autoreply@nsa.his.se
3. ✅ Email sent confirmation
4. ✅ Received autoreply in inbox
5. ✅ Fortune cookie visible in email
6. ✅ Passwordless SSH to all servers

---

**Remember**: Screenshots prove your work. Take them at every verification point!
