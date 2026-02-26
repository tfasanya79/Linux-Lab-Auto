# Lab Assignment Guide

Welcome to the Lab Assignment guide! This section provides step-by-step instructions for completing the practical assignment.

## Assignment Overview

**Task:** Set up a Debian Linux server environment for a small company that requires:
- Domain Name System (DNS)
- Mail server
- Webmail interface

**Requirements:**
- Lab Assignment (4 HP) - Practical setup
- Lab Report - Submit as PDF via Canvas

## Assignment Components

1. **[Environment Setup](environment-setup.md)** - Proxmox installation and VM creation
2. **[Network Configuration](network-config.md)** - IP addressing scheme
3. **[DNS Setup](dns-setup.md)** - Bind9 master/slave configuration
4. **[Mail Server Setup](mail-setup.md)** - Postfix + Dovecot
5. **[Webmail Setup](webmail-setup.md)** - Roundcube installation
6. **[SSH Setup](ssh-setup.md)** - Passwordless authentication
7. **[Testing](testing.md)** - Verification procedures
8. **[Checklist](checklist.md)** - Completion verification
9. **[Troubleshooting](troubleshooting.md)** - Common issues and solutions

## Important Placeholders

Throughout this guide, you'll see placeholders that need to be replaced:

- `[login]` - Your university login (e.g., `a24login`)
- `[room]` - Your room number (e.g., `209`)
- `[group]` - Your computer group number (e.g., `30`)

**Example:** If your login is `a24login`, room is `209`, and group is `30`:
- Domain: `a24login.it387g.nsa.his.se`
- IP range: `10.209.30.X`

## IP Addressing Scheme

Your network will use: `10.[room].[group].X`

**Example machines:**
- ns1: `10.209.30.11`
- ns2: `10.209.30.12`
- mail: `10.209.30.13`
- webmail: `10.209.30.14`
- mgmt: `10.209.30.22`

## Demonstration Checklist

When you're done, you must demonstrate:

1. Send an e-mail as `olivia.johnson@[login].it387g.nsa.his.se` via webmail to `autoreply@nsa.his.se`
2. Show the response from `autoreply@nsa.his.se` with the included fortune cookie
3. Demonstrate passwordless SSH authentication from management machine to servers

## Report Requirements

Your report must cover:

- DNS records including MX and A records
- Protocols such as SMTP, IMAP, SSH, and HTTP
- Concepts including mailbox, user, aliases
- Public key for your account on the management machine

**Format:**
- Single PDF document
- Filename: `[login].pdf` (e.g., `a24login.pdf`)
- Title page with full name, student login, course name, submission date
- Black text on white background
- A4 paper size
- 11pt font (body), monospaced for code/output
- Page numbers in footer
- Table of contents
- Numbered sections
- Flowcharts/diagrams recommended
- Appendices for large configuration sections
- APA or Harvard referencing style

## Getting Started

1. **Read this entire guide** - Understand the full scope
2. **Set up environment** - Start with [Environment Setup](environment-setup.md)
3. **Follow step-by-step** - Complete each section in order
4. **Test as you go** - Don't proceed until each step works
5. **Document everything** - Keep notes for your report

## Screenshot Guide

While the manual says "no screenshots" for configuration files in appendices, screenshots are **very useful** for:

### Critical Screenshot Points

1. **Environment Setup:**
   - Proxmox showing all VMs created
   - Successful Debian installation completion
   - Network connectivity tests (ping results)
   - SSH connections to all VMs

2. **DNS Setup:**
   - Configuration files (named.conf.options, named.conf.local)
   - Zone files (db.[login], db.10)
   - Zone syntax check results (named-checkzone)
   - Service status (systemctl status bind9)
   - DNS resolution tests (dig output showing A, MX, PTR records)

3. **Mail Server Setup:**
   - Postfix configuration (main.cf)
   - Dovecot configuration
   - Service status for both services
   - Open relay test (showing rejection)
   - Mail sending/receiving tests

4. **Webmail Setup:**
   - Roundcube login page
   - Successful login
   - Composing email interface
   - Sent email confirmation
   - Received email with fortune cookie
   - Email content showing autoreply

5. **SSH Setup:**
   - SSH key generation
   - Passwordless SSH working (no password prompt)
   - SSH connections to all servers

6. **Testing:**
   - All test results (DNS, mail, webmail, SSH)
   - Service status for all services
   - Log entries showing successful operations

### Screenshot Tips

- **Use descriptive filenames:** `dns-zone-check-passed.png`, `webmail-fortune-cookie.png`
- **Capture full context:** Include terminal prompts, error messages, or relevant UI elements
- **Organize screenshots:** Create folders by component (DNS, Mail, Webmail, etc.)
- **Include in report:** Use screenshots to prove functionality (not for config files)

## Tips for Success

1. **Work systematically** - Complete one component before moving to the next
2. **Test thoroughly** - Verify each service works before continuing
3. **Keep backups** - Save configuration files
4. **Read logs** - When something doesn't work, check the logs
5. **Ask for help** - But only after trying to solve it yourself
6. **Document as you go** - Makes report writing easier
7. **Take screenshots** - At key verification points (see Screenshot Guide above)

## Next Steps

Start with [Environment Setup](environment-setup.md) to begin your lab assignment!

---

**Remember**: This is not a step-by-step tutorial. You need to research and understand what you're doing!
