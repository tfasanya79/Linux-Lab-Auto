# Introduction to Linux

## What is Unix?

### Unix vs UNIX

- **Unix**: An operating system (late 1960s onward)
- **UNIX**: A trademark of The Open Group (industrial consortium)
  - Releases official specification (Single UNIX Specification, SUS)
  - Grants certificates and right to use 'UNIX' (costly approval process)
- **Unix**: Used for operating systems descending from the original
  - Includes BSD variants, Solaris, etc.
  - Excludes both Linux and Minix (though mixed together in colloquial talk)

### Unix-like Systems

**Unix-like, Un*x, or *nix** - Systems that behave like a real, certified UNIX system

Three categories:

1. **Genetic UNIX** - Direct descent from original Unix ('derivative work')
   - Doesn't need to have actual code from Unix left
   - Example: BSD variants

2. **Branded UNIX or Trademark UNIX** - Officially conforms with The Open Group's Unix standard
   - Doesn't need to be a 'real' Unix system
   - Example: IBM's z/OS or macOS X

3. **Functional UNIX** - Behaves like Unix, but is neither genetic nor branded
   - Example: Linux or Minix

## What is Linux?

### Linux is a Kernel

Linux is an **operating system kernel**, not user-space programs like shells, text editors, browsers, etc.

- Hardware drivers
- Process scheduler
- Memory handling
- Filesystems
- And more...

### Linux History

- Started by **Linus Torvalds** in summer 1991
- Released October 5, 1991
- Originally planned to be named 'Freax'
- Name 'Linux' was set by an FTP server administrator
- Released under the **GNU General Public License version 2**

### Linux Today

Linux is everywhere:
- Servers
- Embedded devices
- Mobile devices (Android)
- Cloud infrastructure
- Supercomputers
- Desktop systems

## Linux Distributions

A **Linux distribution** is a project that:

- Curates a selection of software
- Provides package management system
- Offers default configurations
- Puts software components together so your computer boots
- May focus on different use cases (server, desktop, embedded, etc.)

### Distribution Types

**Update Schemes:**
- **Calendar-based**: Twice per year, every two years, etc.
- **Stable**: Deemed stable by distribution maintainers
- **Rolling**: Software components updated as soon as new versions become available

**Examples:**
- **Debian**: Stable, community-driven
- **Ubuntu**: Based on Debian, user-friendly
- **Red Hat Enterprise Linux**: Commercial, supported
- **Fedora**: Cutting-edge, community
- **Arch Linux**: Rolling release, minimal

## Course Structure

### Lectures (17 Topics)

1. Introduction
2. Lab Assignment Info
3. Users
4. Processes
5. Storage
6. Booting and systemd
7. Software Management
8. Bash
9. Network Configuration
10. Mail
11. Scheduling
12. Logging
13. Troubleshooting
14. Security
15. Customization
16. History
17. Linux Exercises

### Examinations

- **Lab Assignment (4 HP)**: Practical server setup
- **Written Exam (3.5 HP)**: Theoretical knowledge

## Key Concepts

### Philosophy

- **Everything is a file** - Devices, processes, etc. are represented as files
- **Small, focused programs** - Do one thing well
- **Composability** - Combine programs to solve complex tasks
- **Text-based configuration** - Human-readable config files
- **Open source** - Source code is available

### Important Principles

1. **Modularity** - System built from small, reusable components
2. **Transparency** - Configuration and behavior are visible
3. **Flexibility** - Highly customizable
4. **Security** - Built with security in mind
5. **Documentation** - Extensive documentation available

## Getting Started

### Essential Skills

- Command-line interface (CLI)
- File system navigation
- Text editors (vim, nano)
- Basic commands (ls, cd, cp, mv, rm, etc.)
- Understanding permissions
- Reading documentation (man pages)

### Learning Resources

- **Man pages**: `man command`
- **Info pages**: `info topic`
- **Documentation**: `/usr/share/doc/`
- **Online resources**: Official distribution documentation

## Next Steps

- Read about [User Management](users.md)
- Understand [Process Management](processes.md)
- Learn about [Storage](storage.md)

---

**Remember**: Linux is about understanding the system, not memorizing commands. Focus on concepts and principles!
