# Scan Exclusions

Patterns and file paths to skip during project scans. Used by `scan_project.py` and `scan_chats.py`.

## Directories to exclude

Entire folders matching these patterns are skipped:

```
node_modules/
.git/
venv/
env/
.venv/
__pycache__/
.pytest_cache/
dist/
build/
*.egg-info/
.next/
.nuxt/
coverage/
.coverage/
htmlcov/
.nyc_output/
.tox/
.cache/
.mypy_cache/
.dmypy.json/
dmypy.json/
.pyre/
target/
.gradle/
.idea/
.vscode/
.DS_Store/
.env/
tmp/
temp/
logs/
.turbo/
.swc/
out/
.vercel/
.amplify/
```

## File patterns to exclude

Individual files matching these patterns are skipped:

```
*.lock
package-lock.json
yarn.lock
pnpm-lock.yaml
Pipfile.lock
poetry.lock
Gemfile.lock
.env
.env.local
.env.*.local
*.log
*.pyc
*.pyo
*.pyd
.Python
*.so
*.dll
*.dylib
*.exe
*.class
*.jar
*.o
*.a
*.lib
*.a
*.so.a
*.min.js
*.min.css
*.min.map
*.d.ts (if not meaningful for the project)
*.map
*.swp
*~
.DS_Store
Thumbs.db
```

## File types to exclude

Skip files with these extensions:

```
.git*
.svn*
.hg*
.bzr*
.fossil*
.orig
.bak
.tmp
.swp
.swo
.swn
.backup
.cache
.temp
```

## Special cases

### Config files (usually include)
- `.env.example` — **INCLUDE** (safe, no secrets)
- `docker-compose.yml` — **INCLUDE**
- `Dockerfile` — **INCLUDE**
- `.github/workflows/*.yml` — **INCLUDE**
- `.gitlab-ci.yml` — **INCLUDE**
- `package.json` — **INCLUDE**
- `requirements.txt` — **INCLUDE**
- `setup.py` — **INCLUDE**
- `tsconfig.json` — **INCLUDE**
- `jest.config.js` — **INCLUDE**
- `.eslintrc.js` — **INCLUDE**

### Secrets (always exclude)
- `.env` — **EXCLUDE** (contains real secrets)
- `.env.production` — **EXCLUDE**
- `secrets.json` — **EXCLUDE**
- `.aws/credentials` — **EXCLUDE**
- `.ssh/` — **EXCLUDE**
- `.kube/config` — **EXCLUDE**
- `*.pem` — **EXCLUDE** (private keys)
- `*.key` — **EXCLUDE** (private keys)

### Documentation (usually include)
- `README.md` — **INCLUDE**
- `CONTRIBUTING.md` — **INCLUDE**
- `ARCHITECTURE.md` — **INCLUDE**
- `*.md` in `/docs/` — **INCLUDE**
- `/docs/` — **INCLUDE**

### Third-party (always exclude)
- `vendor/` — **EXCLUDE**
- `third_party/` — **EXCLUDE**
- `external/` — **EXCLUDE**

### Generated (always exclude)
- `.generated/` — **EXCLUDE**
- `generated/` — **EXCLUDE**
- `.next/` — **EXCLUDE**
- `.nuxt/` — **EXCLUDE**
- `dist/` — **EXCLUDE**
- `build/` — **EXCLUDE**
- `out/` — **EXCLUDE**

### Tests (usually include; exclude coverage)
- `test/` — **INCLUDE** (extract test structure, open todos)
- `tests/` — **INCLUDE**
- `__tests__/` — **INCLUDE**
- `spec/` — **INCLUDE**
- `coverage/` — **EXCLUDE**
- `.nyc_output/` — **EXCLUDE**
- `htmlcov/` — **EXCLUDE**

## Implementation in scan_project.py

```python
EXCLUDE_DIRS = {
    'node_modules', '.git', 'venv', 'env', '.venv', '__pycache__',
    '.pytest_cache', 'dist', 'build', '*.egg-info', '.next', '.nuxt',
    'coverage', '.coverage', 'htmlcov', '.nyc_output', '.tox', '.cache',
    '.mypy_cache', '.dmypy.json', '.pyre', 'target', '.gradle', '.idea',
    '.vscode', '.DS_Store', '.env', 'tmp', 'temp', 'logs', '.turbo', '.swc',
    'out', '.vercel', '.amplify', 'vendor', 'third_party', 'external',
    '.generated', 'generated'
}

EXCLUDE_FILES = {
    '*.lock', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
    'Pipfile.lock', 'poetry.lock', 'Gemfile.lock', '.env',
    '*.log', '*.pyc', '*.pyo', '*.pyd', '.Python', '*.so',
    '*.dll', '*.dylib', '*.exe', '*.class', '*.jar', '*.o',
    '*.min.js', '*.min.css', '*.min.map', '*.map', '*.swp',
    '*~', '.DS_Store', 'Thumbs.db'
}

# Usage in glob:
import fnmatch
def should_scan(filepath):
    for exclude in EXCLUDE_DIRS | EXCLUDE_FILES:
        if fnmatch.fnmatch(filepath, exclude):
            return False
    return True
```

## Rationale

- **Speed:** Excluding large directories (node_modules, .git) dramatically reduces scan time
- **Accuracy:** Excluding generated files prevents noise in the vault
- **Safety:** Excluding .env and secrets prevents accidental exposure
- **Signal:** Excluding lock files reduces clutter while keeping meaningful configuration files

## Updates

If scanning a project and finding too much noise, add the specific folder to EXCLUDE_DIRS and re-run the scan.

If finding the scan is too slow, profile with larger exclusions first, then gradually reduce them.

