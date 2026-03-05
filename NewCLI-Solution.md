# My Lab Solution Guide — Linux Administration (CLI-only VMs)

**Student:** a25timfa · **Room:** 204 · **Group:** 2  
**Domain:** a25timfa.it387g.nsa.his.se  
**Network:** 10.204.2.0/24 · **Gateway:** 10.204.2.1  
**Password (all accounts):** Syp9393!
 
 
## Table of Contents

1. [Network Overview & Key Credentials](#1-network-overview--key-credentials)
2. [Delete Incorrectly Built VMs in Proxmox](#2-delete-incorrectly-built-vms-in-proxmox)
3. [Create the Four VMs in Proxmox (Correctly)](#3-create-the-four-vms-in-proxmox-correctly)
4. [Install Debian 13 on Each VM (NO GUI!)](#4-install-debian-13-on-each-vm-no-gui)
5. [Base Configuration — All Four VMs](#5-base-configuration--all-four-vms)
6. [Management Machine (mgmt)](#6-management-machine-mgmt)
7. [DNS — NS1 (Primary / Master)](#7-dns--ns1-primary--master)
8. [DNS — NS2 (Secondary / Slave)](#8-dns--ns2-secondary--slave)
9. [Update DNS on All VMs](#9-update-dns-on-all-vms)
10. [Mail Server — Postfix (SMTP) + Dovecot (IMAP)](#10-mail-server--postfix-smtp--dovecot-imap)
11. [Webmail — Roundcube + Apache + MariaDB](#11-webmail--roundcube--apache--mariadb)
12. [Final Verification & Demo Checklist](#12-final-verification--demo-checklist)

---

## 1. Network Overview & Key Credentials

This guide walks you through the complete rebuild of your lab environment from scratch. All four server VMs (ns1, ns2, mail, webmail) must run Debian 13 with **NO graphical interface**. Only the management machine (mgmt) may have a desktop GUI.

### 1.1 Network Map

| Machine / Role        | IP Address    | Notes                                      |
|-----------------------|---------------|--------------------------------------------|
| Proxmox VE (Hypervisor) | 10.204.2.10   | Right computer — install Proxmox on this   |
| ns1 — Primary DNS     | 10.204.2.11   | BIND9 Master                               |
| ns2 — Secondary DNS   | 10.204.2.12   | BIND9 Slave (zone transfer from ns1)        |
| mail — Mail Server    | 10.204.2.20   | Postfix (SMTP) + Dovecot (IMAP)            |
| webmail — Web Frontend | 10.204.2.21   | Apache + Roundcube + MariaDB                |
| mgmt — Management     | 10.204.2.22   | Linux Desktop — your jump host (HAS a GUI)  |
| Gateway               | 10.204.2.1    | Lab router — already exists                 |
| NSA DNS Forwarder 1   | 10.0.252.201  | Lab-provided upstream DNS                   |
| NSA DNS Forwarder 2   | 10.0.252.202  | Lab-provided upstream DNS                   |

### 1.2 Key Credentials & Domain

| Item | Value |
|------|--------|
| University Login | a25timfa |
| Domain (FQDN base) | a25timfa.it387g.nsa.his.se |
| Subnet | 10.204.2.0/24 |
| Gateway | 10.204.2.1 |
| Default Password (all accounts) | Syp9393! |
| Proxmox credentials | root / Syp9393! |


## 2. Delete Incorrectly Built VMs in Proxmox

Since your existing VMs were built with GUIs (which server VMs must NOT have), delete them and start fresh.

### 2.1 Access Proxmox Web UI

1. On the NSA Netboot management machine (left computer), open a browser.
2. Navigate to: **https://10.204.2.10:8006**
3. Login with username **root** and password **Syp9393!**

### 2.2 Delete Each Wrong VM

1. In the left panel, click on each VM (ns1, ns2, mail, webmail).
2. Click the "Shutdown" button at the top and wait for it to stop.
3. With the VM selected, click "More" → "Remove".
4. Tick the checkbox to also remove disks, then confirm.
5. Repeat for every incorrectly built VM.

---

## 3. Create the Four VMs in Proxmox (Correctly)

Create four VMs according to the spec table below. Use the "Create VM" button at the top-right of the Proxmox web UI.

| Hostname | IP Address   | RAM   | Disk  | CPU           | Role                          |
|----------|--------------|-------|-------|---------------|-------------------------------|
| ns1      | 10.204.2.11  | 2 GB  | 20 GB | host / 2 cores | Primary DNS (BIND9 Master)    |
| ns2      | 10.204.2.12  | 2 GB  | 20 GB | host / 2 cores | Secondary DNS (BIND9 Slave)   |
| mail     | 10.204.2.20  | 2 GB  | 20 GB | host / 2 cores | Mail Server (Postfix + Dovecot) |
| webmail  | 10.204.2.21  | 4 GB  | 20 GB | host / 2 cores | Webmail (Apache + Roundcube)  |

### 3.1 VM Creation Steps (Repeat for Each VM)

> **Warning:** Do these steps EXACTLY for each of the four VMs: ns1, ns2, mail, webmail.

**General Tab**

1. Click "Create VM" in the Proxmox top-right menu.
2. Set **Name** to `ns1` (then ns2, mail, webmail for subsequent VMs).
3. Assign a unique VM ID (e.g. 101, 102, 103, 104).

**OS Tab**

4. **Guest OS:** Linux  
5. Select **"Do not use any media"** (we boot from network later).

**System Tab**

6. **BIOS:** Default (SeaBIOS)  
7. Enable checkbox: **Qemu Agent** (critical!)

**Disks Tab**

8. **Storage:** local-zfs  
9. **Disk size:** 20 GiB  
10. If using SSD, also enable: **Discard** and **SSD emulation** (under Advanced).

> **Note:** Click "Advanced" checkbox at the bottom of the Disks tab to see SSD/Discard options.

**CPU Tab**

11. **Type:** host  
12. **Cores:** 2  

**Memory Tab**

13. **RAM:** 2048 MiB for ns1, ns2, mail · **4096 MiB** for webmail  

**Network Tab**

14. **Bridge:** vmbr0  

15. Click **Finish** — do NOT start the VM yet.  
16. Repeat steps 1–15 for ns2, mail, and webmail with their respective names and RAM.

---

## 4. Install Debian 13 on Each VM (NO GUI!)

> **Warning:** CRITICAL: When asked to select software, you must UNCHECK everything EXCEPT "SSH server" and "Standard system utilities". Do NOT install any desktop environment.

You will install Debian 13 via the NSA Netboot system. Do this for each VM (ns1, ns2, mail, webmail) one at a time.

### 4.1 Boot Into Netboot Installer

1. Select your VM in Proxmox → click "Start".
2. Click "Console" to open a terminal window.
3. The VM will PXE-boot. Navigate the menu: **Installers → Linux → Debian 13 amd64**
4. Wait for the Debian installer to load.

### 4.2 Debian Installation Choices

- **Language:** English  
- **Location / Locale:** United Kingdom (British locale)  
- **Keyboard layout:** Swedish  
- **Hostname:** `ns1` (exactly as shown — then ns2, mail, webmail for other VMs)  
- **Domain name:** a25timfa.it387g.nsa.his.se  
- **Root password:** set something — but we will use sudo, not root directly  
- **Create a normal user account** with username: **a25timfa**  
- **Password for a25timfa:** Syp9393!  

**Partition / Disk setup**

- Select "Guided — use entire disk"  
- Choose your virtual disk  
- Select "All files in one partition"  
- Confirm and write changes  

**Software Selection — MOST CRITICAL STEP**

> **Warning:** In the software selection screen: use SPACE to deselect items. The ONLY items that should remain checked are "SSH server" and "Standard system utilities". Deselect ALL desktop environments (Gnome, XFCE, KDE, etc.) and everything else.

- ☑ **SSH server**  
- ☑ **Standard system utilities**  
- ☐ Debian desktop environment ← **MUST BE UNCHECKED**  
- ☐ GNOME / XFCE / KDE etc. ← **MUST BE UNCHECKED**  
- ☐ web server, print server ← **MUST BE UNCHECKED**  

5. Complete the installation and let the VM reboot.  
6. Repeat this entire chapter for all four VMs.

---

## 5. Base Configuration — All Four VMs

After Debian is installed on a VM, do ALL of the following steps on that VM before moving to the next. Login via the Proxmox console as **a25timfa** with password **Syp9393!**.

### 5.1 Become Root via sudo

> **Note:** The manual requires using sudo, not su. First install sudo and configure it.
su -
apt update && apt install -y sudo
usermod -aG sudo a25timfa
exit
Now logout and log back in as a25timfa to pick up the sudo group membership.

### 5.2 Configure a Static IP Address

Each VM needs a static IP. First identify the network interface name:

```bash
ip link show
```

Look for something like `ens18` or `eth0`. Replace `IFACE` below with your interface name.

**File: `/etc/network/interfaces`**

```
auto lo
iface lo inet loopback

auto IFACE
iface IFACE inet static
    address 10.204.2.11/24
    gateway 10.204.2.1
```

> **Warning:** Replace `IFACE` with your actual interface name (e.g. ens18). Replace `.11` with the correct last octet for each VM: ns1=.11, ns2=.12, mail=.20, webmail=.21

Apply the new IP:

```bash
sudo systemctl restart networking
```

Verify: `ip addr show`

### 5.3 Configure /etc/hosts

Edit `/etc/hosts` so the machine knows its own fully-qualified hostname:

**File: `/etc/hosts`**

```
127.0.0.1       localhost
10.204.2.11    ns1.a25timfa.it387g.nsa.his.se  ns1
10.204.2.12    ns2.a25timfa.it387g.nsa.his.se  ns2
10.204.2.20    mail.a25timfa.it387g.nsa.his.se  mail
10.204.2.21    webmail.a25timfa.it387g.nsa.his.se  webmail
10.204.2.22    mgmt.a25timfa.it387g.nsa.his.se  mgmt
```

> **Note:** On each VM, also add a line for `127.0.1.1` pointing to that VM's own FQDN. Each VM's own IP and FQDN must be in `/etc/hosts`.

### 5.4 Temporary DNS Configuration

Until your own DNS is working, point VMs at the lab DNS servers:

**File: `/etc/resolv.conf`**

```
nameserver 10.0.252.201
nameserver 10.0.252.202
```

> **Note:** Later (after your DNS is working) you will update this to point to your own ns1 and ns2.

### 5.5 Install Mandatory Packages

```bash
sudo apt update
sudo apt install -y vim qemu-guest-agent bind9-dnsutils
sudo systemctl enable --now qemu-guest-agent
```

### 5.6 Enable QEMU Guest Agent in Proxmox

1. In Proxmox web UI, select the VM.
2. Go to: **Options → QEMU Guest Agent →** enable it.
3. **Power off** and **power on** the VM (NOT just restart).

After power-on, the VM IP should appear in the Proxmox summary panel — confirming the agent is working.

### 5.7 Verify SSH is Running

```bash
sudo systemctl status ssh
```

It should show "active (running)". If not: `sudo systemctl enable --now ssh`

### 5.8 Run sudo apt upgrade

As required by the manual, test sudo works and upgrade packages:

```bash
sudo apt update && sudo apt upgrade -y
```

> **Warning:** Repeat sections 5.1–5.8 for ALL four VMs before proceeding.

---

## 6. Management Machine (mgmt)

The management machine is a Linux Desktop VM at 10.204.2.22. Unlike the servers, this one **SHOULD** have a desktop GUI. You can choose any Linux distribution (Ubuntu, Debian with GNOME, etc.).

### 6.1 Install Linux Desktop at 10.204.2.22

1. Create a new VM in Proxmox (same steps as Chapter 3, but with desktop installer).
2. Name it **mgmt**
3. Install your chosen Linux desktop — select a GUI desktop environment during install.
4. Set hostname **mgmt**
5. Set domain **a25timfa.it387g.nsa.his.se**
6. Create user **a25timfa** with password **Syp9393!**
7. Configure static IP **10.204.2.22/24** gateway 10.204.2.1

> **Note:** The mgmt machine is your jump host. From here you will SSH into all other machines as root.

### 6.2 Generate ed25519 SSH Key Pair on mgmt

Open a terminal on the mgmt machine and run (as a25timfa):

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -C "a25timfa@mgmt"
```

Press Enter twice to use no passphrase (or set one if you prefer). This creates:

- `~/.ssh/id_ed25519` — private key (keep this safe!)
- `~/.ssh/id_ed25519.pub` — public key (copy this to servers)

View your public key: `cat ~/.ssh/id_ed25519.pub`

### 6.3 Copy Public Key to Root on All Servers

Do this for each of the four servers: ns1, ns2, mail, webmail.

**Method:** SSH into the server as your normal user (using password), then add the key to root.

On mgmt, SSH to each server as normal user first:

```bash
ssh a25timfa@10.204.2.11
```

(Enter password Syp9393! when prompted)

Once logged into the server, add the public key to root authorized_keys:

```bash
sudo mkdir -p /root/.ssh
sudo chmod 700 /root/.ssh
sudo bash -c "echo 'PASTE_YOUR_PUBLIC_KEY_HERE' >> /root/.ssh/authorized_keys"
sudo chmod 600 /root/.ssh/authorized_keys
exit
```

Back on mgmt, test passwordless root login: `ssh root@10.204.2.11` — you should get a root shell with NO password prompt. Repeat for .12, .20, .21.

### 6.4 Configure SSH on Each Server to Allow Root Key Login

Verify on each server (usually the default in Debian):

```bash
sudo grep PermitRootLogin /etc/ssh/sshd_config
```

It should say: `PermitRootLogin prohibit-password` (root login only via SSH key, not password).

If the line says "no", change it:

```bash
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

---

## 7. DNS — NS1 (Primary / Master)

NS1 (10.204.2.11) is your authoritative primary DNS server. It holds the master copy of your zone data. NS2 will be a slave that copies from NS1.

### 7.1 Install BIND9 on NS1

SSH into ns1 from mgmt as root:

```bash
ssh root@10.204.2.11
apt update && apt install -y bind9
```

### 7.2 Configure named.conf.options (on NS1)

Always backup originals before editing:

```bash
cp /etc/bind/named.conf.options /etc/bind/named.conf.options.orig
```

**File: `/etc/bind/named.conf.options` (on ns1)**

```
options {
    directory "/var/cache/bind";

    // Forward queries we cannot answer to NSA lab servers
    forwarders {
        10.0.252.201;
        10.0.252.202;
    };

    dnssec-validation auto;
    auth-nxdomain no;    // conform to RFC 1035
    listen-on-v6 { any; };

    // Anyone can query our authoritative zone
    allow-query { any; };

    // Only allow recursive queries from localhost and our subnet
    allow-recursion { 127.0.0.1; 10.204.2.0/24; };
};
```

### 7.3 Configure named.conf.local (on NS1)

This tells BIND9 which zones ns1 is master for, and allows zone transfer to ns2.

```bash
cp /etc/bind/named.conf.local /etc/bind/named.conf.local.orig
```

**File: `/etc/bind/named.conf.local` (on ns1 — MASTER)**

```
// Forward zone — our domain
zone "a25timfa.it387g.nsa.his.se" {
    type master;
    file "/etc/bind/db.a25timfa";
    allow-transfer { 10.204.2.12; };  // allow ns2 to copy
};

// Reverse zone — for 10.204.2.0/24
zone "2.204.10.in-addr.arpa" {
    type master;
    file "/etc/bind/db.10";
    allow-transfer { 10.204.2.12; };
};
```

### 7.4 Create Forward Zone File: /etc/bind/db.a25timfa

This file defines A records (hostname → IP) and MX record for your domain.

> **Warning:** The serial number must be incremented every time you make changes. Format: YYYYMMDDNN (e.g. 2026030501)

**File: `/etc/bind/db.a25timfa` (on ns1)**

```
$TTL 300
$ORIGIN a25timfa.it387g.nsa.his.se.
@           IN      SOA     ns1 root.a25timfa.it387g.nsa.his.se. (
                            2026030501  ; Serial (YYYYMMDDNN)
                            30m         ; Refresh
                            3m          ; Retry
                            2w          ; Expire
                            1h )        ; Negative Cache TTL

; Name servers
            IN      NS      ns1
            IN      NS      ns2

; Mail exchanger — points to mail server
@           IN      MX      10      mail

; A records (hostname -> IP)
ns1         IN      A       10.204.2.11
ns2         IN      A       10.204.2.12
mail        IN      A       10.204.2.20
webmail     IN      A       10.204.2.21
mgmt        IN      A       10.204.2.22
```

### 7.5 Create Reverse Zone File: /etc/bind/db.10

This file maps IP addresses back to hostnames (PTR records).

**File: `/etc/bind/db.10` (on ns1)**

```
$TTL 300
@   IN  SOA  ns1.a25timfa.it387g.nsa.his.se. root.a25timfa.it387g.nsa.his.se. (
                2026030501  ; Serial
                30m         ; Refresh
                3m          ; Retry
                2w          ; Expire
                1h )        ; Negative Cache TTL

@   IN  NS   ns1.a25timfa.it387g.nsa.his.se.
@   IN  NS   ns2.a25timfa.it387g.nsa.his.se.

; PTR records (last octet only)
11  IN  PTR  ns1.a25timfa.it387g.nsa.his.se.
12  IN  PTR  ns2.a25timfa.it387g.nsa.his.se.
20  IN  PTR  mail.a25timfa.it387g.nsa.his.se.
21  IN  PTR  webmail.a25timfa.it387g.nsa.his.se.
22  IN  PTR  mgmt.a25timfa.it387g.nsa.his.se.
```

### 7.6 Set Correct Permissions and Restart

```bash
chown -R bind:bind /etc/bind/
named-checkconf
named-checkzone a25timfa.it387g.nsa.his.se /etc/bind/db.a25timfa
named-checkzone 2.204.10.in-addr.arpa /etc/bind/db.10
```

All should show no errors / OK. Then:

```bash
systemctl restart bind9
systemctl status bind9
```

### 7.7 Test NS1 DNS Resolution

From ns1 itself, or from mgmt using @ns1:

```bash
dig @10.204.2.11 ns1.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 MX a25timfa.it387g.nsa.his.se
dig @10.204.2.11 www.his.se
```

The first three should return A/MX records from your zone. The last (www.his.se) should resolve via forwarding to the NSA servers.

---

## 8. DNS — NS2 (Secondary / Slave)

NS2 (10.204.2.12) is your slave/secondary DNS. It copies (zone-transfers) all zone data from NS1 automatically. You do NOT create zone files on NS2.

### 8.1 Install BIND9 on NS2

```bash
ssh root@10.204.2.12
apt update && apt install -y bind9
```

### 8.2 Configure named.conf.options (on NS2)

IDENTICAL to NS1 — same forwarders and recursion settings:

```bash
cp /etc/bind/named.conf.options /etc/bind/named.conf.options.orig
```

**File: `/etc/bind/named.conf.options` (on ns2 — SAME AS NS1)**

```
options {
    directory "/var/cache/bind";
    forwarders {
        10.0.252.201;
        10.0.252.202;
    };
    dnssec-validation auto;
    auth-nxdomain no;
    listen-on-v6 { any; };
    allow-query { any; };
    allow-recursion { 127.0.0.1; 10.204.2.0/24; };
};
```

### 8.3 Configure named.conf.local (on NS2 — Slave)

NS2 declares the same zones but as type slave, and points to NS1 as the master:

```bash
cp /etc/bind/named.conf.local /etc/bind/named.conf.local.orig
```

**File: `/etc/bind/named.conf.local` (on ns2 — SLAVE)**

```
// Forward zone — slave copy from ns1
zone "a25timfa.it387g.nsa.his.se" {
    type slave;
    masters { 10.204.2.11; };
};

// Reverse zone — slave copy from ns1
zone "2.204.10.in-addr.arpa" {
    type slave;
    masters { 10.204.2.11; };
};
```

### 8.4 Restart NS2 and Verify Zone Transfer

```bash
named-checkconf
systemctl restart bind9
systemctl status bind9
```

Check that NS2 received the zones from NS1 (look for "transfer of zone" messages): `journalctl -u bind9 -n 20`

Test from mgmt that NS2 can resolve:

```bash
dig @10.204.2.12 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.12 ns1.a25timfa.it387g.nsa.his.se
dig @10.0.252.201 ns2.a25timfa.it387g.nsa.his.se
```

---

## 9. Update DNS on All VMs

Now that your DNS servers are working, update all four VMs (and mgmt) to use your own NS1 and NS2 instead of the temporary NSA DNS.

### 9.1 Update /etc/resolv.conf on Each VM

Do this on ns1, ns2, mail, webmail, and mgmt.

**File: `/etc/resolv.conf` (on ALL machines)**

```
nameserver 10.204.2.11
nameserver 10.204.2.12
search a25timfa.it387g.nsa.his.se
```

> **Note:** On Debian 12/13, `/etc/resolv.conf` may be a symlink managed by systemd-resolved. If editing does not persist, run: `sudo systemctl disable --now systemd-resolved && sudo rm /etc/resolv.conf`, then create the file manually.

### 9.2 Verify DNS is Working End-to-End

From the NSA Netboot management machine (left computer), verify MX record is visible:

```bash
dig MX a25timfa.it387g.nsa.his.se
```

This must return your mail server in the ANSWER SECTION. From any VM: `dig www.his.se` and `dig mail.a25timfa.it387g.nsa.his.se`

---

## 10. Mail Server — Postfix (SMTP) + Dovecot (IMAP)

The mail server runs on 10.204.2.20 (hostname: mail). Postfix handles incoming/outgoing mail (SMTP). Dovecot lets mail clients fetch mail (IMAP).

### 10.1 Install Packages on the mail VM

```bash
ssh root@10.204.2.20
apt update && apt install -y postfix dovecot-core dovecot-imapd
```

During the Postfix installation wizard: **Type:** Internet Site · **System mail name:** a25timfa.it387g.nsa.his.se

### 10.2 Create Local User Accounts

Create each company employee as a local Linux user:

```bash
useradd -m -s /bin/bash lism
useradd -m -s /bin/bash oljo
useradd -m -s /bin/bash etbr
useradd -m -s /bin/bash mida
useradd -m -s /bin/bash lumi

echo "lism:Syp9393!" | chpasswd
echo "oljo:Syp9393!" | chpasswd
echo "etbr:Syp9393!" | chpasswd
echo "mida:Syp9393!" | chpasswd
echo "lumi:Syp9393!" | chpasswd
```

### 10.3 Configure Postfix — /etc/postfix/main.cf

Back up and edit the Postfix main configuration:

```bash
cp /etc/postfix/main.cf /etc/postfix/main.cf.orig
```

Add or update these settings (use `postconf -e` to set values safely, or edit directly).

**File: `/etc/postfix/main.cf` (key settings)**

```
myhostname = mail.a25timfa.it387g.nsa.his.se
mydomain = a25timfa.it387g.nsa.his.se
myorigin = $mydomain
inet_interfaces = all
inet_protocols = ipv4

# Accept mail for our domain
mydestination = $myhostname, localhost.$mydomain, $mydomain, localhost

# Only localhost can relay without authentication
mynetworks = 127.0.0.0/8

# Use Maildir format (required by Dovecot)
home_mailbox = Maildir/

# SASL authentication via Dovecot
smtpd_sasl_auth_enable = yes
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_security_options = noanonymous
smtpd_tls_auth_only = no

# Prevent open relay
smtpd_relay_restrictions = permit_sasl_authenticated, permit_mynetworks, reject_unauth_destination
smtpd_recipient_restrictions = permit_sasl_authenticated, permit_mynetworks, reject_unauth_destination
```

### 10.4 Configure Dovecot

Edit three Dovecot configuration files.

#### 10.4.1 — /etc/dovecot/conf.d/10-mail.conf

Tell Dovecot where to find mail (must match `home_mailbox` in Postfix). Set:

**File: `/etc/dovecot/conf.d/10-mail.conf`**

```
mail_location = maildir:~/Maildir
```

#### 10.4.2 — /etc/dovecot/conf.d/10-auth.conf

Allow plaintext authentication (no SSL required — internal network):

**File: `/etc/dovecot/conf.d/10-auth.conf`**

```
disable_plaintext_auth = no
auth_mechanisms = plain login
```

#### 10.4.3 — /etc/dovecot/conf.d/10-master.conf

Create a UNIX socket so Postfix can use Dovecot for SASL. Find the `service auth` block and add the unix_listener inside it:

**File: `/etc/dovecot/conf.d/10-master.conf` (inside service auth block)**

```
service auth {
  # Postfix smtp-auth
  unix_listener /var/spool/postfix/private/auth {
    mode = 0660
    user = postfix
    group = postfix
  }
}
```

### 10.5 Set Up Email Aliases

Users have full email addresses (e.g. olivia.johnson@...) that must map to local accounts.

**File: `/etc/aliases`**

```
# System aliases
postmaster:  root

# Company employee full-name aliases -> local accounts
liam.smith:      lism
olivia.johnson:  oljo
ethan.brown:     etbr
mia.davis:       mida
lucas.miller:    lumi
```

Rebuild the alias database: `newaliases`

### 10.6 Restart Services and Test

```bash
systemctl restart postfix dovecot
systemctl status postfix dovecot
```

Test SMTP with telnet from another VM (e.g. mgmt): `telnet 10.204.2.20 25`

In the telnet session type (wait for 250 responses):

```
EHLO mgmt.a25timfa.it387g.nsa.his.se
MAIL FROM: test@test.com
RCPT TO: oljo@a25timfa.it387g.nsa.his.se
DATA
Subject: Test Email

Hello Olivia, this is a test.
.
QUIT
```

Verify on the mail server: `ls -la /home/oljo/Maildir/new/`

To test **autoreply@nsa.his.se**: install Thunderbird on mgmt, configure account (oljo): IMAP 10.204.2.20:143, SMTP 10.204.2.20:25, no SSL, password Syp9393!. Send to autoreply@nsa.his.se and wait for the reply.

---

## 11. Webmail — Roundcube + Apache + MariaDB

The webmail interface runs on 10.204.2.21 (hostname: webmail). When a user visits **http://webmail.a25timfa.it387g.nsa.his.se**, they should reach Roundcube.

> **Warning:** Verify your mail server (Chapter 10) is fully working before starting this chapter.

### 11.1 Install Packages on the webmail VM

```bash
ssh root@10.204.2.21
apt update && apt install -y mariadb-server
apt install -y roundcube
```

During the Roundcube install wizard: configure with dbconfig-common **YES**, database type **mysql**, set a database password when prompted.

### 11.2 Configure Roundcube

**File: `/etc/roundcube/config.inc.php` (add/update these lines)**

```php
<?php

// Database connection (set by dbconfig — do not change)
// $config['db_dsnw'] = ...;

// IMAP server — your mail VM
$config['default_host'] = '10.204.2.20';
$config['default_port'] = 143;

// SMTP server — your mail VM
$config['smtp_server'] = '10.204.2.20';
$config['smtp_port'] = 25;
$config['smtp_user'] = '%u';
$config['smtp_pass'] = '%p';

$config['product_name'] = 'Webmail a25timfa';
$config['des_key'] = 'change_this_to_24_chars_string';
```

### 11.3 Enable Roundcube in Apache

```bash
a2enconf roundcube
systemctl reload apache2
```

### 11.4 Set Up Virtual Host to Redirect to Roundcube

When someone visits http://webmail.a25timfa.it387g.nsa.his.se, they should end up at /roundcube.

**File: `/etc/apache2/sites-available/webmail.conf`**

```apache
<VirtualHost *:80>
    ServerName webmail.a25timfa.it387g.nsa.his.se

    # Redirect root URL to Roundcube
    RedirectMatch permanent ^/$ /roundcube/

    # Include Roundcube alias (defined in conf-available/roundcube.conf)
    Include /etc/apache2/conf-available/roundcube.conf

    ErrorLog ${APACHE_LOG_DIR}/webmail-error.log
    CustomLog ${APACHE_LOG_DIR}/webmail-access.log combined
</VirtualHost>
```

Enable the site and restart Apache:

```bash
a2ensite webmail
a2enmod rewrite
systemctl restart apache2
```

### 11.5 Test Roundcube

1. From mgmt browser, go to **http://webmail.a25timfa.it387g.nsa.his.se**
2. You should be redirected to the Roundcube login page.
3. Login with username **oljo** and password **Syp9393!**
4. Send a test email to **autoreply@nsa.his.se**
5. Wait a minute, then refresh inbox — you should receive an auto-reply with a fortune cookie.

---

## 12. Final Verification & Demo Checklist

Before presenting to your supervisor, verify every item below. These are the three things you must demonstrate.

### 12.1 Demo Item 1 — Send Email via Webmail

Send an email as **olivia.johnson@a25timfa.it387g.nsa.his.se** to **autoreply@nsa.his.se**.

1. Open browser on mgmt → **http://webmail.a25timfa.it387g.nsa.his.se**
2. Login as **oljo** / **Syp9393!**
3. Compose: **To:** autoreply@nsa.his.se, **Subject:** Test
4. Click Send.

### 12.2 Demo Item 2 — Show AutoReply with Fortune Cookie

1. In Roundcube, wait 1–2 minutes and refresh inbox.
2. Open the auto-reply from autoreply@nsa.his.se — it must contain a fortune cookie in the body.

### 12.3 Demo Item 3 — Passwordless SSH from mgmt to Servers

From mgmt, run (no password prompt):

```bash
ssh root@10.204.2.11   # ns1
ssh root@10.204.2.12   # ns2
ssh root@10.204.2.20   # mail
ssh root@10.204.2.21   # webmail
```

### 12.4 DNS Verification Commands

```bash
dig MX a25timfa.it387g.nsa.his.se
dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.12 ns1.a25timfa.it387g.nsa.his.se
dig @10.204.2.12 www.his.se
```

### 12.5 Log Monitoring Commands

```bash
journalctl -u bind9 -f      # DNS (ns1 or ns2)
journalctl -u postfix -f   # Postfix SMTP
journalctl -u dovecot -f   # Dovecot IMAP
journalctl -u apache2 -f   # Apache
tail -f /var/log/mail.log  # Combined mail log
```

### 12.6 Common Troubleshooting Tips

**Mail not delivering?**

- `dig MX` returns your mail server IP; `systemctl status postfix`; `journalctl -u postfix`; check `main.cf` (myhostname, mydestination); run `newaliases` after editing `/etc/aliases`.

**Roundcube login fails?**

- Dovecot running on port 143; `mail_location = maildir:~/Maildir` in 10-mail.conf; `disable_plaintext_auth = no` in 10-auth.conf; `default_host` in Roundcube config correct.

**SSH key auth not working?**

- `/root/.ssh/authorized_keys` exists; `chmod 700 /root/.ssh` and `chmod 600 authorized_keys`; `PermitRootLogin prohibit-password` in sshd_config; `systemctl restart ssh`.

**DNS zone not loading?**

- `named-checkzone ZONENAME /etc/bind/DBFILE`; trailing dots on FQDNs; increment serial; `systemctl reload bind9`.
