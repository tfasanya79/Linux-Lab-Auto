# SSH Setup - Passwordless Authentication

## Overview

Configure passwordless SSH authentication from the management machine to all servers.

## Prerequisites

- Management machine (mgmt) configured
- All server VMs accessible via SSH
- User accounts on all machines

## Generate SSH Key Pair

### On Management Machine (mgmt)

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096

# Or use ed25519 (more modern)
ssh-keygen -t ed25519

# Press Enter to accept default location (~/.ssh/id_rsa)
# Optionally set passphrase (recommended for security)
```

## Copy Public Key to Servers

### Method 1: ssh-copy-id (Easiest)

```bash
# Copy to each server
ssh-copy-id user@10.[room].[group].11  # ns1
ssh-copy-id user@10.[room].[group].12  # ns2
ssh-copy-id user@10.[room].[group].13  # mail
ssh-copy-id user@10.[room].[group].14  # webmail
```

You'll be prompted for password each time.

### Method 2: Manual Copy

```bash
# Display public key
cat ~/.ssh/id_rsa.pub

# Copy the output, then on each server:
ssh user@10.[room].[group].11
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# Paste public key
chmod 600 ~/.ssh/authorized_keys
```

### Method 3: Using scp

```bash
# Copy public key
scp ~/.ssh/id_rsa.pub user@10.[room].[group].11:~/

# On remote server
ssh user@10.[room].[group].11
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
rm ~/id_rsa.pub
```

## Test Passwordless Login

### Step 4: Test SSH from Management Machine

1. **Test SSH to ns1:**
   ```bash
   ssh user@10.[room].[group].11
   ```
   - **Should connect WITHOUT password prompt**
   - Should show command prompt immediately
   - **📸 Screenshot Point:** Take screenshot showing SSH connection without password prompt

2. **Execute a command to verify:**
   ```bash
   hostname
   whoami
   ```
   - Should show hostname and username
   - **📸 Screenshot Point:** Take screenshot showing command execution via SSH

3. **Exit SSH:**
   ```bash
   exit
   ```

4. **Repeat for all other servers:**
   ```bash
   ssh user@10.[room].[group].12  # ns2
   ssh user@10.[room].[group].13  # mail
   ssh user@10.[room].[group].14  # webmail
   ```
   - Each should connect without password
   - **📸 Screenshot Point:** Take screenshot showing SSH to all servers working

5. **Test with command execution (without interactive login):**
   ```bash
   ssh user@10.[room].[group].11 "hostname && date"
   ssh user@10.[room].[group].12 "hostname && date"
   ssh user@10.[room].[group].13 "hostname && date"
   ssh user@10.[room].[group].14 "hostname && date"
   ```
   - Should execute commands and return output
   - **📸 Screenshot Point:** Take screenshot showing passwordless command execution on all servers

## SSH Configuration (Optional but Recommended)

### ~/.ssh/config on Management Machine

Create or edit `~/.ssh/config`:

```bash
nano ~/.ssh/config
```

**Add entries:**
```bash
Host ns1
    HostName 10.[room].[group].11
    User username
    IdentityFile ~/.ssh/id_rsa

Host ns2
    HostName 10.[room].[group].12
    User username
    IdentityFile ~/.ssh/id_rsa

Host mail
    HostName 10.[room].[group].13
    User username
    IdentityFile ~/.ssh/id_rsa

Host webmail
    HostName 10.[room].[group].14
    User username
    IdentityFile ~/.ssh/id_rsa
```

**Now you can use:**
```bash
ssh ns1
ssh ns2
ssh mail
ssh webmail
```

## Save Public Key for Report

### Display Public Key

```bash
# Display public key
cat ~/.ssh/id_rsa.pub

# Or
cat ~/.ssh/id_ed25519.pub
```

**Copy this key** - you'll need to include it in your lab report!

## Security Considerations

### Protect Private Key

```bash
# Set correct permissions
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh
```

### Disable Password Authentication (Optional)

**On servers** (`/etc/ssh/sshd_config`):

```bash
PasswordAuthentication no
```

**Restart SSH:**
```bash
sudo systemctl restart sshd
```

**Warning:** Only do this after verifying key-based authentication works!

## Troubleshooting

### Still Prompts for Password

1. Check permissions on `~/.ssh/authorized_keys` (should be 600)
2. Check permissions on `~/.ssh` directory (should be 700)
3. Check SSH server logs: `sudo journalctl -u ssh`
4. Verify public key is in `authorized_keys`
5. Check SELinux/AppArmor if enabled

### Permission Denied

1. Check file permissions:
   ```bash
   ls -la ~/.ssh/
   ```
2. Verify `authorized_keys` exists and has correct content
3. Check SSH server configuration
4. Review SSH logs

### Connection Refused

1. Check SSH service is running: `systemctl status ssh`
2. Check firewall: `sudo ufw status`
3. Verify network connectivity: `ping server`
4. Check SSH is listening: `ss -tuln | grep 22`

## Testing for Demonstration

### From Management Machine

```bash
# Test SSH to all servers
ssh user@10.[room].[group].11 "hostname"
ssh user@10.[room].[group].12 "hostname"
ssh user@10.[room].[group].13 "hostname"
ssh user@10.[room].[group].14 "hostname"
```

**All should execute without password prompt!**

## Next Steps

Once passwordless SSH is working:

1. Document your public key for the report
2. Complete [Testing](testing.md) section
3. Review [Checklist](checklist.md)
4. Prepare for demonstration

---

**Remember**: Keep your private key secure and include the public key in your report!
