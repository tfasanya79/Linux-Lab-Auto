# Bash Scripting

## Overview

Bash (Bourne Again Shell) is the default shell on most Linux systems. Understanding Bash scripting is essential for automation and system administration.

## Why Learn Bash?

- **Automation** - Automate repetitive tasks
- **System administration** - Essential for Linux administration
- **Powerful** - Combine commands to solve complex problems
- **Portable** - Works on most Unix-like systems

## Basic Script Structure

```bash
#!/bin/bash
# This is a comment

# Script content here
echo "Hello, World!"
```

**Shebang:** `#!/bin/bash` tells the system which interpreter to use.

## Making Scripts Executable

```bash
# Make script executable
chmod +x script.sh

# Run script
./script.sh

# Or run with bash
bash script.sh
```

## Variables

### Setting Variables

```bash
# Simple variable
name="John"
number=42

# No spaces around =
# Quotes needed for strings with spaces
```

### Using Variables

```bash
# Use $variable or ${variable}
echo $name
echo ${name}

# Use in strings
echo "Hello, $name"
echo "Hello, ${name}!"
```

### Environment Variables

```bash
# View environment variable
echo $HOME
echo $PATH
echo $USER

# Set environment variable
export MY_VAR="value"

# View all environment variables
env
```

## Command Substitution

```bash
# Capture command output
date=$(date)
files=$(ls)

# Using backticks (older syntax)
date=`date`

# Using $() (preferred)
date=$(date)
```

## Input and Output

### Reading Input

```bash
# Read from user
read -p "Enter your name: " name
echo "Hello, $name!"

# Read multiple values
read -p "Enter name and age: " name age
```

### Output

```bash
# Print to stdout
echo "Hello, World!"

# Print without newline
echo -n "Hello, "

# Print with formatting
printf "Name: %s, Age: %d\n" "$name" "$age"
```

### Redirecting Output

```bash
# Redirect stdout to file
command > file.txt

# Append to file
command >> file.txt

# Redirect stderr
command 2> error.txt

# Redirect both
command > output.txt 2>&1

# Discard output
command > /dev/null
```

### Input Redirection

```bash
# Read from file
command < file.txt

# Here document
cat << EOF
This is a
multi-line
string
EOF
```

## Conditionals

### if Statement

```bash
if [ condition ]; then
    # commands
elif [ condition ]; then
    # commands
else
    # commands
fi
```

### Test Conditions

```bash
# File tests
[ -f file ]    # File exists and is regular file
[ -d dir ]     # Directory exists
[ -r file ]   # File is readable
[ -w file ]   # File is writable
[ -x file ]   # File is executable

# String tests
[ -z string ]  # String is empty
[ -n string ]  # String is not empty
[ str1 = str2 ] # Strings are equal
[ str1 != str2 ] # Strings are not equal

# Numeric tests
[ num1 -eq num2 ] # Equal
[ num1 -ne num2 ] # Not equal
[ num1 -lt num2 ] # Less than
[ num1 -gt num2 ] # Greater than
```

### case Statement

```bash
case $variable in
    pattern1)
        commands
        ;;
    pattern2)
        commands
        ;;
    *)
        default commands
        ;;
esac
```

## Loops

### for Loop

```bash
# Iterate over list
for item in item1 item2 item3; do
    echo $item
done

# Iterate over files
for file in *.txt; do
    echo $file
done

# C-style for loop
for ((i=1; i<=10; i++)); do
    echo $i
done
```

### while Loop

```bash
# While condition is true
while [ condition ]; do
    commands
done

# Read file line by line
while read line; do
    echo $line
done < file.txt
```

### until Loop

```bash
# Until condition is true
until [ condition ]; do
    commands
done
```

## Functions

```bash
# Define function
function_name() {
    local var="local variable"
    echo "Function body"
    return 0
}

# Call function
function_name

# With parameters
my_function() {
    echo "First: $1"
    echo "Second: $2"
    echo "All: $@"
}

my_function arg1 arg2
```

## Script Arguments

```bash
# Access arguments
$0    # Script name
$1    # First argument
$2    # Second argument
$@    # All arguments
$#    # Number of arguments
$?    # Exit status of last command
$$    # Process ID
$!    # Process ID of last background command
```

## Exit Codes

```bash
# Exit with code
exit 0    # Success
exit 1    # General error
exit 2    # Misuse of shell command

# Check exit code
if command; then
    echo "Success"
else
    echo "Failed: $?"
fi
```

## Arrays

```bash
# Create array
array=("item1" "item2" "item3")

# Access elements
echo ${array[0]}    # First element
echo ${array[@]}    # All elements
echo ${#array[@]}   # Number of elements

# Iterate
for item in "${array[@]}"; do
    echo $item
done
```

## String Manipulation

```bash
string="Hello, World!"

# Length
${#string}

# Substring
${string:0:5}        # "Hello"
${string:7}         # "World!"

# Replace
${string/World/Unix} # "Hello, Unix!"

# Remove prefix/suffix
${string#Hello, }   # "World!"
${string%!}         # "Hello, World"
```

## Useful Commands in Scripts

```bash
# Check if command exists
if command -v git >/dev/null 2>&1; then
    echo "Git is installed"
fi

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" >> /var/log/myscript.log
}
```

## Best Practices

1. **Use shebang** - Always include `#!/bin/bash`
2. **Quote variables** - Prevent word splitting
3. **Check exit codes** - Verify command success
4. **Use functions** - Organize code
5. **Add comments** - Document your code
6. **Error handling** - Use `set -e` or check `$?`
7. **Validate input** - Check arguments and user input
8. **Use meaningful names** - Clear variable and function names

## Example Script

```bash
#!/bin/bash

# Script to backup files
BACKUP_DIR="/backup"
SOURCE_DIR="/home/user"

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo "Creating backup directory..."
    mkdir -p "$BACKUP_DIR"
fi

# Create backup
echo "Backing up $SOURCE_DIR to $BACKUP_DIR..."
tar -czf "$BACKUP_DIR/backup-$(date +%Y%m%d).tar.gz" "$SOURCE_DIR"

# Check if backup succeeded
if [ $? -eq 0 ]; then
    echo "Backup completed successfully!"
else
    echo "Backup failed!" >&2
    exit 1
fi
```

## Common Commands Summary

```bash
# Variables
var="value"
echo $var

# Conditionals
if [ condition ]; then ... fi

# Loops
for item in list; do ... done
while [ condition ]; do ... done

# Functions
my_function() { ... }

# Arguments
$1, $2, $@, $#
```

## Next Steps

- Learn about [Scheduling](scheduling.md) - Automate scripts
- Understand [Network Configuration](network.md)
- Study [Troubleshooting](troubleshooting.md)

---

**Remember**: Practice is key! Write scripts to automate your daily tasks.
