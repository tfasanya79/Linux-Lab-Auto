# Lecture 8: Bash

Practice questions for the **Bash** lecture. For full notes, see the [Study Guide: Bash](../study-guide/bash.md).

<details>
<summary>Key points for exam</summary>

- Shebang: #!/bin/bash; chmod +x script.sh; ./script.sh or bash script.sh
- Variables: name=value (no spaces); $var, ${var}; $(command) command substitution
- Conditionals: [ -f file ], [ -d dir ], [ -eq ], [ str1 = str2 ]; if ... fi; case ... esac
- Loops: for ... in ...; do ... done; while [ ]; do ... done
- Special: $0, $1, $@, $#, $? (exit status); exit 0/1
- Redirect: >, >>, 2>&1, &lt; ; quote variables to avoid word splitting

</details>

---

<div class="learning-question" data-correct="0" data-explanation="The shebang #!/bin/bash on the first line tells the system which interpreter to use to run the script. Without it, the script might be run by the wrong shell.">
  <p><strong>Q1.</strong> What is the purpose of #!/bin/bash at the start of a script?</p>
  <label><input type="radio" name="l8q1" value="0"> It tells the system to use bash to run the script</label><br>
  <label><input type="radio" name="l8q1" value="1"> It disables error checking</label><br>
  <label><input type="radio" name="l8q1" value="2"> It makes the script run in the background</label><br>
  <label><input type="radio" name="l8q1" value="3"> It is only a comment and has no effect</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="In bash, use $variable or ${variable} to expand a variable. No spaces around = when assigning; quotes are needed for strings with spaces.">
  <p><strong>Q2.</strong> How do you use the value of a variable in bash?</p>
  <label><input type="radio" name="l8q2" value="0"> %variable</label><br>
  <label><input type="radio" name="l8q2" value="1"> #variable</label><br>
  <label><input type="radio" name="l8q2" value="2"> $variable or ${variable}</label><br>
  <label><input type="radio" name="l8q2" value="3"> @variable</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="[ -f file ] is true if file exists and is a regular file. [ -d dir ] is for directories; -r, -w, -x test read, write, execute permissions.">
  <p><strong>Q3.</strong> Which test checks if a path is a regular file?</p>
  <label><input type="radio" name="l8q3" value="0"> [ -d file ]</label><br>
  <label><input type="radio" name="l8q3" value="1"> [ -f file ]</label><br>
  <label><input type="radio" name="l8q3" value="2"> [ -e file ]</label><br>
  <label><input type="radio" name="l8q3" value="3"> [ -r file ]</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="$? holds the exit status of the last command. 0 usually means success; non-zero means failure. Scripts should check $? or use if command; then ... fi.">
  <p><strong>Q4.</strong> What does $? contain in bash?</p>
  <label><input type="radio" name="l8q4" value="0"> Exit status of the last command</label><br>
  <label><input type="radio" name="l8q4" value="1"> Number of arguments passed to the script</label><br>
  <label><input type="radio" name="l8q4" value="2"> Process ID of the current shell</label><br>
  <label><input type="radio" name="l8q4" value="3"> First argument to the script</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="3" data-explanation="Command substitution $(command) captures the output of command. Preferred over backticks. Example: files=$(ls) stores the list of files in the variable files.">
  <p><strong>Q5.</strong> How do you capture the output of a command into a variable in bash?</p>
  <label><input type="radio" name="l8q5" value="0"> var = command</label><br>
  <label><input type="radio" name="l8q5" value="1"> var <- command</label><br>
  <label><input type="radio" name="l8q5" value="2"> var &amp; command</label><br>
  <label><input type="radio" name="l8q5" value="3"> var=$(command)</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="Redirecting both stdout and stderr to a file is done with command > file 2>&1 (or command &amp;> file in bash). > file alone only redirects stdout.">
  <p><strong>Q6.</strong> How do you redirect both stdout and stderr to the same file?</p>
  <label><input type="radio" name="l8q6" value="0"> command > file</label><br>
  <label><input type="radio" name="l8q6" value="1"> command 2> file</label><br>
  <label><input type="radio" name="l8q6" value="2"> command > file 2>&1</label><br>
  <label><input type="radio" name="l8q6" value="3"> command | file</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="$1 is the first argument, $2 the second, $@ is all arguments, $# is the number of arguments. $0 is the script name.">
  <p><strong>Q7.</strong> In a bash script, what does $1 refer to?</p>
  <label><input type="radio" name="l8q7" value="0"> The first argument passed to the script</label><br>
  <label><input type="radio" name="l8q7" value="1"> The script name</label><br>
  <label><input type="radio" name="l8q7" value="2"> The exit code</label><br>
  <label><input type="radio" name="l8q7" value="3"> The number of arguments</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="1" data-explanation="For numeric comparison in [ ] you use -eq (equal), -ne (not equal), -lt (less than), -gt (greater than). The = operator is for string comparison.">
  <p><strong>Q8.</strong> How do you test if two numbers are equal in a bash [ ] test?</p>
  <label><input type="radio" name="l8q8" value="0"> [ num1 == num2 ]</label><br>
  <label><input type="radio" name="l8q8" value="1"> [ num1 -eq num2 ]</label><br>
  <label><input type="radio" name="l8q8" value="2"> [ num1 equals num2 ]</label><br>
  <label><input type="radio" name="l8q8" value="3"> [ num1 = num2 ]</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="2" data-explanation="A for loop iterates over a list: for item in a b c; do echo $item; done. You can use *.txt for files, or $(command) for command output. C-style for ((i=0;i&lt;10;i++)) also exists.">
  <p><strong>Q9.</strong> In bash, how do you loop over a list of items?</p>
  <label><input type="radio" name="l8q9" value="0"> loop item in list</label><br>
  <label><input type="radio" name="l8q9" value="1"> while [ list ]</label><br>
  <label><input type="radio" name="l8q9" value="2"> for item in list; do ... done</label><br>
  <label><input type="radio" name="l8q9" value="3"> foreach item list</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

<div class="learning-question" data-correct="0" data-explanation="Best practices: use shebang, quote variables to prevent word splitting, check exit codes ($?), use functions, add comments, validate input. set -e exits on first command failure.">
  <p><strong>Q10.</strong> Which is a recommended bash scripting practice?</p>
  <label><input type="radio" name="l8q10" value="0"> Quote variables and check exit codes ($?)</label><br>
  <label><input type="radio" name="l8q10" value="1"> Never use functions</label><br>
  <label><input type="radio" name="l8q10" value="2"> Use spaces around = in assignments</label><br>
  <label><input type="radio" name="l8q10" value="3"> Never use [ ] tests</label><br>
  <button type="button" class="check-learning">Check</button>
  <div class="learning-feedback" aria-live="polite"></div>
</div>

## Further reading / External resources

- **Man pages:** `man bash`, `man test` — full bash and [ ] test syntax.
- **Bash Guide:** [mywiki.wooledge.org/BashGuide](https://mywiki.wooledge.org/BashGuide) — community bash guide.
- **Arch Wiki – [Bash](https://wiki.archlinux.org/title/Bash):** Scripting, variables, conditionals; distribution-agnostic.
