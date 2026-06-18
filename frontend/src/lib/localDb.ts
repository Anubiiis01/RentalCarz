import fs from "fs";
import path from "path";

// Define where our local JSON table lives
const filePath = path.join(process.cwd(), "src", "data", "users.json");

// Ensure data directory exists
function ensureDirectoryExistence() {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read users from local disk file
export function readLocalUsers(): any[] {
  ensureDirectoryExistence();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    return [];
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData || "[]");
}

// Write users safely back to local disk file
export function writeLocalUsers(users: any[]) {
  ensureDirectoryExistence();
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}