LINUX 
My Lab Solution Guide
Student:  a25timfa   |   Room: 204   |   Group: 2
Domain:  a25timfa.it387g.nsa.his.se
Network: 10.204.2.0/24   |   Gateway: 10.204.2.1
Password (all accounts): Syp9393!
 
 
Table of Contents
Table of Contents	2
1. Network Overview & Key Credentials	5
1.1 Network Map	5
1.2 Key Credentials & Domain	5
2. Delete Incorrectly Built VMs in Proxmox	6
2.1 Access Proxmox Web UI	6
2.2 Delete Each Wrong VM	6
3. Create the Four VMs in Proxmox (Correctly)	7
3.1 VM Creation Steps (Repeat for Each VM)	7
General Tab	7
OS Tab	7
System Tab	7
Disks Tab	7
CPU Tab	7
Memory Tab	8
Network Tab	8
4. Install Debian 13 on Each VM (NO GUI!)	9
4.1 Boot Into Netboot Installer	9
4.2 Debian Installation Choices	9
Partition / Disk setup	9
Software Selection — MOST CRITICAL STEP	9
5. Base Configuration — All Four VMs	11
5.1 Become Root via sudo	11
5.2 Configure a Static IP Address	11
5.3 Configure /etc/hosts	11
5.4 Temporary DNS Configuration	12
5.5 Install Mandatory Packages	12
5.6 Enable QEMU Guest Agent in Proxmox	12
5.7 Verify SSH is Running	12
5.8 Run sudo apt upgrade	12
6. Management Machine (mgmt)	13
6.1 Install Linux Desktop at 10.204.2.22	13
6.2 Generate ed25519 SSH Key Pair on mgmt	13
6.3 Copy Public Key to Root on All Servers	13
6.4 Configure SSH on Each Server to Allow Root Key Login	14
7. DNS — NS1 (Primary / Master)	15
7.1 Install BIND9 on NS1	15
7.2 Configure named.conf.options (on NS1)	15
7.3 Configure named.conf.local (on NS1)	15
7.4 Create Forward Zone File: /etc/bind/db.a25timfa	16
7.5 Create Reverse Zone File: /etc/bind/db.10	16
7.6 Set Correct Permissions and Restart	17
7.7 Test NS1 DNS Resolution	17
8. DNS — NS2 (Secondary / Slave)	18
8.1 Install BIND9 on NS2	18
8.2 Configure named.conf.options (on NS2)	18
8.3 Configure named.conf.local (on NS2 — Slave)	18
8.4 Restart NS2 and Verify Zone Transfer	18
9. Update DNS on All VMs	20
9.1 Update /etc/resolv.conf on Each VM	20
9.2 Verify DNS is Working End-to-End	20
10. Mail Server — Postfix (SMTP) + Dovecot (IMAP)	21
10.1 Install Packages on the mail VM	21
10.2 Create Local User Accounts	21
10.3 Configure Postfix — /etc/postfix/main.cf	21
10.4 Configure Dovecot	22
10.4.1 — /etc/dovecot/conf.d/10-mail.conf	22
10.4.2 — /etc/dovecot/conf.d/10-auth.conf	22
10.4.3 — /etc/dovecot/conf.d/10-master.conf	22
10.5 Set Up Email Aliases	22
10.6 Restart Services and Test	23
11. Webmail — Roundcube + Apache + MariaDB	24
11.1 Install Packages on the webmail VM	24
11.2 Configure Roundcube	24
11.3 Enable Roundcube in Apache	24
11.4 Set Up Virtual Host to Redirect to Roundcube	25
11.5 Test Roundcube	25
12. Final Verification & Demo Checklist	26
12.1 Demo Item 1 — Send Email via Webmail	26
12.2 Demo Item 2 — Show AutoReply with Fortune Cookie	26
12.3 Demo Item 3 — Passwordless SSH from mgmt to Servers	26
12.4 DNS Verification Commands	26
12.5 Log Monitoring Commands (Useful During Troubleshooting)	27
12.6 Common Troubleshooting Tips	27
Mail not delivering?	27
Roundcube login fails?	27
SSH key auth not working?	27
DNS zone not loading?	27

 
1. Network Overview & Key Credentials
This guide walks you through the complete rebuild of your lab environment from scratch. All four server VMs (ns1, ns2, mail, webmail) must run Debian 13 with NO graphical interface. Only the management machine (mgmt) may have a desktop GUI.

