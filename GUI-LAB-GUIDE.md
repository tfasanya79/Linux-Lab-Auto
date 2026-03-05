## Complete GUI-Focused Lab Guide (IT387G Linux Administration)

**Student**: a25timfa  
**Room**: 204  
**System/Group**: 2  
**Domain**: `a25timfa.it387g.nsa.his.se`  
**Network**: `10.204.2.0/24`

> **Important:** This guide is about using the **graphical Netboot desktop on the management machine (mgmt)** only — i.e. what to click and type on the left computer. The **four server VMs (ns1, ns2, mail, webmail) must not have any GUI**. The manual (Section 2.2) requires: *"They should not use any GUI"* and *"Software installation should be limited to the SSH Server and Standard system utilities."* When installing Debian on those VMs, do **not** select any desktop environment.

This document is a **complete, GUI‑oriented guide** for performing the Linux Administration lab described in `student-manual-2026v1.0.pdf`.  
It is written to be followed **step by step** in the lab environment, with:

- Clear instructions for **what to click** and **what to type**.
- **Your assignment:** login `a25timfa`, room `204`, group `2`. All examples in this guide use these values.
- Focus on the three **demonstration checklist items** and what is needed to pass the lab.

> This guide is more detailed and prescriptive than the official manual, but it does **not replace** the manual.  
> You must still understand the concepts and write your own report in your own words.

---

## 1. Overview of What You Are Building

You will build a small company infrastructure with:

- **DNS master and slave**:
  - `ns1` – DNS master (Bind9)
  - `ns2` – DNS slave (Bind9)
- **Mail server**:
  - `mail` – Postfix (SMTP) + Dovecot (IMAP)
- **Webmail server**:
  - `webmail` – Roundcube (PHP webmail) + Apache + MariaDB
- **Management machine (mgmt)**:
  - Your **left** lab computer, booted into the **NSA Netboot** desktop.
  - IP: `10.204.2.22`
  - Used to manage all servers via SSH and to access webmail in a browser.

### 1.1 IP addressing and hostnames (adapted from Table 1)

- **Proxmox host** (right computer): `10.204.2.10`
- **Gateway**: `10.204.2.1`
- **Virtual machines**:
  - `ns1` – `10.204.2.11`
  - `ns2` – `10.204.2.12`
  - `mail` – `10.204.2.20`
  - `webmail` – `10.204.2.21`
- **Management machine (mgmt)**: `10.204.2.22`

All machines use the domain:

- `a25timfa.it387g.nsa.his.se`

### 1.2 Required demonstration (from the manual)

At the end, you must show a supervisor:

1. **Webmail → autoreply**:
   - Send an email as `olivia.johnson@a25timfa.it387g.nsa.his.se` from webmail to `autoreply@nsa.his.se`.
2. **Fortune cookie reply**:
   - In webmail, show the reply from `autoreply@nsa.his.se` including the **fortune cookie** message.
3. **Passwordless SSH**:
   - From the management machine, demonstrate **passwordless SSH** (key‑based) to all servers as `root`.

### 1.3 Guidelines while following this guide

- **Always work from mgmt via SSH**, not Proxmox console, except when absolutely necessary.
- **Keep logs open** in another terminal:
  - Example: `sudo journalctl -u named -n 20` for DNS troubleshooting.
  - Or: `sudo journalctl -f -u postfix` when debugging mail.
- **Take notes and copy configs** as you go for your report.
- Always use the password: **`Syp9393!`** (for all accounts as required by the manual).

---

## 2. Management Machine (mgmt) and SSH Keys

Your management machine is the **left computer**. It should run the NSA **Netboot** desktop and act as a secure jump host.

### 2.1 Boot into the NSA Netboot environment

1. Power on the **left computer**.
2. When the **network boot menu** appears:
   - Use the arrow keys to select the **desktop** Netboot entry (often “NSA Netboot” or similar).
   - Press `Enter`.
3. Wait until you see a **graphical desktop** with a panel/menu and a **web browser** and **terminal** available.

From now on, this desktop is referred to as **mgmt** (`10.204.2.22`).

### 2.2 Generate an ed25519 SSH key pair on mgmt

