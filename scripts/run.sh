#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
if [[ ! -f vars.yaml ]]; then
  echo "Missing vars.yaml."
  exit 1
fi
if [[ -f Vagrantfile ]] && ! vagrant status 2>/dev/null | grep -q "running"; then
  vagrant up
fi
ansible-playbook -i inventory.yaml playbook.yml -u a25timfa -k "$@"
