# Linux Lab - 5 Debian VMs for IT387G
# IPs: 10.204.2.x (room 204, group 2)

Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"

  config.vm.define "ns1" do |n|
    n.vm.hostname = "ns1"
    n.vm.network "private_network", ip: "10.204.2.11"
    n.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
      vb.cpus = 2
    end
  end

  config.vm.define "ns2" do |n|
    n.vm.hostname = "ns2"
    n.vm.network "private_network", ip: "10.204.2.12"
    n.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
      vb.cpus = 2
    end
  end

  config.vm.define "mail" do |n|
    n.vm.hostname = "mail"
    n.vm.network "private_network", ip: "10.204.2.20"
    n.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
      vb.cpus = 2
    end
  end

  config.vm.define "webmail" do |n|
    n.vm.hostname = "webmail"
    n.vm.network "private_network", ip: "10.204.2.21"
    n.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
      vb.cpus = 2
    end
  end

  config.vm.define "mgmt" do |n|
    n.vm.hostname = "mgmt"
    n.vm.network "private_network", ip: "10.204.2.22"
    n.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.cpus = 1
    end
  end
end
