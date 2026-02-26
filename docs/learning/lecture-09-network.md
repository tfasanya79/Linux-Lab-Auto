# Lecture 9: Network Configuration

Practice questions for the **Network Configuration** lecture. For full notes, see the [Study Guide: Network Configuration](../study-guide/network.md).

<details>
<summary>Key points for exam</summary>

- Static vs DHCP: static = predictable (servers); DHCP = central management (workstations)
- nsswitch.conf: hosts: files dns (order of resolution); /etc/hosts, /etc/resolv.conf (nameserver)
- ip addr, ip route, ip link; ss -tuln (listening ports); ping, traceroute, dig, nslookup
- Debian: /etc/network/interfaces (static/dhcp); NetworkManager: nmcli
- ufw: allow/deny ports; iptables (lower-level)

</details>

---

<div class="learning-question" data-correct="1" data-explanation="DHCP (Dynamic Host Configuration Protocol) assigns IP addresses from a central server. Workstations typically use DHCP; fundamental servers like DNS often use static IPs for predictability.">
  <p><strong>Q1.</strong> What is a typical use for DHCP?</p>
  <label><input type="radio" name="l9q1" value="0"> Assigning static IPs to DNS servers</label><br>
  <label><input type="radio" name="l9q1" value="1"> Assigning IP addresses to workstations from a central server</label><br>
  <label><input type="radio" name="l9q1" value="2"> Configuring firewall rules</label><br>
  <label><input type="radio" name="l9q1" value="3"> Resolving hostnames to IPs</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Name resolution order is configured in /etc/nsswitch.conf. The hosts: line (e.g. 'hosts: files dns') defines whether to check /etc/hosts first, then DNS, etc.">
  <p><strong>Q2.</strong> Which file controls the order of hostname resolution (e.g. files vs DNS)?</p>
  <label><input type="radio" name="l9q2" value="0"> /etc/nsswitch.conf</label><br>
  <label><input type="radio" name="l9q2" value="1"> /etc/resolv.conf</label><br>
  <label><input type="radio" name="l9q2" value="2"> /etc/hosts</label><br>
  <label><input type="radio" name="l9q2" value="3"> /etc/network/interfaces</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="DNS server addresses are configured in /etc/resolv.conf with lines like 'nameserver 8.8.8.8'. This is used when resolution goes to the 'dns' service in nsswitch.">
  <p><strong>Q3.</strong> Where are DNS server (nameserver) addresses configured?</p>
  <label><input type="radio" name="l9q3" value="0"> /etc/nsswitch.conf</label><br>
  <label><input type="radio" name="l9q3" value="1"> /etc/hosts</label><br>
  <label><input type="radio" name="l9q3" value="2"> /etc/resolv.conf</label><br>
  <label><input type="radio" name="l9q3" value="3"> /etc/network/interfaces</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="The ip command is the modern way to manage interfaces: ip addr show, ip addr add, ip route add default via, etc. ifconfig is deprecated but still found on some systems.">
  <p><strong>Q4.</strong> Which command is the modern way to show or configure IP addresses on Linux?</p>
  <label><input type="radio" name="l9q4" value="0"> ifconfig only</label><br>
  <label><input type="radio" name="l9q4" value="1"> netstat</label><br>
  <label><input type="radio" name="l9q4" value="2"> route</label><br>
  <label><input type="radio" name="l9q4" value="3"> ip (e.g. ip addr show)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="dig performs DNS lookups (A, MX, PTR, etc.) and shows the response. Useful for testing DNS. nslookup and host also do lookups; ping tests connectivity, not DNS resolution details.">
  <p><strong>Q5.</strong> What is the 'dig' command used for?</p>
  <label><input type="radio" name="l9q5" value="0"> DNS lookups (e.g. A, MX, PTR records)</label><br>
  <label><input type="radio" name="l9q5" value="1"> Testing network latency only</label><br>
  <label><input type="radio" name="l9q5" value="2"> Configuring the default gateway</label><br>
  <label><input type="radio" name="l9q5" value="3"> Showing listening ports</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="Static configuration gives predictable IPs and no dependency on another server, which is important for core infrastructure like DNS servers. DHCP is better for workstations.">
  <p><strong>Q6.</strong> Why might a DNS server use a static IP instead of DHCP?</p>
  <label><input type="radio" name="l9q6" value="0"> DHCP is more secure</label><br>
  <label><input type="radio" name="l9q6" value="1"> Predictable address and no dependency on another service</label><br>
  <label><input type="radio" name="l9q6" value="2"> Static IPs are not allowed for servers</label><br>
  <label><input type="radio" name="l9q6" value="3"> DNS only works with static IPs</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="ss is the modern replacement for netstat. Use ss -tuln for listening TCP/UDP ports, ss -tun for connections. Same info, better performance.">
  <p><strong>Q7.</strong> Which command shows listening TCP and UDP ports (modern replacement for netstat)?</p>
  <label><input type="radio" name="l9q7" value="0"> ip link</label><br>
  <label><input type="radio" name="l9q7" value="1"> dig</label><br>
  <label><input type="radio" name="l9q7" value="2"> ss -tuln</label><br>
  <label><input type="radio" name="l9q7" value="3"> ping</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="On Debian, traditional static/DHCP config is in /etc/network/interfaces (auto iface, address, netmask, gateway, dns-nameservers). Other systems may use NetworkManager or systemd-networkd.">
  <p><strong>Q8.</strong> On Debian, where is traditional static/DHCP interface configuration stored?</p>
  <label><input type="radio" name="l9q8" value="0"> /etc/network/interfaces</label><br>
  <label><input type="radio" name="l9q8" value="1"> /etc/resolv.conf</label><br>
  <label><input type="radio" name="l9q8" value="2"> /etc/hosts</label><br>
  <label><input type="radio" name="l9q8" value="3"> /etc/ip.conf</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="The hosts: line in /etc/nsswitch.conf (e.g. 'hosts: files dns') defines resolution order: 'files' checks /etc/hosts first, then 'dns' uses resolv.conf. Other options: cached, mdns.">
  <p><strong>Q9.</strong> What does 'hosts: files dns' in /etc/nsswitch.conf mean?</p>
  <label><input type="radio" name="l9q9" value="0"> Only DNS is used</label><br>
  <label><input type="radio" name="l9q9" value="1"> Resolve hostnames from /etc/hosts first, then DNS</label><br>
  <label><input type="radio" name="l9q9" value="2"> Only /etc/hosts is used</label><br>
  <label><input type="radio" name="l9q9" value="3"> DNS is disabled</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man ip`, `man ss`, `man 5 nsswitch.conf`, `man 8 ufw` — ip/ss syntax, resolution order, firewall.
- **Arch Wiki – [Network configuration](https://wiki.archlinux.org/title/Network_configuration):** Static, DHCP, tools; distribution-agnostic.
- **Debian:** [Debian Administrator's Handbook – Network](https://debian-handbook.info/browse/stable/sect.network.html) — interfaces, DNS.
