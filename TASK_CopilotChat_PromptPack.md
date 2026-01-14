# Copilot Chat – Best Prompts Pack (Editor, CI, Devcontainers, Cost Optimization)

This document provides a curated set of high-quality prompts for GitHub Copilot Chat to help you work efficiently with CI/CD workflows, devcontainers, and cost optimization strategies.

## 🚀 CI/CD & GitHub Actions

### Optimize Workflow Performance
```
Analyze this GitHub Actions workflow and suggest optimizations to reduce execution time and Actions minutes usage. Focus on caching, concurrency, and conditional job execution.
```

### Debug Failed Workflow
```
This workflow is failing at [step name]. Review the logs and workflow definition to identify the root cause and suggest a fix.
```

### Add Cost-Efficient Tests
```
Add a test job to this CI workflow that runs only when relevant files change, uses caching effectively, and passes with --passWithNoTests when no tests exist.
```

## 🐳 Devcontainers

### Create Minimal Devcontainer
```
Create a minimal devcontainer.json for a [language/framework] project that installs only essential extensions and tools to minimize build time and storage.
```

### Optimize Devcontainer Build Time
```
Review this devcontainer configuration and suggest ways to reduce build time and image size. Consider using pre-built images and minimal feature sets.
```

### Debug Devcontainer Issues
```
My devcontainer is failing to build/start with [error message]. Help me diagnose and fix the issue.
```

## 💰 Cost Optimization

### Reduce GitHub Actions Minutes
```
Audit this repository's CI/CD workflows and suggest specific changes to reduce Actions minutes usage by at least 30% while maintaining test coverage.
```

### Optimize Codespaces Usage
```
Review this project's devcontainer and VS Code settings to minimize Codespaces compute time. Focus on startup performance and automatic shutdown configurations.
```

### Implement Smart Caching
```
Add intelligent caching to this workflow for [package manager] dependencies to avoid unnecessary reinstalls and reduce CI execution time.
```

## 🔧 VS Code & Editor Settings

### Setup Format-on-Save
```
Configure VS Code settings for this [language] project with format-on-save, auto-import organization, and consistent linting across the team.
```

### Optimize Extensions
```
Review this project's recommended VS Code extensions and suggest a minimal set that provides the best developer experience without bloat.
```

## 📋 Code Quality & Review

### Generate CODEOWNERS
```
Create a CODEOWNERS file for this repository based on the current directory structure and team ownership patterns.
```

### Setup Pre-commit Checks
```
Add a pre-commit or pre-push hook that runs linting and formatting checks locally to catch issues before CI runs.
```

### Implement Path Filters
```
Update this CI workflow to only run when relevant files change, using path filters for source code, dependencies, and configuration files.
```

## 🎯 Specific Scenarios

### React/TypeScript Project Setup
```
Setup a cost-efficient CI workflow and devcontainer for a React TypeScript project using Vite. Include build, test, and lint jobs with smart path filtering.
```

### Node.js Project Optimization
```
Optimize this Node.js project's CI workflow to use npm ci with caching, run tests only when needed, and complete in under 5 minutes.
```

### Multi-Language Repository
```
Configure CI for a monorepo with [languages] that runs only relevant jobs based on which parts of the codebase changed.
```

## 💡 Best Practices

### Ask for Explanations
```
Explain why [specific configuration/pattern] is used in this [workflow/devcontainer/settings] and suggest any modern alternatives.
```

### Review for Security
```
Review this [workflow/configuration] for security best practices, including secrets handling, permissions, and dependency management.
```

### Validate Configuration
```
Validate this [YAML/JSON] configuration file for syntax errors and common mistakes before committing.
```

## 📊 Monitoring & Metrics

### Track Actions Usage
```
Help me understand this repository's GitHub Actions usage patterns and identify the most expensive workflows to optimize first.
```

### Measure Build Performance
```
Add timing measurements to this workflow to identify which steps take the longest and could benefit from optimization.
```

## 🔄 Workflow Patterns

### Concurrency Control
```
Add concurrency controls to this workflow to cancel outdated runs and prevent wasting Actions minutes on superseded commits.
```

### Matrix Strategy
```
Setup a matrix strategy for testing across [versions/platforms] while minimizing total execution time through parallelization.
```

### Conditional Execution
```
Make this workflow job run only when [specific conditions] are met to avoid unnecessary CI runs.
```

---

## Tips for Effective Copilot Chat Usage:

1. **Be Specific**: Include file names, error messages, and context
2. **Iterative Refinement**: Start broad, then ask follow-up questions to drill down
3. **Request Explanations**: Always ask "why" to understand the reasoning
4. **Validate Suggestions**: Test recommendations in a safe environment first
5. **Combine Prompts**: Use multiple prompts together for comprehensive solutions

Remember: The goal is to minimize metered spend (Actions minutes, Codespaces hours) while maintaining productivity and code quality.
