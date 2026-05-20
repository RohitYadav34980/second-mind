# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release preparation

### Changed
- Restructured for production publishing

### Fixed
- None yet

## [1.0.0] - 2026-05-19

### Added

#### Core Features
- **Six Powerful Modes**: INIT, RESTORE, QUICK CAPTURE, END-OF-SESSION, OVERVIEW, ONBOARDING
- **Agent-Driven Architecture**: Uses Claude Code native tools (Glob, Grep, Read, Write)
- **Complete Knowledge Capture**: Decisions, architecture, tech stack, components, roadmap
- **Obsidian-Compatible**: All files are plain Markdown with wikilink support
- **Context Restoration**: Full project context available at session start
- **ADR-Style Decisions**: Rationale and trade-offs for every choice
- **Quality Rules**: Never invent info, mark uncertainties, track superseded decisions

#### Knowledge Extraction
- Automatic decision detection from chat transcripts
- Failure and abandonment tracking
- Open question extraction
- Rationale and future idea detection
- GitHub issue and git commit history analysis

#### Vault Structure
- START-HERE.md — 10-minute newcomer onboarding
- story.md — Project evolution narrative
- roadmap.md — Future goals with reasoning
- knowledge-base/ — Architecture, tech-stack, data-models, integrations, components
- decisions/ — Decision log with individual ADR files
- sessions/ — Chat session extraction
- context/ — Current state, open questions, next steps

#### Documentation
- Complete usage guide
- Setup instructions for npm and pip
- API reference for all 6 modes
- Extraction guide for knowledge capture
- Template references
- Example projects

#### Publishing
- npm package support
- PyPI package support
- GitHub releases
- Automated CI/CD workflows
- Test coverage reporting

### Documentation
- Comprehensive README with quick start
- CONTRIBUTING.md for developers
- LICENSE (MIT)
- Full API documentation
- Architecture documentation

### Infrastructure
- TypeScript configuration for type safety
- Jest test setup
- ESLint and Prettier configuration
- GitHub Actions workflows for testing and publishing
- Pre-commit hooks support

---

## How to Report Security Issues

For security vulnerabilities, please email security@secondmind.dev instead of using the issue tracker.

---

## Maintenance

This project is actively maintained. For questions or issues:
- Open an issue on [GitHub](https://github.com/RohitYadav34980/second-mind/issues)
- Join our [discussions](https://github.com/RohitYadav34980/second-mind/discussions)

---

[Unreleased]: https://github.com/RohitYadav34980/second-mind/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/RohitYadav34980/second-mind/releases/tag/v1.0.0
