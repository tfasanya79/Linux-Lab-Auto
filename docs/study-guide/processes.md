# Process Management

## What are Processes?

A **process** is a running program. Each process:

- Uses **main memory** (or swap space) for code and data
- Is supervised and controlled by the **kernel**
- Has allocated resources (memory, CPU time, files, network connections)
- Has a **status** (running, sleeping, etc.) and **priority**
- Has **ownership** and **permissions**

## Process Identifiers

### PID (Process ID)

- The process's **unique identifier**
- Required to address a process
- Assigned sequentially by kernel
- Reused after process terminates

### PPID (Parent Process ID)

- The process's **parent's PID**
- Tree-like parent-children relation between processes
- Process 1 (init/systemd) is the ancestor of all processes

### UID/EUID (User ID / Effective User ID)

- **UID**: Usually the UID of the user owning the process
- **EUID**: The 'effective' UID determines process's permissions
- In most cases identical to UID (exceptions exist, e.g., setuid programs)

### GID/EGID (Group ID / Effective Group ID)

- Group identity, mostly only for filesystem operations

## Process States

Processes can be in different states:

- **Running (R)**: Currently executing or ready to run
- **Sleeping (S)**: Waiting for an event (interruptible)
- **Uninterruptible sleep (D)**: Waiting for I/O (cannot be killed)
- **Stopped (T)**: Stopped by a signal (Ctrl+Z)
- **Zombie (Z)**: Terminated but not yet reaped by parent

## Signals

### What are Signals?

Signals are **process-level interrupt requests**. They can be triggered by:

1. **Between processes** - Via system call `kill`
2. **From a terminal** - To 'interrupt' (Ctrl+C) or suspend (Ctrl+Z) a foreground process
3. **Using command-line tools** - Like `kill -signal pid` or `pkill -u user`
4. **Triggered by kernel** - To end a misbehaving process or notify of events

### Signal Handlers

- Processes have **handlers** for (most) signals
- A handler is a code section (e.g., a function)
- Kernel may handle some signals destined for a process (e.g., KILL)
- Processes may implement their own handlers
- Some signals can be **ignored** (dropped) or (temporarily) **blocked**

### Common Signals

| Name | Description | Default Action |
|------|-------------|----------------|
| SIGINT | Interrupt from keyboard (Ctrl+C) | Terminate |
| SIGKILL | Kill signal | Terminate (cannot be caught, blocked, or ignored) |
| SIGTERM | Termination signal | Terminate |
| SIGSTOP | Stop process | Stop/freeze process |
| SIGTSTP | Stop typed at terminal (Ctrl+Z) | Stop/freeze process |
| SIGCONT | Continue if stopped | Continue |
| SIGBUS | Bus error (bad memory access) | Terminate |
| SIGWINCH | Window resize signal | Ignored |
| SIGHUP | Terminal closed or daemon reload config | Ignored (or reload) |

### Sending Signals

```bash
# Send signal to process
kill -SIGTERM PID
kill -9 PID          # SIGKILL
kill -HUP PID         # SIGHUP

# Kill process by name
pkill processname
killall processname

# Kill processes by user
pkill -u username
```

## Process Control

### Viewing Processes

```bash
# List all processes
ps aux
ps -ef

# List processes in tree format
pstree
pstree -p

# Real-time process monitor
top
htop  # if installed

# System-wide process monitor
top -u username
```

### Killing Processes

```bash
# Terminate gracefully (SIGTERM)
kill PID
kill -TERM PID

# Force kill (SIGKILL)
kill -9 PID
kill -KILL PID

# Kill by name
pkill processname
killall processname

# Kill processes by user
pkill -u username
```

### Stopping and Resuming

```bash
# Stop process (Ctrl+Z sends SIGTSTP)
# Process goes to background in stopped state

# Resume stopped process in foreground
fg

# Resume stopped process in background
bg

# Send SIGCONT to continue
kill -CONT PID
```

## CPU Priority (Nice Level)

### What is Nice Level?

'Nice level' is a **numeric value** to control the priority of a process:

- Just a **suggestion** to the CPU scheduler, no guarantees
- Inherited to all child/forked processes
- Does not affect I/O scheduling directly
- **High values** make process 'nice', i.e., get **lower CPU priority**
- **Lower (even negative) values** cause process to get **higher CPU priority**
- Range: **-20 to 19**, default 0
- **Only root** can increase priority (i.e., decrease value)
- Process owner or root can decrease priority (i.e., increase value)

### Setting Priority

```bash
# Set priority for new process
nice -n 10 command
nice command  # defaults to 10

# Change priority of running process
renice +10 PID
renice -5 PID  # requires root

# View nice level
ps -o pid,ni,comm
```

## Process Monitoring

### ps Command

```bash
# Show all processes
ps aux

# Show process tree
ps auxf

# Show specific user's processes
ps -u username

# Show process with custom format
ps -o pid,ppid,cmd,%mem,%cpu
```

### top Command

```bash
# Interactive process viewer
top

# Show specific user's processes
top -u username

# Update interval
top -d 5  # 5 seconds

# Sort by memory
top -o %MEM

# Sort by CPU
top -o %CPU
```

### htop (Enhanced top)

```bash
# More user-friendly than top
htop

# Features:
# - Color-coded display
# - Mouse support
# - Tree view
# - Easy sorting
```

## Process Information

### /proc Filesystem

The `/proc` filesystem provides information about processes:

```bash
# Process information
/proc/PID/status
/proc/PID/cmdline
/proc/PID/environ
/proc/PID/fd/        # File descriptors
/proc/PID/cwd        # Current working directory
/proc/PID/exe        # Executable path
```

### Viewing Process Details

```bash
# Process status
cat /proc/PID/status

# Command line
cat /proc/PID/cmdline

# Environment variables
cat /proc/PID/environ | tr '\0' '\n'

# Open files
lsof -p PID
ls -l /proc/PID/fd/
```

## Background and Foreground

### Running Processes in Background

```bash
# Run command in background
command &

# Move running process to background (Ctrl+Z then)
bg

# List background jobs
jobs

# Bring job to foreground
fg %1
fg %jobnumber
```

### nohup

```bash
# Run command that continues after logout
nohup command &

# Output goes to nohup.out
nohup command > output.log 2>&1 &
```

## Process Limits

### Viewing Limits

```bash
# Current process limits
ulimit -a

# Specific limit
ulimit -n  # file descriptors
ulimit -u  # processes
```

### Setting Limits

```bash
# Temporary (current session)
ulimit -n 4096

# Permanent (in /etc/security/limits.conf)
username soft nofile 4096
username hard nofile 8192
```

## Best Practices

1. **Use SIGTERM first** - Give process chance to clean up
2. **Use SIGKILL as last resort** - Cannot be caught, may cause data loss
3. **Monitor resource usage** - Watch CPU and memory
4. **Set appropriate priorities** - Don't starve other processes
5. **Use process monitoring** - Keep track of system health

## Common Commands Summary

```bash
# View processes
ps aux
top
htop
pstree

# Control processes
kill PID
killall name
pkill pattern

# Priority
nice -n 10 command
renice +10 PID

# Background/foreground
command &
jobs
fg %1
bg
```

## Next Steps

- Learn about [Storage](storage.md)
- Understand [Booting and systemd](booting-systemd.md)
- Study [Scheduling](scheduling.md)

---

**Remember**: Don't use Ctrl+Z unless you know what you're doing! It stops the process, which can cause issues.