1. On mgmt, open a **terminal** (e.g. “Terminal” from the menu).
2. Generate an SSH key:

   ```bash
   ssh-keygen -t ed25519
   ```

3. When prompted for the file location:
   - Press `Enter` to accept the default (`/home/<user>/.ssh/id_ed25519`).
4. When asked for a passphrase:
   - Press `Enter` twice (no passphrase).

You now have:

- Private key: `~/.ssh/id_ed25519`  
- Public key: `~/.ssh/id_ed25519.pub` (this must be included in your report).

### 2.3 Copy SSH key to all servers as root

From the mgmt terminal, run:

```bash
ssh-copy-id root@10.204.2.11   # ns1
ssh-copy-id root@10.204.2.12   # ns2
ssh-copy-id root@10.204.2.20   # mail
ssh-copy-id root@10.204.2.21   # webmail
```

For each command:

- If prompted with “Are you sure you want to continue connecting?”:
  - Type `yes` and press `Enter`.
- When asked for a password:
  - Enter `Syp9393!`.

### 2.4 Verify passwordless SSH (for demo item 3)

1. From mgmt, test SSH to each server:

   ```bash
   ssh root@10.204.2.11
   hostname
   exit

   ssh root@10.204.2.12
   hostname
   exit

   ssh root@10.204.2.20
   hostname
   exit

   ssh root@10.204.2.21
   hostname
   exit
   ```

2. Check:
   - You are **not** asked for a password.
   - `hostname` outputs the correct hostnames: `ns1`, `ns2`, `mail`, `webmail`.

### 2.5 Save public key for your report

On mgmt, in the terminal:

```bash
cat ~/.ssh/id_ed25519.pub
```

- Copy this entire line into a text file (or document) and save it as it must be included in an appendix in your report.

---

## 3. DNS & Redundancy (ns1 and ns2)

Your DNS setup provides:

- A and MX records for `a25timfa.it387g.nsa.his.se`.
- PTR records for reverse lookups (`2.204.10.in-addr.arpa`).
- A **master** DNS server (`ns1`) and a **slave** DNS server (`ns2`).
- Recursive queries only allowed from your internal network `10.204.2.0/24`.

### Lab / Debian version notes

- **DNS service name:** On current Debian (11+), the DNS daemon’s systemd unit is usually **`named`**. This guide uses `systemctl start named`, `journalctl -u named`, etc. If your system only recognises `bind9`, use that instead.
- **Dovecot:** If a Dovecot setting seems to have no effect, check that the line is **uncommented** and that there are no duplicate lines. Run `dovecot -n` to see the effective configuration.

### 3.1 Install Bind9 and tools on ns1

From mgmt:

```bash
ssh root@10.204.2.11   # ns1
apt update
apt upgrade -y
apt install -y bind9 bind9utils bind9-dnsutils
systemctl enable named
systemctl start named
systemctl status named   # Check that it is 'active (running)'
```

> **Note:** On Debian 11+, the DNS service unit is usually **`named`**. If your system uses the legacy unit name, use `bind9` instead (e.g. `systemctl start bind9`).

Press `q` to exit the status view.

### 3.2 Configure `/etc/bind/named.conf.options` on ns1

The manual’s Appendix C specifies forwarders and access rules. Edit the file:

```bash
nano /etc/bind/named.conf.options
```

Set it to something like:

```text
options {
    directory "/var/cache/bind";

    // Recursive queries go to NSA lab DNS
    forwarders {
        10.0.252.201;
        10.0.252.202;
    };

    dnssec-validation auto;
    auth-nxdomain no;    // conform to RFC1035
    listen-on-v6 { any; };

    // Allow everyone to query zones we are authoritative for
    allow-query { any; };

    // But only localhost + your subnet get recursion
    allow-recursion { 127/8; 10.204.2.0/24; };
};
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`), then check:

```bash
named-checkconf
```

No output means the syntax is fine.

### 3.3 Configure master zones on ns1 (`named.conf.local`)

You need:

- Forward zone: `a25timfa.it387g.nsa.his.se`
- Reverse zone: `2.204.10.in-addr.arpa`

Edit:

```bash
nano /etc/bind/named.conf.local
```

Append:

