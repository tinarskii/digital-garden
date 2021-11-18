// @ts-check
const fs = require("fs");
const { Remarkable } = require("remarkable");
var md = new Remarkable({
  html:         true,       
  xhtmlOut:     true,       
  breaks:       true,     
  typographer:  true,
  quotes: '“”‘’',
 });

const listPages = fs.readdirSync("./pages");

listPages.forEach((listPages) => {
  const files = fs.readdirSync(
    listPages.endsWith(".md") ? `./pages/` : `./pages/${listPages}`
  );

  if (!listPages.endsWith(".md")) {
    if (!fs.existsSync(`./build/pages/${listPages}`)) {
      fs.mkdirSync(`./build/pages/${listPages}`);
    }
    files.forEach((file) => {
      const content = fs.readFileSync(`./pages/${listPages}/${file}`, "utf8");
      const html = md.render(content);
      fs.writeFileSync(
        `./build/pages/${listPages}/${file.replace(".md", ".html")}`,
        html
      );
    });
  } else {
    files
      .filter((f) => f.endsWith(".md"))
      .forEach((file) => {
        const content = fs.readFileSync(`./pages/${file}`, "utf8");
        const html = md.render(content);
        fs.writeFileSync(`./build/pages/${file.replace(".md", ".html")}`, html);
      });
  }
});