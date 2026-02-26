# Environment Setup

## Overview

Set up the virtualization environment using Proxmox VE and create the necessary Debian virtual machines.

## Prerequisites

- Access to lab computers
- Two computers: one for management (Netboot), one for Proxmox

## Proxmox Installation

### Boot into Network Boot Menu

1. Boot the right computer (for Proxmox)
2. Select from network boot menu:
   - **Installers → Proxmox → ProxmoxVE**
   - Make sure to select the **latest stable version**

### Installation Steps

1. Follow Proxmox installation wizard
2. Set **username**: `root`
3. Set **password**: `Syp9393!`
4. Complete installation

### Accessing Proxmox

**Web Interface:**
- URL: `https://[proxmox-ip]:8006`
- Username: `root`
- Password: `Syp9393!`

**Command Line:**
- SSH to Proxmox host
- Or use console

## Setting IP on Proxmox Host

### Accessing Proxmox Host

During installation, you'll be prompted to set network configuration.

**If you need to change it later:**

1. SSH to Proxmox or use console
2. Edit network configuration:
   ```bash
   nano /etc/network/interfaces
   ```
3. Configure IP address according to your room and group
4. Restart networking:
   ```bash
   systemctl restart networking
   ```

## Creating Virtual Machines

### Required VMs

Create the following Debian virtual machines:

1. **ns1** - DNS master server (IP: `10.[room].[group].11`)
2. **ns2** - DNS slave server (IP: `10.[room].[group].12`)
3. **mail** - Mail server (IP: `10.[room].[group].13`)
4. **webmail** - Webmail server (IP: `10.[room].[group].14`)
5. **mgmt** - Management machine (IP: `10.[room].[group].22`)

### VM Creation Steps

#### Step 1: Download Debian ISO

1. Open web browser on management machine or Proxmox host
2. Navigate to Debian download page: `https://www.debian.org/download`
3. Click "Download" for "Small CDs or USB sticks"
4. Select "amd64" architecture
5. Download "netinst" ISO (smallest, downloads packages during install)
6. Note the download location (usually `~/Downloads/`)

#### Step 2: Upload ISO to Proxmox

1. Open Proxmox web interface: `https://[proxmox-ip]:8006`
2. Login with username `root` and password `Syp9393!`
3. Click on "local" storage in left sidebar (under "Datacenter" → "Storage")
4. Click "Content" tab at top
5. Click "Upload" button
6. Select the downloaded Debian ISO file
7. Wait for upload to complete
8. **📸 Screenshot Point:** Take screenshot showing ISO file in Proxmox storage

#### Step 3: Create First VM (ns1)

1. In Proxmox web interface, click "Create VM" button (top right)
2. **General Tab:**
   - VM ID: Enter unique number (e.g., `101`)
   - Name: Enter `ns1`
   - Click "Next"
3. **OS Tab:**
   - "Use CD/DVD disc image file (iso)" - select this option
   - Storage: Select `local`
   - ISO image: Select the uploaded Debian ISO
   - Guest OS: Select "Linux"
   - Version: Select "5.x - 2.6 Kernel"
   - Click "Next"
4. **System Tab:**
   - Leave all defaults (Graphic card: Default, Qemu Agent: unchecked)
   - Click "Next"
5. **Hard Disk Tab:**
   - Bus/Device: Leave as "VirtIO SCSI single"
   - Storage: Select `local`
   - Disk size: Enter `30` (for 30GB)
   - Cache: Select "Write back (unsafe)" or "None"
   - Click "Next"
6. **CPU Tab:**
   - Sockets: Enter `1`
   - Cores: Enter `2`
   - Type: Leave as "kvm64"
   - Click "Next"
7. **Memory Tab:**
   - Memory: Enter `2048` (for 2GB)
   - Click "Next"
8. **Network Tab:**
   - Bridge: Select `vmbr0`
   - Model: Select "VirtIO (paravirtualized)"
   - Leave other settings as default
   - Click "Next"
9. **Confirm Tab:**
   - Review all settings
   - **📸 Screenshot Point:** Take screenshot of VM configuration summary
   - Click "Finish"

#### Step 4: Install Debian on ns1

