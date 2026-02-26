# Bind9: Zone Files Template

## Forward Zone File
`/etc/bind/db.[login]`

```bash
$TTL 300
$ORIGIN [login].it387g.nsa.his.se.
@   IN  SOA ns1 root.[login].it387g.nsa.his.se. (
    2025121301  ; Serial - increment when making changes
    30m         ; Refresh - how often slave checks for updates
    3m          ; Retry - retry interval if refresh fails
    2w          ; Expire - how long slave serves stale data
    1h          ; Negative Cache TTL - how long to cache NXDOMAIN
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

## Reverse Zone File
`/etc/bind/db.10`

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
; Replace [room] and [group] with your values
11  IN  PTR ns1.[login].it387g.nsa.his.se.
12  IN  PTR ns2.[login].it387g.nsa.his.se.
13  IN  PTR mail.[login].it387g.nsa.his.se.
14  IN  PTR webmail.[login].it387g.nsa.his.se.
22  IN  PTR mgmt.[login].it387g.nsa.his.se.
```

## Placeholders to Replace

- `[login]` - Your university login (e.g., `a24login`)
- `[room]` - Your room number (e.g., `209`)
- `[group]` - Your computer group number (e.g., `30`)

## Important Notes

- **Serial number**: Must be incremented each time you change the zone file
- **TTL**: Time to live for records (300 seconds = 5 minutes)
- **SOA record**: Start of Authority - defines the zone
- **NS records**: Name servers for the domain
- **MX record**: Mail exchanger (priority 10, hostname mail)
- **A records**: Map hostnames to IP addresses
- **PTR records**: Map IP addresses to hostnames (reverse DNS)

## Testing

After creating zone files:

```bash
# Check forward zone
sudo named-checkzone [login].it387g.nsa.his.se /etc/bind/db.[login]

# Check reverse zone
sudo named-checkzone [group].[room].10.in-addr.arpa /etc/bind/db.10
```
