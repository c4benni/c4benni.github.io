export function setMeta() {
    const meta = this.$options.uiMeta;

        const templates = {
          title: " - FendUI",
        };

        for (let key in meta?.text || {}) {
          const el = document.getElementById(`ui-meta-${key}`);

          if (el) {
            el.innerText = meta.text[key] + templates[key] || "";
          }
        }

}