1. In Proxmox, select the `ns1` VM
2. Click "Start" button (top right)
3. Click "Console" tab to view VM
4. **Debian Installer will start:**
   - **Language:** Select "English" → Press Enter
   - **Location:** Select your country → Press Enter
   - **Keyboard:** Select your keyboard layout → Press Enter
   - **Hostname:** Type `ns1` → Press Enter
   - **Domain name:** Type `[login].it387g.nsa.his.se` (replace [login]) → Press Enter
   - **Root password:** Enter secure password → Press Enter → Confirm → Press Enter
   - **Full name for new user:** Enter your name → Press Enter
   - **Username for account:** Enter username (e.g., `admin`) → Press Enter
   - **Password for user:** Enter password → Press Enter → Confirm → Press Enter
   - **Partition disks:** Select "Guided - use entire disk" → Press Enter
   - **Select disk:** Select the only disk → Press Enter
   - **Partitioning scheme:** Select "All files in one partition" → Press Enter
   - **Finish partitioning:** Select "Finish partitioning and write changes to disk" → Press Enter
   - **Write changes:** Select "Yes" → Press Enter
   - **Software selection:** 
     - Use arrow keys to navigate
     - Uncheck "Debian desktop environment" (spacebar to toggle)
     - Check "SSH server" (spacebar to toggle)
     - Tab to "Continue" → Press Enter
   - **Install GRUB:** Select "Yes" → Press Enter
   - **Device for boot loader:** Select the disk → Press Enter
   - **Installation complete:** Select "Continue" → Press Enter
5. **📸 Screenshot Point:** Take screenshot of successful Debian installation completion

#### Step 5: Configure Network During Install (Alternative - If Not Done)

If you didn't configure network during install, do it now:

1. When prompted for network configuration:
   - **Configure network manually:** Select "Yes"
   - **IP address:** Enter `10.[room].[group].11` (replace [room] and [group])
   - **Netmask:** Enter `255.255.255.0`
   - **Gateway:** Enter `10.[room].[group].1`
   - **Name server:** Enter `127.0.0.1` (will configure DNS later)
   - Continue with installation

#### Step 6: Repeat for Other VMs

Repeat Steps 3-5 for each remaining VM:

**For ns2:**
- VM ID: `102`
- Name: `ns2`
- IP during install: `10.[room].[group].12`
- Same other settings as ns1

**For mail:**
- VM ID: `103`
- Name: `mail`
- IP during install: `10.[room].[group].13`
- Same other settings

**For webmail:**
- VM ID: `104`
- Name: `webmail`
- IP during install: `10.[room].[group].14`
- Same other settings

**For mgmt:**
- VM ID: `105`
- Name: `mgmt`
- IP during install: `10.[room].[group].22`
- Same other settings

**📸 Screenshot Point:** Take screenshot of Proxmox showing all 5 VMs created

## Management Machine Setup

### Boot into Netboot

1. Boot the **left computer** (management machine) into Netboot environment
2. This allows you to:
   - Access documentation
   - Visit Canvas
   - Copy files between systems
   - Establish SSH connections to VMs

### Accessing VMs from Management Machine

1. **SSH to VMs:**
   ```bash
   ssh user@10.[room].[group].11  # ns1
   ssh user@10.[room].[group].12  # ns2
   ssh user@10.[room].[group].13  # mail
   ssh user@10.[room].[group].14  # webmail
   ```

2. **File Transfer:**
   ```bash
   # Using SCP
   scp file user@10.[room].[group].11:/path/
   
   # Using SFTP
   sftp user@10.[room].[group].11
   ```

## Initial VM Configuration

### Step 1: Login to Each VM

1. From management machine, open terminal
2. SSH to each VM:
   ```bash
   ssh username@10.[room].[group].11  # ns1
   ```
3. Enter password when prompted
4. Repeat for all VMs (ns1, ns2, mail, webmail, mgmt)

### Step 2: Update System (On Each VM)

**For each VM, perform these steps:**

1. **Update package list:**
   ```bash
   sudo apt update
   ```
   - Wait for package list to update
   - Note any errors (should be none)

2. **Upgrade installed packages:**
   ```bash
   sudo apt upgrade
   ```
   - Type `Y` when prompted
   - Wait for upgrade to complete (may take several minutes)
   - **📸 Screenshot Point:** Take screenshot showing successful apt upgrade completion

### Step 3: Install Essential Tools (On Each VM)

