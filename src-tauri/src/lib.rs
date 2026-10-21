// The desktop app only shows the offline web app in a native window.
// It has no server, no accounts and no custom commands, so it can call nothing outside the app files.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running Benni Teacher Assistant");
}
