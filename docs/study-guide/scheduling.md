# Task Scheduling

## Overview

Need to run programs or perform actions on a regular basis? Use scheduling services to automate tasks.

## Scheduling Solutions

A service runs in background, checks time, runs commands at specified times (e.g., 'midnight on weekdays').

## Cron

### What is Cron?

Cron is a time-based job scheduler in Unix-like operating systems.

### Configuration

Configured through `crontab` (don't edit configuration in `/var/spool/cron` files manually):

```bash
# Edit crontab
crontab -e

# Edit another user's crontab (root only)
crontab -u username -e

# List current configuration
crontab -l

# List another user's crontab
crontab -u username -l
```

### Crontab Format

6 fields, separated by whitespaces:

```
minute hour day month weekday command
```

**Fields:**

- **Minute** - 0 to 59
- **Hour** - 0 to 23
- **Day of month** - 1 to 31
- **Month** - 1 to 12
- **Day of week** - 0 to 7 (Sunday twice: 0 and 7)
- **Command** - Any valid shell command

### Field Values

- `*` - Match everything
- Single integer - Exact match
- `int-int` - Range of values
- `int-int/int` - Range with step value
- Abbreviations for weekdays (`mon`, `tue`, etc.) and months
- Comma-separated list - Combining above alternatives

### Cron Time Examples

```bash
# Execute command once every minute
* * * * * command

# Monday through Friday at 10:45
45 10 * * 1-5 command

# Five minutes after midnight or noon at the first day of every third month
5 0,12 1 */3 * command

# At 4:30 on any day that is either the 1st or 15th of a month or a Friday
30 4 1,15 * 5 command
```

**Note:** The day of a command's execution can be specified by two fields – day of month, and day of week. If both fields are restricted (aren't `*`), the command will run when either field matches the current time.

### Named Times

```bash
@reboot    # Once at startup
@yearly    # Once a year (0 0 1 1 *)
@annually  # Same as @yearly
@monthly   # Once a month (0 0 1 * *)
@weekly    # Once a week (0 0 * * 0)
@daily     # Once a day (0 0 * * *)
@midnight  # Same as @daily
@hourly    # Once an hour (0 * * * *)
```

### Cron Environment Variables

```bash
PATH=/sbin:/bin:/usr/bin:/usr/local/bin
MAILTO=admin@example.com
SHELL=/bin/bash
```

### Cron Example

```bash
# Backup every day at 2 AM
0 2 * * * /usr/local/bin/backup.sh

# Clean temp files every Monday at 3 AM
0 3 * * 1 /usr/bin/find /tmp -type f -mtime +7 -delete

# Update package list every day at 6 AM
0 6 * * * /usr/bin/apt update
```

## Anacron

### What is Anacron?

Anacron is used for running periodic jobs, but unlike cron, it doesn't assume the system is running continuously.

### When to Use Anacron

- Jobs that should run daily, weekly, or monthly
- Systems that may be powered off
- Jobs that don't need exact timing

### Configuration

File: `/etc/anacrontab`

```bash
# period in days   delay in minutes   job-identifier   command
1                 5                  daily-backup     /usr/local/bin/backup.sh
7                 10                 weekly-cleanup   /usr/bin/cleanup.sh
```

## systemd Timers

### What are systemd Timers?

systemd timers are an alternative to cron, integrated with systemd.

### Timer Units

**Example timer unit:** `/etc/systemd/system/backup.timer`

```ini
[Unit]
Description=Daily Backup Timer

[Timer]
OnCalendar=daily
OnCalendar=Mon..Fri 02:00
Persistent=true

[Install]
WantedBy=timers.target
```

**Corresponding service unit:** `/etc/systemd/system/backup.service`

```ini
[Unit]
Description=Daily Backup Service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh
```

### Timer Syntax

```bash
# Daily at specific time
OnCalendar=*-*-* 02:00:00

# Weekly on Monday
OnCalendar=Mon *-*-* 02:00:00

# Monthly on first day
OnCalendar=*-*-01 02:00:00
```

### Managing Timers

```bash
# Enable timer
sudo systemctl enable backup.timer

# Start timer
sudo systemctl start backup.timer

# List timers
systemctl list-timers

# View timer status
systemctl status backup.timer
```

## Choosing a Scheduler

### Use Cron When:

- Need exact timing
- System runs continuously
- Simple scheduling needs

### Use Anacron When:

- System may be powered off
- Jobs don't need exact timing
- Daily/weekly/monthly jobs

### Use systemd Timers When:

- Already using systemd
- Need integration with systemd services
- Want modern approach

## Best Practices

1. **Test commands first** - Run manually before scheduling
2. **Use absolute paths** - Don't rely on PATH
3. **Redirect output** - Capture output and errors
4. **Set MAILTO** - Get notified of failures
5. **Document jobs** - Add comments in crontab
6. **Monitor logs** - Check for errors regularly
7. **Use locking** - Prevent overlapping executions

## Common Cron Patterns

```bash
# Every minute
* * * * * command

# Every hour
0 * * * * command

# Every day at midnight
0 0 * * * command

# Every week (Sunday at midnight)
0 0 * * 0 command

# Every month (1st at midnight)
0 0 1 * * command

# Every weekday at 9 AM
0 9 * * 1-5 command

# Every 15 minutes
*/15 * * * * command

# Every hour during business hours
0 9-17 * * 1-5 command
```

## Troubleshooting

### Check Cron Logs

```bash
# View cron logs
sudo tail -f /var/log/syslog | grep CRON

# Check systemd journal for timers
journalctl -u backup.timer
```

### Common Issues

- **Command not found** - Use absolute paths
- **Permission denied** - Check file permissions
- **No output** - Redirect stdout/stderr
- **Not running** - Check cron service is running

## Common Commands Summary

```bash
# Cron
crontab -e
crontab -l
crontab -r  # Remove crontab

# systemd timers
systemctl list-timers
systemctl status timer.timer
sudo systemctl enable timer.timer
```

## Next Steps

- Learn about [Logging](logging.md) - Monitor scheduled jobs
- Understand [Bash Scripting](bash.md) - Create scripts for scheduling
- Study [Troubleshooting](troubleshooting.md)

---

**Remember**: Always test your scheduled commands manually first!