```text
// Reverse zone for 10.204.2.0/24
zone "2.204.10.in-addr.arpa" {
    type master;
    file "/etc/bind/db.10";
    allow-transfer { 10.204.2.12; };   // ns2
};

// Forward zone for a25timfa.it387g.nsa.his.se
zone "a25timfa.it387g.nsa.his.se" {
    type master;
    file "/etc/bind/db.a25timfa";
    allow-transfer { 10.204.2.12; };   // ns2
};
```

Save and verify:

```bash
named-checkconf
```

### 3.4 Create forward zone file `/etc/bind/db.a25timfa` (ns1)

Create from template:

```bash
cp /etc/bind/db.local /etc/bind/db.a25timfa
nano /etc/bind/db.a25timfa
```

Replace the contents with:

```text
$TTL 300
$ORIGIN a25timfa.it387g.nsa.his.se.
@   IN SOA ns1 root.a25timfa.it387g.nsa.his.se. (
        2026022601 ; Serial (YYYYMMDDNN)
        30m        ; Refresh
        3m         ; Retry
        2w         ; Expire
        1h )       ; Negative Cache TTL
    IN NS ns1
    IN NS ns2

; MX record for your domain
@   IN MX 10 mail

; A records for your hosts
ns1     IN A 10.204.2.11
ns2     IN A 10.204.2.12
mail    IN A 10.204.2.20
webmail IN A 10.204.2.21
mgmt    IN A 10.204.2.22
```

Save and exit.

### 3.5 Create reverse zone file `/etc/bind/db.10` (ns1)

Create from template:

```bash
cp /etc/bind/db.127 /etc/bind/db.10
nano /etc/bind/db.10
```

Replace with:

```text
$TTL 300
@   IN SOA ns1.a25timfa.it387g.nsa.his.se. root.a25timfa.it387g.nsa.his.se. (
        2026022601 ; Serial
        30m        ; Refresh
        3m         ; Retry
        2w         ; Expire
        1h )       ; Negative Cache TTL
    IN NS ns1.a25timfa.it387g.nsa.his.se.
    IN NS ns2.a25timfa.it387g.nsa.his.se.

; Reverse mapping: IP -> hostname
11  IN PTR ns1.a25timfa.it387g.nsa.his.se.
12  IN PTR ns2.a25timfa.it387g.nsa.his.se.
20  IN PTR mail.a25timfa.it387g.nsa.his.se.
21  IN PTR webmail.a25timfa.it387g.nsa.his.se.
22  IN PTR mgmt.a25timfa.it387g.nsa.his.se.
```

Save and exit.

### 3.6 Validate zones and restart Bind9 on ns1

Check the zones:

```bash
named-checkzone a25timfa.it387g.nsa.his.se /etc/bind/db.a25timfa
named-checkzone 2.204.10.in-addr.arpa /etc/bind/db.10
```

If they say `OK`, restart Bind9:

```bash
systemctl restart named
systemctl status named
journalctl -u named -n 20
```

Resolve any syntax errors reported in the logs, then repeat the checks.

### 3.7 Configure ns2 as DNS slave

On **ns2**:

```bash
ssh root@10.204.2.12
apt update
apt upgrade -y
apt install -y bind9 bind9utils bind9-dnsutils
```

Edit `/etc/bind/named.conf.options` (similar to ns1):

```bash
nano /etc/bind/named.conf.options
```

Use:

```text
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
    allow-recursion { 127/8; 10.204.2.0/24; };
};
```

Save and run:

```bash
named-checkconf
```

Configure slave zones in `/etc/bind/named.conf.local`:

```bash
nano /etc/bind/named.conf.local
```

Add:

```text
zone "2.204.10.in-addr.arpa" {
    type slave;
    masters { 10.204.2.11; };   // ns1
};

zone "a25timfa.it387g.nsa.his.se" {
    type slave;
    masters { 10.204.2.11; };   // ns1
};
```

Save, then:

```bash
systemctl restart named
systemctl status named
journalctl -u named -n 20
```

Look for lines that indicate successful **zone transfer** (AXFR) from `10.204.2.11`.

### 3.8 Configure all machines to use your DNS servers

