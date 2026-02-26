# Storage Management

## Overview

Understanding storage devices, partitions, and filesystems is essential for Linux administration.

## Naming Storage Devices

### Block Devices

Storage devices are **file system objects** of type 'block device' in `/dev`.

### Traditional Naming

Naming depends on which kernel driver is responsible:

| Device | Description |
|--------|-------------|
| `/dev/sdLETTER` | SCSI disks, SATA disks, USB storage, etc. |
| `/dev/mmcblkNUMBER` | Internal SSDs, eMMC, and alike |
| `/dev/nvmeNUMBER` | NVMe storage |
| `/dev/hdLETTER` | PATA/IDE devices (historic) |

**Examples:**
- `/dev/sdc`
- `/dev/nvme0`

**Important:**
- Letters and numbers assigned by order in which Linux kernel detected devices
- Names may change if disks are added/(re)moved (e.g., `sda` becomes `sdb`)

### Partitions

Storage devices may have **partitions** - storage space regions managed separately.

**Naming:**
- `/dev/sdLETTERNUMBER` - e.g., `/dev/sdb3`
- `/dev/mmcblkNUMBERpNUMBER` - e.g., `/dev/mmcblk0p1`
- `/dev/nvme0n1p1` - NVMe naming

**Important:** Names may change if partition table gets modified.

### Labels (GPT only)

- Short string set by administrator
- Referred to as 'name' in GPT or 'PARTLABEL' in Linux
- Not depending on filesystem in partition
- **No check for duplicates**

### UUID (Universally Unique Identifier)

- Long, seemingly random hexadecimal strings
- Example: `aba9c3b0-7044-4be4-b55c-3f486a357552`
- Stored in partition table
- **Guaranteed to never change**
- Hard to remember

**View UUID:**
```bash
lsblk -f
blkid
```

## Partition Tables

### What is a Partition Table?

Partition table records which partitions exist on a storage device:

- Located at the **beginning** of a storage device
- Created, edited using tools like `fdisk`, `cfdisk`, `parted`

### Partition Table Formats

**MBR (Master Boot Record):**
- For legacy systems
- Limited number of partitions
- For disks less than 2 TB
- Partition types: One byte, hard-coded
  - Example: `83` (Linux filesystem), `c` (FAT32)

**GPT (GUID Partition Table):**
- Part of UEFI
- Default for modern systems
- Uses GUIDs (which are UUIDs)
- Example: `0FC63DAF-8483-4772-8E79-3D69D8477DE4` (Linux filesystem)

## Filesystems

### What is a Filesystem?

A **filesystem** is a structure imposed on a block of storage space.

**Important:**
- Each storage device or partition can only have **one filesystem**
- Filesystems are addressed by the partition name (or block device name if filesystem is directly on block device)

### Filesystem Labels

- Short string set by administrator
- Not supported by all filesystems
- Limited in length or choice of characters
- **No check for duplicates**

### Filesystem UUID

- Unique identifier for the filesystem
- Different from partition UUID
- Used in `/etc/fstab` for mounting

## Managing Partitions

### fdisk

```bash
# List partitions
sudo fdisk -l
sudo fdisk -l /dev/sda

# Interactive partition editor
sudo fdisk /dev/sda

# Common fdisk commands:
# n - new partition
# d - delete partition
# p - print partition table
# w - write and exit
# q - quit without saving
```

### parted

```bash
# Interactive partition editor
sudo parted /dev/sda

# Non-interactive
sudo parted /dev/sda print
sudo parted /dev/sda mkpart primary ext4 1GB 10GB
```

### cfdisk

```bash
# User-friendly partition editor
sudo cfdisk /dev/sda
```

## Creating Filesystems

### mkfs (Make Filesystem)

```bash
# Create ext4 filesystem
sudo mkfs.ext4 /dev/sda1

# Create with label
sudo mkfs.ext4 -L mylabel /dev/sda1

# Create XFS filesystem
sudo mkfs.xfs /dev/sda1

# Create Btrfs filesystem
sudo mkfs.btrfs /dev/sda1
```

### Common Filesystem Types

- **ext4**: Default for most Linux systems
- **XFS**: High-performance, large files
- **Btrfs**: Advanced features, snapshots
- **FAT32**: Compatibility with Windows
- **NTFS**: Windows filesystem (read/write with ntfs-3g)

