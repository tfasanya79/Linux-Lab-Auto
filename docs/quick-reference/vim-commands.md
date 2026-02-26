# Vim Commands Quick Reference

## Basic Navigation

| Command | Description |
|---------|-------------|
| `h` | Move left |
| `j` | Move down |
| `k` | Move up |
| `l` | Move right |
| `w` | Move forward by word |
| `e` | Move to end of word |
| `b` | Move backward by word |
| `0` | Start of line |
| `^` | First non-whitespace character |
| `$` | End of line |
| `gg` | Move to start of file |
| `G` | Move to end of file |
| `5G` | Jump to line 5 |
| `:5` | Jump to line 5 |

## Insert Mode

| Command | Description |
|---------|-------------|
| `i` | Insert before cursor |
| `a` | Append after cursor |
| `I` | Insert at beginning of line |
| `A` | Append at end of line |
| `o` | Open new line below |
| `O` | Open new line above |
| `Esc` | Exit insert mode |

## Saving and Exiting

| Command | Description |
|---------|-------------|
| `:w` | Save changes |
| `:q` | Quit |
| `:wq` | Save and quit |
| `:x` | Save and quit (same as :wq) |
| `ZZ` | Save and quit |
| `:q!` | Quit without saving |
| `ZQ` | Quit without saving |

## Deleting and Copying

| Command | Description |
|---------|-------------|
| `x` | Delete character under cursor |
| `X` | Delete character before cursor |
| `dd` | Delete current line |
| `5dd` | Delete 5 lines |
| `dw` | Delete word |
| `D` | Delete to end of line |
| `yy` | Yank (copy) current line |
| `5yy` | Yank 5 lines |
| `yw` | Yank word |
| `p` | Paste after cursor |
| `P` | Paste before cursor |

## Searching

| Command | Description |
|---------|-------------|
| `/pattern` | Search forward for pattern |
| `?pattern` | Search backward for pattern |
| `n` | Repeat search forward |
| `N` | Repeat search backward |
| `*` | Search for word under cursor forward |
| `#` | Search for word under cursor backward |

## Undo and Redo

| Command | Description |
|---------|-------------|
| `u` | Undo last action |
| `Ctrl+r` | Redo undone action |
| `U` | Undo all changes on current line |

## Visual Mode

| Command | Description |
|---------|-------------|
| `v` | Visual select (character) |
| `V` | Visual select (line) |
| `Ctrl+v` | Visual block select |
| `d` | Delete selection |
| `y` | Yank selection |
| `>` | Indent selection |
| `<` | Unindent selection |

## Replace

| Command | Description |
|---------|-------------|
| `:s/old/new` | Replace first occurrence in line |
| `:s/old/new/g` | Replace all occurrences in line |
| `:%s/old/new/g` | Replace all occurrences in file |
| `:%s/old/new/gc` | Replace with confirmation |
| `r` | Replace single character |
| `R` | Replace mode (overwrite) |

## Other Useful Commands

| Command | Description |
|---------|-------------|
| `:set nu` | Show line numbers |
| `:set nonu` | Hide line numbers |
| `:set number` | Show line numbers |
| `:set relativenumber` | Show relative line numbers |
| `:%s/old/new/g` | Replace globally |
| `:!command` | Execute shell command |
| `:r file` | Read file into buffer |
| `:w file` | Write buffer to file |
| `Ctrl+g` | Show file information |

## Vim Modes

Vim uses different modes:

- **Normal mode** - Default mode for navigation and commands
- **Insert mode** - For typing text
- **Command mode** - For entering commands (start with `:`)
- **Visual mode** - For selecting text
- **Replace mode** - For overwriting text

## Tips

1. **Stay in Normal mode** - Most of the time you should be in Normal mode
2. **Use motions** - Combine commands with motions (e.g., `dw`, `d$`)
3. **Use counts** - Numbers can be used with commands (e.g., `5dd`, `3w`)
4. **Practice** - Vim takes time to learn, but it's worth it
5. **Use :help** - Vim has extensive built-in help (`:help`)

## Common Workflows

### Editing a File

1. Open file: `vim filename`
2. Navigate to location
3. Enter insert mode: `i`
4. Make changes
5. Exit insert mode: `Esc`
6. Save and quit: `:wq`

### Finding and Replacing

1. Search: `/pattern`
2. Navigate: `n` or `N`
3. Replace: `:%s/old/new/g`

### Copying and Pasting

1. Select text: `v` (visual mode)
2. Copy: `y`
3. Move to destination
4. Paste: `p`

---

**Remember**: Press `Esc` to get back to Normal mode, and use `:help` for more information!