1.1 Network Map
Machine / Role	IP Address	Notes
Proxmox VE (Hypervisor)	10.204.2.10	Right computer — install Proxmox on this
ns1 — Primary DNS	10.204.2.11	BIND9 Master
ns2 — Secondary DNS	10.204.2.12	BIND9 Slave (zone transfer from ns1)
mail — Mail Server	10.204.2.20	Postfix (SMTP) + Dovecot (IMAP)
webmail — Web Frontend	10.204.2.21	Apache + Roundcube + MariaDB
mgmt — Management	10.204.2.22	Linux Desktop — your jump host (HAS a GUI)
Gateway	10.204.2.1	Lab router — already exists
NSA DNS Forwarder 1	10.0.252.201	Lab-provided upstream DNS
NSA DNS Forwarder 2	10.0.252.202	Lab-provided upstream DNS

1.2 Key Credentials & Domain
University Login:  a25timfa
Domain (FQDN base):  a25timfa.it387g.nsa.his.se
Subnet:  10.204.2.0/24
Gateway:  10.204.2.1
Default Password (all accounts):  Syp9393!
Proxmox credentials:  root  /  Syp9393!


2. Delete Incorrectly Built VMs in Proxmox
Since your existing VMs were built with GUIs (which server VMs must NOT have), delete them and start fresh.

2.1 Access Proxmox Web UI
Step 1  On the NSA Netboot management machine (left computer), open a browser.  
Step 2  Navigate to:  https://10.204.2.10:8006
Step 3  Login with username  root  and password  Syp9393!

2.2 Delete Each Wrong VM
Step 1  In the left panel, click on each VM (ns1, ns2, mail, webmail).  
Step 2  Click the "Shutdown" button at the top and wait for it to stop.  
Step 3  With the VM selected, click "More" → "Remove".  
Step 4  Tick the checkbox to also remove disks, then confirm.  
Step 5  Repeat for every incorrectly built VM. 
3. Create the Four VMs in Proxmox (Correctly)
Create four VMs according to the spec table below. Use the "Create VM" button at the top-right of the Proxmox web UI.

Hostname	IP Address	RAM	Disk	CPU	Role
ns1	10.204.2.11	2 GB	20 GB	host / 2 cores	Primary DNS (BIND9 Master)
ns2	10.204.2.12	2 GB	20 GB	host / 2 cores	Secondary DNS (BIND9 Slave)
mail	10.204.2.20	2 GB	20 GB	host / 2 cores	Mail Server (Postfix + Dovecot)
webmail	10.204.2.21	4 GB	20 GB	host / 2 cores	Webmail (Apache + Roundcube)

3.1 VM Creation Steps (Repeat for Each VM)
⚠  Do these steps EXACTLY for each of the four VMs: ns1, ns2, mail, webmail.

General Tab
Step 1  Click "Create VM" in the Proxmox top-right menu.  
Step 2  Set Name  ns1  (then ns2, mail, webmail for subsequent VMs)
Step 3  Assign a unique VM ID (e.g. 101, 102, 103, 104).  

OS Tab
Step 4  Guest OS:  Linux
Step 5  Select  "Do not use any media"  (we boot from network later)

System Tab
Step 6  BIOS:  Default (SeaBIOS)
Step 7  Enable checkbox:  Qemu Agent  ← critical!

