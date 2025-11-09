# Power Dial

A GNOME Shell extension that provides a quick power menu with suspend, restart, power off, and logout options.

<img src="assets/power-dial-tiled-menu.png" alt="Power Dial Tiled Menu">

> Restart your system after enabling the extension for the keyboard shortcut to work properly.

## Usage

### Accessing Power Dial

**Two ways to open the menu:**

- **Keyboard Shortcut**: Press `Alt + F5` (or your custom shortcut)
- **Top Bar Icon**: Click the power icon in the GNOME top bar (if enabled)

> Both methods open the same power menu with suspend, restart, power off, and logout options.

## Requirements

-   GNOME Shell 45 or later
-   Works on both X11 and Wayland

## Power Options

-   **Suspend**: Put system to sleep (immediate action)
-   **Restart**: Reboot the system (configurable confirmation)
-   **Power Off**: Shutdown the system (configurable confirmation)
-   **Log Out**: End current user session (configurable confirmation)

> Restart, Power Off, and Log Out actions can be set to execute immediately or show a confirmation dialog through the preferences.

## User Preferences

### Keyboard Shortcut
Customize the key combination to open Power Dial:

-   **Default**: `Alt + F5`
-   **Customizable**: Access through GNOME Extensions preferences
-   **Advanced Support**: Use multi-key combinations like `Alt + Shift + F5` or `Ctrl + Alt + Shift + A`
-   **Universal Compatibility**: Supports all keyboards including Windows and macOS layouts

### Display Mode
Choose how the power options are presented:

-   **Stacked** (default): Vertical list layout with icons - compact and traditional
-   **Tiled**: 2x2 grid layout - modern card-based interface with keyboard navigation
    -   **Icons with Labels** (default): Display both icons and text labels
    -   **Icons Only**: Show only icons for a minimalist look
    -   **Labels Only**: Display text labels without icons

### Top Bar Icon
Control the visibility of the Power Dial icon in the GNOME top bar:

-   **Enabled** (default): Show icon in top bar for quick access
-   **Disabled**: Hide icon - access only via keyboard shortcut

### Power Options Confirmation
Customize the behavior of power actions to match your workflow:

-   **Confirm** (default): Show GNOME's native confirmation dialog before executing the action
-   **Immediate**: Execute the action immediately without confirmation

> Configure each action independently: Restart, Power Off, and Log Out can each have their own confirmation preference.

## Installation

Download and enable the extension from the GNOME Extensions website:

[Download Power Dial Extension](https://extensions.gnome.org/extension/8563/power-dial/)
