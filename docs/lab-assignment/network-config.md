# Network Configuration

## Overview

Configure network settings for all virtual machines according to the IP addressing scheme.

## IP Addressing Scheme

Your network uses: `10.[room].[group].X`

**Machine IPs:**
- ns1: `10.[room].[group].11`
- ns2: `10.[room].[group].12`
- mail: `10.[room].[group].13`
- webmail: `10.[room].[group].14`
- mgmt: `10.[room].[group].22`

**Network Configuration:**
- Netmask: `255.255.255.0` (or `/24`)
- Gateway: `10.[room].[group].1` (or as instructed)
- Network: `10.[room].[group].0/24`

## Debian Network Configuration

### Method 1: /etc/network/interfaces

Edit `/etc/network/interfaces` on each VM:

```bash
sudo nano /etc/network/interfaces
```

**Static Configuration:**
```bash
# Loopback
auto lo
iface lo inet loopback

# Primary network interface
auto eth0
iface eth0 inet static
    address 10.[room].[group].X
    netmask 255.255.255.0
    gateway 10.[room].[group].1
    # DNS will be configured after DNS setup
```

**Apply Changes:**
```bash
sudo systemctl restart networking
# or
sudo ifdown eth0 && sudo ifup eth0
```

### Method 2: systemd-networkd

Create `/etc/systemd/network/eth0.network`:

```ini
[Match]
Name=eth0

[Network]
Address=10.[room].[group].X/24
Gateway=10.[room].[group].1
DNS=10.[room].[group].11
DNS=10.[room].[group].12
```

**Apply:**
```bash
sudo systemctl restart systemd-networkd
```

## Hostname Configuration

### Set Hostname

```bash
# Set hostname
sudo hostnamectl set-hostname hostname

# Verify
hostname
hostnamectl
```

### /etc/hosts

Edit `/etc/hosts` on each machine:

```bash
sudo nano /etc/hosts
```

**Add entries:**
```bash
127.0.0.1       localhost
10.[room].[group].11  ns1.[login].it387g.nsa.his.se  ns1
10.[room].[group].12  ns2.[login].it387g.nsa.his.se  ns2
10.[room].[group].13  mail.[login].it387g.nsa.his.se  mail
10.[room].[group].14  webmail.[login].it387g.nsa.his.se  webmail
10.[room].[group].22  mgmt.[login].it387g.nsa.his.se  mgmt
```

## DNS Configuration (After DNS Setup)

### /etc/resolv.conf

**On DNS servers (ns1, ns2):**
```bash
nameserver 127.0.0.1
nameserver 10.[room].[group].12  # ns2 on ns1, ns1 on ns2
```

**On other machines:**
```bash
nameserver 10.[room].[group].11
nameserver 10.[room].[group].12
```

**Note:** After DNS is set up, all Debian machines should use both DNS servers.

## Verification

### Check IP Configuration

```bash
# Show IP address
ip addr show
ifconfig

# Show routes
ip route show

# Test connectivity
ping 10.[room].[group].1  # Gateway
ping 10.[room].[group].11  # ns1
ping 10.[room].[group].12  # ns2
```

### Test DNS (After DNS Setup)

```bash
# Test forward lookup
host ns1.[login].it387g.nsa.his.se
dig ns1.[login].it387g.nsa.his.se

# Test reverse lookup
host 10.[room].[group].11
dig -x 10.[room].[group].11
```

## Troubleshooting

### Network Interface Not Up

```bash
# Check interface status
ip link show

# Bring interface up
sudo ip link set eth0 up

# Check for errors
dmesg | grep -i eth0
journalctl -k | grep -i eth0
```

### Cannot Reach Gateway

1. Check gateway IP is correct
2. Verify network configuration
3. Check firewall rules
4. Verify VM network settings in Proxmox

### DNS Not Working

1. Verify DNS servers are running
2. Check `/etc/resolv.conf`
3. Test DNS servers directly: `dig @10.[room].[group].11 domain.com`
4. Check firewall allows DNS (port 53)

## Next Steps

Once network is configured:

1. Proceed to [DNS Setup](dns-setup.md)
2. Configure DNS servers first
3. Then configure DNS on all other machines

---

**Remember**: Verify network connectivity before proceeding to DNS setup!
