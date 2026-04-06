(function () {
    'use strict';

    window.onSave = async (event) => {
        event.preventDefault();
        const client = SDPIComponents.streamDeckClient;
        const ipField = document.querySelector('sdpi-textfield[setting="ipAddress"]');
        const portField = document.querySelector('sdpi-textfield[setting="port"]');
        if (ipField && portField) {
            const payload = {
                ipAddress: ipField.value,
                port: parseInt(portField.value, 10) || 80,
            };
            // 4. グローバル設定として保存
            try {
                await client.setGlobalSettings(payload);
                console.log("Settings saved to Global Settings:", payload);
            }
            catch (e) {
                console.error("Save failed", e instanceof Error ? e.message : e);
            }
        }
    };
    const init = () => {
        const client = SDPIComponents.streamDeckClient;
        client.didReceiveGlobalSettings.subscribe((ev) => {
            const settings = ev.payload.settings;
            const ipField = document.querySelector('sdpi-textfield[setting="ipAddress"]');
            const portField = document.querySelector('sdpi-textfield[setting="port"]');
            if (ipField && settings.ipAddress)
                ipField.value = settings.ipAddress;
            if (portField && settings.port)
                portField.value = settings.port.toString();
        });
    };
    // 実行
    init();

})();
//# sourceMappingURL=global-settings.js.map
