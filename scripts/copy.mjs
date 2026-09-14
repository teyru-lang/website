// Copies the static files that `tsc` does not handle into dist/.
import { copyFile, mkdir } from "node:fs/promises";

const staticFiles = ["index.html", "styles.css"];

await mkdir("dist", { recursive: true });
await Promise.all(staticFiles.map((file) => copyFile(file, `dist/${file}`)));

console.log(`copied ${staticFiles.join(", ")} -> dist/`);
