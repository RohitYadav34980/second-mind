# Contributing to Second Mind

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, check the [issue list](https://github.com/RohitYadav34980/second-mind/issues) to avoid duplicates.

When you create a bug report, include:
- **Clear title and description**
- **Exact reproduction steps**
- **Specific examples** (code, chat logs, config)
- **Expected behavior**
- **Actual behavior**
- **Environment** (Node/Python version, OS, Claude version)

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/RohitYadav34980/second-mind/issues).

When creating an enhancement suggestion, include:
- **Clear title and description**
- **Motivation** — Why would this be useful?
- **Proposed solution** — How should it work?
- **Alternatives** — Any other approaches?

### Pull Requests

1. **Fork and clone** the repository
2. **Create a branch** for your feature: `git checkout -b feature/amazing-feature`
3. **Make changes** following the code style below
4. **Write tests** for new functionality
5. **Test thoroughly** — Run full test suite
6. **Commit with clear messages** — Use conventional commits
7. **Push to your fork** and create a pull request

**Pull Request Guidelines:**
- Follow the existing code style
- Include tests for new features
- Update documentation if needed
- Link related issues
- One feature per PR when possible

## Development Setup

### Prerequisites

- Node.js 16+
- Python 3.8+
- Git
- npm or yarn

### Local Setup

```bash
# Clone repository
git clone https://github.com/RohitYadav34980/second-mind.git
cd second-mind

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Watch mode for development
npm run test:watch

# Linting
npm run lint

# Format code
npm run format
```

## Code Style

### JavaScript/TypeScript

- Use **TypeScript** for new code
- Follow **ESLint** rules (run `npm run lint`)
- Format with **Prettier** (run `npm run format`)
- Use meaningful variable names
- Add comments for complex logic
- Write tests for new functionality

### Example Code Style

```typescript
// ✓ Good
export interface VaultConfig {
  projectRoot: string;
  gitCommit: boolean;
}

export async function scanProject(
  root: string,
  options?: Partial<VaultConfig>
): Promise<ProjectScan> {
  const config = { projectRoot: root, ...options };
  // Implementation
}

// ✗ Bad
export async function scan(r, o) {
  // Missing types, unclear names
}
```

### Documentation

- Use **clear, concise language**
- Add code examples where helpful
- Link to related docs
- Keep README at 200-300 lines
- Put detailed docs in `/docs/`

## Testing

### Writing Tests

- Tests go in `src/**/*.test.ts`
- Use **Jest** testing framework
- Aim for **80%+ coverage** on critical paths
- Test both happy path and edge cases

```typescript
describe('VaultBuilder', () => {
  it('should create vault structure', () => {
    const builder = new VaultBuilder('./test-vault');
    builder.createStructure();
    expect(fs.existsSync('./test-vault/knowledge-base')).toBe(true);
  });

  it('should handle missing project root', () => {
    const builder = new VaultBuilder('./nonexistent');
    expect(() => builder.createStructure()).toThrow();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat** — New feature
- **fix** — Bug fix
- **docs** — Documentation
- **style** — Formatting (no logic change)
- **refactor** — Code reorganization
- **test** — Tests
- **chore** — Dependencies, build config

### Examples

```
feat(vault): add support for custom components

- Allow users to create custom component templates
- Add validation for component structure
- Update docs with examples

Closes #123
```

```
fix(scan): handle large codebases efficiently

Reduce memory usage by streaming file reads instead of loading all at once.
```

## Documentation

### Adding Documentation

1. Docs go in `/docs/` folder
2. Use Markdown format
3. Link to related docs
4. Include examples
5. Update table of contents

### Documentation Structure

```
docs/
├── README.md              # Docs index
├── setup.md               # Installation and setup
├── usage.md               # Usage guide
├── api-reference.md       # API docs
├── architecture.md        # How Second Mind works
├── examples/              # Example projects
│   ├── react-app.md
│   └── node-backend.md
└── faq.md                 # Frequently asked questions
```

## Release Process

### Version Numbers

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** — Breaking changes
- **MINOR** — New features (backward compatible)
- **PATCH** — Bug fixes

### Publishing

1. **Update version** in `package.json`
2. **Update CHANGELOG** — Document all changes
3. **Create tag** — `git tag v1.0.0`
4. **Push to main** — Automatic publishing via CI/CD

## Getting Help

- **Questions?** — Open a [GitHub Discussion](https://github.com/RohitYadav34980/second-mind/discussions)
- **Issues?** — Open a [GitHub Issue](https://github.com/RohitYadav34980/second-mind/issues)
- **Chat?** — Join our [community Slack](https://slack.secondmind.dev)

## Recognition

Contributors will be:
- Added to `CONTRIBUTORS.md`
- Mentioned in release notes
- Featured in documentation

Thank you for making Second Mind better! 🧠

---

For questions about contributing, open an issue or discussion.
