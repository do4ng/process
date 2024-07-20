/**
 * ```js
 * execute("deps", "npm", ["install"]);
 * ```
 * @param name process name
 * @param command command such as `npm` `node`
 * @param args arguments
 * @param opts child_process.spawn options
 */

export function execute(
  name: string,
  command: string,
  args?: string[],
  opts?: import("child_process").SpawnOptionsWithoutStdio
): void;
