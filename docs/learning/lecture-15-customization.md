# Lecture 15: Customization

Practice questions for the **Customization** lecture. For full notes, see the [Study Guide: Customization](../study-guide/customization.md).

<details>
<summary>Key points for exam</summary>

- Locale: LANG, LC_TIME, LC_MONETARY, etc.; language_territory.codeset (e.g. en_US.UTF-8)
- Debian: /etc/default/locale; localectl (status, set-locale, list-locales)
- Time: timedatectl (set-timezone, set-ntp); NTP via systemd-timesyncd or ntpd
- Keyboard: /etc/default/keyboard (Debian); localectl set-keymap, set-x11-keymap
- Use UTF-8 for locale; set early in config

</details>

---

<div class="learning-question" data-correct="1" data-explanation="A locale defines language, territory, and formatting (date, time, numbers, currency). It is identified by strings like en_US.UTF-8 or sv_SE. LANG and LC_* environment variables set it.">
  <p><strong>Q1.</strong> What is a locale?</p>
  <label><input type="radio" name="l15q1" value="0"> A type of filesystem</label><br>
  <label><input type="radio" name="l15q1" value="1"> A set of parameters for language, region, and formatting (date, time, numbers)</label><br>
  <label><input type="radio" name="l15q1" value="2"> A network location</label><br>
  <label><input type="radio" name="l15q1" value="3"> A user account</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="LANG sets the default locale for all categories. LC_TIME, LC_MONETARY, LC_NUMERIC, etc. override specific categories. LC_ALL overrides everything if set.">
  <p><strong>Q2.</strong> Which environment variable sets the default locale?</p>
  <label><input type="radio" name="l15q2" value="0"> LANG</label><br>
  <label><input type="radio" name="l15q2" value="1"> LOCALE</label><br>
  <label><input type="radio" name="l15q2" value="2"> LANGUAGE</label><br>
  <label><input type="radio" name="l15q2" value="3"> TZ</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="timedatectl shows and sets timezone, time, and NTP. timedatectl set-timezone Europe/Stockholm sets the timezone; timedatectl set-ntp true enables NTP sync.">
  <p><strong>Q3.</strong> Which command do you use to set the system timezone?</p>
  <label><input type="radio" name="l15q3" value="0"> date --set-timezone</label><br>
  <label><input type="radio" name="l15q3" value="1"> tzconfig</label><br>
  <label><input type="radio" name="l15q3" value="2"> timedatectl set-timezone</label><br>
  <label><input type="radio" name="l15q3" value="3"> echo TZ > /etc/timezone</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="LC_TIME controls date and time format (e.g. 12h vs 24h, order of day/month/year). LC_MONETARY is for currency; LC_NUMERIC for number format; LC_MESSAGES for message language.">
  <p><strong>Q4.</strong> Which locale category controls date and time format?</p>
  <label><input type="radio" name="l15q4" value="0"> LC_MONETARY</label><br>
  <label><input type="radio" name="l15q4" value="1"> LC_NUMERIC</label><br>
  <label><input type="radio" name="l15q4" value="2"> LC_MESSAGES</label><br>
  <label><input type="radio" name="l15q4" value="3"> LC_TIME</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="On Debian, system-wide locale can be set in /etc/default/locale (e.g. LANG=en_US.UTF-8). User-specific: ~/.bashrc or ~/.bash_profile. localectl is used on some other distros.">
  <p><strong>Q5.</strong> On Debian, where is system-wide locale typically configured?</p>
  <label><input type="radio" name="l15q5" value="0"> /etc/default/locale</label><br>
  <label><input type="radio" name="l15q5" value="1"> /etc/locale.conf only</label><br>
  <label><input type="radio" name="l15q5" value="2"> /etc/environment only</label><br>
  <label><input type="radio" name="l15q5" value="3"> /usr/share/locale</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="timedatectl set-ntp true enables NTP time synchronization (e.g. via systemd-timesyncd). timedatectl timesync-status shows sync status. Keeps the system clock accurate.">
  <p><strong>Q6.</strong> How do you enable NTP time synchronization on a systemd-based system?</p>
  <label><input type="radio" name="l15q6" value="0"> ntpdate only</label><br>
  <label><input type="radio" name="l15q6" value="1"> timedatectl set-ntp true</label><br>
  <label><input type="radio" name="l15q6" value="2"> echo NTP=1 > /etc/ntp</label><br>
  <label><input type="radio" name="l15q6" value="3"> systemctl enable ntp (only, no timedatectl)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="localectl can show and set keymap (console and X11). Examples: localectl set-keymap keymap, localectl set-x11-keymap layout. On Debian, /etc/default/keyboard is also used.">
  <p><strong>Q7.</strong> Which tool is used to configure keyboard layout (e.g. for console or X11)?</p>
  <label><input type="radio" name="l15q7" value="0"> timedatectl</label><br>
  <label><input type="radio" name="l15q7" value="1"> locale</label><br>
  <label><input type="radio" name="l15q7" value="2"> localectl (set-keymap, set-x11-keymap)</label><br>
  <label><input type="radio" name="l15q7" value="3"> keymap-config</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Use UTF-8 (e.g. en_US.UTF-8) for locale to support international characters. Set locale early in system or user config; use system tools (localectl, timedatectl) where available.">
  <p><strong>Q8.</strong> Why use UTF-8 for the locale codeset?</p>
  <label><input type="radio" name="l15q8" value="0"> To support international characters and consistent encoding</label><br>
  <label><input type="radio" name="l15q8" value="1"> It is required by the kernel only</label><br>
  <label><input type="radio" name="l15q8" value="2"> It is faster than other encodings</label><br>
  <label><input type="radio" name="l15q8" value="3"> It is only for the keyboard</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man localectl`, `man timedatectl` — locale and time configuration.
- **Arch Wiki – [Locale](https://wiki.archlinux.org/title/Locale), [Keyboard configuration](https://wiki.archlinux.org/title/Keyboard_configuration):** Locale and keyboard; distribution-agnostic.
- **Debian:** [Debian Administrator's Handbook – Localization](https://debian-handbook.info/browse/stable/sect.other-languages.html) — locale, timezone.