Disks Tab
Step 8  Storage:  local-zfs
Step 9  Disk size:  20 GiB
Step 10  If using SSD, also enable:  Discard  and  SSD emulation  (under Advanced)
ℹ  Click "Advanced" checkbox at the bottom of the Disks tab to see SSD/Discard options.

CPU Tab
Step 11  Type:  host
Step 12  Cores:  2

Memory Tab
Step 13  RAM:  2048 MiB  for ns1, ns2, mail  |  4096 MiB  for webmail

Network Tab
Step 14  Bridge:  vmbr0

Step 15  Click Finish — do NOT start the VM yet.  
Step 16  Repeat steps 1–15 for ns2, mail, and webmail with their respective names and RAM.  
4. Install Debian 13 on Each VM (NO GUI!)
⚠  CRITICAL: When asked to select software, you must UNCHECK everything EXCEPT "SSH server" and "Standard system utilities". Do NOT install any desktop environment.

You will install Debian 13 via the NSA Netboot system. Do this for each VM (ns1, ns2, mail, webmail) one at a time.

4.1 Boot Into Netboot Installer
Step 1  Select your VM in Proxmox → click "Start".  
Step 2  Click "Console" to open a terminal window.  
Step 3  The VM will PXE-boot. Navigate the menu:  Installers → Linux → Debian 13 amd64
Step 4  Wait for the Debian installer to load.  

4.2 Debian Installation Choices
•	Language: English
•	Location / Locale: United Kingdom  (British locale)
•	Keyboard layout: Swedish
•	Hostname: ns1  (exactly as shown — then ns2, mail, webmail for other VMs)
•	Domain name: a25timfa.it387g.nsa.his.se
•	Root password: set something — but we will use sudo, not root directly
•	Create a normal user account with username: a25timfa
•	Password for a25timfa: Syp9393!

Partition / Disk setup
•	Select "Guided — use entire disk"
•	Choose your virtual disk
•	Select "All files in one partition"
•	Confirm and write changes

Software Selection — MOST CRITICAL STEP
⚠  In the software selection screen: use SPACE to deselect items. The ONLY items that should remain checked are "SSH server" and "Standard system utilities". Deselect ALL desktop environments (Gnome, XFCE, KDE, etc.) and everything else.
•	☑  SSH server
•	☑  Standard system utilities
•	☐  Debian desktop environment  ← MUST BE UNCHECKED
•	☐  GNOME / XFCE / KDE etc.    ← MUST BE UNCHECKED
•	☐  web server, print server    ← MUST BE UNCHECKED

Step 5  Complete the installation and let the VM reboot.  
Step 6  Repeat this entire chapter for all four VMs.  

5. Base Configuration — All Four VMs
After Debian is installed on a VM, do ALL of the following steps on that VM before moving to the next. Login via the Proxmox console as a25timfa with password Syp9393!.

5.1 Become Root via sudo
ℹ  The manual requires using sudo, not su. First install sudo and configure it.
su -
apt update && apt install -y sudo
usermod -aG sudo a25timfa
exit
Now logout and log back in as a25timfa to pick up the sudo group membership.

5.2 Configure a Static IP Address
Each VM needs a static IP. First identify the network interface name:
ip link show
Look for something like ens18 or eth0. Replace IFACE below with your interface name.

  /etc/network/interfaces
auto lo
iface lo inet loopback

auto IFACE
iface IFACE inet static
    address 10.204.2.11/24
    gateway 10.204.2.1

⚠  Replace IFACE with your actual interface name (e.g. ens18). Replace .11 with the correct last octet for each VM: ns1=.11, ns2=.12, mail=.20, webmail=.21

Apply the new IP:
sudo systemctl restart networking
Verify it worked:
ip addr show

5.3 Configure /etc/hosts
Edit /etc/hosts so the machine knows its own fully-qualified hostname:
  /etc/hosts
