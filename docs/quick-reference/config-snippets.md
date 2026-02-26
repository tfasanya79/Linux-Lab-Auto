# Configuration Snippets

## Network Configuration

### /etc/network/interfaces (Debian)

```bash
# Static configuration
auto eth0
iface eth0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4

# DHCP configuration
auto eth0
iface eth0 inet dhcp
```

### /etc/resolv.conf

```bash
nameserver 8.8.8.8
nameserver 8.8.4.4
search example.com
```

## SSH Configuration

### ~/.ssh/config

```bash
Host myserver
    HostName server.example.com
    User username
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ServerAliveInterval 60
```

### /etc/ssh/sshd_config (excerpts)

```bash
# Disable SSH1
Protocol 2

# Disable password authentication
PasswordAuthentication no

# Disable root login
PermitRootLogin no

# Change default port
Port 2222
```

## systemd Service Unit

### /etc/systemd/system/myservice.service

```ini
[Unit]
Description=My Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/myservice
Restart=always
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

## Cron Examples

### Daily Backup

```bash
# Daily backup at 2 AM
0 2 * * * /usr/local/bin/backup.sh
```

### Weekly Cleanup

```bash
# Every Monday at 3 AM
0 3 * * 1 /usr/bin/cleanup.sh
```

### Every 15 Minutes

```bash
# Every 15 minutes
*/15 * * * * /usr/bin/check-status.sh
```

## Bash Script Template

```bash
#!/bin/bash

# Script description
# Usage: script.sh [options]

set -e  # Exit on error
set -u  # Exit on undefined variable

# Variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/myscript.log"

# Functions
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Main script
main() {
    log "Script started"
    # Your code here
    log "Script completed"
}

# Run main function
main "$@"
```

## APT Repository

### /etc/apt/sources.list

```bash
# Debian stable
deb http://deb.debian.org/debian stable main contrib non-free
deb-src http://deb.debian.org/debian stable main contrib non-free

# Security updates
deb http://security.debian.org/debian-security stable/updates main
```

## Firewall (ufw)

### Basic Rules

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow from specific IP
sudo ufw allow from 192.168.1.0/24
```

## Environment Variables

### ~/.bashrc

```bash
# Locale
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Editor
export EDITOR=vim
export VISUAL=vim

# Path
export PATH="$PATH:$HOME/bin"

# Aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```

## Mail Aliases

### /etc/aliases

```bash
# System aliases
postmaster: root
webmaster: root

# User aliases
admin: user1
support: user1, user2
info: user1, user2, user3
```

## Log Rotation

### /etc/logrotate.d/myservice

```bash
/var/log/myservice.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 0644 root root
}
```

## systemd Timer

### /etc/systemd/system/backup.timer

```ini
[Unit]
Description=Daily Backup Timer

[Timer]
OnCalendar=daily
OnCalendar=Mon..Fri 02:00
Persistent=true

[Install]
WantedBy=timers.target
```

### /etc/systemd/system/backup.service

```ini
[Unit]
Description=Daily Backup Service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh
```

## Filesystem Mount

### /etc/fstab

```bash
# UUID=xxx /mnt ext4 defaults 0 2
UUID=aba9c3b0-7044-4be4-b55c-3f486a357552 /mnt ext4 defaults,noatime 0 2

# Swap
/swapfile none swap sw 0 0
```

## DNS (Bind9) - Basic

### /etc/bind/named.conf.options

```bash
options {
    directory "/var/cache/bind";
    forwarders {
        8.8.8.8;
        8.8.4.4;
    };
    dnssec-validation auto;
    listen-on-v6 { any; };
    allow-query { any; };
};
```

## Postfix - Basic

### /etc/postfix/main.cf (excerpts)

```bash
myhostname = mail.example.com
mydomain = example.com
myorigin = $mydomain
inet_interfaces = all
mydestination = $myhostname, localhost.$mydomain, $mydomain
mynetworks = 127.0.0.0/8, [::1]/128
```

## Dovecot - Basic

### /etc/dovecot/dovecot.conf (excerpts)

```bash
protocols = imap
mail_location = mbox:~/mail:INBOX=/var/mail/%u
auth_mechanisms = plain login
```

---

**Remember**: Always backup configuration files before making changes!
