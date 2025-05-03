import {readFileSync, writeFileSync} from "node:fs";

// const targetVersion = process.env.npm_package_version;
// Read version from package.json
const {version: targetVersion} = JSON.parse(
	readFileSync("package.json", "utf8"),
);

// Read minAppVersion from manifest.json and bump version to target version
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const {minAppVersion} = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// Update versions.json with target version and minAppVersion from manifest.json
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
