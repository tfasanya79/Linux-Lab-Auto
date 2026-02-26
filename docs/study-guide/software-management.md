# Software Management

## Linux Distributions

### What is a Linux Distribution?

A **Linux distribution** is a project that:

- **Curates** a selection of software that can be installed via a package management system
- Provides **default configuration** so most things work 'out of the box'
- **Puts software components together** so your computer boots
- May focus on **different use cases**, customers, or goals

### Distribution Focus Areas

- **Server** - Optimized for server workloads
- **Desktop** - User-friendly desktop experience
- **Embedded device** - Minimal, resource-constrained
- **HPC cluster** - High-performance computing
- **Cloud** - Cloud-optimized images
- **Security** - Penetration testing and security
- **Education** - STEM research, schools

### Update Schemes

1. **Calendar-based** - Twice per year, every two years, etc.
2. **Stable** - Deemed stable by distribution maintainers
3. **Rolling** - Software components updated as soon as new versions become available

### Security Updates

- Distributed as needed outside of planned updates
- Critical for system security
- Should be applied regularly

## Package Management

### What is a Package?

A **package** is:

- A compressed archive containing:
  - Software files
  - Metadata (version, dependencies, etc.)
  - Installation scripts
  - Configuration files

### Package Managers

**Debian/Ubuntu:**
- `apt` / `apt-get` - Command-line package manager
- `dpkg` - Low-level package manager
- `aptitude` - Alternative package manager

**Red Hat/CentOS/Fedora:**
- `yum` / `dnf` - Package manager
- `rpm` - Low-level package manager

**Arch Linux:**
- `pacman` - Package manager

## APT (Advanced Package Tool)

### Basic Commands

```bash
# Update package list
sudo apt update

# Upgrade all packages
sudo apt upgrade

# Install package
sudo apt install packagename

# Remove package
sudo apt remove packagename

# Remove package and configuration
sudo apt purge packagename

# Search for package
apt search keyword

# Show package information
apt show packagename

# List installed packages
apt list --installed

# List available updates
apt list --upgradable
```

### Advanced APT Commands

```bash
# Full system upgrade
sudo apt full-upgrade

# Remove unused packages
sudo apt autoremove

# Clean package cache
sudo apt clean

# Fix broken dependencies
sudo apt --fix-broken install

# Hold package (prevent updates)
sudo apt-mark hold packagename

# Unhold package
sudo apt-mark unhold packagename
```

### dpkg Commands

```bash
# Install .deb file
sudo dpkg -i package.deb

# Remove package
sudo dpkg -r packagename

# List installed packages
dpkg -l

# Show package information
dpkg -s packagename

# List files in package
dpkg -L packagename

# Find package owning file
dpkg -S /path/to/file
```

## Software Repositories

### Repository Configuration

Location: `/etc/apt/sources.list` or `/etc/apt/sources.list.d/`

**Format:**
```
deb [options] uri distribution [components]
```

**Example:**
```
deb http://deb.debian.org/debian stable main contrib non-free
```

### Repository Types

- **Main** - Officially supported software
- **Contrib** - Supported but not maintained by Debian
- **Non-free** - Software with restrictions
- **Backports** - Newer versions of software

### Managing Repositories

```bash
# Add repository
sudo add-apt-repository "deb http://example.com/repo stable main"

# Remove repository
sudo add-apt-repository --remove "deb http://example.com/repo stable main"

# Update after adding repository
sudo apt update
```

## Installing Software

### From Repositories

```bash
# Install single package
sudo apt install packagename

# Install multiple packages
sudo apt install package1 package2 package3

# Install with specific version
sudo apt install packagename=version
```

### From .deb Files

```bash
# Install local .deb file
sudo dpkg -i package.deb

# Fix dependencies if needed
sudo apt --fix-broken install
```

### From Source

```bash
# Download source
wget http://example.com/software.tar.gz

# Extract
tar -xzf software.tar.gz
cd software/

# Configure
./configure

# Compile
make

# Install
sudo make install
```

## Removing Software

```bash
# Remove package (keeps config)
sudo apt remove packagename

# Remove package and config
sudo apt purge packagename

# Remove unused dependencies
sudo apt autoremove
```

## Updating Software

```bash
# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade

# Full system upgrade
sudo apt full-upgrade

# Upgrade specific package
sudo apt install --only-upgrade packagename
```

## Package Information

```bash
# Show package info
apt show packagename
dpkg -s packagename

# List files in package
dpkg -L packagename

# Find package owning file
dpkg -S /path/to/file

# Show package dependencies
apt depends packagename
apt rdepends packagename  # reverse dependencies
```

## Snap Packages

```bash
# Install snap
sudo apt install snapd

# Install snap package
sudo snap install packagename

# List installed snaps
snap list

# Update snap
sudo snap refresh packagename

# Remove snap
sudo snap remove packagename
```

## Flatpak

```bash
# Install flatpak
sudo apt install flatpak

# Add repository
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install flatpak
flatpak install flathub packagename

# List installed
flatpak list

# Update
flatpak update

# Remove
flatpak uninstall packagename
```

## Best Practices

1. **Update regularly** - Keep system up to date
2. **Use official repositories** - More secure and reliable
3. **Read package descriptions** - Understand what you're installing
4. **Check dependencies** - Understand what will be installed
5. **Keep backups** - Before major updates
6. **Test updates** - In non-production first
7. **Use version pinning** - For critical packages

## Common Commands Summary

```bash
# Update and upgrade
sudo apt update
sudo apt upgrade

# Install/remove
sudo apt install packagename
sudo apt remove packagename

# Search
apt search keyword

# Information
apt show packagename
dpkg -l
```

## Next Steps

- Learn about [Bash Scripting](bash.md)
- Understand [Network Configuration](network.md)
- Study [Troubleshooting](troubleshooting.md)

---

**Remember**: Always update your package lists before installing software!
