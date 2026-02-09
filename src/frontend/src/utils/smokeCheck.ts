/**
 * Lightweight smoke check utility for post-deployment verification
 * Validates presence of critical DOM elements and external links
 */

interface SmokeCheckItem {
  name: string;
  passed: boolean;
  message: string;
}

interface SmokeCheckResult {
  passed: boolean;
  checks: SmokeCheckItem[];
}

export function runSmokeCheck(): SmokeCheckResult {
  const checks: SmokeCheckItem[] = [];

  // Check 1: Header is present
  const header = document.querySelector('header');
  checks.push({
    name: 'Header',
    passed: !!header,
    message: header ? 'Header element found' : 'Header element missing',
  });

  // Check 2: Footer is present
  const footer = document.querySelector('footer');
  checks.push({
    name: 'Footer',
    passed: !!footer,
    message: footer ? 'Footer element found' : 'Footer element missing',
  });

  // Check 3: Contact section exists
  const contactSection = document.getElementById('contact');
  checks.push({
    name: 'Contact Section',
    passed: !!contactSection,
    message: contactSection ? 'Contact section found' : 'Contact section missing',
  });

  // Check 4: Email link present
  const emailLink = document.querySelector('a[href^="mailto:quillworksmedia@gmail.com"]');
  checks.push({
    name: 'Email Link',
    passed: !!emailLink,
    message: emailLink ? 'Email link found' : 'Email link missing',
  });

  // Check 5: X/Twitter link present
  const twitterLink = document.querySelector('a[href*="x.com/QuillworksMedia"]');
  checks.push({
    name: 'X/Twitter Link',
    passed: !!twitterLink,
    message: twitterLink ? 'X/Twitter link found' : 'X/Twitter link missing',
  });

  // Check 6: Instagram link present
  const instagramLink = document.querySelector('a[href*="instagram.com/quillworks_media_"]');
  checks.push({
    name: 'Instagram Link',
    passed: !!instagramLink,
    message: instagramLink ? 'Instagram link found' : 'Instagram link missing',
  });

  // Check 7: Hero image present
  const heroImage = document.querySelector('img[src*="hero-illustration"]');
  checks.push({
    name: 'Hero Image',
    passed: !!heroImage,
    message: heroImage ? 'Hero image element found' : 'Hero image element missing',
  });

  // Check 8: Logo image present
  const logoImage = document.querySelector('img[src*="logo-quillworks"]');
  checks.push({
    name: 'Logo Image',
    passed: !!logoImage,
    message: logoImage ? 'Logo image element found' : 'Logo image element missing',
  });

  const allPassed = checks.every((check) => check.passed);

  return {
    passed: allPassed,
    checks,
  };
}

export function logSmokeCheckResults(result: SmokeCheckResult): void {
  console.group('🧪 Smoke Check Results');
  console.log(`Overall: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log('---');
  result.checks.forEach((check) => {
    console.log(`${check.passed ? '✅' : '❌'} ${check.name}: ${check.message}`);
  });
  console.groupEnd();
}
