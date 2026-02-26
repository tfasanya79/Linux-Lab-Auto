# Network Configuration

## Overview

Network configuration is essential for Linux system administration. Understanding IP addressing, DNS, and network tools is crucial.

## Network Configuration Components

### What Needs to be Configured?

- **IP address** plus subnet mask
- **Gateway** (default route)
- **DNS server(s)** to use
- Optionally, **static routes**
- **Domain** and/or **hostname**
- **Time server** (NTP)

## Static vs DHCP

### Static Configuration

**Advantages:**
- Network configuration set on each machine individually
- No central infrastructure necessary
- Predictable IP addresses

**Disadvantages:**
- Lack of central control or management
- Changes require visiting every machine
- More administrative overhead

**Use Cases:**
- Fundamental servers that may not depend on anything else
- Example: Nameserver (DNS server)

### Dynamic Configuration (DHCP)

**Advantages:**
- Central management and control
- No per-machine configuration necessary
- Easy to change network settings

**Disadvantages:**
- Dependency on central service creates single-point-of-failure
- IP addresses may change

**Use Cases:**
- Virtually all workstations use this protocol
- Non-fundamental servers (with MAC address mapping)

### DHCP (Dynamic Host Configuration Protocol)

**How it works:**
- Network protocol, uses UDP/IP, ports 67 and 68
- Client requests IP address from server
- Server assigns from pool or based on MAC address table

**Security:**
- No security in DHCP itself
- Use other protocols such as IEEE 802.1x for security

## Domain Name Resolution

### Name Service Switch (NSS)

All name resolution is coordinated via **Name Service Switch (NSS)**.

**Configuration:** `/etc/nsswitch.conf`

Look for line starting with `hosts:`:
```
hosts: files dns
```

### Resolution Services

**files** - Looks for mapping in `/etc/hosts`
```
127.0.0.1 localhost hs-q-693 hs-q-693.example.com
```

**dns** - DNS query using nameserver from `/etc/resolv.conf`
```
nameserver 193.10.178.157
nameserver 193.10.178.158
```

**Other services:**
- Cached DNS
- Multicast DNS (mDNS)
- Windows Internet Name Service
- Locally running virtual machines

## Network Configuration Methods

### systemd-networkd

**Configuration files:** `/etc/systemd/network/`

**Example:**
```ini
[Match]
Name=eth0

[Network]
Address=192.168.1.10/24
Gateway=192.168.1.1
DNS=8.8.8.8
```

### NetworkManager

**Command-line:**
```bash
# View connections
nmcli connection show

# Add connection
nmcli connection add type ethernet con-name myconnection ifname eth0

# Configure IP
nmcli connection modify myconnection ipv4.addresses 192.168.1.10/24
nmcli connection modify myconnection ipv4.gateway 192.168.1.1
nmcli connection modify myconnection ipv4.dns "8.8.8.8 8.8.4.4"
nmcli connection modify myconnection ipv4.method manual

# Activate connection
nmcli connection up myconnection
```

### Debian Network Configuration

**File:** `/etc/network/interfaces`

```bash
# Static configuration
auto eth0
iface eth0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4

# DHCP configuration
auto eth0
iface eth0 inet dhcp
```

**Apply changes:**
```bash
sudo systemctl restart networking
# or
sudo ifdown eth0 && sudo ifup eth0
```

### Command Line Configuration

```bash
# Configure IP address
sudo ip addr add 192.168.1.10/24 dev eth0

# Configure gateway
sudo ip route add default via 192.168.1.1

# Configure DNS
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
```

## Network Tools

### ip Command

```bash
# Show interfaces
ip addr show
ip a

# Show routes
ip route show
ip r

# Add IP address
sudo ip addr add 192.168.1.10/24 dev eth0

# Remove IP address
sudo ip addr del 192.168.1.10/24 dev eth0

# Show link status
ip link show
```

### ifconfig (deprecated but still used)

```bash
# Show interfaces
ifconfig

# Configure IP
sudo ifconfig eth0 192.168.1.10 netmask 255.255.255.0

# Bring interface up/down
sudo ifconfig eth0 up
sudo ifconfig eth0 down
```

### route Command

```bash
# Show routes
route -n

# Add default route
sudo route add default gw 192.168.1.1

# Add specific route
sudo route add -net 10.0.0.0/8 gw 192.168.1.1
```

## Testing Network Connectivity

### ping

```bash
# Ping host
ping google.com
ping 8.8.8.8

# Ping with count
ping -c 4 google.com

# Ping with interval
ping -i 2 google.com
```

### traceroute

```bash
# Trace route
traceroute google.com

# Alternative
tracepath google.com
```

### netstat

```bash
# Show listening ports
netstat -tuln

# Show connections
netstat -tun

# Show routing table
netstat -rn
```

### ss (modern netstat)

```bash
# Show listening ports
ss -tuln

# Show connections
ss -tun

# Show processes
ss -tunp
```

### dig

```bash
# DNS lookup
dig google.com

# Specific nameserver
dig @8.8.8.8 google.com

# Reverse lookup
dig -x 8.8.8.8
```

### nslookup

```bash
# DNS lookup
nslookup google.com

# Interactive mode
nslookup
> google.com
> exit
```

### host

```bash
# DNS lookup
host google.com

# Reverse lookup
host 8.8.8.8
```

## Firewall Configuration

### ufw (Uncomplicated Firewall)

```bash
# Enable firewall
sudo ufw enable

# Allow port
sudo ufw allow 22/tcp

# Deny port
sudo ufw deny 80/tcp

# Show status
sudo ufw status

# Show numbered rules
sudo ufw status numbered

# Delete rule
sudo ufw delete 1
```

### iptables

```bash
# Show rules
sudo iptables -L

# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Block IP
sudo iptables -A INPUT -s 192.168.1.100 -j DROP
```

## Network Troubleshooting

### Check Interface Status

```bash
# Show interfaces
ip link show

# Show IP addresses
ip addr show

# Show routes
ip route show
```

### Test Connectivity

```bash
# Ping gateway
ping 192.168.1.1

# Ping DNS server
ping 8.8.8.8

# Ping external host
ping google.com
```

### Check DNS

```bash
# Test DNS resolution
dig google.com
nslookup google.com

# Check resolv.conf
cat /etc/resolv.conf
```

### View Network Statistics

```bash
# Interface statistics
ip -s link show eth0

# Network connections
ss -s
```

## Best Practices

1. **Use static IPs for servers** - Predictable addressing
2. **Use DHCP for workstations** - Easier management
3. **Document network configuration** - Keep records
4. **Test connectivity** - Verify after changes
5. **Use firewall** - Secure your system
6. **Monitor network** - Watch for issues

## Common Commands Summary

```bash
# Configuration
ip addr add 192.168.1.10/24 dev eth0
ip route add default via 192.168.1.1

# Testing
ping google.com
traceroute google.com
dig google.com

# Information
ip addr show
ip route show
ss -tuln
```

## Next Steps

- Learn about [Mail Servers](mail.md)
- Understand [DNS Setup](../lab-assignment/dns-setup.md)
- Study [Troubleshooting](troubleshooting.md)

---

**Remember**: Always test network connectivity after making changes!
