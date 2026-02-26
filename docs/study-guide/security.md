# Security

## Overview

Securing any complex operating system is a challenging task. This guide provides a cursory introduction to selected security topics.

## SSH (Secure Shell)

### History

- **Before 1995** - Remote login/copy tools existed, though unencrypted
  - `rlogin`, `telnet`, `rcp` should be avoided nowadays

- **1995** - Tatu Ylönen released SSH as freeware
  - Later changed into commercial/proprietary product

- **1999** - Open source implementation started, becomes OpenSSH
  - Run by OpenBSD community
  - Today the most popular implementation under Linux

- **2006** - Protocol version 2 specified
  - Superseding the original protocol (now called SSH1)
  - At least 27 RFCs (RFC 4250 to RFC 8332)
  - Few practical attacks known for version 2
  - **Support for protocol version 1 should always be disabled**

## OpenSSH

### Features

- **Remote login** (`ssh`) - Secure remote access
- **Remote command execution** (`ssh`) - Run commands remotely
- **Secure file transfer** (`sftp` or `scp`) - Transfer files securely
- **Tunneling of TCP ports** ('port forwarding') - Forward ports securely
- Base for secure transfer when synchronizing files (`rsync`), mounting remote filesystems (`sshfs`), etc.

### SSH on Windows

- **Clients**: PuTTY, WinSCP
- **Servers**: Microsoft's own port of OpenSSH or Bitvise SSH Server

## SSH Authentication

### Host-based Authentication

Allows non-root users to log in from a source host to a destination host without entering passwords, given that:

- Both hosts know each other's public keys
- There is a pre-configured mapping between IP address, hostname, and public key on the destination host for each allowed source host

**Features:**
- Global configuration (applies to all non-root users) or per-user configuration possible
- Allows configuring remote access for large numbers of users at once
- No 'password entering' necessary
- Unsuitable for dynamic network configurations where source host IP addresses change
- Several configuration files involved where access permissions must be correct

### Public Key Authentication

When individual users have a private-public key pair:

- **Private key** resides on the source host
- **Public key** must be located on the destination host in the corresponding home directory in `.ssh/authorized_keys`

**Setup:**
```bash
# Generate key pair
ssh-keygen -t rsa -b 4096

# Copy public key to remote host
ssh-copy-id user@hostname

# Or manually
cat ~/.ssh/id_rsa.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Password Authentication

- Less secure than public key
- Can be disabled for better security
- Use strong passwords if enabled

## SSH Configuration

### Client Configuration

File: `~/.ssh/config`

```bash
Host myserver
    HostName server.example.com
    User username
    Port 22
    IdentityFile ~/.ssh/id_rsa
```

### Server Configuration

File: `/etc/ssh/sshd_config`

```bash
# Disable SSH1
Protocol 2

# Disable password authentication (use keys only)
PasswordAuthentication no

# Disable root login
PermitRootLogin no

# Change default port
Port 2222

# Limit users
AllowUsers user1 user2
```

**Apply changes:**
```bash
sudo systemctl reload sshd
```

## Securing systemd Services

### Service Security

**Run services as non-root user:**
```ini
[Service]
User=www-data
Group=www-data
```

**Limit capabilities:**
```ini
[Service]
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
```

**Restrict file system access:**
```ini
[Service]
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=/var/lib/myservice
```

### Best Practices

1. **Run as non-root** - Use dedicated users for services
2. **Limit capabilities** - Only grant necessary permissions
3. **Restrict filesystem** - Limit file system access
4. **Use firewalls** - Restrict network access
5. **Keep updated** - Apply security updates regularly

## Firewall Configuration

### ufw (Uncomplicated Firewall)

```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow specific IP
sudo ufw allow from 192.168.1.0/24

# Deny port
sudo ufw deny 80/tcp

# Show status
sudo ufw status verbose
```

### iptables

```bash
# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Default deny
sudo iptables -P INPUT DROP
```

## Security Best Practices

1. **Keep system updated** - Apply security patches regularly
2. **Use strong passwords** - Or disable password auth
3. **Disable unused services** - Reduce attack surface
4. **Use firewall** - Restrict network access
5. **Monitor logs** - Watch for suspicious activity
6. **Use SSH keys** - More secure than passwords
7. **Limit sudo access** - Principle of least privilege
8. **Regular backups** - Protect your data

## Common Commands Summary

```bash
# SSH
ssh user@hostname
ssh-keygen -t rsa
ssh-copy-id user@hostname

# Firewall
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw status

# Service security
systemctl status servicename
```

## Next Steps

- Learn about [SSH Setup](../lab-assignment/ssh-setup.md) - Lab assignment
- Understand [Troubleshooting](troubleshooting.md) - Security issues
- Study [Logging](logging.md) - Security monitoring

---

**Remember**: Security is an ongoing process, not a one-time setup!