On **each** VM and on mgmt (if possible), set your DNS servers in `/etc/resolv.conf`.

Example (on any VM):

```bash
nano /etc/resolv.conf
```

Ensure the file contains:

```text
nameserver 10.204.2.11
nameserver 10.204.2.12
```

Save.

> Note: Some systems may regenerate `/etc/resolv.conf`. If that happens, you may have to reapply these settings or properly configure the network layer. For the lab, manual edits are usually acceptable.

### 3.9 DNS testing (important before mail)

From mgmt:

```bash
dig @10.204.2.11 ns1.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se
dig @10.204.2.11 webmail.a25timfa.it387g.nsa.his.se

dig @10.204.2.11 MX a25timfa.it387g.nsa.his.se

dig @10.204.2.11 -x 10.204.2.20
dig @10.204.2.11 -x 10.204.2.21
```

Also test recursive queries, as in the manual:

```bash
dig @10.204.2.12 www.his.se
dig @10.204.2.11 mail.his.se
```

And from NSA primary DNS:

```bash
dig @10.0.252.201 ns2.a25timfa.it387g.nsa.his.se
```

All these must return sensible answers before continuing to the mail server.

---

## 4. Mail Server (Postfix + Dovecot on `mail`)

According to the manual (section 3.3), your mail server must:

- Handle e‑mail **for your own domain** `a25timfa.it387g.nsa.his.se`.
- Provide accounts for employees in **Table 3**:
  - `lism`, `oljo`, `etbr`, `mida`, `lumi`.
- Use **aliases** to map full e‑mail addresses like  
  `olivia.johnson@a25timfa.it387g.nsa.his.se` → `oljo`.
- Not be an **open relay**.
- Provide **IMAP** access (Dovecot) without mandatory SSL/TLS inside the lab.

### 4.1 Install required packages on mail

On mgmt:

```bash
ssh root@10.204.2.20   # mail
apt update
apt upgrade -y
apt install -y postfix dovecot-core dovecot-imapd mailutils
```

During Postfix configuration:

- Choose **“Internet Site”**.
- System mail name: `a25timfa.it387g.nsa.his.se`.

### 4.2 Create UNIX users for employees (Table 3)

Still on `mail`:

```bash
adduser lism
adduser oljo
adduser etbr
adduser mida
adduser lumi
```

For each user:

- Set password: `Syp9393!`.
- Other prompts can be left blank (press `Enter`).

### 4.3 Configure Postfix (`/etc/postfix/main.cf`)

Edit the main configuration:

```bash
nano /etc/postfix/main.cf
```

Ensure or add these lines (adjust existing ones accordingly):

```text
myhostname = mail.a25timfa.it387g.nsa.his.se
mydomain = a25timfa.it387g.nsa.his.se
myorigin = $mydomain
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain

inet_interfaces = all

mynetworks = 127.0.0.0/8, 10.204.2.0/24

home_mailbox = Maildir/
```

Save and exit.

Check and restart Postfix:

```bash
postfix check
systemctl restart postfix
systemctl status postfix
```

### 4.4 Configure aliases (full email → local user)

Use `/etc/aliases` to map full e‑mail addresses to UNIX users:

```bash
nano /etc/aliases
```

Add entries like:

```text
postmaster: root
root: a25timfa

liam.smith: lism
olivia.johnson: oljo
ethan.brown: etbr
mia.davis: mida
lucas.miller: lumi
```

Save, then update alias database:

```bash
newaliases
```

Now e‑mails sent to `olivia.johnson@a25timfa.it387g.nsa.his.se` are delivered to local user `oljo`.

### 4.5 Configure Dovecot for Maildir IMAP

Default Dovecot configs often have the relevant lines commented out or set to other values. **Find and edit** (uncomment or replace) as below.

#### 10-mail.conf (mail storage)

1. Open the file:

   ```bash
   nano /etc/dovecot/conf.d/10-mail.conf
   ```

2. **Find** the line that contains `mail_location` (it may be commented with `#` and may show something like `mbox:~/mail:INBOX=...`).
3. **Uncomment** it if needed and set it to exactly:

   ```text
   mail_location = maildir:~/Maildir
   ```

4. If there is no such line, add it. Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

