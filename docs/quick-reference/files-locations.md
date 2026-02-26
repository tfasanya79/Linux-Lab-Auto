# Important File Locations

## System Configuration

| File/Directory | Description |
|----------------|-------------|
| `/etc/passwd` | User accounts |
| `/etc/shadow` | Encrypted passwords |
| `/etc/group` | Group information |
| `/etc/sudoers` | Sudo configuration |
| `/etc/hosts` | Local hostname resolution |
| `/etc/hostname` | System hostname |
| `/etc/resolv.conf` | DNS configuration |
| `/etc/nsswitch.conf` | Name Service Switch configuration |
| `/etc/fstab` | Filesystem mount table |
| `/etc/mtab` | Currently mounted filesystems |
| `/etc/network/interfaces` | Network configuration (Debian) |
| `/etc/systemd/network/` | Network configuration (systemd) |
| `/etc/locale.conf` | Locale configuration |
| `/etc/default/locale` | Locale configuration (Debian) |

## Service Configuration

| File/Directory | Description |
|----------------|-------------|
| `/etc/systemd/system/` | systemd unit files |
| `/etc/init.d/` | Init scripts (SysV) |
| `/etc/ssh/sshd_config` | SSH server configuration |
| `/etc/ssh/ssh_config` | SSH client configuration |
| `/etc/postfix/` | Postfix mail server |
| `/etc/dovecot/` | Dovecot IMAP server |
| `/etc/bind/` | Bind9 DNS server |
| `/etc/apache2/` | Apache web server |
| `/etc/nginx/` | Nginx web server |

## Log Files

| File/Directory | Description |
|----------------|-------------|
| `/var/log/syslog` | System log |
| `/var/log/auth.log` | Authentication log |
| `/var/log/mail.log` | Mail log |
| `/var/log/apache2/` | Apache logs |
| `/var/log/nginx/` | Nginx logs |
| `/var/log/roundcube/` | Roundcube logs |
| `/var/log/bind9/` | Bind9 logs |
| `journalctl` | systemd journal (not a file) |

## User Directories

| Directory | Description |
|-----------|-------------|
| `~` or `$HOME` | User home directory |
| `~/Desktop` | Desktop directory |
| `~/Documents` | Documents directory |
| `~/.ssh/` | SSH keys and configuration |
| `~/.bashrc` | Bash configuration |
| `~/.bash_profile` | Bash profile (login shells) |
| `~/.profile` | User profile |
| `~/.vimrc` | Vim configuration |
| `~/.gitconfig` | Git configuration |

## System Directories

| Directory | Description |
|-----------|-------------|
| `/bin` | Essential binaries |
| `/sbin` | System binaries |
| `/usr/bin` | User binaries |
| `/usr/sbin` | System binaries |
| `/usr/local/bin` | Local binaries |
| `/etc` | Configuration files |
| `/var` | Variable data |
| `/var/log` | Log files |
| `/var/spool` | Spool files |
| `/var/cache` | Cache files |
| `/tmp` | Temporary files |
| `/proc` | Process information |
| `/sys` | System information |
| `/dev` | Device files |
| `/boot` | Boot files |
| `/lib` | Libraries |
| `/usr/lib` | User libraries |
| `/opt` | Optional software |

## Package Management

| File/Directory | Description |
|----------------|-------------|
| `/etc/apt/sources.list` | APT repository list |
| `/etc/apt/sources.list.d/` | Additional APT repositories |
| `/var/lib/apt/` | APT database |
| `/var/cache/apt/` | APT cache |
| `/var/lib/dpkg/` | dpkg database |

## DNS Configuration

| File/Directory | Description |
|----------------|-------------|
| `/etc/bind/named.conf` | Bind9 main configuration |
| `/etc/bind/named.conf.options` | Bind9 options |
| `/etc/bind/named.conf.local` | Bind9 local zones |
| `/etc/bind/db.*` | Zone files |
| `/etc/resolv.conf` | DNS resolver configuration |

## Mail Configuration

| File/Directory | Description |
|----------------|-------------|
| `/etc/postfix/main.cf` | Postfix main configuration |
| `/etc/postfix/master.cf` | Postfix service configuration |
| `/etc/dovecot/dovecot.conf` | Dovecot main configuration |
| `/etc/dovecot/conf.d/` | Dovecot additional configuration |
| `/etc/aliases` | Mail aliases |
| `/var/mail/` | Mail spool directory |
| `~/Maildir/` | Maildir format mailboxes |

## Web Server

| File/Directory | Description |
|----------------|-------------|
| `/etc/apache2/apache2.conf` | Apache main configuration |
| `/etc/apache2/sites-available/` | Available sites |
| `/etc/apache2/sites-enabled/` | Enabled sites |
| `/var/www/html/` | Web root (default) |
| `/etc/nginx/nginx.conf` | Nginx main configuration |
| `/etc/nginx/sites-available/` | Available sites |
| `/etc/nginx/sites-enabled/` | Enabled sites |

## Security

| File/Directory | Description |
|----------------|-------------|
| `/etc/ssh/sshd_config` | SSH server configuration |
| `/etc/ssh/ssh_config` | SSH client configuration |
| `~/.ssh/authorized_keys` | Authorized SSH keys |
| `~/.ssh/id_rsa` | Private SSH key |
| `~/.ssh/id_rsa.pub` | Public SSH key |
| `/etc/sudoers` | Sudo configuration |
| `/etc/sudoers.d/` | Additional sudo rules |

## Cron

| File/Directory | Description |
|----------------|-------------|
| `/etc/crontab` | System crontab |
| `/etc/cron.d/` | Additional cron jobs |
| `/etc/cron.daily/` | Daily cron jobs |
| `/etc/cron.weekly/` | Weekly cron jobs |
| `/etc/cron.monthly/` | Monthly cron jobs |
| `/var/spool/cron/` | User crontabs |

## System Information

| File/Directory | Description |
|----------------|-------------|
| `/proc/cpuinfo` | CPU information |
| `/proc/meminfo` | Memory information |
| `/proc/version` | Kernel version |
| `/proc/mounts` | Mounted filesystems |
| `/proc/net/` | Network information |
| `/sys/class/net/` | Network interfaces |

---

**Remember**: Configuration files are usually in `/etc/`, logs in `/var/log/`, and user data in `~/`!
