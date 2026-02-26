# Troubleshooting

## Overview

Troubleshooting is a critical skill for Linux administrators. This guide covers tools and techniques for diagnosing and fixing problems.

## Documentation

### man Pages

For (nearly) every command, library, or configuration file, there is documentation called 'manual pages', short 'man pages'.

**Invoke:**
```bash
man command
man 5 configfile
```

**Features:**
- Authoritative source of information
- Locally stored in `/usr/share/man`
- Available even if network is down (offline)
- Only basic formatting, viewed through `less` (press `q` to exit)

### Searching man Pages

```bash
# Search all man pages for search term (regular expression)
man -k search-term

# Alternative
apropos search-term
```

### Man Page Sections

Man pages are categorized into sections, identified by numbers:

1. **User-level commands and applications**
2. **System calls, kernel error codes**
3. **Library calls**
4. **Device drivers and network protocols** (or 7)
5. **Standard file formats** (or 4)
6. **Games and demos**
7. **Miscellaneous file and documents** (or 5)
8. **System administration commands** (or 1m)
9. **Obscure and vendor-specific information**

**Convention to refer to man page:**
- Name of man page, directly followed by section number in round parentheses
- Same name of a man page can be used in different sections

**Examples:**
- `crontab(1)` - Program to manipulate crontab files: `man 1 crontab`
- `crontab(5)` - Description of the crontab file format: `man 5 crontab` or `man crontab.5`

## Hardware Troubleshooting

### Detecting Hardware

**Check systemd's journal for kernel messages:**
```bash
journalctl -k
```

**View kernel messages:**
```bash
sudo dmesg
sudo dmesg | grep -i error
```

**Hardware information:**
```bash
# CPU information
lscpu
cat /proc/cpuinfo

# Memory information
free -h
cat /proc/meminfo

# Disk information
lsblk
fdisk -l

# PCI devices
lspci

# USB devices
lsusb

# Network interfaces
ip link show
```

## Software Troubleshooting

### Service Status

```bash
# Check service status
systemctl status servicename

# Check if service is running
systemctl is-active servicename

# Check if service is enabled
systemctl is-enabled servicename

# View service logs
journalctl -u servicename
```

### Process Issues

```bash
# Find process
ps aux | grep processname

# Check process resources
top
htop

# Kill process
kill PID
kill -9 PID  # force kill
```

### Package Issues

```bash
# Check package status
dpkg -l | grep packagename

# Reinstall package
sudo apt install --reinstall packagename

# Fix broken dependencies
sudo apt --fix-broken install
```

## Network Troubleshooting

### Connectivity

```bash
# Ping test
ping google.com
ping 8.8.8.8

# Check interface
ip addr show
ip link show

# Check routes
ip route show

# Check DNS
dig google.com
nslookup google.com
```

### Ports and Connections

```bash
# Check listening ports
ss -tuln
netstat -tuln

# Check connections
ss -tun
netstat -tun

# Test port
telnet hostname port
nc -zv hostname port
```

## Configuration File Issues

### Syntax Errors

**Common pattern in error messages:**
```
filename:line_number: error message
```

**Example:**
```
/etc/bind/db.example:17: near '.': extra input text
```

**Solution:**
1. Check the specified file and line number
2. Look for syntax errors (missing quotes, brackets, etc.)
3. Validate configuration with appropriate tool

### Testing Configuration

```bash
# Test Postfix configuration
sudo postfix check

# Test Apache configuration
sudo apache2ctl configtest

# Test Bind9 configuration
sudo named-checkconf
sudo named-checkzone example.com /etc/bind/db.example
```

## Log Analysis

### Finding Errors

```bash
# Search for errors in logs
grep -i error /var/log/syslog
journalctl -p err

# Search for specific service
journalctl -u servicename | grep -i error

# Search by time
journalctl --since "1 hour ago" | grep -i error
```

### Common Log Locations

- `/var/log/syslog` - System log
- `/var/log/auth.log` - Authentication log
- `/var/log/mail.log` - Mail log
- `/var/log/apache2/` - Apache logs
- `/var/log/nginx/` - Nginx logs

## Performance Troubleshooting

### System Resources

```bash
# CPU usage
top
htop
vmstat 1

# Memory usage
free -h
vmstat 1

# Disk usage
df -h
du -h

# I/O statistics
iostat 1
```

### Identifying Bottlenecks

```bash
# Find processes using CPU
top -o %CPU

# Find processes using memory
top -o %MEM

# Find large files
find / -size +100M

# Check disk I/O
iotop
```

## Common Issues and Solutions

### Service Won't Start

1. Check service status: `systemctl status servicename`
2. Check logs: `journalctl -u servicename`
3. Check configuration: Test config files
4. Check dependencies: Ensure required services are running
5. Check permissions: Verify file/directory permissions

### Permission Denied

1. Check file permissions: `ls -l filename`
2. Check directory permissions: `ls -ld directory`
3. Check SELinux/AppArmor: May block access
4. Use sudo if needed: `sudo command`

### Network Issues

1. Check interface status: `ip link show`
2. Check IP configuration: `ip addr show`
3. Test connectivity: `ping gateway`
4. Check DNS: `dig domain.com`
5. Check firewall: `sudo ufw status`

## Troubleshooting Methodology

1. **Identify the problem** - What exactly is wrong?
2. **Gather information** - Check logs, status, configuration
3. **Reproduce the issue** - Can you reproduce it?
4. **Isolate the cause** - Narrow down possibilities
5. **Test solutions** - Try fixes one at a time
6. **Document** - Record what worked

## Best Practices

1. **Read error messages carefully** - They often tell you what's wrong
2. **Check logs first** - Most issues are logged
3. **Test incrementally** - Make one change at a time
4. **Document solutions** - Help yourself and others
5. **Use man pages** - Official documentation is authoritative
6. **Search online** - But verify information

## Common Commands Summary

```bash
# Documentation
man command
man -k keyword

# Hardware
dmesg
lscpu
lsblk

# Services
systemctl status servicename
journalctl -u servicename

# Network
ping hostname
ip addr show
ss -tuln

# Logs
journalctl
grep error /var/log/syslog
```

## Next Steps

- Learn about [Logging](logging.md) - Understand log systems
- Study [Security](security.md) - Security troubleshooting
- Review [Lab Assignment Troubleshooting](../lab-assignment/troubleshooting.md)

---

**Remember**: When in doubt, check the logs!