#### 10-auth.conf (authentication)

1. Open the file:

   ```bash
   nano /etc/dovecot/conf.d/10-auth.conf
   ```

2. **Find** the line for `disable_plaintext_auth` (may be commented). Set it to:

   ```text
   disable_plaintext_auth = no
   ```

   Uncomment if necessary; ensure only one such line exists.

3. **Find** the line for `auth_mechanisms` (may be commented). Set it to:

   ```text
   auth_mechanisms = plain login
   ```

   Uncomment if necessary; ensure only one such line exists.

4. Save and exit.

#### Restart and check Dovecot

```bash
systemctl restart dovecot
systemctl status dovecot
```

### 4.6 Test SMTP and IMAP with telnet

#### 4.6.1 SMTP test (sending mail)

From `mail` or any VM:

```bash
telnet mail.a25timfa.it387g.nsa.his.se 25
```

In the telnet session, type (press `Enter` at the end of each line):

```text
EHLO test
MAIL FROM: oljo@a25timfa.it387g.nsa.his.se
RCPT TO: oljo@a25timfa.it387g.nsa.his.se
DATA
Subject: Test via telnet

This is a test message.
.
QUIT
```

You should see lines indicating the message was accepted for delivery.

#### 4.6.2 IMAP test (reading mail)

```bash
telnet mail.a25timfa.it387g.nsa.his.se 143
```

In the session:

```text
a1 LOGIN oljo Syp9393!
a2 LIST "" "*"
a3 SELECT INBOX
a4 FETCH 1 BODY[]
a5 LOGOUT
```

You should see the body of the test message you just sent.

#### 4.6.3 Open relay test (must **fail** to be correct)

From a suitable machine (or at least as a local logic test):

```bash
telnet mail.a25timfa.it387g.nsa.his.se 25
EHLO test
MAIL FROM: attacker@example.com
RCPT TO: victim@external.com
```

The server should **not** happily accept this for delivery. Use the manual’s reference (Ubuntuwiki SMTP via telnet) to confirm your configuration does not act as an open relay.

---

## 5. Webmail (Roundcube on `webmail`)

According to the manual (section 3.4), you must:

- Install **Roundcube** on a dedicated machine (`webmail`).
- Use **MariaDB** as the database backend.
- Ensure Roundcube connects to:
  - IMAP server: `mail.a25timfa.it387g.nsa.his.se` (port 143).
  - SMTP server: `mail.a25timfa.it387g.nsa.his.se` (port 25).
- Make `http://webmail.a25timfa.it387g.nsa.his.se` lead to the Roundcube interface.

### 5.1 Install MariaDB and Roundcube

On mgmt:

```bash
ssh root@10.204.2.21   # webmail
apt update
apt upgrade -y
apt install -y mariadb-server
apt install -y roundcube roundcube-core roundcube-mysql roundcube-plugins
```

During Roundcube installation:

- Allow `dbconfig-common` to configure the database.
- Use `mysql` (MariaDB) as backend.
- Set a password for the Roundcube DB user (you can choose `Syp9393!` for consistency).

### 5.2 Verify or create Roundcube database and user

Check the database from the MariaDB shell:

```bash
mysql -u root -p
```

In the MariaDB prompt:

```sql
SHOW DATABASES;
SHOW GRANTS FOR 'roundcube'@'localhost';
EXIT;
```

If needed, you can (re)create them manually:

```sql
CREATE DATABASE roundcube CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'roundcube'@'localhost' IDENTIFIED BY 'Syp9393!';
GRANT ALL PRIVILEGES ON roundcube.* TO 'roundcube'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 5.3 Apache virtual host for `webmail.a25timfa.it387g.nsa.his.se`

Create a dedicated site configuration:

```bash
nano /etc/apache2/sites-available/webmail.conf
```

Add:

```text
<VirtualHost *:80>
    ServerName webmail.a25timfa.it387g.nsa.his.se

    DocumentRoot /var/lib/roundcube

    <Directory /var/lib/roundcube>
        Options +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/webmail_error.log
    CustomLog ${APACHE_LOG_DIR}/webmail_access.log combined