1. **Install basic tools:**
   ```bash
   sudo apt install vim nano curl wget net-tools -y
   ```
   - The `-y` flag automatically answers "yes" to prompts
   - Wait for installation to complete

2. **Verify tools installed:**
   ```bash
   which vim
   which nano
   which curl
   ```
   - Should show paths to each tool

### Step 4: Configure Hostname (On Each VM)

**For ns1:**
1. **Set hostname:**
   ```bash
   sudo hostnamectl set-hostname ns1
   ```

2. **Verify hostname:**
   ```bash
   hostname
   ```
   - Should display: `ns1`

3. **Edit hosts file:**
   ```bash
   sudo nano /etc/hosts
   ```

4. **Add this line (replace [login], [room], [group]):**
   ```
   10.[room].[group].11  ns1.[login].it387g.nsa.his.se  ns1
   ```

5. **Save and exit:**
   - Press `Ctrl+O` to save
   - Press `Enter` to confirm
   - Press `Ctrl+X` to exit

**Repeat for other VMs with appropriate values:**
- **ns2:** `10.[room].[group].12  ns2.[login].it387g.nsa.his.se  ns2`
- **mail:** `10.[room].[group].13  mail.[login].it387g.nsa.his.se  mail`
- **webmail:** `10.[room].[group].14  webmail.[login].it387g.nsa.his.se  webmail`
- **mgmt:** `10.[room].[group].22  mgmt.[login].it387g.nsa.his.se  mgmt`

**📸 Screenshot Point:** Take screenshot of `/etc/hosts` file showing all entries

## Network Verification

### Step 1: Verify IP Configuration (On Each VM)

**On ns1:**
1. **Check IP address:**
   ```bash
   ip addr show
   ```
   - Look for line showing `inet 10.[room].[group].11/24`
   - **📸 Screenshot Point:** Take screenshot of `ip addr show` output showing correct IP

2. **Check default route:**
   ```bash
   ip route show
   ```
   - Should show gateway route

**Repeat for all VMs, verifying each has correct IP:**
- ns2: `10.[room].[group].12`
- mail: `10.[room].[group].13`
- webmail: `10.[room].[group].14`
- mgmt: `10.[room].[group].22`

### Step 2: Test Gateway Connectivity (On Each VM)

1. **Ping gateway:**
   ```bash
   ping -c 4 10.[room].[group].1
   ```
   - Should see 4 packets sent and received
   - If fails, check network configuration

2. **📸 Screenshot Point:** Take screenshot of successful ping to gateway

### Step 3: Test Inter-VM Connectivity

**On ns1, test connectivity to other VMs:**
```bash
ping -c 4 10.[room].[group].12  # ns2
ping -c 4 10.[room].[group].13  # mail
ping -c 4 10.[room].[group].14  # webmail
ping -c 4 10.[room].[group].22  # mgmt
```

**On each VM, test connectivity to ns1:**
```bash
ping -c 4 10.[room].[group].11  # ns1
```

**📸 Screenshot Point:** Take screenshot showing successful pings between VMs

### Step 4: Test from Management Machine

**From management machine (mgmt or Netboot):**

1. **Test connectivity to all VMs:**
   ```bash
   ping -c 4 10.[room].[group].11  # ns1
   ping -c 4 10.[room].[group].12  # ns2
   ping -c 4 10.[room].[group].13  # mail
   ping -c 4 10.[room].[group].14  # webmail
   ```

2. **Test SSH connectivity:**
   ```bash
   ssh username@10.[room].[group].11 "hostname"
   ssh username@10.[room].[group].12 "hostname"
   ssh username@10.[room].[group].13 "hostname"
   ssh username@10.[room].[group].14 "hostname"
   ```
   - Should display hostname of each VM
   - **📸 Screenshot Point:** Take screenshot showing SSH connections working to all VMs

## Mandatory Packages

Install these packages on appropriate VMs (will be detailed in specific setup sections):

- **DNS servers (ns1, ns2)**: `bind9`
- **Mail server (mail)**: `postfix`, `dovecot-core`, `dovecot-imapd`
- **Webmail (webmail)**: `mariadb-server`, `roundcube`

## Next Steps

Once all VMs are created and network is configured:

1. Proceed to [Network Configuration](network-config.md)
2. Then [DNS Setup](dns-setup.md)

---

**Remember**: Document your IP addresses and hostnames. You'll need them throughout the assignment!
