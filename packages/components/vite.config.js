import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import path from "node:path";
// import { defineConfig, UserConfigExport } from "vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const App = async () => {
	var name = "components";

	// const data = await readFile(path.join(__dirname, "src", "lib", "index.jsx"), {
	const data = await readFile(path.join(__dirname, "src", "components.js"), {
		encoding: "utf-8",
	});

	const s = data.split("\n");

	for (let x of s.reverse())
		if (x.includes("export default"))
			name = x.replace("export default ", "").replace(" ", "");

	return defineConfig({
		plugins: [
			react(),
			dts({
				insertTypesEntry: true,
			}),
		],
		build: {
			lib: {
				// entry: path.resolve(__dirname, "src/lib/index.jsx"),
				entry: path.resolve(__dirname, "src/components.js"),
				name,
				formats: ["es", "umd"],
				fileName: (format) => `components.${format}.js`,
			},
			rollupOptions: {
				external: ["react", "react-dom", "sass"],
				output: {
					globals: {
						react: "React",
						"react-dom": "ReactDOM",
						sass: "sass",
					},
				},
			},
		},
	});
};

export default App;
