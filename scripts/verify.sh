#!/usr/bin/env bash
# Quick verification - run from control node. Requires dig, ssh (and VMs reachable).
set -e
NS1="${NS1:-10.204.2.11}"
DOMAIN="${DOMAIN:-a25timfa.it387g.nsa.his.se}"
echo "DNS (A):"
dig +short "@$NS1" "mail.$DOMAIN" A || true
echo "DNS (MX):"
dig +short "@$NS1" "$DOMAIN" MX || true
echo "SSH (from mgmt run: ssh root@$NS1 hostname):"
echo "  Manual: ssh root@$NS1 hostname"
