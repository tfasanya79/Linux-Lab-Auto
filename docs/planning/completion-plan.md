# Course Completion Plan

## Timeline Overview

**Course Duration:** 8-10 weeks (Spring 2026)

## Week-by-Week Breakdown

### Weeks 1-2: Foundation and Environment Setup

**Goals:**
- Understand course structure and requirements
- Set up virtualization environment
- Create and configure virtual machines

**Tasks:**
- [ ] Read student manual thoroughly
- [ ] Review all lecture slides
- [ ] Install Proxmox
- [ ] Create all required VMs (ns1, ns2, mail, webmail, mgmt)
- [ ] Configure network on all machines
- [ ] Verify connectivity

**Study:**
- Introduction to Linux
- User Management
- Process Management
- Storage

### Weeks 3-4: DNS Configuration

**Goals:**
- Set up DNS master and slave servers
- Configure forward and reverse zones
- Verify DNS resolution

**Tasks:**
- [ ] Install Bind9 on ns1 and ns2
- [ ] Configure master server (ns1)
- [ ] Configure slave server (ns2)
- [ ] Create forward zone file
- [ ] Create reverse zone file
- [ ] Test DNS resolution
- [ ] Verify zone transfer

**Study:**
- Network Configuration
- DNS concepts
- Bind9 documentation

### Weeks 5-6: Mail Server Setup

**Goals:**
- Configure Postfix (SMTP)
- Configure Dovecot (IMAP)
- Set up user accounts and aliases
- Test mail functionality

**Tasks:**
- [ ] Install Postfix and Dovecot
- [ ] Configure Postfix
- [ ] Configure Dovecot
- [ ] Create user accounts
- [ ] Configure mail aliases
- [ ] Test SMTP
- [ ] Test IMAP
- [ ] Verify NOT an open relay

**Study:**
- Mail protocols (SMTP, IMAP)
- Postfix configuration
- Dovecot configuration

### Weeks 7-8: Webmail and SSH

**Goals:**
- Install and configure Roundcube
- Set up passwordless SSH
- Complete all testing

**Tasks:**
- [ ] Install MariaDB
- [ ] Install Roundcube
- [ ] Configure Apache
- [ ] Configure Roundcube
- [ ] Test webmail access
- [ ] Generate SSH keys
- [ ] Configure passwordless SSH
- [ ] Complete all testing procedures

**Study:**
- Webmail concepts
- SSH key authentication
- Testing methodologies

### Week 9: Report Writing

**Goals:**
- Write comprehensive lab report
- Document all configurations
- Prepare for demonstration

**Tasks:**
- [ ] Document DNS setup
- [ ] Document mail server setup
- [ ] Document webmail setup
- [ ] Explain protocols (SMTP, IMAP, SSH, HTTP)
- [ ] Explain concepts (mailbox, user, aliases)
- [ ] Include public SSH key
- [ ] Create diagrams/flowcharts
- [ ] Review and proofread
- [ ] Submit report

**Study:**
- Report writing guidelines
- Technical writing
- Diagram creation

## Milestones

### Milestone 1: Environment Ready (End of Week 2)
- All VMs created and networked
- Basic connectivity verified

### Milestone 2: DNS Working (End of Week 4)
- DNS servers operational
- All records resolving correctly

### Milestone 3: Mail Working (End of Week 6)
- Mail server sending and receiving
- Not an open relay

### Milestone 4: Complete System (End of Week 8)
- All components working
- Testing complete
- Ready for demonstration

### Milestone 5: Report Submitted (End of Week 9)
- Report written and submitted
- Demonstration completed

## Prerequisites Checklist

Before starting lab assignment:

- [ ] Understand Linux basics
- [ ] Comfortable with command line
- [ ] Know basic networking concepts
- [ ] Understand DNS basics
- [ ] Familiar with text editors (vim/nano)
- [ ] Can use SSH
- [ ] Understand file permissions

## Study Schedule

### Daily Study (1-2 hours)

- **Morning:** Review lecture slides
- **Afternoon:** Practice commands
- **Evening:** Read documentation

### Weekly Study (5-10 hours)

- **Monday:** New topic introduction
- **Tuesday-Thursday:** Deep dive into topic
- **Friday:** Practice and exercises
- **Weekend:** Lab work

## Exam Preparation

### Written Exam (3.5 HP)

**Topics to Review:**
- User and process management
- Storage and filesystems
- Booting and systemd
- Software management
- Network configuration
- Mail servers
- Scheduling and logging
- Security
- Troubleshooting

**Preparation:**
- Review all study guide pages
- Practice commands
- Understand concepts (not just memorize)
- Review lecture slides
- Practice exam questions

## Tips for Success

1. **Start early** - Don't wait until the last minute
2. **Work systematically** - Complete one component before moving to next
3. **Test thoroughly** - Verify each step works
4. **Document as you go** - Makes report writing easier
5. **Ask for help** - But only after trying yourself
6. **Practice regularly** - Hands-on experience is crucial
7. **Review regularly** - Don't cram before exams

## Resources

- **Study Guide** - Comprehensive topic coverage
- **Quick Reference** - Command lookup
- **Lab Assignment Guide** - Step-by-step instructions
- **Lecture Slides** - Course material
- **Student Manual** - Assignment requirements
- **Man Pages** - Command documentation

---

**Remember**: Plan your work, work your plan, but be flexible!