127.0.0.1       localhost
10.204.2.11    ns1.a25timfa.it387g.nsa.his.se  ns1
10.204.2.12    ns2.a25timfa.it387g.nsa.his.se  ns2
10.204.2.20    mail.a25timfa.it387g.nsa.his.se  mail
10.204.2.21    webmail.a25timfa.it387g.nsa.his.se  webmail
10.204.2.22    mgmt.a25timfa.it387g.nsa.his.se  mgmt
⚠  On each VM, also add a line for 127.0.1.1  pointing to that VM's own FQDN (the installer may have added this — update it). The critical part is that each VM's own IP and FQDN is in /etc/hosts.

5.4 Temporary DNS Configuration
Until your own DNS is working, point VMs at the lab DNS servers:
  /etc/resolv.conf
nameserver 10.0.252.201
nameserver 10.0.252.202
ℹ  Later (after your DNS is working) you will update this to point to your own ns1 and ns2.

5.5 Install Mandatory Packages
sudo apt update
sudo apt install -y vim qemu-guest-agent bind9-dnsutils
sudo systemctl enable --now qemu-guest-agent

5.6 Enable QEMU Guest Agent in Proxmox
Step 1  In Proxmox web UI, select the VM.  
Step 2  Go to:  Hardware → Add → ... (it should already be enabled from VM creation)
Step 3  Go to:  Options → QEMU Guest Agent → enable it
Step 4  Power off and power on the VM (NOT just restart).  
After power-on, the VM IP should appear in the Proxmox summary panel — confirming the agent is working.

5.7 Verify SSH is Running
sudo systemctl status ssh
It should show "active (running)". If not:
sudo systemctl enable --now ssh

5.8 Run sudo apt upgrade
As required by the manual, test sudo works and upgrade packages:
sudo apt update && sudo apt upgrade -y
⚠  Repeat sections 5.1–5.8 for ALL four VMs before proceeding.
6. Management Machine (mgmt)
The management machine is a Linux Desktop VM at 10.204.2.22. Unlike the servers, this one SHOULD have a desktop GUI. You can choose any Linux distribution (Ubuntu, Debian with GNOME, etc.).

6.1 Install Linux Desktop at 10.204.2.22
Step 1  Create a new VM in Proxmox (same steps as Chapter 3, but with desktop installer).  
Step 2  Name it  mgmt
Step 3  Install your chosen Linux desktop — select a GUI desktop environment during install.  
Step 4  Set hostname  mgmt
Step 5  Set domain  a25timfa.it387g.nsa.his.se
Step 6  Create user  a25timfa  with password  Syp9393!
Step 7  Configure static IP  10.204.2.22/24  gateway 10.204.2.1

ℹ  The mgmt machine is your jump host. From here you will SSH into all other machines as root.

6.2 Generate ed25519 SSH Key Pair on mgmt
Open a terminal on the mgmt machine and run (as a25timfa):
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -C "a25timfa@mgmt"
Press Enter twice to use no passphrase (or set one if you prefer). This creates:
•	~/.ssh/id_ed25519       (private key — keep this safe!)
•	~/.ssh/id_ed25519.pub   (public key — copy this to servers)

View your public key (you will need it in the next step):
cat ~/.ssh/id_ed25519.pub

6.3 Copy Public Key to Root on All Servers
Do this for each of the four servers: ns1, ns2, mail, webmail.

METHOD: SSH into the server as your normal user (using password), then add the key to root.

On mgmt, SSH to each server as normal user first:
ssh a25timfa@10.204.2.11
(Enter password Syp9393! when prompted)

Once logged into the server, add the public key to root authorized_keys:
sudo mkdir -p /root/.ssh
sudo chmod 700 /root/.ssh
Now paste your public key (copy output of cat ~/.ssh/id_ed25519.pub from mgmt):
sudo bash -c "echo 'PASTE_YOUR_PUBLIC_KEY_HERE' >> /root/.ssh/authorized_keys"
sudo chmod 600 /root/.ssh/authorized_keys
exit

