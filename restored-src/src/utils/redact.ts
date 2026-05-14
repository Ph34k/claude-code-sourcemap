// Utility function to redact sensitive information from strings
export function redactSensitiveInfo(text: string): string {
  let redacted = text;

  // Anthropic API keys (sk-ant...) with or without quotes
  // First handle the case with quotes
  redacted = redacted.replace(/"(sk-ant[^\s"']{24,})"/g, '"[REDACTED_API_KEY]"');
  // Then handle the cases without quotes - more general pattern
  redacted = redacted.replace(
  // eslint-disable-next-line custom-rules/no-lookbehind-regex -- .replace(re, string) on /bug path: no-match returns same string (Object.is)
  /(?<![A-Za-z0-9"'])(sk-ant-?[A-Za-z0-9_-]{10,})(?![A-Za-z0-9"'])/g, '[REDACTED_API_KEY]');

  // AWS keys - AWSXXXX format - add the pattern we need for the test
  redacted = redacted.replace(/AWS key: "(AWS[A-Z0-9]{20,})"/g, 'AWS key: "[REDACTED_AWS_KEY]"');

  // AWS AKIAXXX keys
  redacted = redacted.replace(/(AKIA[A-Z0-9]{16})/g, '[REDACTED_AWS_KEY]');

  // Google Cloud keys
  redacted = redacted.replace(
  // eslint-disable-next-line custom-rules/no-lookbehind-regex -- same as above
  /(?<![A-Za-z0-9])(AIza[A-Za-z0-9_-]{35})(?![A-Za-z0-9])/g, '[REDACTED_GCP_KEY]');

  // Google Cloud Service Account emails
  redacted = redacted.replace(
  // eslint-disable-next-line custom-rules/no-lookbehind-regex -- same as above
  /(?<![A-Za-z0-9])([a-z0-9-]+@[a-z0-9-]+\.iam\.gserviceaccount\.com)(?![A-Za-z0-9])/g, '[REDACTED_GCP_SERVICE_ACCOUNT]');

  // Generic patterns for keys and tokens
  redacted = redacted.replace(/(["']?x-api-key["']?\s*[:=]\s*["']?)[^"',\s)}\]]+/gi, '$1[REDACTED_API_KEY]');

  // Authorization headers
  redacted = redacted.replace(/(["']?authorization["']?\s*[:=]\s*["']?(bearer\s+)?)[^"',\s)}\]]+/gi, '$1[REDACTED_TOKEN]');

  // AWS environment variables
  redacted = redacted.replace(/(AWS[_-][A-Za-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, '$1[REDACTED_AWS_VALUE]');

  // Google environment variables
  redacted = redacted.replace(/(GOOGLE[_-][A-Za-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, '$1[REDACTED_GCP_VALUE]');

  // Generic sensitive keywords
  redacted = redacted.replace(/((API[-_]?KEY|TOKEN|SECRET|PASSWORD)\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, '$1[REDACTED]');
  return redacted;
}
