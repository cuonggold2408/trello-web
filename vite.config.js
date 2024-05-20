import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
    API_LOCAL: `"${process.env.API_LOCAL}"`,
    API_PRODUCTION: `"${process.env.API_PRODUCTION}"`,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