Back on mgmt, test passwordless root login:
ssh root@10.204.2.11
You should get a root shell with NO password prompt. Repeat for .12, .20, .21.

ℹ  After this is working, from mgmt you can type "ssh root@10.204.2.11" to instantly manage ns1 as root. This is your jump host setup.
6.4 Configure SSH on Each Server to Allow Root Key Login
Verify this setting on each server (it is usually the default in Debian):
sudo grep PermitRootLogin /etc/ssh/sshd_config
It should say:
PermitRootLogin prohibit-password
This means root login is allowed ONLY via SSH key (not password) — which is what we want.
If the line says "no", change it:
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sudo systemctl restart ssh
 
7. DNS — NS1 (Primary / Master)
NS1 (10.204.2.11) is your authoritative primary DNS server. It holds the master copy of your zone data. NS2 will be a slave that copies from NS1.

7.1 Install BIND9 on NS1
SSH into ns1 from mgmt as root:
ssh root@10.204.2.11
apt update && apt install -y bind9

7.2 Configure named.conf.options (on NS1)
Always backup originals before editing:
cp /etc/bind/named.conf.options /etc/bind/named.conf.options.orig

  /etc/bind/named.conf.options  (on ns1)
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

7.3 Configure named.conf.local (on NS1)
This tells BIND9 which zones ns1 is master for, and allows zone transfer to ns2.
cp /etc/bind/named.conf.local /etc/bind/named.conf.local.orig

  /etc/bind/named.conf.local  (on ns1 — MASTER)
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

7.4 Create Forward Zone File: /etc/bind/db.a25timfa
This file defines A records (hostname → IP) and MX record for your domain.
⚠  The serial number must be incremented every time you make changes. Format: YYYYMMDDNN (e.g. 2026030501)

  /etc/bind/db.a25timfa  (on ns1)
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

7.5 Create Reverse Zone File: /etc/bind/db.10
This file maps IP addresses back to hostnames (PTR records).

  /etc/bind/db.10  (on ns1)
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

7.6 Set Correct Permissions and Restart
chown -R bind:bind /etc/bind/
named-checkconf
named-checkzone a25timfa.it387g.nsa.his.se /etc/bind/db.a25timfa
named-checkzone 2.204.10.in-addr.arpa /etc/bind/db.10
All three commands should show no errors / OK.
systemctl restart bind9
systemctl status bind9

7.7 Test NS1 DNS Resolution
From ns1 itself, or from mgmt using @ns1:
dig @10.204.2.11 ns1.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 MX a25timfa.it387g.nsa.his.se
dig @10.204.2.11 www.his.se
The first three should return A/MX records from your zone. The last (www.his.se) should resolve via forwarding to the NSA servers.
ℹ  The serial number (2026030501) must be increased every time you edit zone files. Increment the last two digits (NN) for multiple changes on the same day.
8. DNS — NS2 (Secondary / Slave)
NS2 (10.204.2.12) is your slave/secondary DNS. It copies (zone-transfers) all zone data from NS1 automatically. You do NOT create zone files on NS2.

8.1 Install BIND9 on NS2
ssh root@10.204.2.12
apt update && apt install -y bind9

8.2 Configure named.conf.options (on NS2)
IDENTICAL to NS1 — same forwarders and recursion settings:
cp /etc/bind/named.conf.options /etc/bind/named.conf.options.orig

  /etc/bind/named.conf.options  (on ns2 — SAME AS NS1)
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

8.3 Configure named.conf.local (on NS2 — Slave)
NS2 declares the same zones but as type slave, and points to NS1 as the master:
cp /etc/bind/named.conf.local /etc/bind/named.conf.local.orig

  /etc/bind/named.conf.local  (on ns2 — SLAVE)
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

8.4 Restart NS2 and Verify Zone Transfer
named-checkconf
systemctl restart bind9
systemctl status bind9

