# DNS Setup

## Overview

Configure Bind9 DNS servers with master (ns1) and slave (ns2) configuration for your domain `[login].it387g.nsa.his.se`.

## Prerequisites

- Both ns1 and ns2 VMs created and networked
- IP addresses configured:
  - ns1: `10.[room].[group].11`
  - ns2: `10.[room].[group].12`

## Installation

### Step 1: Install Bind9 on ns1

1. **SSH to ns1:**
   ```bash
   ssh username@10.[room].[group].11
   ```

2. **Update package list:**
   ```bash
   sudo apt update
   ```
   - Wait for update to complete

3. **Install Bind9:**
   ```bash
   sudo apt install bind9 -y
   ```
   - The `-y` flag automatically confirms installation
   - Wait for installation to complete (may take 1-2 minutes)

4. **Verify installation:**
   ```bash
   which named
   systemctl status bind9
   ```
   - Should show path to `named` (Bind9 daemon)
   - Service should show as "active (running)" or "inactive"
   - **📸 Screenshot Point:** Take screenshot showing Bind9 service status

### Step 2: Install Bind9 on ns2

1. **SSH to ns2:**
   ```bash
   ssh username@10.[room].[group].12
   ```

2. **Repeat installation steps:**
   ```bash
   sudo apt update
   sudo apt install bind9 -y
   ```

3. **Verify installation:**
   ```bash
   systemctl status bind9
   ```

## Master Server (ns1) Configuration

### Step 1: Backup Original Configuration

1. **SSH to ns1:**
   ```bash
   ssh username@10.[room].[group].11
   ```

2. **Backup original file:**
   ```bash
   sudo cp /etc/bind/named.conf.options /etc/bind/named.conf.options.orig
   ```
   - This creates a backup in case you need to revert

3. **Verify backup created:**
   ```bash
   ls -l /etc/bind/named.conf.options*
   ```
   - Should show both original and backup files

### Step 2: Edit named.conf.options

1. **Open file for editing:**
   ```bash
   sudo nano /etc/bind/named.conf.options
   ```

2. **Replace entire contents with (replace [room] and [group]):**
   ```bash
   options {
       directory "/var/cache/bind";
       
       // Recursive questions get sent to NSA nameservers
       forwarders {
           10.0.252.201;
           10.0.252.202;
       };
       
       dnssec-validation auto;
       auth-nxdomain no;  // conform to RFC1035
       listen-on-v6 { any; };
       allow-query { any; };
       allow-recursion { 127/8; 10.[room].[group].0/24; };
   };
   ```

3. **Save and exit:**
   - Press `Ctrl+O` to save
   - Press `Enter` to confirm filename
   - Press `Ctrl+X` to exit

4. **Verify file was saved correctly:**
   ```bash
   cat /etc/bind/named.conf.options
   ```
   - **📸 Screenshot Point:** Take screenshot of the configuration file content

### Step 3: Edit named.conf.local

1. **Backup original file:**
   ```bash
   sudo cp /etc/bind/named.conf.local /etc/bind/named.conf.local.orig
   ```

2. **Open file for editing:**
   ```bash
   sudo nano /etc/bind/named.conf.local
   ```

3. **Add forward zone configuration (replace [login], [room], [group]):**
   ```bash
   zone "[login].it387g.nsa.his.se" {
       type master;
       file "/etc/bind/db.[login]";
       allow-transfer { 10.[room].[group].12; };
   };
   ```

4. **Add reverse zone configuration:**
   ```bash
   zone "[group].[room].10.in-addr.arpa" {
       type master;
       file "/etc/bind/db.10";
       allow-transfer { 10.[room].[group].12; };
   };
   ```

5. **Complete file should look like:**
   ```bash
   //
   // Do any local configuration here
   //
   
   zone "[login].it387g.nsa.his.se" {
       type master;
       file "/etc/bind/db.[login]";
       allow-transfer { 10.[room].[group].12; };
   };
   
   zone "[group].[room].10.in-addr.arpa" {
       type master;
       file "/etc/bind/db.10";
       allow-transfer { 10.[room].[group].12; };
   };
   ```

6. **Save and exit:**
   - Press `Ctrl+O`, `Enter`, `Ctrl+X`

7. **Verify configuration:**
   ```bash
   cat /etc/bind/named.conf.local
   ```
   - **📸 Screenshot Point:** Take screenshot of named.conf.local showing both zones

### Step 4: Create Forward Zone File (db.[login])

1. **Create the zone file:**
   ```bash
   sudo nano /etc/bind/db.[login]
   ```
   - Replace `[login]` with your actual login (e.g., `db.a24login`)

