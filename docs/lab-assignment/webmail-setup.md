# Webmail Setup

## Overview

Install and configure Roundcube webmail interface on the webmail server.

## Prerequisites

- Webmail server VM created (IP: `10.[room].[group].14`)
- Mail server working and accessible
- DNS configured with webmail A record

## Installation Order

**Important:** Install MariaDB BEFORE Roundcube!

### Step 1: Install MariaDB

```bash
sudo apt update
sudo apt install mariadb-server
```

During installation, set root password if prompted.

### Step 2: Install Roundcube

```bash
sudo apt install roundcube roundcube-mysql
```

During installation:
- Select database: `mysql`
- Database server: `localhost`
- Database name: `roundcube`
- Database user: `roundcube`
- Database password: Set a secure password

## Apache Configuration

### Verify Apache is Running

```bash
sudo systemctl status apache2
```

### Configure Virtual Host

Roundcube should be accessible at `http://webmail.[login].it387g.nsa.his.se`

**Option 1: Default Configuration**
- Roundcube may be installed at `/var/www/html/roundcube`
- Access via: `http://webmail.[login].it387g.nsa.his.se/roundcube`

**Option 2: Create Virtual Host**

Create `/etc/apache2/sites-available/webmail.conf`:

```apache
<VirtualHost *:80>
    ServerName webmail.[login].it387g.nsa.his.se
    DocumentRoot /usr/share/roundcube
    
    <Directory /usr/share/roundcube>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/webmail_error.log
    CustomLog ${APACHE_LOG_DIR}/webmail_access.log combined
</VirtualHost>
```

**Enable site:**
```bash
sudo a2ensite webmail.conf
sudo systemctl reload apache2
```

**Redirect to Roundcube:**
Create `/var/www/html/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/roundcube/">
</head>
<body>
    <p>Redirecting to <a href="/roundcube/">Roundcube</a>...</p>
</body>
</html>
```

## Roundcube Configuration

### Main Configuration

Edit `/etc/roundcube/config.inc.php`:

```bash
sudo nano /etc/roundcube/config.inc.php
```

**Key Settings:**
```php
// IMAP server
$config['default_host'] = 'mail.[login].it387g.nsa.his.se';
$config['default_port'] = 143;

// SMTP server
$config['smtp_server'] = 'mail.[login].it387g.nsa.his.se';
$config['smtp_port'] = 25;

// Database
$config['db_dsnw'] = 'mysql://roundcube:password@localhost/roundcube';

// Security
$config['des_key'] = 'your-random-key-here';
```

### Generate Des Key

```bash
# Generate random key
openssl rand -base64 24
```

Use this for `$config['des_key']`.

## Testing Webmail

### Step 5: Access Roundcube

1. **Open web browser** on management machine or any machine with network access

2. **Navigate to webmail:**
   - URL: `http://webmail.[login].it387g.nsa.his.se`
   - Or: `http://webmail.[login].it387g.nsa.his.se/roundcube`
   - Replace `[login]` with your actual login

3. **Should see Roundcube login page:**
   - Roundcube logo
   - Username field
   - Password field
   - Login button
   - **📸 Screenshot Point:** Take screenshot of Roundcube login page

### Step 6: Login Test

1. **Enter credentials:**
   - Username: `oljo` (or username for olivia.johnson)
   - Password: The password you set for this user

2. **Click "Login" button**

3. **Should successfully log in:**
   - See Roundcube interface
   - Mailbox folders on left
   - Main content area
   - **📸 Screenshot Point:** Take screenshot of successful login showing Roundcube interface

### Step 7: Send Test Email

1. **Click "Compose" button** (usually top left or prominent button)

2. **Fill in email form:**
   - **To:** Enter `autoreply@nsa.his.se`
   - **From:** Should automatically show `olivia.johnson@[login].it387g.nsa.his.se`
   - **Subject:** Enter "Test Email" or similar
   - **Message body:** Enter "This is a test message from the lab assignment."

3. **Click "Send" button**

4. **Should see confirmation:**
   - "Message sent successfully" or similar
   - Email appears in "Sent" folder
   - **📸 Screenshot Point:** Take screenshot showing email composition and send confirmation

5. **Wait 2-3 minutes** for autoreply to arrive

### Step 8: Receive Email Test

1. **Click "Inbox"** in left sidebar (or refresh page)

2. **Look for new email:**
   - Should see email from `autoreply@nsa.his.se`
   - Subject line showing it's a reply

3. **Click on the email** to open it

4. **View email content:**
   - Should see your original message quoted
   - Should see autoreply message
   - **MUST see fortune cookie** in the response
   - **📸 Screenshot Point:** Take screenshot showing received email with fortune cookie visible

5. **Verify fortune cookie is visible:**
   - Scroll through entire email
   - Fortune cookie should be clearly visible
   - **📸 Screenshot Point:** Take close-up screenshot of fortune cookie text (for demonstration)

## Troubleshooting

### Cannot Access Webmail

1. Check Apache is running: `systemctl status apache2`
2. Check DNS: `dig webmail.[login].it387g.nsa.his.se`
3. Check firewall: `sudo ufw status`
4. Check Apache logs: `sudo tail -f /var/log/apache2/error.log`

### Login Fails

1. Check IMAP server: `telnet mail.[login].it387g.nsa.his.se 143`
2. Verify user exists and password is correct
3. Check Roundcube logs: `sudo tail -f /var/log/roundcube/errors.log`
4. Check Dovecot logs: `journalctl -u dovecot`

### Cannot Send Email

1. Check SMTP server: `telnet mail.[login].it387g.nsa.his.se 25`
2. Verify Postfix is running
3. Check Roundcube SMTP configuration
4. Check mail logs: `sudo tail -f /var/log/mail.log`

### Database Errors

1. Check MariaDB is running: `systemctl status mariadb`
2. Verify database exists: `mysql -u roundcube -p -e "SHOW DATABASES;"`
3. Check database permissions
4. Review Roundcube database configuration

## Logs

### Roundcube Logs

```bash
# Error log
sudo tail -f /var/log/roundcube/errors.log

# Apache logs
sudo tail -f /var/log/apache2/error.log
sudo tail -f /var/log/apache2/access.log
```

### Mail Logs

```bash
# Mail server logs
sudo tail -f /var/log/mail.log
```

## Next Steps

Once webmail is working:

1. Test sending email to `autoreply@nsa.his.se`
2. Verify receiving autoreply with fortune cookie
3. Proceed to [SSH Setup](ssh-setup.md)
4. Complete [Testing](testing.md) section

---

**Remember**: Webmail must work before demonstration. Test thoroughly!
