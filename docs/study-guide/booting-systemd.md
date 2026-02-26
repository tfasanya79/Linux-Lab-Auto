# Booting and systemd

## Boot Process

### Computer Starts, Kernel is Loaded

1. **System's firmware loads** - Detects and initializes hardware
2. **Storage device located** - With code to execute
3. **Bootloader stages** - BIOS/UEFI, code in MBR, multi-stage bootloader (e.g., GRUB) execute
4. **Linux kernel executed** - Detects and initializes (more) hardware

## Historic: init(1)

### What is init?

- **First process** to be started
- **Last process** to be stopped
- Has **PID 1**
- **Ancestor** to all processes
- Normal user-space process, runs with **root permissions** (UID 0)
- Could be any program (in theory)
- By default `/sbin/init`, but can be changed by kernel parameter

### Tasks Performed by init

- Configuring networking
- Checking and mounting filesystems
- Starting services in right order

## System V init

### Characteristics

- Based on early 1980s Unix init
- Introduced concept of **runlevels**
- Starts all services one after another during boot
- Shuts down in reverse order
- System administrator manually configures order
- Implemented as a shell script (`/etc/rc`) in historic Unix flavors
- Later split into multiple, smaller shell scripts located in `/etc/rc.d/` or `/etc/init.d/`
- **Sequential** - I/O operations dominate time to boot
- Designed for machines that would rarely boot (servers)

### Runlevels

Runlevels describe 'use cases' with selections of daemons:

| Runlevel | Description |
|----------|-------------|
| 0 | System is to be switched off |
| 1 (or S) | Single-user mode for maintenance |
| 2 | Multi-user, but no networking or graphical UI |
| 3 | Adds networking to runlevel 2 |
| 4 | Undefined |
| 5 | Adds graphical user-interface to runlevel 3 |
| 6 | Reboot |

## Modern Replacements for init

### Upstart

- Developed by Canonical (Ubuntu)
- **On-event start** of services even after boot phase
- Compatibility to System V init scripts was design goal
- Used in Ubuntu from 2006 to 2015, replaced by systemd
- Used in RHEL/CentOS 6 and Fedora 9-14

### systemd

- Modern init system and service manager
- **Parallel start** of daemons to reduce total time to boot
- **Automatic ordering** of dependencies between daemons
- Used in most modern Linux distributions

## systemd

### What is systemd?

- **System and service manager** for Linux
- **Init system** (PID 1)
- **Service manager** - Starts, stops, manages services
- **Dependency management** - Handles service dependencies
- **Logging** - systemd journal
- **Device management** - udev integration
- **Network management** - NetworkManager integration

### systemd Units

Units are systemd's configuration files:

- **Service units** (`.service`) - Services/daemons
- **Target units** (`.target`) - Groups of units (like runlevels)
- **Mount units** (`.mount`) - Filesystem mounts
- **Socket units** (`.socket`) - Network/Unix sockets
- **Timer units** (`.timer`) - Scheduled tasks
- **Path units** (`.path`) - File/directory monitoring

### systemd Commands

```bash
# Service management
sudo systemctl start servicename
sudo systemctl stop servicename
sudo systemctl restart servicename
sudo systemctl reload servicename
sudo systemctl status servicename

# Enable/disable services
sudo systemctl enable servicename
sudo systemctl disable servicename

# List services
systemctl list-units --type=service
systemctl list-units --type=service --state=running

# View service logs
journalctl -u servicename
journalctl -u servicename -f  # follow
```

### systemd Targets

Targets are like runlevels:

| Target | Description |
|--------|-------------|
| `poweroff.target` | Shut down |
| `rescue.target` | Single-user mode |
| `multi-user.target` | Multi-user without GUI |
| `graphical.target` | Multi-user with GUI |
| `reboot.target` | Reboot |

```bash
# Change target
sudo systemctl isolate multi-user.target

# Get default target
systemctl get-default

# Set default target
sudo systemctl set-default multi-user.target
```

### systemd Unit Files

Location: `/etc/systemd/system/` (system) or `~/.config/systemd/user/` (user)

**Example service unit:**
```ini
[Unit]
Description=My Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/myservice
Restart=always

[Install]
WantedBy=multi-user.target
```

### systemd Journal

```bash
# View all logs
journalctl

# View logs for service
journalctl -u servicename

# Follow logs
journalctl -f

# View logs since boot
journalctl -b

# View logs for specific time
journalctl --since "2024-01-01 00:00:00"
journalctl --until "2024-01-01 23:59:59"

# View kernel messages
journalctl -k
```

## Booting and Shutting Down

### Booting

```bash
# View boot messages
dmesg
journalctl -b

# View boot time
systemd-analyze
systemd-analyze blame  # see what took longest
```

### Shutting Down

```bash
# Shut down
sudo shutdown -h now
sudo poweroff
sudo systemctl poweroff

# Reboot
sudo shutdown -r now
sudo reboot
sudo systemctl reboot

# Scheduled shutdown
sudo shutdown -h +60  # in 60 minutes
sudo shutdown -h 23:00  # at 23:00
```

## Best Practices

1. **Use systemctl** - Modern way to manage services
2. **Check dependencies** - Understand service dependencies
3. **Monitor logs** - Use journalctl regularly
4. **Test before production** - Verify service configurations
5. **Use targets** - Organize services with targets

## Common Commands Summary

```bash
# Service management
sudo systemctl start/stop/restart/status servicename
sudo systemctl enable/disable servicename

# Targets
systemctl get-default
sudo systemctl set-default target

# Logs
journalctl -u servicename
journalctl -f

# Boot analysis
systemd-analyze
systemd-analyze blame
```

## Next Steps

- Learn about [Software Management](software-management.md)
- Understand [Network Configuration](network.md)
- Study [Logging](logging.md)

---

**Remember**: systemd is the modern way to manage services. Learn it well!