2. **Enter the following content (replace ALL placeholders):**
   ```bash
   $TTL 300
   $ORIGIN [login].it387g.nsa.his.se.
   @   IN  SOA ns1 root.[login].it387g.nsa.his.se. (
       2025121301  ; Serial - increment this when you make changes
       30m         ; Refresh - how often slave checks for updates
       3m          ; Retry - retry interval if refresh fails
       2w          ; Expire - how long slave serves stale data
       1h          ; Negative Cache TTL
       )
       IN  NS  ns1
       IN  NS  ns2
       IN  MX  10  mail

   ; A records - replace [room] and [group] with your values
   ns1     IN  A   10.[room].[group].11
   ns2     IN  A   10.[room].[group].12
   mail    IN  A   10.[room].[group].13
   webmail IN  A   10.[room].[group].14
   mgmt    IN  A   10.[room].[group].22
   ```

3. **Important - Replace placeholders:**
   - `[login]` → Your university login (e.g., `a24login`)
   - `[room]` → Your room number (e.g., `209`)
   - `[group]` → Your group number (e.g., `30`)

4. **Example for login=a24login, room=209, group=30:**
   ```bash
   $TTL 300
   $ORIGIN a24login.it387g.nsa.his.se.
   @   IN  SOA ns1 root.a24login.it387g.nsa.his.se. (
       2025121301
       30m
       3m
       2w
       1h
       )
       IN  NS  ns1
       IN  NS  ns2
       IN  MX  10  mail

   ns1     IN  A   10.209.30.11
   ns2     IN  A   10.209.30.12
   mail    IN  A   10.209.30.13
   webmail IN  A   10.209.30.14
   mgmt    IN  A   10.209.30.22
   ```

5. **Save and exit:**
   - Press `Ctrl+O`, `Enter`, `Ctrl+X`

6. **Verify file was created:**
   ```bash
   ls -l /etc/bind/db.[login]
   cat /etc/bind/db.[login]
   ```
   - **📸 Screenshot Point:** Take screenshot of the zone file showing all A records and MX record

### Step 5: Create Reverse Zone File (db.10)

1. **Create the reverse zone file:**
   ```bash
   sudo nano /etc/bind/db.10
   ```

2. **Enter the following content (replace ALL placeholders):**
   ```bash
   $TTL 300
   @   IN  SOA ns1 root.[login].it387g.nsa.his.se. (
       2025121201  ; Serial - increment when making changes
       30m         ; Refresh
       3m          ; Retry
       2w          ; Expire
       1h          ; Negative Cache TTL
       )
       IN  NS  ns1.[login].it387g.nsa.his.se.
       IN  NS  ns2.[login].it387g.nsa.his.se.

   ; PTR records - reverse mapping IP to hostname
   ; Replace [login], [room], [group] with your values
   11  IN  PTR ns1.[login].it387g.nsa.his.se.
   12  IN  PTR ns2.[login].it387g.nsa.his.se.
   13  IN  PTR mail.[login].it387g.nsa.his.se.
   14  IN  PTR webmail.[login].it387g.nsa.his.se.
   22  IN  PTR mgmt.[login].it387g.nsa.his.se.
   ```

3. **Important - Replace placeholders:**
   - `[login]` → Your university login
   - Note: The numbers (11, 12, 13, 14, 22) are the last octet of your IP addresses

4. **Example for login=a24login:**
   ```bash
   $TTL 300
   @   IN  SOA ns1 root.a24login.it387g.nsa.his.se. (
       2025121201
       30m
       3m
       2w
       1h
       )
       IN  NS  ns1.a24login.it387g.nsa.his.se.
       IN  NS  ns2.a24login.it387g.nsa.his.se.

   11  IN  PTR ns1.a24login.it387g.nsa.his.se.
   12  IN  PTR ns2.a24login.it387g.nsa.his.se.
   13  IN  PTR mail.a24login.it387g.nsa.his.se.
   14  IN  PTR webmail.a24login.it387g.nsa.his.se.
   22  IN  PTR mgmt.a24login.it387g.nsa.his.se.
   ```

5. **Save and exit:**
   - Press `Ctrl+O`, `Enter`, `Ctrl+X`

6. **Verify file:**
   ```bash
   cat /etc/bind/db.10
   ```
   - **📸 Screenshot Point:** Take screenshot of reverse zone file showing all PTR records

## Slave Server (ns2) Configuration

### /etc/bind/named.conf.local

Edit the local configuration:

```bash
sudo nano /etc/bind/named.conf.local
```

**Forward Zone:**
```bash
zone "[login].it387g.nsa.his.se" {
    type slave;
    masters { 10.[room].[group].11; };
    file "/var/cache/bind/db.[login]";
};
```

**Reverse Zone:**
```bash
zone "[group].[room].10.in-addr.arpa" {
    type slave;
    masters { 10.[room].[group].11; };
    file "/var/cache/bind/db.10";
};
```

## Testing Configuration

### Step 6: Check Configuration Syntax

1. **Check main configuration files:**
   ```bash
   sudo named-checkconf
   ```
   - Should return with no output (means no errors)
   - If errors appear, fix them before proceeding