Check that NS2 received the zones from NS1 (look for "transfer of zone" messages):
journalctl -u bind9 -n 20

Test from mgmt that NS2 can resolve:
dig @10.204.2.12 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.12 ns1.a25timfa.it387g.nsa.his.se

Also verify using the NSA primary DNS what it knows about your NS2:
dig @10.0.252.201 ns2.a25timfa.it387g.nsa.his.se
9. Update DNS on All VMs
Now that your DNS servers are working, update all four VMs (and mgmt) to use your own NS1 and NS2 instead of the temporary NSA DNS.

9.1 Update /etc/resolv.conf on Each VM
Do this on ns1, ns2, mail, webmail, and mgmt:

  /etc/resolv.conf  (on ALL machines)
nameserver 10.204.2.11
nameserver 10.204.2.12
search a25timfa.it387g.nsa.his.se

⚠  On Debian 12/13, /etc/resolv.conf may be a symlink managed by systemd-resolved. If editing does not persist, run: sudo systemctl disable --now systemd-resolved && sudo rm /etc/resolv.conf, then create the file manually.

9.2 Verify DNS is Working End-to-End
From the NSA Netboot management machine (left computer), verify MX record is visible:
dig MX a25timfa.it387g.nsa.his.se
This must return your mail server in the ANSWER SECTION. If it does not, your DNS delegation is not working — make sure you are at your assigned seat.

From any VM, test recursive resolution:
dig www.his.se
dig mail.a25timfa.it387g.nsa.his.se
ℹ  DNS must work correctly before proceeding. The mail server will not function if DNS is broken.
10. Mail Server — Postfix (SMTP) + Dovecot (IMAP)
The mail server runs on 10.204.2.20 (hostname: mail). Postfix handles incoming/outgoing mail (SMTP). Dovecot lets mail clients fetch mail (IMAP).

10.1 Install Packages on the mail VM
ssh root@10.204.2.20
apt update && apt install -y postfix dovecot-core dovecot-imapd

During the Postfix installation wizard:
•	Type: Internet Site
•	System mail name: a25timfa.it387g.nsa.his.se

10.2 Create Local User Accounts
Create each company employee as a local Linux user:

useradd -m -s /bin/bash lism
useradd -m -s /bin/bash oljo
useradd -m -s /bin/bash etbr
useradd -m -s /bin/bash mida
useradd -m -s /bin/bash lumi

Set passwords for all users:
echo "lism:Syp9393!" | chpasswd
echo "oljo:Syp9393!" | chpasswd
echo "etbr:Syp9393!" | chpasswd
echo "mida:Syp9393!" | chpasswd
echo "lumi:Syp9393!" | chpasswd

10.3 Configure Postfix — /etc/postfix/main.cf
Back up and edit the Postfix main configuration:
cp /etc/postfix/main.cf /etc/postfix/main.cf.orig

Add or update these settings (use postconf -e to set values safely, or edit directly):

  /etc/postfix/main.cf  (key settings to set)
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

10.4 Configure Dovecot
Edit three Dovecot configuration files:

10.4.1 — /etc/dovecot/conf.d/10-mail.conf
Tell Dovecot where to find mail (must match home_mailbox in Postfix):
grep -n "mail_location" /etc/dovecot/conf.d/10-mail.conf
Set the line to:
  /etc/dovecot/conf.d/10-mail.conf
mail_location = maildir:~/Maildir

10.4.2 — /etc/dovecot/conf.d/10-auth.conf
Allow plaintext authentication (no SSL required — this is an internal network):
  /etc/dovecot/conf.d/10-auth.conf  (update these lines)
disable_plaintext_auth = no
auth_mechanisms = plain login

10.4.3 — /etc/dovecot/conf.d/10-master.conf
Create a UNIX socket so Postfix can use Dovecot for SASL authentication. Find the "service auth" block and add the unix_listener inside it:
  /etc/dovecot/conf.d/10-master.conf  (inside service auth block)
