# Common Commands

## File Operations

| Command | Description |
|---------|-------------|
| `ls` | List directory contents |
| `ls -l` | Long format listing |
| `ls -a` | Show hidden files |
| `ls -lh` | Human-readable sizes |
| `cd` | Change directory |
| `pwd` | Print working directory |
| `cp source dest` | Copy file |
| `cp -r source dest` | Copy directory recursively |
| `mv source dest` | Move/rename file |
| `rm file` | Remove file |
| `rm -r dir` | Remove directory recursively |
| `rm -f file` | Force remove |
| `mkdir dir` | Create directory |
| `mkdir -p path/to/dir` | Create directory tree |
| `rmdir dir` | Remove empty directory |
| `touch file` | Create empty file or update timestamp |

## File Viewing

| Command | Description |
|---------|-------------|
| `cat file` | Display entire file |
| `less file` | View file (scrollable) |
| `more file` | View file (page by page) |
| `head file` | Show first 10 lines |
| `head -n 20 file` | Show first 20 lines |
| `tail file` | Show last 10 lines |
| `tail -f file` | Follow file (watch for changes) |
| `tail -n 20 file` | Show last 20 lines |

## File Searching

| Command | Description |
|---------|-------------|
| `grep pattern file` | Search for pattern in file |
| `grep -r pattern dir` | Recursive search |
| `grep -i pattern file` | Case-insensitive search |
| `find /path -name "pattern"` | Find files by name |
| `find /path -type f` | Find files only |
| `find /path -type d` | Find directories only |
| `find /path -size +100M` | Find files larger than 100MB |
| `locate pattern` | Quick file search (requires updatedb) |

## Text Processing

| Command | Description |
|---------|-------------|
| `cut -d: -f1 file` | Extract first field (colon-delimited) |
| `sort file` | Sort lines |
| `sort -r file` | Reverse sort |
| `uniq file` | Remove duplicate lines |
| `wc file` | Count lines, words, characters |
| `wc -l file` | Count lines only |
| `sed 's/old/new/g' file` | Replace text |
| `awk '{print $1}' file` | Print first field |

## Permissions

| Command | Description |
|---------|-------------|
| `chmod 755 file` | Set permissions (rwxr-xr-x) |
| `chmod +x file` | Add execute permission |
| `chmod -x file` | Remove execute permission |
| `chown user:group file` | Change owner and group |
| `chown user file` | Change owner |
| `chgrp group file` | Change group |
| `umask` | Show default permissions mask |

## Process Management

| Command | Description |
|---------|-------------|
| `ps` | Show processes |
| `ps aux` | Show all processes |
| `ps -ef` | Show all processes (alternative) |
| `top` | Interactive process viewer |
| `htop` | Enhanced process viewer |
| `kill PID` | Terminate process |
| `kill -9 PID` | Force kill process |
| `killall name` | Kill processes by name |
| `pkill pattern` | Kill processes matching pattern |
| `jobs` | Show background jobs |
| `fg %1` | Bring job to foreground |
| `bg` | Send job to background |
| `nohup command &` | Run command immune to hangups |

## System Information

| Command | Description |
|---------|-------------|
| `uname -a` | System information |
| `hostname` | Show hostname |
| `uptime` | System uptime |
| `whoami` | Current user |
| `id` | User and group IDs |
| `who` | Logged in users |
| `w` | Who and what they're doing |
| `free -h` | Memory usage |
| `df -h` | Disk space usage |
| `du -h dir` | Directory size |
| `lscpu` | CPU information |
| `lsblk` | Block devices |
| `dmesg` | Kernel messages |

## Network

| Command | Description |
|---------|-------------|
| `ip addr show` | Show IP addresses |
| `ip link show` | Show network interfaces |
| `ip route show` | Show routing table |
| `ifconfig` | Network interface configuration |
| `ping host` | Test connectivity |
| `ping -c 4 host` | Ping 4 times |
| `traceroute host` | Trace route to host |
| `netstat -tuln` | Show listening ports |
| `ss -tuln` | Show listening ports (modern) |
| `dig domain` | DNS lookup |
| `nslookup domain` | DNS lookup (alternative) |
| `host domain` | DNS lookup (simple) |
| `wget URL` | Download file |
| `curl URL` | Transfer data |