2. **Check forward zone file:**
   ```bash
   sudo named-checkzone [login].it387g.nsa.his.se /etc/bind/db.[login]
   ```
   - Replace `[login]` with your actual login
   - Should show "OK" at the end
   - **📸 Screenshot Point:** Take screenshot showing zone check passed

3. **Check reverse zone file:**
   ```bash
   sudo named-checkzone [group].[room].10.in-addr.arpa /etc/bind/db.10
   ```
   - Replace `[group]` and `[room]` with your values
   - Should show "OK" at the end
   - **📸 Screenshot Point:** Take screenshot showing reverse zone check passed

### Step 7: Restart Bind9 Service

1. **Restart the service:**
   ```bash
   sudo systemctl restart bind9
   ```

2. **Check service status:**
   ```bash
   sudo systemctl status bind9
   ```
   - Should show "active (running)" in green
   - If shows errors, check logs (next step)
   - **📸 Screenshot Point:** Take screenshot showing Bind9 service is active and running

3. **Enable service to start on boot:**
   ```bash
   sudo systemctl enable bind9
   ```

### Step 8: Check Logs for Errors

1. **View recent logs:**
   ```bash
   sudo journalctl -u bind9 -n 20
   ```
   - Shows last 20 log entries
   - Look for any ERROR or WARNING messages

2. **Check for errors specifically:**
   ```bash
   sudo journalctl -u bind9 | grep -i error
   ```
   - Should return nothing if no errors
   - If errors found, read them carefully and fix configuration

3. **Follow logs in real-time (optional):**
   ```bash
   sudo journalctl -u bind9 -f
   ```
   - Press `Ctrl+C` to exit
   - **📸 Screenshot Point:** Take screenshot of logs showing successful zone loading (if no errors)

## Testing DNS

### Step 9: Test DNS from ns1 (Localhost)

1. **Test forward lookup for ns1:**
   ```bash
   dig @localhost ns1.[login].it387g.nsa.his.se
   ```
   - Should show "ANSWER SECTION" with IP address
   - **📸 Screenshot Point:** Take screenshot of dig output showing successful forward lookup

2. **Test forward lookup for mail:**
   ```bash
   dig @localhost mail.[login].it387g.nsa.his.se
   ```
   - Should show mail server IP

3. **Test reverse lookup:**
   ```bash
   dig @localhost -x 10.[room].[group].11
   ```
   - Should show PTR record pointing to ns1 hostname
   - **📸 Screenshot Point:** Take screenshot showing successful reverse lookup

4. **Test MX record:**
   ```bash
   dig @localhost MX [login].it387g.nsa.his.se
   ```
   - Should show MX record pointing to mail server
   - **📸 Screenshot Point:** Take screenshot showing MX record resolution

### Step 10: Test DNS from Other Machines

**From management machine or any other VM:**

1. **Update /etc/resolv.conf:**
   ```bash
   sudo nano /etc/resolv.conf
   ```
   - Add these lines (replace [room] and [group]):
   ```bash
   nameserver 10.[room].[group].11
   nameserver 10.[room].[group].12
   ```

2. **Test forward lookup:**
   ```bash
   dig ns1.[login].it387g.nsa.his.se
   host mail.[login].it387g.nsa.his.se
   ```
   - Both should resolve correctly

3. **Test reverse lookup:**
   ```bash
   dig -x 10.[room].[group].13
   host 10.[room].[group].13
   ```
   - Should show mail server hostname

4. **Test MX record:**
   ```bash
   dig MX [login].it387g.nsa.his.se
   ```
   - **📸 Screenshot Point:** Take screenshot showing MX record from external machine

### Update /etc/resolv.conf

On all machines (except DNS servers initially):

```bash
sudo nano /etc/resolv.conf
```

```bash
nameserver 10.[room].[group].11
nameserver 10.[room].[group].12
```

## Zone Transfer Testing

### From ns2

```bash
# Test zone transfer
dig @10.[room].[group].11 AXFR [login].it387g.nsa.his.se
```

## Common Issues

### Zone Not Loading

1. Check zone file syntax: `named-checkzone`
2. Check file permissions
3. Check logs: `journalctl -u bind9`
4. Verify zone file path in `named.conf.local`

### Zone Transfer Fails

1. Check `allow-transfer` on master
2. Verify slave can reach master
3. Check firewall allows port 53
4. Verify master IP in slave configuration

### DNS Not Resolving

1. Check DNS servers are running
2. Verify `/etc/resolv.conf`
3. Test with `dig @server domain`
4. Check firewall rules

## Next Steps

Once DNS is working:

1. Verify all machines can resolve DNS
2. Proceed to [Mail Server Setup](mail-setup.md)
3. Make sure MX record is correct before setting up mail

---

**Remember**: DNS must be working before setting up mail server!
