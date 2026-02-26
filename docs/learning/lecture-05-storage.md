# Lecture 5: Storage

Practice questions for the **Storage** lecture. For full notes, see the [Study Guide: Storage](../study-guide/storage.md).

<details>
<summary>Key points for exam</summary>

- Device naming: /dev/sdX (SCSI/SATA/USB), /dev/nvmeNnN (NVMe), partitions sdX1, nvme0n1p1
- Partition table: MBR (legacy, &lt;2TB) vs GPT (UEFI, GUIDs); fdisk, parted, cfdisk
- UUID stable; use in fstab; lsblk -f, blkid
- mkfs.ext4, mount, umount; /etc/fstab: device/UUID, mount point, type, options, dump, pass
- fsck (unmount first); LVM: PV, VG, LV; swap: mkswap, swapon

</details>

---

<div class="learning-question" data-correct="0" data-explanation="Traditional SCSI/SATA/USB disks appear as /dev/sdX (e.g. /dev/sda). NVMe drives use /dev/nvmeNnN; eMMC/internal SSDs use /dev/mmcblkN.">
  <p><strong>Q1.</strong> How are traditional SATA/SCSI disks typically named in Linux?</p>
  <label><input type="radio" name="l5q1" value="0"> /dev/sdX (e.g. /dev/sda, /dev/sdb)</label><br>
  <label><input type="radio" name="l5q1" value="1"> /dev/hdX only</label><br>
  <label><input type="radio" name="l5q1" value="2"> /dev/diskX</label><br>
  <label><input type="radio" name="l5q1" value="3"> /dev/block/sdX</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="NVMe drives use names like /dev/nvme0n1 (first controller, first namespace). Partitions add a 'p' and number, e.g. /dev/nvme0n1p1.">
  <p><strong>Q2.</strong> How are NVMe drives named in /dev?</p>
  <label><input type="radio" name="l5q2" value="0"> /dev/sdX</label><br>
  <label><input type="radio" name="l5q2" value="1"> /dev/hdX</label><br>
  <label><input type="radio" name="l5q2" value="2"> /dev/nvmeNnN (e.g. /dev/nvme0n1)</label><br>
  <label><input type="radio" name="l5q2" value="3"> /dev/ssdX</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="A partition is a region of a block device managed separately. For /dev/sda, partitions are /dev/sda1, /dev/sda2, etc. Names can change if you add/remove disks, so UUIDs are preferred in fstab.">
  <p><strong>Q3.</strong> What is a partition?</p>
  <label><input type="radio" name="l5q3" value="0"> A type of filesystem</label><br>
  <label><input type="radio" name="l5q3" value="1"> A region of a block device managed separately (e.g. /dev/sda1)</label><br>
  <label><input type="radio" name="l5q3" value="2"> A mount point</label><br>
  <label><input type="radio" name="l5q3" value="3"> A logical volume only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="UUID (Universally Unique Identifier) is a stable identifier for a partition or filesystem. Using UUID= in /etc/fstab avoids breakage when device names (e.g. sda/sdb) change.">
  <p><strong>Q4.</strong> Why use UUID instead of /dev/sda1 in /etc/fstab?</p>
  <label><input type="radio" name="l5q4" value="0"> UUID is stable; device names like sda1 can change when disks are added or removed</label><br>
  <label><input type="radio" name="l5q4" value="1"> UUID is shorter</label><br>
  <label><input type="radio" name="l5q4" value="2"> /dev/sda1 is not supported in fstab</label><br>
  <label><input type="radio" name="l5q4" value="3"> UUID is required for LVM only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="A filesystem is the structure imposed on a block device or partition (e.g. ext4, XFS). You create it with mkfs and mount it to a directory to use it.">
  <p><strong>Q5.</strong> What is a filesystem in this context?</p>
  <label><input type="radio" name="l5q5" value="0"> The root directory /</label><br>
  <label><input type="radio" name="l5q5" value="1"> A partition table</label><br>
  <label><input type="radio" name="l5q5" value="2"> A disk device</label><br>
  <label><input type="radio" name="l5q5" value="3"> A structure on a block device (e.g. ext4, XFS) that you mount to a directory</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="mount attaches a filesystem to a directory (mount point). umount detaches it. Only root can mount unless allowed in /etc/fstab with the user option.">
  <p><strong>Q6.</strong> What does the mount command do?</p>
  <label><input type="radio" name="l5q6" value="0"> Creates a new partition</label><br>
  <label><input type="radio" name="l5q6" value="1"> Attaches a filesystem to a directory (mount point)</label><br>
  <label><input type="radio" name="l5q6" value="2"> Formats a disk</label><br>
  <label><input type="radio" name="l5q6" value="3"> Backs up the filesystem</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="/etc/fstab lists filesystems to mount at boot. Fields: device (or UUID/LABEL), mount point, type, options, dump, fsck pass. Mount -a mounts all fstab entries.">
  <p><strong>Q7.</strong> What is /etc/fstab used for?</p>
  <label><input type="radio" name="l5q7" value="0"> Storing user passwords</label><br>
  <label><input type="radio" name="l5q7" value="1"> Listing installed packages</label><br>
  <label><input type="radio" name="l5q7" value="2"> Defining which filesystems to mount at boot and their mount points and options</label><br>
  <label><input type="radio" name="l5q7" value="3"> Configuring the network</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="lsblk -f and blkid show filesystem type, UUID, and label. Use these to get the UUID for use in /etc/fstab.">
  <p><strong>Q8.</strong> How can you see the UUID of a partition or filesystem?</p>
  <label><input type="radio" name="l5q8" value="0"> lsblk -f or blkid</label><br>
  <label><input type="radio" name="l5q8" value="1"> mount only</label><br>
  <label><input type="radio" name="l5q8" value="2"> fdisk -l only</label><br>
  <label><input type="radio" name="l5q8" value="3"> /etc/fstab</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="fsck checks and repairs a filesystem. Unmount the filesystem first (or use live/rescue). Use fsck.ext4 for ext4; -f forces check; -a auto-repairs. Do not run on mounted rw filesystem.">
  <p><strong>Q9.</strong> What is fsck used for?</p>
  <label><input type="radio" name="l5q9" value="0"> Formatting a disk</label><br>
  <label><input type="radio" name="l5q9" value="1"> Checking and repairing a filesystem (run when unmounted)</label><br>
  <label><input type="radio" name="l5q9" value="2"> Creating partitions</label><br>
  <label><input type="radio" name="l5q9" value="3"> Mounting a filesystem</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="LVM: Physical Volume (PV) = disk/partition; Volume Group (VG) = pool of PVs; Logical Volume (LV) = usable volume from VG. Commands: pvcreate, vgcreate, lvcreate; then mkfs and mount the LV.">
  <p><strong>Q10.</strong> In LVM, what is a Volume Group (VG)?</p>
  <label><input type="radio" name="l5q10" value="0"> A single partition</label><br>
  <label><input type="radio" name="l5q10" value="1"> A filesystem type</label><br>
  <label><input type="radio" name="l5q10" value="2"> A pool of Physical Volumes from which Logical Volumes are created</label><br>
  <label><input type="radio" name="l5q10" value="3"> A mount point</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="fstab fields: (1) device/UUID/LABEL, (2) mount point, (3) type, (4) options, (5) dump, (6) fsck pass. Pass 0=no check, 1=root, 2=other. mount -a mounts all in fstab.">
  <p><strong>Q11.</strong> What are the six fields in an /etc/fstab entry?</p>
  <label><input type="radio" name="l5q11" value="0"> Device/UUID, mount point, type, options, dump, fsck pass</label><br>
  <label><input type="radio" name="l5q11" value="1"> Mount point, device, type only</label><br>
  <label><input type="radio" name="l5q11" value="2"> UUID, type, options only</label><br>
  <label><input type="radio" name="l5q11" value="3"> Device, mount point, permissions only</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="GPT (GUID Partition Table) is used with UEFI and supports large disks and many partitions; uses GUIDs. MBR is legacy, limited to 2TB and 4 primary partitions (or extended). Modern systems typically use GPT.">
  <p><strong>Q12.</strong> What is the main advantage of GPT over MBR?</p>
  <label><input type="radio" name="l5q12" value="0"> GPT is faster</label><br>
  <label><input type="radio" name="l5q12" value="1"> MBR is not supported by Linux</label><br>
  <label><input type="radio" name="l5q12" value="2"> GPT does not need a bootloader</label><br>
  <label><input type="radio" name="l5q12" value="3"> GPT supports large disks and many partitions; works with UEFI</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man 5 fstab`, `man mount`, `man 8 mkfs.ext4`, `man lsblk`, `man 8 fsck` — fstab format, mount options, filesystem tools.
- **Arch Wiki – [Partitioning](https://wiki.archlinux.org/title/Partitioning), [LVM](https://wiki.archlinux.org/title/LVM):** GPT/MBR, LVM concepts; distribution-agnostic.
- **Debian:** [Debian Administrator's Handbook – Storage](https://debian-handbook.info/browse/stable/sect.storage.html) — partitions, fstab, LVM.