</VirtualHost>
```

Save, then enable the site and required modules:

```bash
a2ensite webmail.conf
a2enmod rewrite
systemctl reload apache2
```

### 5.4 Configure Roundcube to use your mail server

Edit the main Roundcube configuration:

```bash
nano /etc/roundcube/config.inc.php
```

Ensure the following settings are present/updated:

```php
$config['default_host'] = 'mail.a25timfa.it387g.nsa.his.se';
$config['default_port'] = 143;

$config['smtp_server'] = 'mail.a25timfa.it387g.nsa.his.se';
$config['smtp_port'] = 25;

$config['db_dsnw'] = 'mysql://roundcube:Syp9393!@localhost/roundcube';
```

Save and restart Apache:

```bash
systemctl restart apache2
systemctl status apache2
```

If there are issues:

- Check Apache logs:

  ```bash
  journalctl -u apache2 -n 50
  tail -50 /var/log/apache2/error.log
  ```

- Check Roundcube logs (see Appendix D of the manual):

  ```bash
  tail -50 /var/log/roundcube/error.log
  ```

### 5.5 Test webmail via browser

On mgmt:

1. Open the web browser.
2. Navigate to:

   ```text
   http://webmail.a25timfa.it387g.nsa.his.se
   ```

3. You should see the **Roundcube login page**.
4. Log in as:
   - Username: `oljo`
   - Password: `Syp9393!`
5. Click **“Compose”** and send a local test mail:
   - To: `oljo@a25timfa.it387g.nsa.his.se`
   - Subject: `Test webmail`
   - Message body: `This is a local webmail test.`
6. Click **“Send”**.
7. Go back to **Inbox** and press **“Refresh”**. You should see the test message.

---

## 6. Final Demonstration Steps (What to Show the Supervisor)

The manual’s demonstration checklist (section 1.2) requires three things. This section turns those into exact actions.

### 6.1 Item 1 – Send email from webmail as `olivia.johnson@...` to `autoreply@nsa.his.se`

1. On mgmt, open the browser and go to:

   ```text
   http://webmail.a25timfa.it387g.nsa.his.se
   ```

2. Log in:
   - Username: `oljo`
   - Password: `Syp9393!`
3. Click **“Compose”**.
4. Fill in:
   - **To**: `autoreply@nsa.his.se`
   - **Subject**: `Lab demonstration`
   - **Message**: e.g. `This is the demonstration email for the Linux Administration lab.`
5. Click **“Send”**.

Your `oljo` user corresponds (via aliases) to `olivia.johnson@a25timfa.it387g.nsa.his.se`, fulfilling the requirement.

### 6.2 Item 2 – Show autoreply with fortune cookie

1. Wait **2–5 minutes**.
2. In Roundcube, click **“Inbox”** and then **“Refresh”**.
3. You should see a new message from `autoreply@nsa.his.se`.
4. Open the message and verify:
   - It contains the **fortune cookie** text.
5. Show this message to your supervisor.

### 6.3 Item 3 – Demonstrate passwordless SSH

On mgmt terminal:

```bash
ssh root@10.204.2.11
hostname
exit

ssh root@10.204.2.12
hostname
exit

ssh root@10.204.2.20
hostname
exit

ssh root@10.204.2.21
hostname
exit
```

While doing this demonstration:

- Point out that you are **not** entering any passwords.
- Show that the `hostname` output matches `ns1`, `ns2`, `mail`, `webmail`.

---

## 7. Screenshots and Evidence for Your Report

To make your report strong and easy to validate, collect the following screenshots:

- **Proxmox / virtualization**:
  - All four VMs running (`ns1`, `ns2`, `mail`, `webmail`).
- **DNS**:
  - Terminal windows showing successful `dig` results for:
    - A records (`ns1`, `mail`, `webmail`).
    - MX record for `a25timfa.it387g.nsa.his.se`.
    - PTR records for `10.204.2.20` and `10.204.2.21`.
- **Mail**:
  - Telnet sessions showing SMTP and IMAP tests.
  - Optionally, local CLI mail checks (`mail` command).
- **Webmail**:
  - Login screen for `http://webmail.a25timfa.it387g.nsa.his.se`.
  - Inbox showing received test mail.
  - The demonstration email to `autoreply@nsa.his.se`.
  - The autoreply email with the fortune cookie.
