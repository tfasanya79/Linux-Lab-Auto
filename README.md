# Linux-Lab-Auto

Automation for the Linux Administration (IT387G) lab assignment at University of Skövde, aligned with **student-manual-2026v1.0.pdf**. Configures DNS (Bind9 master/slave), mail (Postfix + Dovecot), webmail (Roundcube), and passwordless SSH from the management host to all servers.

**Assignment:** a25timfa, Room 204, Group 2  
**Domain:** a25timfa.it387g.nsa.his.se  
**IP range:** 10.204.2.0/24  
**IPs (Table 1):** ns1=11, ns2=12, mail=**20**, webmail=**21**, mgmt=22

## Requirements

- Ansible 2.14+
- Target: 5 Debian VMs (ns1, ns2, mail, webmail, mgmt) with SSH access as `a25timfa` (or user set in `vars.yaml`)

## Documentation

- **[STEP-BY-STEP-GUIDE.md](STEP-BY-STEP-GUIDE.md)** - Complete beginner-friendly guide from lab setup to report submission
- **README.md** (this file) - Quick reference for automation usage
- **student-manual-2026v1.0.pdf** - Official assignment manual

## Quick start

**New to the lab?** Start with [STEP-BY-STEP-GUIDE.md](STEP-BY-STEP-GUIDE.md) for detailed instructions.

**Already have VMs set up?** Follow these steps:

1. **Edit `vars.yaml`**  
   Set `login`, `room`, `group`, `password`, and optionally `roundcube_db_password` / `roundcube_des_key`.

2. **Ensure VMs exist and are reachable**  
   Either create them in Proxmox (or Hyper-V) and install Debian, or use Vagrant:
   ```bash
   vagrant up
   ```

3. **Update `inventory.yaml`** if your IPs differ from 10.204.2.11, .12, .20, .21, .22 (Table 1).

4. **Run the playbook** (use your SSH user and `-k` for password if needed):
   ```bash
   ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k
   ```
   Or use the wrapper:
   ```bash
   ./scripts/run.sh
   ```

## What gets configured

| Host   | Role        | Services / config |
|--------|-------------|-------------------|
| ns1    | DNS master  | Bind9, forward + reverse zones |
| ns2    | DNS slave   | Bind9, zone transfer from ns1 |
| mail   | Mail server | Postfix, Dovecot, users (lism, oljo, etbr, mida, lumi), aliases |
| webmail| Webmail     | MariaDB, Roundcube, Apache vhost |
| mgmt   | Management  | SSH key generated and deployed to root@ns1, ns2, mail, webmail |

After a successful run you can:

- Resolve and mail: `dig @10.204.2.11 mail.a25timfa.it387g.nsa.his.se`, send mail via Roundcube.
- From mgmt: `ssh root@10.204.2.11` (and .12, .20, .21) without password.

## Lab vs home

- **Lab:** In `vars.yaml` set `lab_environment: lab` (default). DNS forwarders stay 10.0.252.201 / 10.0.252.202.
- **Home:** Set `lab_environment: home` to use 8.8.8.8 and 1.1.1.1 as forwarders. `autoreply@nsa.his.se` will not work off-campus.

## Files

- `vars.yaml` – login, room, group, password, mail users, environment.
- `inventory.yaml` – host list and IPs (must match your network).
- `playbook.yml` – main playbook; applies common, network, dns, mail, webmail, ssh.
- `roles/` – common, network, dns, mail, webmail, ssh.
- `Vagrantfile` – optional 5 Debian VMs (VirtualBox) for local testing.

## School lab (student-manual-2026v1.0)

- **Left computer:** Netboot (management client). Use it to open docs, Canvas, and SSH to VMs. Mgmt IP is 10.[room].[group].22.
- **Right computer:** Proxmox host at 10.[room].[group].10 (https://10.[room].[group].10:8006, root / Syp9393!).
- **VMs:** Create four VMs (ns1, ns2, mail, webmail) per Table 1: IPs .11, .12, .20, .21; 2/2/2/4 GB RAM; 20 GB disk; local-zfs; Qemu agent enabled. Install **Debian 13** from Netboot (Installers → Linux → Debian 13 amd64). Use university login as username and password Syp9393!; SSH Server + Standard system utilities only; sudo configured.
- **Run automation:** From the Netboot machine (or a machine that can reach the VMs), clone this repo, set `vars.yaml`, then run the playbook with `-u a25timfa -k`. Ensure all four VMs and the mgmt client (e.g. Netboot) use the IPs above so DNS and mail match the manual.

## Notes

- **Interface name:** Network role uses `eth0`. Proxmox/Debian VMs may use `ens18`; if so, change `roles/network/templates/interfaces.j2` or set the `network_interface` variable if we add one.
- **Networking restart:** The network role restarts the `networking` service after deploying `/etc/network/interfaces`; this can drop an active SSH session. If you run the playbook over SSH, run the network role once (or ensure IPs are already correct) and reconnect if needed.
- **Report:** The playbook does not generate the lab report; keep your configs and public key (e.g. from mgmt: `cat ~/.ssh/id_ed25519.pub`) for the report.
- **autoreply@nsa.his.se:** Only works on the university network; automation does not provide it.
