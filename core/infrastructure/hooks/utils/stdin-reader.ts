/**
 * Centralized stdin reading utility with timeout protection
 *
 * Provides consistent stdin reading across all hooks with built-in timeout
 * to prevent hooks from freezing the Claude session.
 *
 * @module stdin-reader
 */

export interface StdinReadOptions {
  /** Timeout in milliseconds (default: 1000ms) */
  timeout?: number;
  /** Encoding to use (default: 'utf-8') */
  encoding?: BufferEncoding;
}

/**
 * Read stdin with timeout protection
 *
 * @param options - Configuration options
 * @returns Promise resolving to stdin content
 * @throws Error if timeout exceeded or stdin read fails
 *
 * @example
 * ```typescript
 * try {
 *   const input = await readStdinWithTimeout({ timeout: 2000 });
 *   const data = JSON.parse(input);
 * } catch (error) {
 *   console.error('Failed to read stdin:', error.message);
 *   process.exit(0);
 * }
 * ```
 */
export async function readStdinWithTimeout(
  options: StdinReadOptions = {}
): Promise<string> {
  const { timeout = 1000, encoding = 'utf-8' } = options;

  return Promise.race([
    // Promise 1: Read stdin normally
    new Promise<string>((resolve, reject) => {
      let data = '';

      process.stdin.setEncoding(encoding);

      process.stdin.on('data', (chunk) => {
        data += chunk;
      });

      process.stdin.on('end', () => {
        resolve(data);
      });

      process.stdin.on('error', (error) => {
        reject(new Error(`stdin read error: ${error.message}`));
      });
    }),

    // Promise 2: Timeout
    new Promise<string>((_, reject) =>
      setTimeout(
        () => reject(new Error(`stdin read timeout after ${timeout}ms`)),
        timeout
      )
    ),
  ]);
}

/**
 * Read and parse JSON from stdin with timeout protection
 *
 * @param options - Configuration options
 * @returns Promise resolving to parsed JSON object
 * @throws Error if timeout exceeded, stdin read fails, or JSON is invalid
 *
 * @example
 * ```typescript
 * try {
 *   const data = await readStdinJSON<ToolUseData>({ timeout: 2000 });
 *   console.log('Tool:', data.name);
 * } catch (error) {
 *   console.error('Failed to read JSON from stdin:', error.message);
 *   process.exit(0);
 * }
 * ```
 */
export async function readStdinJSON<T = any>(
  options: StdinReadOptions = {}
): Promise<T> {
  const input = await readStdinWithTimeout(options);

  try {
    return JSON.parse(input) as T;
  } catch (error) {
    throw new Error(`Failed to parse stdin as JSON: ${error instanceof Error ? error.message : 'unknown error'}`);
  }
}
