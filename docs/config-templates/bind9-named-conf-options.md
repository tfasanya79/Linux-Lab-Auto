# Bind9: named.conf.options Template

## File Location
`/etc/bind/named.conf.options`

## Template

```bash
options {
    directory "/var/cache/bind";
    
    // Recursive questions get sent to NSA nameservers
    // Replace with your lab's nameservers if different
    forwarders {
        10.0.252.201;
        10.0.252.202;
    };
    
    // DNSSEC validation
    dnssec-validation auto;
    
    // Conform to RFC1035
    auth-nxdomain no;
    
    // Listen on IPv6
    listen-on-v6 { any; };
    
    // Allow queries from anyone
    allow-query { any; };
    
    // Allow recursion only from localhost and local network
    // Replace [room] and [group] with your values
    allow-recursion { 
        127/8; 
        10.[room].[group].0/24; 
    };
};
```

## Placeholders to Replace

- `[room]` - Your room number (e.g., `209`)
- `[group]` - Your computer group number (e.g., `30`)

## Notes

- Forwarders are the lab's nameservers for external queries
- `allow-recursion` restricts who can use your server for recursive queries
- `allow-query` allows anyone to query your authoritative zones
- Keep `auth-nxdomain no` for RFC compliance