- **SSH**:
  - Terminal showing passwordless `ssh root@10.204.2.11` etc. and `hostname`.

Organize them into folders on mgmt, for example:

- `screenshots/dns/`
- `screenshots/mail/`
- `screenshots/webmail/`
- `screenshots/ssh/`

You can then insert them into your report where appropriate.

---

## 8. Report Checklist (Mapped to the Manual)

The manual (section 1.3) specifies what your report must contain. Use this section as a checklist.

### 8.1 Content requirements

Your report must **explain processes and concepts**, not just list configuration files. It must cover:

- **DNS records**:
  - A, NS, MX, PTR records.
  - Use your real examples from:
    - `/etc/bind/db.a25timfa`
    - `/etc/bind/db.10`
- **Protocols**:
  - **SMTP** – how mail is sent, role of Postfix, port 25, relationship to MX records.
  - **IMAP** – how mail is retrieved by clients from Dovecot, port 143.
  - **SSH** – key‑based authentication from mgmt to servers.
  - **HTTP** – how the browser fetches Roundcube via Apache.
- **Concepts**:
  - **Mailbox** – where messages are stored (Maildir under each user’s home).
  - **User** – UNIX user accounts (`lism`, `oljo`, etc.) and how they map to email identities.
  - **Aliases** – how full addresses like `olivia.johnson@...` map to `oljo` using `/etc/aliases`.

You should describe, in words:

- How an email travels from webmail as `olivia.johnson@a25timfa.it387g.nsa.his.se`
  to `autoreply@nsa.his.se`, and how the reply returns.
- How DNS, SMTP, IMAP, and HTTP cooperate in that process.

### 8.2 Formal requirements

Follow these formatting rules from the manual:

- **Single PDF**:
  - File name must be `a25timfa.pdf`.
- **Title page**:
  - Full legal name.
  - Student login (`a25timfa`).
  - Course name: “Linux Administration – IT387G”.
  - Submission date.
- **Layout**:
  - A4 paper size.
  - Black text on white background (use colour only where necessary).
  - Body text font size: 11 ± 1 pt.
  - Code/config output: monospaced font.
  - Page numbers in the footer; page 1 starts from the **introduction** page (not the title page).
  - Numbered sections and subsections, plus a **table of contents**.
- **Appendices**:
  - Put long configuration files in appendices, in monospaced text, **not** screenshots.
  - For example:
    - Appendix A: DNS configuration (`named.conf.options`, `named.conf.local`, `db.a25timfa`, `db.10`).
    - Appendix B: Postfix and Dovecot configs.
    - Appendix C: Apache and Roundcube configs.
    - Appendix D: Your public SSH key.
- **References**:
  - Use APA or Harvard style.
  - Include at least:
    - RFC 1035 (DNS).
    - RFC 3521 (SMTP).
    - RFC 4253 (SSH).
    - RFC 9051 (IMAP).
    - Other references you actually used (ZyTrax DNS book, Ubuntuwiki telnet test, etc.).

### 8.3 Final pre‑submission checklist

Before submitting:

- **Technical**:
  - [ ] DNS: A, MX, PTR, and NS records work and match your description.
  - [ ] Mail: You can send and receive mail locally and to `autoreply@nsa.his.se`.
  - [ ] Webmail: Roundcube works at `http://webmail.a25timfa.it387g.nsa.his.se`.
  - [ ] SSH: Passwordless access as root from mgmt to all servers.
- **Report**:
  - [ ] Title page present and correct.
  - [ ] Table of contents generated and accurate.
  - [ ] Sections clearly explain DNS, mail, webmail, SSH, and full email flow.
  - [ ] Public SSH key included in an appendix.
  - [ ] Configuration files included in appendices (text, not screenshots).
  - [ ] References properly cited (APA or Harvard).
  - [ ] File exported as `a25timfa.pdf`.

If all of these are satisfied, you should be fully prepared to **demonstrate** and **submit** your lab. 

Good luck – and remember that supervisors expect you to use logs (`journalctl`, `/var/log/apache2`, `/var/log/roundcube`) and documentation to troubleshoot before asking for help. 