## Package Management (Debian/Ubuntu)

| Command | Description |
|---------|-------------|
| `apt update` | Update package list |
| `apt upgrade` | Upgrade packages |
| `apt install package` | Install package |
| `apt remove package` | Remove package |
| `apt purge package` | Remove package and config |
| `apt search keyword` | Search for package |
| `apt show package` | Show package information |
| `apt list --installed` | List installed packages |
| `apt autoremove` | Remove unused packages |
| `dpkg -l` | List installed packages |
| `dpkg -i package.deb` | Install .deb file |

## systemd

| Command | Description |
|---------|-------------|
| `systemctl status service` | Service status |
| `systemctl start service` | Start service |
| `systemctl stop service` | Stop service |
| `systemctl restart service` | Restart service |
| `systemctl reload service` | Reload service |
| `systemctl enable service` | Enable at boot |
| `systemctl disable service` | Disable at boot |
| `systemctl list-units` | List all units |
| `journalctl` | View logs |
| `journalctl -u service` | Service logs |
| `journalctl -f` | Follow logs |
| `systemctl poweroff` | Shut down |
| `systemctl reboot` | Reboot |

## Archive and Compression

| Command | Description |
|---------|-------------|
| `tar -czf archive.tar.gz dir` | Create compressed archive |
| `tar -xzf archive.tar.gz` | Extract archive |
| `tar -tzf archive.tar.gz` | List archive contents |
| `zip -r archive.zip dir` | Create ZIP archive |
| `unzip archive.zip` | Extract ZIP archive |
| `gzip file` | Compress file |
| `gunzip file.gz` | Decompress file |
| `bzip2 file` | Compress with bzip2 |
| `bunzip2 file.bz2` | Decompress bzip2 |

## Disk and Filesystem

| Command | Description |
|---------|-------------|
| `fdisk -l` | List partitions |
| `fdisk /dev/sda` | Partition editor |
| `mkfs.ext4 /dev/sda1` | Create ext4 filesystem |
| `mount /dev/sda1 /mnt` | Mount filesystem |
| `umount /mnt` | Unmount filesystem |
| `fsck /dev/sda1` | Check filesystem |
| `df -h` | Disk space usage |
| `du -h` | Directory size |
| `lsblk` | List block devices |
| `blkid` | Show block device UUIDs |

## User Management

| Command | Description |
|---------|-------------|
| `useradd -m username` | Add user |
| `userdel username` | Delete user |
| `usermod -aG group user` | Add user to group |
| `passwd username` | Change password |
| `groups` | Show user groups |
| `id username` | User information |
| `su - username` | Switch user |
| `sudo command` | Run as root |
| `sudo -i` | Root shell |

## Cron

| Command | Description |
|---------|-------------|
| `crontab -e` | Edit crontab |
| `crontab -l` | List crontab |
| `crontab -r` | Remove crontab |
| `crontab -u user -e` | Edit user's crontab |

## SSH

| Command | Description |
|---------|-------------|
| `ssh user@host` | SSH to remote host |
| `ssh-keygen` | Generate SSH key |
| `ssh-copy-id user@host` | Copy SSH key |
| `scp file user@host:/path` | Copy file via SSH |
| `sftp user@host` | SFTP session |

## Useful Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Interrupt process |
| `Ctrl+Z` | Suspend process |
| `Ctrl+D` | End of input / logout |
| `Ctrl+L` | Clear screen |
| `Ctrl+A` | Beginning of line |
| `Ctrl+E` | End of line |
| `Ctrl+U` | Delete to beginning of line |
| `Ctrl+K` | Delete to end of line |
| `Ctrl+R` | Search command history |
| `!!` | Repeat last command |
| `!n` | Execute command number n from history |

---

**Remember**: Use `man command` for detailed information about any command!
