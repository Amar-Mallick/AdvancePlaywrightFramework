# AdvancePlaywrightFramework

An advanced, scalable **Playwright end-to-end test automation framework** built with **TypeScript**, following industry-standard patterns such as the Page Object Model, environment-based configuration, data-driven testing, rich reporting, and CI/CD integration with GitHub Actions.

---

## Table of Contents

- [Features](#features)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Test Reports & Artifacts](#test-reports--artifacts)
- [CI/CD (GitHub Actions)](#cicd-github-actions)
- [Best Practices & Conventions](#best-practices--conventions)

---

## Features

| Feature | Description |
|---|---|
| ⚡ **Playwright + TypeScript** | Modern, fast browser automation with full type safety |
| 🏗️ **Page Object Model (POM)** | Dedicated folders for pages, fixtures, API clients, and utilities |
| 🌍 **Multi-Environment Support** | Switch between `qa`, `dev`, `stg`, `prod`, and `api` environments via env vars |
| 🔐 **dotenv Integration** | Secrets and configuration kept out of source code via `.env` |
| 📊 **Rich Reporting** | Built-in HTML report, list reporter, and a custom reporter |
| 🎭 **Allure Reporting** | Beautiful, interactive test reports via `allure-playwright` |
| 🧪 **Schema Validation** | JSON schema validation for API responses using `ajv` + `ajv-formats` |
| 🗃️ **Data-Driven Testing** | Read test data from Excel (`xlsx`) and CSV (`csv-parse`) files |
| 🎲 **Fake Test Data** | Dynamic test data generation with `@faker-js/faker` |
| 📝 **Logging** | Structured logging with `winston` |
| 🔍 **JSON Querying** | Query complex JSON payloads with `jsonpath-plus` |
| 📸 **Debugging Artifacts** | Screenshots on failure, video recording, and traces enabled by default |
| 🔁 **Parallel Execution & Retries** | Fully parallel tests locally; automatic retries (2x) in CI |
| 🤖 **GitHub Actions CI** | Automated test runs on push/pull requests to `main`/`master` |
| 🧠 **AI-Powered Analysis** | Root cause analysis and flaky test detection using LLM agents |
| 📋 **Custom TTA Report** | Rich HTML report with AI tabs, filtering, video/trace playback |

---

## Tech Stack & Dependencies

| Package | Purpose |
|---|---|
| `@playwright/test` | Core test runner & browser automation |
| `typescript` ecosystem (`tsconfig.json`) | Type-safe test development |
| `dotenv` | Environment variable management |
| `allure-playwright` | Allure test reports |
| `ajv`, `ajv-formats` | JSON schema validation (API testing) |
| `xlsx` | Excel-based test data reading/writing |
| `csv-parse` | CSV-based test data parsing |
| `@faker-js/faker` | Random/fake test data generation |
| `jsonpath-plus` | JSONPath queries on JSON responses |
| `winston` | Application/test logging |

---

## Project Structure

```
AdvancePlaywrightFramework/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI pipeline
├── docs/                         # Project documentation
├── rules/                        # Coding/testing rules and guidelines
├── src/
│   ├── ai/                       # AI-powered test analysis agents
│   │   ├── agents/
│   │   │   ├── flakyAnalyzer.ts  # Flaky test detection across builds
│   │   │   └── rcaAgent.ts       # Root cause analysis for failures
│   │   └── config/
│   │       └── providers.ts      # LLM API key detection
│   ├── api/                      # API clients & request helpers
│   ├── config/                   # Environment & app configuration
│   ├── fixtures/                 # Custom Playwright fixtures
│   ├── pages/                    # Page Object Model classes
│   │   ├── BasePage.ts           # Abstract base class for all pages
│   │   ├── LoginPage.ts          # Login page interactions
│   │   ├── CartPage.ts           # Shopping cart page
│   │   ├── InventoryPage.ts      # Product listing/inventory page
│   │   ├── ItemDetailsPage.ts    # Single product detail page
│   │   ├── CheckoutStepOnePage.ts # Checkout customer info form
│   │   ├── CheckoutStepTwoPage.ts # Checkout order overview
│   │   └── CheckoutCompletePage.ts # Order confirmation page
│   ├── testdata/                 # Test data files (Excel, CSV, JSON)
│   ├── tests/                    # Test specs (Playwright testDir)
│   │   └── Login.spec.ts         # Login flow test
│   └── utils/                    # Helpers, logger, custom reporter, etc.
│       ├── CustomReporter.ts     # Rich HTML report generator with AI tabs
│       ├── DataGenerator.ts      # Faker-based test data generation
│       ├── UtilElementLocator.ts # Element action wrapper with logging
│       └── logger.ts             # Winston-based structured logging
├── logs/                         # Winston log output (combined.log)
├── reports/                      # Build snapshots for flaky analysis
├── tta-report/                   # Generated HTML reports
├── .env                          # Local environment variables (not for prod secrets!)
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # NPM scripts & dependencies
```

---

## Prerequisites

- **Node.js** — LTS version recommended ([download](https://nodejs.org))
- **npm** — bundled with Node.js
- A supported OS: Windows, macOS, or Linux

Verify your installation:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amar-Mallick/AdvancePlaywrightFramework.git
cd AdvancePlaywrightFramework
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
# With system dependencies (Linux/CI):
npx playwright install --with-deps
```

### 4. Configure environment

Create/update the `.env` file in the project root (see [Environment Variables](#environment-variables)).

---

## Configuration

The framework configuration lives in [`playwright.config.ts`](playwright.config.ts):

| Setting | Value |
|---|---|
| Test directory | `./src/tests` |
| Test timeout | 60 seconds |
| Expect timeout | 10 seconds |
| Parallelism | Fully parallel |
| Retries | `2` in CI, `0` locally |
| Reporters | HTML, List, Custom Reporter |
| Screenshot | Only on failure |
| Video | On (always) |
| Trace | On (always) |
| Browsers | Chromium (Desktop Chrome) |

The **base URL** is resolved automatically from the environment:

1. If `BASE_URL` is set, it takes priority.
2. Otherwise, the value of `TTA_ENV` selects the target environment:
   - `api` → `API_BASE_URL`
   - `dev` / `local` → `DEV_BASE_URL`
   - `stg` / `stage` / `staging` → `STG_BASE_URL`
   - `prod` / `production` → `PROD_BASE_URL`
   - `qa` (default) → `QA_BASE_URL`

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Active environment selector used by playwright.config.ts
TTA_ENV=qa            # qa | dev | local | stg | staging | prod | api

# Direct override (takes highest priority)
BASE_URL=https://app.thetestingacademy.com

# Per-environment base URLs
QA_BASE_URL=https://qaapp.thetestingacademy.com
STG_BASE_URL=https://staging.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com
DEV_BASE_URL=http://localhost:3000
API_BASE_URL=https://restful-booker.herokuapp.com

# Logging
LOG_LEVEL=info

# Test metadata
TEST_ENV=QA
TEST_AUTHOR=Pramod

# Credentials (use secrets in CI — never commit real passwords)
USERNAME=admin
PASSWORD=ADMIN123
```

> ⚠️ **Security note:** Never commit real credentials to version control. Prefer CI secret stores (e.g., GitHub Actions secrets) for sensitive values.

---

## Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in UI Mode (interactive debugging)
npx playwright test --ui

# Run a specific test file
npx playwright test src/tests/example.spec.ts

# Filter tests by title
npx playwright test -g "login"

# Run on a specific browser/project
npx playwright test --project=chromium

# Stop after the first failure
npx playwright test --max-failures=1

# Debug tests step-by-step
npx playwright test --debug
```

---

## Test Reports & Artifacts

After a run, the following artifacts are produced:

| Artifact | Location | Notes |
|---|---|---|
| **HTML Report** | `playwright-report/index.html` | Open with `npx playwright show-report` |
| **Custom TTA Report** | `tta-report/report_<timestamp>.html` | Rich report with AI analysis tabs |
| **Traces** | `test-results/` | View with `npx playwright show-trace <trace-file>` |
| **Screenshots** | `test-results/` | Captured automatically on failure |
| **Videos** | `test-results/` | Recorded for every test |
| **Allure Results** | `allure-results/` | Generate/view with the Allure CLI if installed |
| **Logs** | `logs/combined.log` | Winston structured logs |
| **Build Snapshots** | `reports/` | Used by flaky analyzer for cross-build comparison |

Useful report commands:

```bash
# Serve the last HTML report
npx playwright show-report

# Inspect a trace file
npx playwright show-trace test-results/<...>/trace.zip
```

> These folders (`test-results/`, `playwright-report/`) are git-ignored.

---

## CI/CD (GitHub Actions)

The pipeline is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

- **Triggers:** every push and pull request targeting `main` or `master`
- **Runner:** `ubuntu-latest`, Node.js LTS
- **Steps:**
  1. Checkout code
  2. Setup Node.js
  3. `npm ci`
  4. `npx playwright install --with-deps`
  5. `npx playwright test`
  6. Upload the `playwright-report/` artifact (retained for 30 days), even on failure

---

## Page Objects

The framework follows the **Page Object Model (POM)** pattern with a shared base class:

| Page Object | File | Description |
|---|---|---|
| `BasePage` | `src/pages/BasePage.ts` | Abstract base class providing `page`, `el` (element locator), `log` (logger), and `goto()` helper |
| `LoginPage` | `src/pages/LoginPage.ts` | Login screen interactions (fill credentials, submit) |
| `CartPage` | `src/pages/CartPage.ts` | Shopping cart operations |
| `InventoryPage` | `src/pages/InventoryPage.ts` | Product listing page |
| `ItemDetailsPage` | `src/pages/ItemDetailsPage.ts` | Single product detail view |
| `CheckoutStepOnePage` | `src/pages/CheckoutStepOnePage.ts` | Checkout customer info form |
| `CheckoutStepTwoPage` | `src/pages/CheckoutStepTwoPage.ts` | Checkout order review |
| `CheckoutCompletePage` | `src/pages/CheckoutCompletePage.ts` | Order confirmation page |

### Creating a New Page Object

```typescript
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  static PATH = '/my-page';

  // Define locators
  private heading = this.el.locator('[data-test="heading"]');

  async open() {
    await this.goto(MyPage.PATH);
  }

  async getHeadingText(): Promise<string> {
    return await this.heading.getText();
  }
}
```

---

## Utilities

### UtilElementLocator

A reusable action-wrapper that adds logging and consistent timeout handling to Playwright locators.

| Method | Description |
|---|---|
| `click()` | Click an element |
| `fill(value)` | Clear and fill an input |
| `getText()` | Get visible text content |
| `isVisible()` | Check element visibility |
| `selectByText(text)` | Select dropdown option by text |
| `waitForVisible()` | Wait for element to appear |
| ... | And many more (doubleClick, hover, press, etc.) |

### DataGenerator

Faker-based fake data generation for tests:

```typescript
import DataGenerator from '@utils/DataGenerator';

const creds = DataGenerator.credentials();      // { username, password }
const customer = DataGenerator.checkoutCustomer(); // { firstName, lastName, email, ... }
const profile = DataGenerator.userProfile();     // Full user profile object
```

### Logger (Winston)

Structured, scoped logging throughout the framework:

```typescript
import { createLogger } from '@utils/logger';

const log = createLogger('MyTestClass');
log.info('Test started');
log.error('Something failed', { error });
```

Logs are written to both console (colorized) and `logs/combined.log`.

### Custom Reporter

A rich HTML report generator that produces self-contained reports in `tta-report/` with:
- Real-time updates during test execution
- Stats dashboard (total, passed, failed, skipped, pass rate)
- Filterable test results table
- Screenshot/video/trace playback
- **AI-powered tabs** (see below)

---

## AI-Powered Test Analysis

The framework includes an AI layer for intelligent test failure analysis:

### Root Cause Analysis (RCA)

Analyzes test failures and provides:
- **Severity** assessment (low/medium/high/critical)
- **Priority** level (P0/P1/P2/P3)
- **Root cause** identification
- **Fix suggestions**

Located in `src/ai/agents/rcaAgent.ts`.

### Flaky Test Analyzer

Compares test results across consecutive builds to:
- Detect flaky tests (tests that change status between runs)
- Count flaky/failing tests
- Identify specific flaky test names

Located in `src/ai/agents/flakyAnalyzer.ts`.

### LLM Integration

The AI agents are designed to work with LLM APIs. Set one of these environment variables to enable:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
```

When no API key is present, the agents return placeholder results. With an API key, they can generate intelligent analysis of test failures.

---

## Best Practices & Conventions

- Keep page interactions inside **Page Object** classes under `src/pages`; keep assertions and flows in specs under `src/tests`.
- Use **fixtures** (`src/fixtures`) to share setup state (login sessions, page instances) across tests.
- Place reusable HTTP/API logic in `src/api`.
- Store static datasets in `src/testdata` (Excel/CSV/JSON) and generate dynamic data with Faker.
- Validate API response shapes with **Ajv** JSON schemas.
- Use `winston` logging instead of raw `console.log` for consistent, leveled logs.
- Add new environment URLs to `.env` rather than hard-coding them in tests.
- Extend `BasePage` when creating new page objects for consistent logging and element actions.
