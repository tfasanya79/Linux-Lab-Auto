# User Management

## Overview

User management is fundamental to Linux system administration. Understanding users, groups, and permissions is essential for security and system administration.

## Types of Users

### Numeric User IDs (UIDs)

Each user has a **unique numeric identifier** (UID) used by the system to identify users.

### User Categories

1. **Normal Accounts**
   - Numeric ID ≥ 1000 and < 2³²
   - For human users
   - Can log in (if password set)

2. **System Accounts**
   - Numeric IDs 1-999
   - For daemons/services
   - Login disabled
   - Examples: `sshd`, `www-data`, `postfix`

3. **root**
   - Numeric ID 0
   - Allowed to do **anything**
   - Only log in as root if absolutely necessary
   - Use `sudo` instead when possible

4. **nobody**
   - Numeric ID 65534 (or 99)
   - Corresponding group `nogroup`
   - Used for network filesystems to represent remote users without matching local user account

## Users and Groups

### Usernames

- **Historic, safe**: 1 to 8 letters or digits, lower-case
- **Linux-supported**: 1 to 32 letters or digits
- **May not start with a digit** (see `useradd(8)` and `passwd(5)`)
- Mostly for humans because they cannot remember numbers

### Groups

- One or several users can be put into a **group**
- A user can be a **member** in one or several groups
- Each user has one **default group** (primary group)
- Groups are represented by their numeric **GID** (Group ID)
- Number scheme matches UID scheme
- Common to have groups matching user accounts both in ID and name

## Standard Unix Access Control

### Basic Principles

- **(Numeric) user identifier (UID)** - Most often base for access control
- **User's group memberships** - Mostly relevant for file access control
- **Objects** (files, processes, etc.) have **owners**
- **Owners** have (almost always) **complete control** over their objects
- **Default owner** of object is its creator
- **Special user root** (to be precise, UID 0) has **full control** over everything

### What Only root Can Do

Only root can perform operations necessary for system administration:

- Configuring hardware like system clock
- Raising resource limits for processes
- Network configuration like setting IP address
- Listening on privileged network ports (< 1024)
- Assuming the identity of any other user (UID/GID)
- Rebooting or shutting down system

### Example: Process Killing

Checking permission to kill a process (simplified):

1. Caller of kill system call is **root**? → Allow killing process
2. Caller of kill system call is **same as owner** of process? → Allow killing process
3. Else → Deny killing the process

## Managing Users

### Adding Users

```bash
# Add a new user
sudo useradd -m -s /bin/bash username

# Add user with specific UID
sudo useradd -m -u 1001 username

# Add user to additional groups
sudo useradd -m -G group1,group2 username
```

### Removing Users

```bash
# Remove user (keeps home directory)
sudo userdel username

# Remove user and home directory
sudo userdel -r username
```

### Modifying Users

```bash
# Change user's shell
sudo usermod -s /bin/zsh username

# Add user to additional group
sudo usermod -aG groupname username

# Change user's home directory
sudo usermod -d /new/home/dir username
```

### Temporary Disabling

```bash
# Lock user account
sudo usermod -L username

# Unlock user account
sudo usermod -U username

# Expire password (forces password change on next login)
sudo passwd -e username
```

## Password Management

### Setting Passwords

```bash
# Set password for current user
passwd

# Set password for another user (root only)
sudo passwd username
```

### Password Policies

- Minimum length requirements
- Complexity requirements
- Expiration dates
- Password history

## Group Management

### Creating Groups

```bash
# Create a new group
sudo groupadd groupname

# Create group with specific GID
sudo groupadd -g 1001 groupname
```

### Modifying Groups

```bash
# Add user to group
sudo usermod -aG groupname username

# Remove user from group (requires editing /etc/group manually or using gpasswd)
sudo gpasswd -d username groupname
```

### Deleting Groups

```bash
# Delete a group
sudo groupdel groupname
```

## User Information Files

### /etc/passwd

Contains user account information:

```
username:x:UID:GID:comment:home:shell
```

- **username**: Login name
- **x**: Password placeholder (actual password in /etc/shadow)
- **UID**: User ID
- **GID**: Primary group ID
- **comment**: Full name or description
- **home**: Home directory
- **shell**: Default shell

### /etc/shadow

Contains encrypted passwords and password aging information (root only):

```
username:encrypted_password:last_change:min:max:warn:inactive:expire:reserved
```

### /etc/group

Contains group information:

```
groupname:x:GID:members
```

## PAM (Pluggable Authentication Modules)

### What is PAM?

PAM provides authentication services for applications:

- **Pluggable** - Can use different authentication methods
- **Modular** - Different modules for different purposes
- **Configurable** - Per-application configuration

### PAM Configuration

Located in `/etc/pam.d/`:

- Each service has its own configuration file
- Configuration specifies which modules to use
- Modules can be stacked (one after another)

### Common PAM Modules

- **pam_unix**: Traditional Unix authentication
- **pam_ldap**: LDAP authentication
- **pam_sss**: System Security Services
- **pam_tally2**: Account locking after failed attempts

## How to Become 'root'?

### su (Switch User)

```bash
# Switch to root (requires root password)
su -

# Switch to another user
su - username
```

### sudo (Super User Do)

```bash
# Run command as root
sudo command

# Run command as another user
sudo -u username command

# Open root shell
sudo -i

# Edit sudoers file
sudo visudo
```

### sudo Configuration

File: `/etc/sudoers`

```bash
# Allow user to run all commands
username ALL=(ALL:ALL) ALL

# Allow user to run specific commands
username ALL=(ALL:ALL) /usr/bin/apt, /usr/bin/systemctl

# Allow group
%groupname ALL=(ALL:ALL) ALL
```

## Best Practices

1. **Use sudo instead of su** - Better audit trail
2. **Limit sudo access** - Only grant necessary permissions
3. **Use strong passwords** - Enforce password policies
4. **Disable unused accounts** - Lock or remove old accounts
5. **Regular audits** - Review user accounts periodically
6. **Principle of least privilege** - Give users only what they need

## Common Commands

```bash
# View current user
whoami
id

# View user information
id username
finger username  # if installed

# View logged in users
who
w

# View user's groups
groups
groups username

# Switch user
su - username
sudo -u username command

# View sudo configuration
sudo -l
```

## Next Steps

- Learn about [Process Management](processes.md)
- Understand [Storage](storage.md)
- Study [Security](security.md)

---

**Remember**: User management is about security. Always follow the principle of least privilege!
