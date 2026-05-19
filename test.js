const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Running Skill Tests...");

const skillPath = path.join(__dirname, 'second-mind', 'SKILL.md');

// Test 1: SKILL.md exists
assert.ok(fs.existsSync(skillPath), "second-mind/SKILL.md does not exist");
console.log("✅ SKILL.md exists");

const content = fs.readFileSync(skillPath, 'utf-8');

// Test 2: YAML frontmatter exists
assert.ok(content.startsWith('---'), "SKILL.md must start with YAML frontmatter '---'");
console.log("✅ YAML frontmatter present");

// Test 3: Name is kebab-case
const nameMatch = content.match(/name:\s*([a-z0-9\-]+)/);
assert.ok(nameMatch && nameMatch[1], "SKILL.md must have a kebab-case 'name' in frontmatter");
console.log(`✅ Skill name found: ${nameMatch[1]}`);

// Test 4: Description exists and is clear
const descMatch = content.match(/description:\s*(.+)/);
assert.ok(descMatch && descMatch[1].length > 10, "SKILL.md must have a valid 'description'");
console.log("✅ Description found");

// Test 5: Verify no residual scripts mentions like scan_project.py
assert.ok(!content.includes('scan_project.py'), "SKILL.md should not contain references to deprecated scan_project.py script");
console.log("✅ Deprecated scripts removed");

console.log("\nAll tests passed successfully! 🚀");
