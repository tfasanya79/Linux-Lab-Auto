# Logging

## What is Logging?

Tracking events in your system: **What happened when?**

Intended for system administrator to read.

## Why Do We Log?

- **Track down problems** in our system
  - Example: Why do my mails not reach their destination?

- **Detect ongoing changes and trends**
  - Example: (Automatically) analyze log messages for long-term patterns

- **Monitor security incidents**
  - Example: Login attempts via SSH or sudo

## What Generates Log Messages?

- **Kernel** - Detected hardware, faults, I/O events, etc.
- **Services** - Status changes, errors, etc.
- **User-space programs** - Uncommon (but possible) as they are usually run interactively

## Syslog

### Overview

Standard logging mechanism on Unix/Linux systems.

- Previously informal standard based on program of the same name
- Nowadays standardized as **RFC 5424** (and RFC 5425 and 5426)
- Protocol only specifies message format between originator and collector
- Optionally via relays

### Message Format

- **Facility and severity**
- **Timestamp**
- **Hostname** (FQDN or IP address)
- **Application name, PID, message id** (string)
- **List of key-value pairs** (optional, seemingly rarely used)
- **Actual text message**

### Transports

Different transports are possible (depending on implementations):

- **Local socket** `/dev/log`
- **TCP/TLS or UDP** - Allows for relaying local log messages to a central collector

## Syslog Categories

### Facility

24 predefined classes of logging services:

- `LOG_KERN` - Kernel messages
- `LOG_USER` - User-level messages
- `LOG_MAIL` - Mail system
- `LOG_DAEMON` - System daemons
- `LOG_AUTH` - Security/authorization
- `LOG_SYSLOG` - Syslog internal
- `LOG_LPR` - Line printer
- `LOG_NEWS` - Network news
- `LOG_UUCP` - UUCP
- `LOG_CRON` - Cron
- `LOG_AUTHPRIV` - Private authentication
- `LOG_FTP` - FTP
- `LOG_LOCAL0` through `LOG_LOCAL7` - Local use

### Severity

8 levels of importance:

- `LOG_DEBUG` - Debug messages
- `LOG_INFO` - Informational
- `LOG_NOTICE` - Normal but significant
- `LOG_WARNING` - Warning conditions
- `LOG_ERR` - Error conditions
- `LOG_CRIT` - Critical conditions
- `LOG_ALERT` - Action must be taken immediately
- `LOG_EMERG` - System is unusable

## How to Log to Syslog?

### Libraries

Available for various programming and scripting languages (C, Python, etc.)

### Command-line Tool

```bash
# Log message
logger "This is a test message"

# Log with priority
logger -p mail.info "Mail server started"

# Log with tag
logger -t myscript "Script executed"
```

## rsyslog

Most popular Syslog implementation (used in Debian 11 and earlier).

**Features:**
- Filtering messages based on facility and priority into separate log files
- Forwarding of messages to remote log collectors
- Processing messages via external programs
- Collecting kernel messages

### Configuration

File: `/etc/rsyslog.conf`

```bash
# Mail messages to separate file
mail.*    -/var/log/mail.log

# All messages to remote server
*.*       @192.168.1.100:514
```

## systemd Journal

### What is systemd Journal?

systemd's logging system, replacing traditional syslog in many distributions.

### Viewing Logs

```bash
# View all logs
journalctl

# View logs for service
journalctl -u servicename

# Follow logs
journalctl -f

# View logs since boot
journalctl -b

# View kernel messages
journalctl -k

# View logs for specific time
journalctl --since "2024-01-01 00:00:00"
journalctl --until "2024-01-01 23:59:59"

# View last N lines
journalctl -n 50

# View logs with priority
journalctl -p err
```

### Journal Filters

```bash
# Filter by unit
journalctl -u sshd

# Filter by user
journalctl _UID=1000

# Filter by executable
journalctl /usr/bin/sshd

# Filter by PID
journalctl _PID=1234
```

## Reading Logs

### Log Entry Example

```
jan 04 18:30:28 hostname program[PID]: message
```

**Components:**
- **Time** - When it happened
- **Hostname** - Where it happened
- **Program** - What program
- **PID** - Process ID
- **Message** - What happened

### Log Entry with Error

```
Jan 05 14:38:17 ns1 named[636]: dns_rdata_fromtext: /etc/bind/db.example:17: near '.': extra input text
```

**Pattern:** `filename:line_number: error message`

## Application-Specific Logs

### Apache Logs

Location: `/var/log/apache2/`

- `access.log` - Records every page request
- `error.log` - Contains errors from Apache2

### PHP Application Logs

PHP applications mostly log to their dedicated files:

- Roundcube: `/var/log/roundcube/error.log`
- Other PHP apps: Check application documentation

### Example Roundcube Log

```
[01-Dec-2025 13:19:21 +0000]: <f800fdc1> IMAP Error: Login failed for user against mail.example.com from 10.0.102.131. AUTHENTICATE PLAIN: Authentication failed.
```

## Log Management

### Log Rotation

Prevents logs from filling up disk space.

**Configuration:** `/etc/logrotate.conf` and `/etc/logrotate.d/`

```bash
/var/log/mail.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

### Viewing Log Files

```bash
# View log file
cat /var/log/syslog

# Follow log file
tail -f /var/log/syslog

# View last N lines
tail -n 50 /var/log/syslog

# Search in logs
grep "error" /var/log/syslog

# View logs with less
less /var/log/syslog
```

## Best Practices

1. **Monitor logs regularly** - Catch issues early
2. **Rotate logs** - Prevent disk space issues
3. **Centralize logs** - Use remote logging for multiple servers
4. **Set appropriate log levels** - Balance detail vs. volume
5. **Archive important logs** - Keep for compliance/analysis
6. **Use log analysis tools** - Automate log analysis

## Common Commands Summary

```bash
# systemd journal
journalctl
journalctl -u servicename
journalctl -f

# Traditional logs
tail -f /var/log/syslog
grep "error" /var/log/syslog

# Logging
logger "message"
```

## Next Steps

- Learn about [Troubleshooting](troubleshooting.md) - Use logs to debug
- Understand [Lab Assignment Troubleshooting](../lab-assignment/troubleshooting.md)
- Study [Security](security.md) - Monitor security logs

---

**Remember**: Logs are your best friend when troubleshooting!
