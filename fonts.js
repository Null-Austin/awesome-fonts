let root = async () => {
  // load fonts
  let fonts = await (await fetch("./fonts.json")).json();

  // load imports
  (() => {
    let imports = fonts.imports;
    for (let i = 0; i < imports.length; i++) {
      let im = imports[i]; // temp
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = im;
      document.head.appendChild(link);
    }
  })();

  // load font css
  (() => {
    let fontsList = fonts.fonts;
    let style = document.createElement("style");
    let keys = Object.keys(fontsList);
    for (let i = 0; i < keys.length; i++) {
      let f = keys[i]; // name of the font
      let fontFamily = fontsList[f].fontFamily;
      style.textContent += `.${f} { font-family: ${fontFamily}; }\n`;
    }
    document.head.appendChild(style);

    for (let i = 0; i < keys.length; i++) {
      let f = keys[i]; // name of the font
      let name = fontsList[f].name;

      let text1 = document.createElement("div");
      let text2 = document.createElement("h3");
      let text3 = document.createElement("span");

      text1.classList.add("font");
      text1.dataset.fontName = name.toLowerCase();
      text2.classList.add("font-name");
      text3.classList.add("sample");

      text3.textContent = `bababadalgharaghtakamminarronnkonnbronntonnerronntuonnthunntrovarrhounawnskawntoohoohoordenenthurnuk`;
      text2.textContent = name;

      text1.appendChild(text2);
      text1.appendChild(text3);
      text3.classList.add(f);

      document.querySelector("#fonts").appendChild(text1);
    }

    // search
    const searchInput = document.getElementById("search-input");
    const searchStats = document.getElementById("search-stats");
    const fontCards = Array.from(document.querySelectorAll("#fonts .font"));

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      const t0 = performance.now();
      let visible = 0;
      fontCards.forEach(card => {
        const matches = !query || card.dataset.fontName.includes(query);
        card.style.display = matches ? "" : "none";
        if (matches) visible++;
      });
      const ms = performance.now() - t0;
      searchStats.textContent = `Volume: ${visible}   Time taken: ${ms.toFixed(0)}ms / ${(ms / 1000).toFixed(3)}s`;
    });
  })();
};

document.addEventListener("DOMContentLoaded", root);
