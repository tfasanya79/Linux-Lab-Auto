# System Customization

## Overview

Customizing your Linux system for locale, keyboard, time, and other preferences.

## Locale

### What is a Locale?

A **locale** is a set of parameters that defines the user's language, country and any special variant preferences that the user wants to see in their user interface.

### Locale Identifiers

Defined by formatted identifiers:
```
language_territory.codeset@modifier
```

**Examples:**
- `en` - English
- `de_AT.UTF-8` - German (Austria)
- `sv_SE` - Swedish (Sweden)
- `sv_FI` - Swedish (Finland)

### Locale Variables

**General setting** defined by environment variable `LANG`

**Specific settings** in variables starting with `LC_`:

```bash
LANG=en_US.utf8              # English settings by default
LC_TIME=de_DE.UTF-8          # 24-hour time like used in Germany
LC_MONETARY=sv_SE            # use Swedish crowns
```

### Locale Categories

- `LC_TIME` - Date and time format
- `LC_MONETARY` - Currency format
- `LC_NUMERIC` - Number format
- `LC_MESSAGES` - Language for messages
- `LC_COLLATE` - Collation order
- `LC_CTYPE` - Character classification

## Locale Configuration

### Debian

**System-wide:** `/etc/default/locale`

```bash
LANG=en_US.UTF-8
LC_ALL=
```

### Other Distributions

**System-wide:**
- `/etc/locale.conf` (file)
- `localectl` (command)

**User-specific:**
- `~/.bashrc` or `~/.bash_profile`
- Early in your shell scripts
- Right before commands

### localectl Command

```bash
# View current locale
localectl status

# Output:
# System Locale: LANG=en_US.UTF-8
# VC Keymap: sv-latin1
# X11 Layout: se
# X11 Model: pc105
# X11 Options: terminate:ctrl_alt_bksp

# List available locales
localectl list-locales

# Set locale
sudo localectl set-locale LANG=locale
```

## Keyboard Configuration

### Console Keyboard

**Debian:**
```bash
# Edit /etc/default/keyboard
XKBLAYOUT=us
XKBVARIANT=
```

**Other distributions:**
```bash
localectl set-keymap keymap
```

### X11 Keyboard

```bash
# Set X11 keyboard layout
localectl set-x11-keymap layout

# Example
localectl set-x11-keymap se
```

## Time Configuration

### Timezone

**View current timezone:**
```bash
timedatectl
date
```

**List timezones:**
```bash
timedatectl list-timezones
```

**Set timezone:**
```bash
sudo timedatectl set-timezone Europe/Stockholm
```

### System Clock

**View clock:**
```bash
timedatectl
```

**Set time:**
```bash
sudo timedatectl set-time "2024-01-01 12:00:00"
```

**Synchronize with NTP:**
```bash
sudo timedatectl set-ntp true
```

### NTP Configuration

**systemd-timesyncd:**
```bash
# Enable NTP
sudo timedatectl set-ntp true

# View status
timedatectl timesync-status
```

**ntpd (if installed):**
```bash
# Configuration: /etc/ntp.conf
sudo systemctl enable ntpd
sudo systemctl start ntpd
```

## Environment Variables

### Setting Variables

**Temporary (current session):**
```bash
export LANG=en_US.UTF-8
export EDITOR=vim
```

**Permanent (user):**
```bash
# Add to ~/.bashrc or ~/.bash_profile
export LANG=en_US.UTF-8
export EDITOR=vim
```

**Permanent (system-wide):**
```bash
# Add to /etc/environment
LANG=en_US.UTF-8
```

## Shell Customization

### .bashrc

User-specific bash configuration:
```bash
# ~/.bashrc
export PS1='\u@\h:\w\$ '
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```

### .bash_profile

Executed for login shells:
```bash
# ~/.bash_profile
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

## Best Practices

1. **Set locale early** - In system configuration
2. **Use UTF-8** - For international character support
3. **Test changes** - Verify after customization
4. **Document customizations** - Keep track of changes
5. **Use system tools** - Prefer `localectl`, `timedatectl` over manual editing

## Common Commands Summary

```bash
# Locale
localectl status
localectl list-locales
sudo localectl set-locale LANG=locale

# Time
timedatectl
sudo timedatectl set-timezone timezone
sudo timedatectl set-ntp true

# Keyboard
localectl set-keymap keymap
localectl set-x11-keymap layout
```

## Next Steps

- Learn about [User Management](users.md) - User preferences
- Understand [Troubleshooting](troubleshooting.md) - Customization issues
- Study [Booting and systemd](booting-systemd.md) - System configuration

---

**Remember**: Customize to your needs, but keep it maintainable!