service auth {
  # Postfix smtp-auth
  unix_listener /var/spool/postfix/private/auth {
    mode = 0660
    user = postfix
    group = postfix
  }
}

10.5 Set Up Email Aliases
Users have full email addresses (e.g. olivia.johnson@...) that must map to local accounts. Edit /etc/aliases:

  /etc/aliases
# System aliases
postmaster:  root

# Company employee full-name aliases -> local accounts
liam.smith:      lism
olivia.johnson:  oljo
ethan.brown:     etbr
mia.davis:       mida
lucas.miller:    lumi

Rebuild the alias database:
newaliases

10.6 Restart Services and Test
systemctl restart postfix dovecot
systemctl status postfix dovecot

Test SMTP with telnet from another VM (e.g. mgmt):
telnet 10.204.2.20 25
In the telnet session type these commands (wait for 250 responses):
EHLO mgmt.a25timfa.it387g.nsa.his.se
MAIL FROM: test@test.com
RCPT TO: oljo@a25timfa.it387g.nsa.his.se
DATA
Subject: Test Email

Hello Olivia, this is a test.
.
QUIT

Then verify the mail was delivered on the mail server:
ls -la /home/oljo/Maildir/new/

Also test sending to autoreply@nsa.his.se (this tests your MX record and outbound routing):
Install Thunderbird on mgmt and configure an account for one of your users (e.g. oljo):
•	IMAP server: 10.204.2.20  Port: 143  No SSL
•	SMTP server: 10.204.2.20  Port: 25   No SSL
•	Username: oljo  Password: Syp9393!
Send a message to autoreply@nsa.his.se from Thunderbird and wait for the automated reply.
⚠  Make sure DNS is fully working before testing mail. The MX record must resolve correctly from both inside and outside your subnet.
11. Webmail — Roundcube + Apache + MariaDB
The webmail interface runs on 10.204.2.21 (hostname: webmail). When a user visits http://webmail.a25timfa.it387g.nsa.his.se, they should reach Roundcube.

⚠  Verify your mail server (Chapter 10) is fully working before starting this chapter. Roundcube will not work if IMAP is broken.

11.1 Install Packages on the webmail VM
ssh root@10.204.2.21
apt update && apt install -y mariadb-server
Then install Roundcube (which also pulls in Apache and PHP):
apt install -y roundcube

During the Roundcube install wizard:
•	Configure roundcube with dbconfig-common: YES
•	Database type: mysql
•	Set a database password when prompted (e.g. roundcubeDBpass1!)
ℹ  Note the database password you set — you may need it if you need to reconfigure.

11.2 Configure Roundcube
Edit the Roundcube config to point to your mail server:

  /etc/roundcube/config.inc.php  (add/update these lines)
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

11.3 Enable Roundcube in Apache
Enable the Roundcube Apache configuration that Debian created:
a2enconf roundcube
systemctl reload apache2

11.4 Set Up Virtual Host to Redirect to Roundcube
When someone visits http://webmail.a25timfa.it387g.nsa.his.se, they should end up at /roundcube.
Create a new Apache virtual host file:

  /etc/apache2/sites-available/webmail.conf
<VirtualHost *:80>
    ServerName webmail.a25timfa.it387g.nsa.his.se

    # Redirect root URL to Roundcube
    RedirectMatch permanent ^/$ /roundcube/

    # Include Roundcube alias (defined in conf-available/roundcube.conf)
    Include /etc/apache2/conf-available/roundcube.conf

    ErrorLog ${APACHE_LOG_DIR}/webmail-error.log
    CustomLog ${APACHE_LOG_DIR}/webmail-access.log combined
</VirtualHost>

Enable the site and restart Apache:
a2ensite webmail
a2enmod rewrite
systemctl restart apache2

