import * as Main from "resource:///org/gnome/shell/ui/main.js";
import Meta from "gi://Meta";
import Shell from "gi://Shell";
import GLib from "gi://GLib";

export class KeybindingManager {
	constructor(settings, showPowerMenuCallback) {
		this._settings = settings;
		this._showPowerMenuCallback = showPowerMenuCallback;
		this._keybindingId = null;
		this._keybindingRetryTimeoutId = null;
		this._initialDelayTimeoutId = null;
	}

	_registerKeybinding(retryCount = 0) {
		const maxRetries = 5;
		const retryDelay = 1000;

		try {
			try {
				Main.wm.removeKeybinding("shortcut");
			} catch (e) {
				// Ignore if doesn't exist
			}

			this._keybindingId = Main.wm.addKeybinding(
				"shortcut",
				this._settings,
				Meta.KeyBindingFlags.NONE,
				Shell.ActionMode.ALL,
				this._showPowerMenuCallback
			);

			if (!this._keybindingId) {
				throw new Error(
					"Keybinding registration returned null/undefined"
				);
			}
		} catch (error) {
			if (retryCount < maxRetries) {
				if (this._keybindingRetryTimeoutId) {
					GLib.source_remove(this._keybindingRetryTimeoutId);
					this._keybindingRetryTimeoutId = null;
				}
				this._keybindingRetryTimeoutId = GLib.timeout_add(
					GLib.PRIORITY_DEFAULT,
					retryDelay,
					() => {
						this._registerKeybinding(retryCount + 1);
						this._keybindingRetryTimeoutId = null;
						return GLib.SOURCE_REMOVE;
					}
				);
			}
		}
	}

	registerWithDelay(delay = 200) {
		if (this._initialDelayTimeoutId) {
			GLib.source_remove(this._initialDelayTimeoutId);
			this._initialDelayTimeoutId = null;
		}

		this._initialDelayTimeoutId = GLib.timeout_add(
			GLib.PRIORITY_DEFAULT,
			delay,
			() => {
				this._registerKeybinding();
				this._initialDelayTimeoutId = null;
				return GLib.SOURCE_REMOVE;
			}
		);
	}

	destroy() {
		if (this._initialDelayTimeoutId) {
			GLib.source_remove(this._initialDelayTimeoutId);
			this._initialDelayTimeoutId = null;
		}

		if (this._keybindingRetryTimeoutId) {
			GLib.source_remove(this._keybindingRetryTimeoutId);
			this._keybindingRetryTimeoutId = null;
		}

		if (this._keybindingId) {
			try {
				Main.wm.removeKeybinding("shortcut");
			} catch (error) {
				// Error removing keybinding - silently continue
			}
			this._keybindingId = null;
		}
	}

	get keybindingId() {
		return this._keybindingId;
	}
}
