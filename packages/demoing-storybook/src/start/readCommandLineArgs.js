const path = require('path');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const {
  readCommandLineArgs: esDevServerCommandLineArgs,
  commandLineOptions: esDevServerCliOptions,
} = require('es-dev-server');

module.exports = function readCommandLineArgs() {
  const cliOptions = [
    {
      name: 'config-dir',
      alias: 'd',
      type: String,
      defaultValue: './.storybook',
      description: 'Location of storybook configuration',
    },
    {
      name: 'stories',
      alias: 's',
      defaultValue: './stories/*.stories.{js,mdx}',
      description: 'List of story files e.g. --stories stories/*.stories.\\{js,mdx\\}',
    },
    { name: 'help', type: Boolean, description: 'See all options' },
  ];

  const storybookServerConfig = commandLineArgs(cliOptions, { partial: true });

  if ('help' in storybookServerConfig) {
    /* eslint-disable-next-line no-console */
    console.log(
      commandLineUsage([
        {
          header: 'storybook-start',
          content: `
          Storybook start command. Wraps the es-dev-server, adding storybook specific functionality. All regular es-dev-server commands are available.

          Usage: \`storybook-start [options...]\`
        `.trim(),
        },
        {
          header: 'storybook options',
          optionList: cliOptions,
        },
        {
          header: 'es-dev-server options',
          content: '',
          optionList: esDevServerCliOptions,
        },
      ]),
    );
    process.exit();
  }

  const esDevServerConfig = esDevServerCommandLineArgs(storybookServerConfig._unknown || [], {
    defaultConfigDir: path.join(process.cwd(), storybookServerConfig['config-dir']),
  });

  return { storybookServerConfig, esDevServerConfig };
};