11.5 Test Roundcube
Step 1  From mgmt browser, navigate to:  http://webmail.a25timfa.it387g.nsa.his.se
Step 2  You should be redirected to the Roundcube login page.  
Step 3  Login with username  oljo  and password  Syp9393!
Step 4  Send a test email to autoreply@nsa.his.se  
Step 5  Wait a minute, then refresh inbox — you should receive an auto-reply with a fortune cookie.  

ℹ  The IMAP login username is the short form (e.g. oljo), not the full email address. Roundcube uses %u (username) and %p (password) as SMTP auth credentials.
12. Final Verification & Demo Checklist
Before presenting to your supervisor, verify every item below. These are exactly the three things you must demonstrate.

12.1 Demo Item 1 — Send Email via Webmail
Send an email as olivia.johnson@a25timfa.it387g.nsa.his.se to autoreply@nsa.his.se.

Step 1  Open browser on mgmt →  http://webmail.a25timfa.it387g.nsa.his.se
Step 2  Login as  oljo  /  Syp9393!
Step 3  Compose a new email:  
•	From: olivia.johnson@a25timfa.it387g.nsa.his.se  (or oljo@a25timfa.it387g.nsa.his.se)
•	To: autoreply@nsa.his.se
•	Subject: Test
Step 4  Click Send.  

✅  Email sent without error

12.2 Demo Item 2 — Show AutoReply with Fortune Cookie
Step 1  In Roundcube, wait 1–2 minutes and refresh inbox.  
Step 2  An auto-reply from autoreply@nsa.his.se should arrive.  
Step 3  Open it — it must contain a fortune cookie in the body.  

✅  Auto-reply received with fortune cookie text visible

12.3 Demo Item 3 — Passwordless SSH from mgmt to Servers
Show that you can SSH from mgmt to each server as root with NO password prompt:
ssh root@10.204.2.11  # ns1
ssh root@10.204.2.12  # ns2
ssh root@10.204.2.20  # mail
ssh root@10.204.2.21  # webmail

✅  All four SSH connections succeed without asking for a password

12.4 DNS Verification Commands
Run these before the demo to confirm DNS is healthy:
dig MX a25timfa.it387g.nsa.his.se
(Should show mail ANSWER from the public DNS delegation)
dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.12 ns1.a25timfa.it387g.nsa.his.se
dig @10.204.2.12 www.his.se

12.5 Log Monitoring Commands (Useful During Troubleshooting)
journalctl -u bind9 -f              # DNS logs (ns1 or ns2)
journalctl -u postfix -f            # Postfix SMTP logs
journalctl -u dovecot -f            # Dovecot IMAP logs
journalctl -u apache2 -f            # Apache logs
tail -f /var/log/mail.log           # Combined mail log

12.6 Common Troubleshooting Tips
Mail not delivering?
•	Check: dig MX returns your mail server IP
•	Check: systemctl status postfix — is it running?
•	Check: journalctl -u postfix — look for error messages
•	Check: /etc/postfix/main.cf — myhostname, mydestination correct?
•	Check: newaliases was run after editing /etc/aliases

Roundcube login fails?
•	Check: Dovecot is running and listening on port 143
•	Check: mail_location = maildir:~/Maildir in 10-mail.conf
•	Check: disable_plaintext_auth = no in 10-auth.conf
•	Check: default_host in /etc/roundcube/config.inc.php is correct IP

SSH key auth not working?
•	/root/.ssh/authorized_keys exists on the server
•	chmod 700 /root/.ssh && chmod 600 /root/.ssh/authorized_keys
•	PermitRootLogin is set to prohibit-password in sshd_config
•	systemctl restart ssh after changes

DNS zone not loading?
•	Run: named-checkzone ZONENAME /etc/bind/DBFILE
•	Check for trailing dots on fully-qualified names
•	Check serial number is incremented after changes
•	Reload: systemctl reload bind9
