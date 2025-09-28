import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively copy folder structure from src to dest
 * @param {string} src - Source folder
 * @param {string} dest - Destination folder
 */
function copyFolderStructure(src, dest) {
    if (!fs.existsSync(src)) {
        console.error(`Source folder does not exist: ${src}`);
        return;
    }

    // Create destination folder if it doesn't exist
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    // Read items in the source folder
    fs.readdirSync(src, { withFileTypes: true }).forEach((dirent) => {
        const srcPath = path.join(src, dirent.name);
        const destPath = path.join(dest, dirent.name);

        if (dirent.isDirectory()) {
            // Create folder in destination
            fs.mkdirSync(destPath, { recursive: true });
            // Recursively copy nested folders
            copyFolderStructure(srcPath, destPath);
        }
    });
}

// Updated paths for src/app
const sourceFolder = path.join(__dirname, "src/app");       // source folder
const destinationFolder = path.join(__dirname, "src/app-copy"); // destination folder

copyFolderStructure(sourceFolder, destinationFolder);

console.log(`Folder structure copied from "${sourceFolder}" to "${destinationFolder}"`);
