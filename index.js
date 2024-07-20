const child_process = require("child_process");
const chalk = require("chalk");

let max = -1;

/**
 * @param {string} name
 * @param {string} command
 * @param {string[]} args
 * @param {import("child_process").SpawnOptionsWithoutStdio} opts
 */
function execute(name, command, args = [], opts = {}) {
  if (!command) throw new Error("command must be provided");

  max = name.length;

  /**
   * @type {import("child_process").ChildProcessByStdio}
   */
  const child = child_process.spawn(command, args, {
    shell: true,
    opts,
  });

  child.stdout.on("data", (data) => {
    const _name = chalk.dim(`[${name}]${" ".repeat(max - name.length)} |`);
    if (data.length > 0) {
      const message = data.toString();
      const lines = message.split("\n");

      if (lines[lines.length - 1].length === 0) {
        lines.pop(); // Remove empty line at the end
      }
      for (const line of lines) {
        console.log(`${_name} ${line}`);
      }
    }
  });

  child.stderr.on("data", (data) => {
    const _name = chalk.red(`[${name}]${" ".repeat(max - name.length)} |`);
    if (data.length > 0) {
      const message = data.toString();
      const lines = message.split("\n");

      if (lines[lines.length - 1].length === 0) {
        lines.pop(); // Remove empty line at the end
      }
      for (const line of lines) {
        console.error(`${_name} ${chalk.red(line)}`);
      }
    }
  });

  child.on("exit", (code) => {
    const _name = chalk.yellow(`[${name}]${" ".repeat(max - name.length)} |`);

    if (code !== 0) {
      console.error(`${_name} ${chalk.yellow(`exited with code ${code}`)}`);
    }
  });
}

module.exports.execute = execute;
