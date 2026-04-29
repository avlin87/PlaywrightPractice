# Playwright Practice Project

## Install Node.js with nvm

Download the nvm installer:

```bash
curl -o nvm-install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh
```

Run the installer:

```bash
bash nvm-install.sh
```

Reload Bash configuration:

```bash
source ~/.bashrc
```

Check nvm version:

```bash
nvm -v
```

Install latest LTS Node.js:

```bash
nvm install --lts
```

Check Node.js and npm:

```bash
node -v
npm -v
```

## Create Playwright project

From the project folder:

```bash
npm init playwright@latest
```

Selected options:

```text
TypeScript
tests
GitHub Actions: No
Install browsers: Yes
Install OS dependencies: Yes
```

If browser dependency installation fails, install browsers manually:

```bash
npx playwright install
```

## Run first tests

Run all tests:

```bash
npx playwright test
```

Expected result:

```text
6 passed
```

## Open HTML report

```bash
npx playwright show-report
```

Open the shown local URL in a browser, usually:

```text
http://localhost:9323
```

Stop the report server:

```text
Ctrl + C
```

## Important generated files

```text
package.json
package-lock.json
playwright.config.ts
tests/example.spec.ts
```

## First test example

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

## First test explanation

- `test` defines a test case.
- `expect` checks the expected result.
- `page` is similar to Selenium WebDriver.
- `page.goto()` opens a page.
- `await` waits for the action to finish.
- `toHaveTitle(/Playwright/)` verifies that the page title contains `Playwright`.
