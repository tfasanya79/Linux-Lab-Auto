# Complete Step-by-Step Guide: Linux Administration Lab Assignment

**For:** Complete beginners  
**Course:** IT387G - Linux Administration  
**Manual:** student-manual-2026v1.0.pdf  
**Estimated Time:** 8-12 hours (spread over multiple lab sessions)

---

## Table of Contents

1. [Part 1: Understanding the Assignment](#part-1-understanding-the-assignment)
2. [Part 2: Lab Environment Setup](#part-2-lab-environment-setup)
3. [Part 3: Creating Virtual Machines](#part-3-creating-virtual-machines)
4. [Part 4: Installing Debian on VMs](#part-4-installing-debian-on-vms)
5. [Part 5: Preparing for Automation](#part-5-preparing-for-automation)
6. [Part 6: Running the Automation](#part-6-running-the-automation)
7. [Part 7: Manual Verification and Testing](#part-7-manual-verification-and-testing)
8. [Part 8: Demonstration Preparation](#part-8-demonstration-preparation)
9. [Part 9: Report Writing](#part-9-report-writing)
10. [Part 10: Troubleshooting Common Issues](#part-10-troubleshooting-common-issues)

---

## Part 1: Understanding the Assignment

**Time:** 15 minutes  
**Goal:** Know what you're building and what's expected

### What You're Building

You will set up a complete email system for a small company with:

1. **DNS Servers (ns1 and ns2)**
   - ns1 = Master DNS server (primary)
   - ns2 = Slave DNS server (backup)
   - Purpose: Translate domain names (like `mail.a25timfa.it387g.nsa.his.se`) to IP addresses (like `10.204.2.20`)

2. **Mail Server (mail)**
   - Handles sending and receiving emails
   - Uses Postfix (sends emails) and Dovecot (stores/retrieves emails)
   - Has 5 user accounts: lism, oljo, etbr, mida, lumi

3. **Webmail Server (webmail)**
   - Web interface to access email through a browser
   - Uses Roundcube (webmail software), Apache (web server), and MariaDB (database)

4. **Management Machine (mgmt)**
   - Your control computer (left computer in lab)
   - Used to manage all servers via SSH
   - Must be able to log into servers without passwords (passwordless SSH)

### What You Need Before Starting

- **University login:** Your student username (e.g., `a25timfa`)
- **Room number:** The lab room you're assigned to (e.g., `204`)
- **Group number:** Your computer group number (e.g., `2`)
- **Password:** `Syp9393!` (with exclamation mark - used for all accounts)

### What You'll Demonstrate (3 Items)

When you're done, you must show the supervisor:

1. **Email via webmail:** Send an email as `olivia.johnson@a25timfa.it387g.nsa.his.se` via webmail to `autoreply@nsa.his.se`
2. **Show autoreply:** Display the response from `autoreply@nsa.his.se` with the fortune cookie
3. **Passwordless SSH:** Show that you can SSH from mgmt to all servers without entering a password

### What You'll Submit

A PDF report covering:
- How DNS works (A records, MX records, PTR records)
- How email works (SMTP, IMAP protocols)
- How SSH works
- Your public SSH key
- Configuration files (in appendices)

**Important:** The report must explain the **process** and **concepts**, not just list what you configured.

### Your Network Information

Based on your assignment (a25timfa, Room 204, Group 2):

- **Domain:** `a25timfa.it387g.nsa.his.se`
- **IP Range:** `10.204.2.0/24` (all IPs start with `10.204.2.`)
- **VM IPs (from Table 1):**
  - ns1: `10.204.2.11`
  - ns2: `10.204.2.12`
  - mail: `10.204.2.20`
  - webmail: `10.204.2.21`
  - mgmt: `10.204.2.22` (left computer)
- **Proxmox host:** `10.204.2.10` (right computer)

---

## Part 2: Lab Environment Setup

**Time:** 30-45 minutes  
**Goal:** Get Proxmox installed and accessible

### Understanding the Lab Computers

In the lab, you have **two computers**:

1. **Left Computer (Management Machine)**
   - Boot into **Netboot** environment
   - Used for: reading documentation, accessing Canvas, SSH to VMs, running automation
   - IP: `10.204.2.22` (mgmt)
   - This is your "control center"

2. **Right Computer (Proxmox Host)**
   - Will run **Proxmox VE** (virtualization platform)
   - Used for: creating and managing VMs
   - IP: `10.204.2.10`
   - This is where your VMs will run

### Step 2.1: Boot Left Computer into Netboot

1. **Power on** the left computer
2. **Wait for network boot menu** to appear
3. **Select:** "Netboot" or "NSA Netboot" (exact name may vary)
4. **Wait** for it to boot (may take 2-3 minutes)
5. **Verify:** You should see a desktop environment with browser access

**What you can do in Netboot:**
- Open web browser to read Canvas/assignment
- Access documentation
- Open terminal for SSH
- Copy files between systems

### Step 2.2: Install Proxmox on Right Computer

1. **Power on** the right computer
2. **Wait for network boot menu**
3. **Navigate to:** `Installers` → `Proxmox` → `Proxmox VE`
4. **Select:** Latest stable version
5. **Follow installation wizard:**

   **Important settings during installation:**
   
   - **Target harddisk:** Select `zfs (RAID0)` - **CRITICAL!**
   - **FQDN (Fully Qualified Domain Name):** `pve.a25timfa.it387g.nsa.his.se`
   - **IPv4 address:** `10.204.2.10`
   - **Netmask:** `255.255.255.0` (or `/24`)
   - **Gateway:** `10.204.2.1`
   - **Username:** `root`
   - **Password:** `Syp9393!`

6. **Wait** for installation to complete (10-15 minutes)
7. **Note the IP address** displayed on screen: `10.204.2.10`

### Step 2.3: Access Proxmox Web Interface

1. **On left computer (Netboot),** open web browser
2. **Navigate to:** `https://10.204.2.10:8006`
3. **Accept security warning** (self-signed certificate)
4. **Login:**
   - Username: `root`
   - Password: `Syp9393!`
5. **Verify:** You should see the Proxmox web interface

**What you'll see:**
- Left sidebar: Datacenter, Storage, VMs (empty initially)
- Main area: Dashboard showing Proxmox host information
- Top right: "Create VM" button

### Step 2.4: Understanding IP Addressing

Your network uses: `10.[room].[group].x`

- **Room 204, Group 2** → `10.204.2.x`
- **Gateway:** `10.204.2.1` (router)
- **Proxmox:** `10.204.2.10`
- **VMs:** `.11`, `.12`, `.20`, `.21` (from Table 1)
- **Mgmt:** `.22` (left computer)

**Why this matters:** All machines must use these IPs so they can communicate.

---

## Part 3: Creating Virtual Machines

**Time:** 30-45 minutes (for all 4 VMs)  
**Goal:** Create 4 VMs ready for Debian installation

### Step 3.1: Create First VM (ns1)

1. **In Proxmox web interface,** click **"Create VM"** (top right)

2. **General Tab:**
   - **VM ID:** Enter `101` (or any unique number)
   - **Name:** `ns1`
   - Click **"Next"**

3. **OS Tab:**
   - **"Do not use any media"** - Check this radio button
   - **Guest OS:** Select `Linux`
   - **Version:** Select `5.x - 2.6 Kernel` (or latest Linux option)
   - Click **"Next"**

4. **System Tab:**
   - **Graphic card:** Leave as `Default`
   - **Qemu Agent:** **CHECK THIS BOX** (important!)
   - **Machine:** Leave as `Default (i440fx)` or `Default (SeaBIOS)`
   - Click **"Next"**

5. **Hard Disk Tab:**
   - **Bus/Device:** `VirtIO SCSI single`
   - **Storage:** Select `local-zfs`
   - **Disk size:** `20` (GB)
   - **Cache:** `Write back (unsafe)` or `None`
   - **Discard:** Check if using SSD
   - **SSD emulation:** Check if using SSD
   - Click **"Next"**

6. **CPU Tab:**
   - **Sockets:** `1`
   - **Cores:** `2`
   - **Type:** `host`
   - Click **"Next"**

7. **Memory Tab:**
   - **Memory:** `2048` (MB) = 2 GB
   - Click **"Next"**

8. **Network Tab:**
   - **Bridge:** `vmbr0`
   - **Model:** `VirtIO (paravirtualized)`
   - Leave other settings default
   - Click **"Next"**

9. **Confirm Tab:**
   - **Review all settings**
   - Click **"Finish"**

**Result:** ns1 VM created (but not started yet)

### Step 3.2: Create Remaining VMs

Repeat Step 3.1 for each VM with these changes:

**ns2:**
- VM ID: `102`
- Name: `ns2`
- RAM: `2048` (2 GB)
- Disk: `20` GB
- Everything else same as ns1

**mail:**
- VM ID: `103`
- Name: `mail`
- RAM: `2048` (2 GB)
- Disk: `20` GB
- Everything else same as ns1

**webmail:**
- VM ID: `104`
- Name: `webmail`
- RAM: `4096` (4 GB) - **Different!**
- Disk: `20` GB
- Everything else same as ns1

**Verification:** You should now have 4 VMs listed in Proxmox:
- ns1 (ID 101)
- ns2 (ID 102)
- mail (ID 103)
- webmail (ID 104)

### Step 3.3: Enable QEMU Guest Agent (Important!)

For each VM:

1. **Select VM** in Proxmox (click on name)
2. **Click "Options"** tab
3. **Find "QEMU Guest Agent"**
4. **Click "Edit"**
5. **Check "Enable QEMU Guest Agent"**
6. **Click "OK"**
7. **Power off VM** (if running) and **power on** for changes to take effect

**Why:** This allows Proxmox to properly shut down VMs and shows IP addresses in the interface.

---

## Part 4: Installing Debian on VMs

**Time:** 45-60 minutes per VM (about 3-4 hours total)  
**Goal:** Install Debian 13 on all 4 VMs with correct configuration

### Step 4.1: Install Debian on ns1

1. **In Proxmox, select ns1 VM**
2. **Click "Start"** button (top right)
3. **Click "Console"** tab to view VM screen
4. **On left computer (Netboot),** open browser and go to Netboot menu
5. **Navigate to:** `Installers` → `Linux` → `Debian 13 amd64`
6. **In Proxmox console, press Enter** to boot from network

**Debian Installer Steps:**

1. **Language:**
   - Select `English`
   - Press `Enter`

2. **Location:**
   - Select your country (e.g., `Sweden`)
   - Press `Enter`

3. **Keyboard:**
   - Select `Swedish` (or your preference)
   - Press `Enter`

4. **Hostname:**
   - Type: `ns1`
   - Press `Enter`

5. **Domain name:**
   - Type: `a25timfa.it387g.nsa.his.se`
   - Press `Enter`

6. **Root password:**
   - Enter: `Syp9393!`
   - Press `Enter`
   - Confirm: `Syp9393!`
   - Press `Enter`

7. **Full name for new user:**
   - Enter your name (e.g., `Your Name`)
   - Press `Enter`

8. **Username for account:**
   - Enter: `a25timfa` (your university login)
   - Press `Enter`

9. **Password for user:**
   - Enter: `Syp9393!`
   - Press `Enter`
   - Confirm: `Syp9393!`
   - Press `Enter`

10. **Partition disks:**
    - Select: `Guided - use entire disk`
    - Press `Enter`

11. **Select disk:**
    - Select the only disk shown
    - Press `Enter`

12. **Partitioning scheme:**
    - Select: `All files in one partition`
    - Press `Enter`

13. **Finish partitioning:**
    - Select: `Finish partitioning and write changes to disk`
    - Press `Enter`

14. **Write changes:**
    - Select: `Yes`
    - Press `Enter`
    - Wait for partitioning (30 seconds)

15. **Software selection:**
    - **Uncheck:** "Debian desktop environment" (use Spacebar to toggle)
    - **Check:** "SSH server" (use Spacebar to toggle)
    - **Check:** "Standard system utilities" (should already be checked)
    - Press `Tab` to move to "Continue"
    - Press `Enter`

16. **Install GRUB:**
    - Select: `Yes`
    - Press `Enter`

17. **Device for boot loader:**
    - Select the disk (usually `/dev/vda` or similar)
    - Press `Enter`

18. **Installation complete:**
    - Select: `Continue`
    - Press `Enter`
    - VM will reboot

19. **After reboot, configure network:**
    - Login as `a25timfa` with password `Syp9393!`
    - Run: `sudo nano /etc/network/interfaces`
    - Add/edit to:
      ```
      auto lo
      iface lo inet loopback

      auto eth0
      iface eth0 inet static
          address 10.204.2.11/24
          netmask 255.255.255.0
          gateway 10.204.2.1
      ```
    - Save: `Ctrl+O`, `Enter`, `Ctrl+X`
    - Restart networking: `sudo systemctl restart networking`
    - Verify: `ip addr show` (should show `10.204.2.11`)

20. **Verify sudo works:**
    - Run: `sudo apt update`
    - Should work without errors
    - Run: `sudo apt upgrade`
    - Type `Y` when prompted

### Step 4.2: Install Debian on ns2, mail, webmail

Repeat Step 4.1 for each VM with these changes:

**ns2:**
- Hostname: `ns2`
- IP address: `10.204.2.12`
- Everything else same

**mail:**
- Hostname: `mail`
- IP address: `10.204.2.20`
- Everything else same

**webmail:**
- Hostname: `webmail`
- IP address: `10.204.2.21`
- Everything else same

**Important:** After each installation, verify:
- `ip addr show` shows correct IP
- `ping -c 4 10.204.2.1` works (gateway)
- `sudo apt update` works

### Step 4.3: Test Network Connectivity

**From left computer (Netboot) or any VM:**

Test connectivity to all VMs:

```bash
ping -c 4 10.204.2.11  # ns1
ping -c 4 10.204.2.12  # ns2
ping -c 4 10.204.2.20  # mail
ping -c 4 10.204.2.21  # webmail
```

All should respond with 4 packets received.

**Test SSH access:**

```bash
ssh a25timfa@10.204.2.11  # ns1
# Enter password: Syp9393!
# Type: exit

ssh a25timfa@10.204.2.12  # ns2
ssh a25timfa@10.204.2.20  # mail
ssh a25timfa@10.204.2.21  # webmail
```

All should allow SSH login with password.

---

## Part 5: Preparing for Automation

**Time:** 15-20 minutes  
**Goal:** Get automation repository ready to run

### Step 5.1: Get the Automation Repository

**Option A: Clone from Git (if available)**
```bash
cd ~
git clone <repository-url> Linux-Lab-Auto
cd Linux-Lab-Auto
```

**Option B: Copy from USB/Network**
```bash
# Copy Linux-Lab-Auto folder to ~/Linux-Lab-Auto
cd ~/Linux-Lab-Auto
```

**Option C: Download/Create on Netboot**
- If you have the files, copy them to `~/Linux-Lab-Auto`

### Step 5.2: Edit vars.yaml

1. **Open vars.yaml:**
   ```bash
   nano vars.yaml
   ```

2. **Verify these values match your assignment:**
   ```yaml
   login: a25timfa
   room: 204
   group: 2
   password: Syp9393!
   mgmt_user: a25timfa
   domain: a25timfa.it387g.nsa.his.se
   reverse_zone: 2.204.10.in-addr.arpa
   lab_environment: lab
   ```

3. **Save:** `Ctrl+O`, `Enter`, `Ctrl+X`

**Important:** If your room/group differs, update `room` and `group`. The IPs will be calculated automatically.

### Step 5.3: Verify inventory.yaml

1. **Open inventory.yaml:**
   ```bash
   nano inventory.yaml
   ```

2. **Verify IPs match Table 1:**
   ```yaml
   ns1:
     ansible_host: 10.204.2.11
   ns2:
     ansible_host: 10.204.2.12
   mail:
     ansible_host: 10.204.2.20
   webmail:
     ansible_host: 10.204.2.21
   mgmt:
     ansible_host: 10.204.2.22
   ```

3. **Save** if you made changes

### Step 5.4: Install Ansible (if needed)

**Check if Ansible is installed:**
```bash
ansible --version
```

**If not installed:**
```bash
# On Debian/Ubuntu (Netboot might be Debian-based)
sudo apt update
sudo apt install ansible -y

# Verify installation
ansible --version
# Should show version 2.14 or higher
```

### Step 5.5: Test Ansible Connectivity

**Test that Ansible can reach all VMs:**

```bash
cd ~/Linux-Lab-Auto
ansible all -i inventory.yaml -u a25timfa -k -m ping
```

**You'll be prompted:**
- `SSH password:` Enter `Syp9393!`

**Expected output:**
```
ns1 | SUCCESS => { ... }
ns2 | SUCCESS => { ... }
mail | SUCCESS => { ... }
webmail | SUCCESS => { ... }
mgmt | SUCCESS => { ... }
```

**If any fail:**
- Check IP addresses are correct
- Verify SSH works: `ssh a25timfa@<IP>`
- Check network connectivity: `ping <IP>`

---

## Part 6: Running the Automation

**Time:** 20-30 minutes  
**Goal:** Configure all services automatically

### Step 6.1: Understand What the Automation Does

The automation will:

1. **Common setup:** Update packages, install tools (vim, bind9-dnsutils, qemu-guest-agent)
2. **Network:** Configure `/etc/hosts`, `/etc/network/interfaces`, `/etc/resolv.conf`
3. **DNS (ns1):** Install Bind9, create master zones
4. **DNS (ns2):** Install Bind9, configure as slave
5. **Mail:** Install Postfix/Dovecot, create users, configure aliases
6. **Webmail:** Install MariaDB/Roundcube/Apache, configure webmail
7. **SSH:** Generate key on mgmt, deploy to all servers

### Step 6.2: Run the Full Playbook

**From the Linux-Lab-Auto directory:**

```bash
cd ~/Linux-Lab-Auto
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k
```

**What happens:**
- You'll be prompted for SSH password: Enter `Syp9393!`
- Playbook runs through all roles
- Watch for errors (red text)
- Green "ok" or "changed" means success

**Expected time:** 15-25 minutes

### Step 6.3: Understanding Output

**Good signs:**
- `ok` = Already configured correctly
- `changed` = Successfully configured
- `SUCCESS` = Task completed

**Bad signs:**
- `FAILED` = Error occurred
- `unreachable` = Cannot connect to host
- Red error messages

**If you see errors:**
- Read the error message carefully
- Check Part 10 (Troubleshooting)
- Common issues: network connectivity, SSH access, package installation

### Step 6.4: Run Individual Roles (Optional)

If you want to run one role at a time:

```bash
# Only network configuration
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k --tags network

# Only DNS
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k --tags dns

# Only mail
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k --tags mail

# Only webmail
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k --tags webmail

# Only SSH
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k --tags ssh
```

### Step 6.5: Verify Services Started

**After playbook completes, check services:**

**On ns1 and ns2:**
```bash
ssh a25timfa@10.204.2.11
sudo systemctl status bind9
# Should show "active (running)"
```

**On mail:**
```bash
ssh a25timfa@10.204.2.20
sudo systemctl status postfix
sudo systemctl status dovecot
# Both should be "active (running)"
```

**On webmail:**
```bash
ssh a25timfa@10.204.2.21
sudo systemctl status apache2
sudo systemctl status mariadb
# Both should be "active (running)"
```

---

## Part 7: Manual Verification and Testing

**Time:** 45-60 minutes  
**Goal:** Verify everything works before demonstration

### Step 7.1: DNS Testing

**Test forward lookups (name → IP):**

```bash
# From any machine
dig @10.204.2.11 ns1.a25timfa.it387g.nsa.his.se
# Should return: 10.204.2.11

dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
# Should return: 10.204.2.20

dig @10.204.2.11 webmail.a25timfa.it387g.nsa.his.se
# Should return: 10.204.2.21
```

**Test MX record (mail exchange):**

```bash
dig @10.204.2.11 MX a25timfa.it387g.nsa.his.se
# Should return: mail.a25timfa.it387g.nsa.his.se with priority 10
```

**Test reverse lookups (IP → name):**

```bash
dig @10.204.2.11 -x 10.204.2.20
# Should return: mail.a25timfa.it387g.nsa.his.se

dig @10.204.2.11 -x 10.204.2.21
# Should return: webmail.a25timfa.it387g.nsa.his.se
```

**Test zone transfer (ns2 should get zones from ns1):**

```bash
# On ns2
ssh a25timfa@10.204.2.12
sudo systemctl status bind9
# Check logs for successful zone transfer
sudo journalctl -u bind9 | tail -20
```

**Verify all machines use your DNS:**

```bash
# On each VM, check /etc/resolv.conf
cat /etc/resolv.conf
# Should show:
# nameserver 10.204.2.11
# nameserver 10.204.2.12
```

### Step 7.2: Mail Testing

**Test SMTP (sending mail):**

```bash
# From mail server or any VM
telnet mail.a25timfa.it387g.nsa.his.se 25
# Should connect

# Type these commands:
EHLO test
MAIL FROM: oljo@a25timfa.it387g.nsa.his.se
RCPT TO: oljo@a25timfa.it387g.nsa.his.se
DATA
Subject: Test
This is a test email.
.
QUIT
```

**Test IMAP (receiving mail):**

```bash
telnet mail.a25timfa.it387g.nsa.his.se 143
# Should connect

# Type:
a1 LOGIN oljo Syp9393!
a2 LIST "" "*"
a3 SELECT INBOX
a4 FETCH 1 BODY[]
a5 LOGOUT
```

**Test open relay (should reject):**

```bash
# Try to relay from outside your network
telnet mail.a25timfa.it387g.nsa.his.se 25
EHLO test
MAIL FROM: attacker@example.com
RCPT TO: someone@external.com
# Should be REJECTED (good!)
```

**Send test email:**

```bash
# From mail server
ssh a25timfa@10.204.2.20
echo "Test message" | mail -s "Test" oljo@a25timfa.it387g.nsa.his.se
# Check mail:
su - oljo
mail
# Should see the test email
```

### Step 7.3: Webmail Testing

**Access webmail:**

1. **On left computer (Netboot),** open web browser
2. **Navigate to:** `http://webmail.a25timfa.it387g.nsa.his.se`
3. **Should see:** Roundcube login page

**Login:**

1. **Username:** `oljo` (for olivia.johnson)
2. **Password:** `Syp9393!`
3. **Click Login**

**Send email:**

1. **Click "Compose"**
2. **To:** `oljo@a25timfa.it387g.nsa.his.se` (send to yourself)
3. **Subject:** `Test Email`
4. **Message:** `This is a test from webmail.`
5. **Click "Send"**

**Check inbox:**

1. **Click "Inbox"**
2. **Should see:** Your test email
3. **Open it** to verify content

**Send to autoreply:**

1. **Click "Compose"**
2. **To:** `autoreply@nsa.his.se`
3. **Subject:** `Test`
4. **Message:** `Testing autoreply.`
5. **Click "Send"**
6. **Wait 2-3 minutes**
7. **Check Inbox** - should receive autoreply with fortune cookie

### Step 7.4: SSH Key Testing

**From mgmt (left computer):**

```bash
# Test passwordless SSH to ns1
ssh root@10.204.2.11
# Should connect WITHOUT password prompt
hostname
# Should show: ns1
exit

# Test all servers
ssh root@10.204.2.12  # ns2
ssh root@10.204.2.20  # mail
ssh root@10.204.2.21  # webmail
# All should connect without password
```

**Get public key for report:**

```bash
# On mgmt
cat ~/.ssh/id_ed25519.pub
# Copy this output - you'll need it for the report
```

**Save key to file:**

```bash
cat ~/.ssh/id_ed25519.pub > ~/my_ssh_public_key.txt
# Keep this file safe for your report
```

---

## Part 8: Demonstration Preparation

**Time:** 30 minutes  
**Goal:** Be ready to demonstrate all 3 checklist items

### Step 8.1: Review Demonstration Checklist

You must demonstrate:

1. ✅ **Send email via webmail** as `olivia.johnson@a25timfa.it387g.nsa.his.se` to `autoreply@nsa.his.se`
2. ✅ **Show autoreply** with fortune cookie from `autoreply@nsa.his.se`
3. ✅ **Passwordless SSH** from mgmt to all servers

### Step 8.2: Practice Demonstration

**Practice Item 1 & 2 (Webmail):**

1. Open browser on mgmt/Netboot
2. Go to `http://webmail.a25timfa.it387g.nsa.his.se`
3. Login as `oljo` / `Syp9393!`
4. Compose email:
   - To: `autoreply@nsa.his.se`
   - Subject: `Lab Demonstration`
   - Message: `This is for the lab demonstration.`
5. Send email
6. Wait 2-3 minutes
7. Refresh inbox
8. Open autoreply email
9. Show fortune cookie to supervisor

**Practice Item 3 (SSH):**

1. Open terminal on mgmt
2. Run: `ssh root@10.204.2.11`
   - Should connect immediately (no password)
   - Run: `hostname` (should show ns1)
   - Run: `exit`
3. Repeat for ns2, mail, webmail:
   ```bash
   ssh root@10.204.2.12
   ssh root@10.204.2.20
   ssh root@10.204.2.21
   ```

### Step 8.3: Prepare Screenshots

**Take screenshots of:**

1. **Proxmox:** All 4 VMs running
2. **DNS:** `dig` output showing A records, MX record, PTR records
3. **Mail:** Telnet SMTP/IMAP tests
4. **Webmail:** Login page, inbox, composing email, autoreply with fortune cookie
5. **SSH:** Passwordless login (no password prompt visible)

**Save screenshots** in organized folders:
- `screenshots/dns/`
- `screenshots/mail/`
- `screenshots/webmail/`
- `screenshots/ssh/`

### Step 8.4: Common Issues Before Demo

**If webmail doesn't work:**
- Check Apache is running: `sudo systemctl status apache2`
- Check Roundcube config: `sudo nano /etc/roundcube/config.inc.php`
- Verify IMAP/SMTP servers are correct

**If autoreply doesn't arrive:**
- Wait longer (can take 3-5 minutes)
- Check spam folder
- Verify DNS resolves `nsa.his.se`
- Check mail server logs: `sudo journalctl -u postfix`

**If SSH asks for password:**
- Verify key was copied: `cat /root/.ssh/authorized_keys` on server
- Check permissions: `ls -la /root/.ssh/`
- Regenerate key on mgmt: `ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519`
- Re-run SSH role: `ansible-playbook ... --tags ssh`

---

## Part 9: Report Writing

**Time:** 4-6 hours  
**Goal:** Write comprehensive report meeting all requirements

### Step 9.1: Report Structure

Your report must include:

1. **Title Page**
   - Full legal name
   - Student login (a25timfa)
   - Course name (Linux Administration - IT387G)
   - Submission date

2. **Table of Contents**
   - Numbered sections and subsections

3. **Introduction**
   - Brief overview of what you built
   - Purpose of the assignment

4. **Main Content Sections**
   - DNS configuration and how it works
   - Mail server configuration and how email flows
   - Webmail setup
   - SSH configuration
   - **Focus on PROCESS and CONCEPTS**, not just configuration

5. **Appendices**
   - Configuration files (full content)
   - Public SSH key
   - Diagrams/flowcharts

### Step 9.2: What to Explain (Required Content)

**DNS Records:**
- **A records:** What they do, examples from your setup
- **MX records:** What they do, why mail needs them, your MX record
- **PTR records:** Reverse DNS, why it's useful
- **NS records:** Name servers, master/slave relationship

**Protocols:**
- **SMTP:** How email is sent (port 25, how it works)
- **IMAP:** How email is retrieved (port 143, difference from POP3)
- **SSH:** How secure shell works, key-based authentication
- **HTTP:** How webmail is accessed (port 80)

**Concepts:**
- **Mailbox:** What it is, where emails are stored (Maildir)
- **User:** System users vs email users, how they map
- **Aliases:** How `olivia.johnson@...` maps to `oljo` user

**Email Flow:**
Explain step-by-step how an email travels:
1. User composes in webmail
2. Webmail sends via SMTP to mail server
3. Mail server receives and stores
4. User retrieves via IMAP
5. When sending to autoreply@nsa.his.se, how DNS finds the server
6. How autoreply comes back

### Step 9.3: Extract Configuration Files

**DNS Configuration:**

```bash
# On ns1
ssh a25timfa@10.204.2.11
sudo cat /etc/bind/named.conf.options
sudo cat /etc/bind/named.conf.local
sudo cat /etc/bind/db.a25timfa
sudo cat /etc/bind/db.10
```

**Mail Configuration:**

```bash
# On mail
ssh a25timfa@10.204.2.20
sudo cat /etc/postfix/main.cf | grep -v "^#" | grep -v "^$"
sudo cat /etc/aliases
sudo cat /etc/dovecot/dovecot.conf
sudo cat /etc/dovecot/conf.d/10-mail.conf | grep mail_location
sudo cat /etc/dovecot/conf.d/10-auth.conf | grep -E "(disable_plaintext|auth_mechanisms)"
```

**Webmail Configuration:**

```bash
# On webmail
ssh a25timfa@10.204.2.21
sudo cat /etc/roundcube/config.inc.php | grep -E "(default_host|smtp_server|db_dsnw|des_key)"
sudo cat /etc/apache2/sites-available/webmail.conf
```

**Save all configs** to files for your report appendices.

### Step 9.4: Create Diagrams

**Email Flow Diagram:**
```
User → Webmail (HTTP) → Mail Server (SMTP) → External Server
User ← Webmail (HTTP) ← Mail Server (IMAP) ← External Server
```

**DNS Query Flow:**
```
Client → ns1 (master) → Zone file → Answer
Client → ns2 (slave) → ns1 (zone transfer) → Answer
```

**Network Topology:**
```
mgmt (10.204.2.22)
  ↓ SSH
ns1 (10.204.2.11) ←→ ns2 (10.204.2.12)
  ↓ DNS
mail (10.204.2.20) ←→ webmail (10.204.2.21)
```

Use tools like:
- Draw.io (online)
- LibreOffice Draw
- Microsoft Visio
- Hand-drawn (scan/photograph)

### Step 9.5: Formatting Requirements

**File Format:**
- Single PDF document
- Filename: `a25timfa.pdf` (your login)

**Page Setup:**
- A4 paper size
- Black text on white background
- Page numbers in footer
- Page 1 starts from introduction (not title page)

**Fonts:**
- Body text: 11pt (±1pt acceptable)
- Code/config: Monospaced font (Courier, Consolas, etc.)
- Headings: Appropriate sizes

**Structure:**
- Numbered sections (1, 1.1, 1.2, 2, 2.1, etc.)
- Table of contents with page numbers
- Appendices for long configuration files

**References:**
- Use APA or Harvard style
- Cite RFCs: RFC 1035 (DNS), RFC 3521 (SMTP), RFC 4253 (SSH), RFC 9051 (IMAP)

### Step 9.6: Report Checklist

Before submitting, verify:

- [ ] Title page with name, login, course, date
- [ ] Table of contents
- [ ] DNS records explained (A, MX, PTR, NS)
- [ ] Protocols explained (SMTP, IMAP, SSH, HTTP)
- [ ] Concepts explained (mailbox, user, aliases)
- [ ] Email flow explained step-by-step
- [ ] Public SSH key included
- [ ] Configuration files in appendices
- [ ] Diagrams/flowcharts included
- [ ] All placeholders replaced ([login] → a25timfa, etc.)
- [ ] Page numbers correct
- [ ] Font sizes correct
- [ ] Saved as PDF: `a25timfa.pdf`

---

## Part 10: Troubleshooting Common Issues

**Time:** As needed  
**Goal:** Fix problems quickly

### Issue 1: DNS Not Resolving

**Symptoms:**
- `dig` returns no answer
- `nslookup` fails
- Cannot resolve hostnames

**Solutions:**

1. **Check Bind9 is running:**
   ```bash
   sudo systemctl status bind9
   # If not running: sudo systemctl start bind9
   ```

2. **Check zone file syntax:**
   ```bash
   sudo named-checkzone a25timfa.it387g.nsa.his.se /etc/bind/db.a25timfa
   sudo named-checkzone 2.204.10.in-addr.arpa /etc/bind/db.10
   ```

3. **Check Bind9 logs:**
   ```bash
   sudo journalctl -u bind9 -n 50
   # Look for errors
   ```

4. **Verify zone files exist:**
   ```bash
   ls -la /etc/bind/db.*
   ```

5. **Check named.conf.local:**
   ```bash
   sudo named-checkconf /etc/bind/named.conf
   ```

### Issue 2: Mail Not Sending/Receiving

**Symptoms:**
- Cannot send emails
- Cannot receive emails
- SMTP/IMAP connection refused

**Solutions:**

1. **Check Postfix is running:**
   ```bash
   sudo systemctl status postfix
   sudo systemctl restart postfix
   ```

2. **Check Dovecot is running:**
   ```bash
   sudo systemctl status dovecot
   sudo systemctl restart dovecot
   ```

3. **Check main.cf configuration:**
   ```bash
   sudo postfix check
   # Should show no errors
   ```

4. **Check mail logs:**
   ```bash
   sudo journalctl -u postfix -n 50
   sudo journalctl -u dovecot -n 50
   ```

5. **Verify users exist:**
   ```bash
   id oljo
   id lism
   # Should show user exists
   ```

6. **Check aliases:**
   ```bash
   sudo cat /etc/aliases
   sudo newaliases
   ```

### Issue 3: Webmail Not Accessible

**Symptoms:**
- Cannot access `http://webmail.a25timfa.it387g.nsa.his.se`
- 404 error or connection refused

**Solutions:**

1. **Check Apache is running:**
   ```bash
   sudo systemctl status apache2
   sudo systemctl restart apache2
   ```

2. **Check site is enabled:**
   ```bash
   ls -la /etc/apache2/sites-enabled/ | grep webmail
   # Should show webmail.conf
   ```

3. **Check DNS resolves:**
   ```bash
   dig webmail.a25timfa.it387g.nsa.his.se
   # Should return 10.204.2.21
   ```

4. **Check Roundcube config:**
   ```bash
   sudo cat /etc/roundcube/config.inc.php | grep default_host
   # Should show: mail.a25timfa.it387g.nsa.his.se
   ```

5. **Check Apache logs:**
   ```bash
   sudo tail -50 /var/log/apache2/error.log
   ```

### Issue 4: SSH Key Not Working

**Symptoms:**
- SSH still asks for password
- "Permission denied (publickey)"

**Solutions:**

1. **Verify key exists on mgmt:**
   ```bash
   ls -la ~/.ssh/id_ed25519.pub
   cat ~/.ssh/id_ed25519.pub
   ```

2. **Check authorized_keys on server:**
   ```bash
   ssh a25timfa@10.204.2.11
   sudo cat /root/.ssh/authorized_keys
   # Should contain mgmt's public key
   ```

3. **Check permissions:**
   ```bash
   sudo ls -la /root/.ssh/
   # authorized_keys should be 600
   # .ssh directory should be 700
   ```

4. **Regenerate and redeploy:**
   ```bash
   # On mgmt
   ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""
   
   # Re-run SSH role
   cd ~/Linux-Lab-Auto
   ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k --tags ssh
   ```

### Issue 5: Service Not Starting

**Symptoms:**
- Service shows "failed" or "inactive"
- Cannot start service

**Solutions:**

1. **Check service status:**
   ```bash
   sudo systemctl status <service-name>
   ```

2. **Check logs:**
   ```bash
   sudo journalctl -u <service-name> -n 50
   ```

3. **Check configuration syntax:**
   ```bash
   # For Bind9
   sudo named-checkconf
   
   # For Postfix
   sudo postfix check
   
   # For Apache
   sudo apache2ctl configtest
   ```

4. **Common fixes:**
   - Fix syntax errors in config files
   - Check file permissions
   - Verify required packages installed
   - Restart service: `sudo systemctl restart <service>`

### Issue 6: Network Connectivity Problems

**Symptoms:**
- Cannot ping other machines
- SSH connection refused
- Services unreachable

**Solutions:**

1. **Check IP configuration:**
   ```bash
   ip addr show
   # Should show correct IP
   ```

2. **Check routing:**
   ```bash
   ip route show
   # Should show gateway route
   ```

3. **Ping gateway:**
   ```bash
   ping -c 4 10.204.2.1
   # Should work
   ```

4. **Check firewall (if enabled):**
   ```bash
   sudo ufw status
   # Should allow necessary ports
   ```

5. **Restart networking:**
   ```bash
   sudo systemctl restart networking
   ```

### Getting Help

**Before asking for help:**

1. ✅ Check logs: `sudo journalctl -u <service> -n 50`
2. ✅ Verify configuration files are correct
3. ✅ Test network connectivity
4. ✅ Check service status
5. ✅ Review error messages carefully

**When asking supervisors:**

- Describe what you're trying to do
- Show what error you're getting
- Show relevant log entries
- Show configuration snippets (not full files)
- Explain what you've already tried

---

## Final Checklist Before Demonstration

- [ ] All 4 VMs created and running
- [ ] Debian 13 installed on all VMs
- [ ] Network connectivity works (ping all machines)
- [ ] Automation playbook completed successfully
- [ ] DNS resolves all hostnames (dig tests pass)
- [ ] Mail server sends and receives emails
- [ ] Webmail accessible and functional
- [ ] Can send email to autoreply@nsa.his.se
- [ ] Can receive autoreply with fortune cookie
- [ ] Passwordless SSH works from mgmt to all servers
- [ ] Public SSH key saved for report
- [ ] Configuration files backed up
- [ ] Screenshots taken
- [ ] Ready to demonstrate all 3 checklist items

---

## Quick Reference Commands

**DNS Testing:**
```bash
dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 MX a25timfa.it387g.nsa.his.se
dig @10.204.2.11 -x 10.204.2.20
```

**Mail Testing:**
```bash
telnet mail.a25timfa.it387g.nsa.his.se 25
telnet mail.a25timfa.it387g.nsa.his.se 143
```

**Service Status:**
```bash
sudo systemctl status bind9
sudo systemctl status postfix
sudo systemctl status dovecot
sudo systemctl status apache2
```

**SSH:**
```bash
ssh root@10.204.2.11  # Should not ask for password
```

**Logs:**
```bash
sudo journalctl -u bind9 -n 50
sudo journalctl -u postfix -n 50
sudo journalctl -u dovecot -n 50
```

---

## Time Estimates Summary

- **Part 1:** 15 minutes (understanding)
- **Part 2:** 30-45 minutes (Proxmox setup)
- **Part 3:** 30-45 minutes (VM creation)
- **Part 4:** 3-4 hours (Debian installation on 4 VMs)
- **Part 5:** 15-20 minutes (automation prep)
- **Part 6:** 20-30 minutes (running automation)
- **Part 7:** 45-60 minutes (testing)
- **Part 8:** 30 minutes (demo prep)
- **Part 9:** 4-6 hours (report writing)
- **Part 10:** As needed (troubleshooting)

**Total:** Approximately 10-14 hours of work

---

**Good luck with your lab assignment!**

Remember: Take your time, verify each step, and don't hesitate to ask for help if you're stuck after trying to solve it yourself.
