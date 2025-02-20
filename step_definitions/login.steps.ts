// login.steps.ts
const { I } = require('./helpers');

// Helper functions for human-like behavior
const humanDelay = async (min = 15, max = 30) => {
  // Random delay between 15 and 30 seconds
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await I.wait(delay); // I.wait() expects seconds
};

const randomScroll = async () => {
  const viewportHeight = await I.executeScript(() => window.innerHeight);
  const scrollDistance = Math.floor(Math.random() * viewportHeight * 0.7);
  await I.scrollTo(0, scrollDistance);
};

const simulateTyping = async (selector, text) => {
  // Wait for the element to be visible before typing
  await I.waitForVisible(selector, 20);
  const chars = text.split('');
  for (const char of chars) {
    await I.appendField(selector, char);
    await humanDelay(); // 15-30 seconds per character
  }
};

// Enhanced function to simulate realistic mouse movement
const simulateRealisticMouseMovement = async ({ page }, targetX, targetY) => {
  // Start at a random position on the screen
  const startX = Math.floor(Math.random() * 100) + 50;
  const startY = Math.floor(Math.random() * 100) + 50;
  await page.mouse.move(startX, startY);

  // Move in increments toward the target with slight jitter
  const steps = 20;
  const deltaX = (targetX - startX) / steps;
  const deltaY = (targetY - startY) / steps;
  for (let i = 0; i < steps; i++) {
    const jitterX = Math.random() * 4 - 2;
    const jitterY = Math.random() * 4 - 2;
    await page.mouse.move(
      startX + deltaX * i + jitterX,
      startY + deltaY * i + jitterY,
      { steps: 5 }
    );
    await humanDelay(); // 15-30 seconds delay between mouse moves
  }
};

// Helper function to complete the Cloudflare challenge
const completeCloudflareChallenge = async () => {
  const captchaIframe = "iframe[title='reCAPTCHA']";
  const simpleCheckbox = "input[type='checkbox']";

  // If a reCAPTCHA iframe is present, switch to it and simulate human-like interaction
  if (await I.grabNumberOfVisibleElements(captchaIframe) > 0) {
    await I.switchTo(captchaIframe);
    await I.usePlaywrightTo('Click reCAPTCHA checkbox', async ({ page }) => {
      const checkbox = await page.$('div.recaptcha-checkbox-border');
      if (checkbox) {
        const box = await checkbox.boundingBox();
        await simulateRealisticMouseMovement({ page }, box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.click(
          box.x + box.width / 2 + Math.random() * 10 - 5,
          box.y + box.height / 2 + Math.random() * 10 - 5,
          { delay: 100 + Math.random() * 100 }
        );
      }
    });
    await I.switchTo();
    await humanDelay(); // 15-30 seconds after reCAPTCHA interaction
  } else {
    // For a simple checkbox challenge, attempt to click until it disappears
    let attempts = 0;
    const maxAttempts = 5;
    let checkboxVisible = await I.grabNumberOfVisibleElements(simpleCheckbox) > 0;
    while (checkboxVisible && attempts < maxAttempts) {
      attempts++;
      await I.waitForVisible(simpleCheckbox, 10);
      await I.click(simpleCheckbox);
      await humanDelay(); // 15-30 seconds delay between attempts
      try {
        await I.waitForInvisible(simpleCheckbox, 5);
        checkboxVisible = false;
      } catch (err) {
        checkboxVisible = true;
      }
    }
    if (checkboxVisible) {
      console.log("Cloudflare challenge checkbox still visible after multiple attempts.");
    }
  }
};

// ------------------------------
// Successful Login Scenario
// ------------------------------

Given("I am on the login page", async () => {
  // The global config already sets a custom User-Agent and headers on Chromium.
  await I.amOnPage('/login');
  // Wait for the email input to be visible
  await I.waitForVisible('input[name="Email"]', 20);
  await humanDelay(); // 15-30 seconds delay
  await randomScroll();
});

When("I enter {string} as the email and {string} as the password", async (email, password) => {
  await simulateTyping('input[name="Email"]', email);
  await humanDelay(); // 15-30 seconds delay
  await randomScroll();
  await simulateTyping('input[name="Password"]', password);
});

When("I click the login button", async () => {
  // Simulate realistic mouse movement before clicking the login button
  await I.usePlaywrightTo('Simulate realistic mouse movement', async ({ page }) => {
    const targetX = Math.floor(Math.random() * 800);
    const targetY = Math.floor(Math.random() * 600);
    await simulateRealisticMouseMovement({ page }, targetX, targetY);
  });
  await I.click(".login-button");
  await humanDelay(); // 15-30 seconds delay
});

When("I complete human verification", async () => {
  await humanDelay(); // 15-30 seconds delay
  await completeCloudflareChallenge();
});

Then("I should be redirected to the dashboard", async () => {
  // Verify that the "My account" link is visible as a sign of successful login
  await I.waitForElement("a.ico-account", 30);
  await I.see("My account", "a.ico-account");
  await randomScroll();
});

// ------------------------------
// Unsuccessful Login Scenario
// ------------------------------

When("I enter {string} as the email and {string} as the password", async (email, password) => {
  await simulateTyping('input[name="Email"]', email);
  await humanDelay(); // 15-30 seconds delay
  await randomScroll();
  await simulateTyping('input[name="Password"]', password);
});

Then("I should see an error message", async () => {
  await I.click(".login-button");
  await humanDelay(); // 15-30 seconds delay
  await completeCloudflareChallenge();
  await I.see("Login was unsuccessful.");
});