## Mounting and Unmounting

### mount

```bash
# Mount filesystem
sudo mount /dev/sda1 /mnt

# Mount with specific filesystem type
sudo mount -t ext4 /dev/sda1 /mnt

# Mount with options
sudo mount -o rw,noatime /dev/sda1 /mnt

# Mount by UUID
sudo mount UUID=aba9c3b0-7044-4be4-b55c-3f486a357552 /mnt

# Mount by label
sudo mount LABEL=mylabel /mnt
```

### umount

```bash
# Unmount filesystem
sudo umount /mnt
sudo umount /dev/sda1

# Force unmount (if busy)
sudo umount -f /mnt
sudo umount -l /mnt  # lazy unmount
```

### /etc/fstab

Configuration file for automatic mounting:

```
# <file system>  <mount point>  <type>  <options>  <dump>  <pass>
UUID=xxx         /mnt            ext4    defaults   0       2
```

**Fields:**
1. **File system**: Device, UUID, or label
2. **Mount point**: Directory where mounted
3. **Type**: Filesystem type
4. **Options**: Mount options (defaults, noatime, etc.)
5. **Dump**: Backup utility flag (0 or 1)
6. **Pass**: fsck order (0=no check, 1=root, 2=others)

## Checking Filesystems

### fsck

```bash
# Check filesystem
sudo fsck /dev/sda1

# Check ext4 filesystem
sudo fsck.ext4 /dev/sda1

# Force check
sudo fsck -f /dev/sda1

# Auto-repair
sudo fsck -a /dev/sda1
```

**Note:** Unmount filesystem before checking (or use `-M` to skip mounted check).

## Disk Usage

### df (Disk Free)

```bash
# Show filesystem usage
df -h

# Show specific filesystem
df -h /dev/sda1

# Show inodes
df -i
```

### du (Disk Usage)

```bash
# Show directory usage
du -h /path/to/directory

# Show summary
du -sh /path/to/directory

# Show top-level directories
du -h --max-depth=1 /path
```

## Swap Space

### Creating Swap

```bash
# Create swap partition
sudo mkswap /dev/sda2

# Create swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
```

### Enabling Swap

```bash
# Enable swap partition
sudo swapon /dev/sda2

# Enable swap file
sudo swapon /swapfile

# Enable all swap
sudo swapon -a
```

### Disabling Swap

```bash
# Disable swap
sudo swapoff /swapfile
sudo swapoff /dev/sda2

# Disable all swap
sudo swapoff -a
```

### /etc/fstab for Swap

```
/swapfile none swap sw 0 0
```

## Logical Volume Management (LVM)

### Concepts

- **Physical Volume (PV)**: Physical disk or partition
- **Volume Group (VG)**: Collection of physical volumes
- **Logical Volume (LV)**: Virtual partition created from volume group

### Basic LVM Commands

```bash
# Create physical volume
sudo pvcreate /dev/sda1

# Create volume group
sudo vgcreate myvg /dev/sda1

# Create logical volume
sudo lvcreate -L 10G -n mylv myvg

# Format logical volume
sudo mkfs.ext4 /dev/myvg/mylv

# Mount logical volume
sudo mount /dev/myvg/mylv /mnt
```

## Best Practices

1. **Use UUIDs in /etc/fstab** - More reliable than device names
2. **Label your filesystems** - Easier to identify
3. **Regular backups** - Protect your data
4. **Monitor disk usage** - Prevent full filesystems
5. **Use appropriate filesystem** - Match to use case
6. **Test before production** - Verify configurations

## Common Commands Summary

```bash
# List block devices
lsblk
lsblk -f

# Partition management
sudo fdisk /dev/sda
sudo parted /dev/sda

# Filesystem creation
sudo mkfs.ext4 /dev/sda1

# Mounting
sudo mount /dev/sda1 /mnt
sudo umount /mnt

# Disk usage
df -h
du -h

# Swap
sudo mkswap /dev/sda2
sudo swapon /dev/sda2
```

## Next Steps

- Learn about [Booting and systemd](booting-systemd.md)
- Understand [Network Configuration](network.md)
- Study [Troubleshooting](troubleshooting.md)

---

**Remember**: Always backup important data before modifying partitions or filesystems!
