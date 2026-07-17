import * as Main from "resource:///org/gnome/shell/ui/main.js";
import Meta from "gi://Meta";
import Shell from "gi://Shell";

const KEYBINDING_NAME = "shortcut";

export class KeybindingManager {
	constructor(settings, showPowerMenuCallback) {
		this._settings = settings;
		this._showPowerMenuCallback = showPowerMenuCallback;
		this._settingsChangedId = null;
	}

	_unregister() {
		Main.wm.removeKeybinding(KEYBINDING_NAME);
	}

	_registerKeybinding() {
		// Always remove first so re-enable / settings changes never hit
		// mutter's "Trying to re-add keybinding" path.
		this._unregister();

		const action = Main.wm.addKeybinding(
			KEYBINDING_NAME,
			this._settings,
			Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
			Shell.ActionMode.ALL,
			this._showPowerMenuCallback
		);

		if (action === Meta.KeyBindingAction.NONE)
			console.error("[Power Dial] Failed to register keybinding");
	}

	register() {
		this._registerKeybinding();

		if (!this._settingsChangedId) {
			this._settingsChangedId = this._settings.connect(
				`changed::${KEYBINDING_NAME}`,
				() => this._registerKeybinding()
			);
		}
	}

	destroy() {
		if (this._settingsChangedId) {
			this._settings.disconnect(this._settingsChangedId);
			this._settingsChangedId = null;
		}

		this._unregister();
	}
}
