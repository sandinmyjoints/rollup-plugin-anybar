import dgram from 'node:dgram';
import util from 'node:util';

function rollupPluginAnybar(options = {}) {
  const { port = 1738, host = "localhost" } = options;
  const socket = dgram.createSocket("udp4").unref();
  const send = util.promisify(socket.send.bind(socket));

  async function sendCommand(command, plugin) {
    const message = Buffer.from(command);
    try {
      await send(message, 0, message.length, port, host);
    } catch (err) {
      if (plugin) plugin.warn("Could not send to anybar.");
    }
  }

  const plugin = {
    name: "rollup-plugin-anybar",
    buildStart() {
      sendCommand("green", this);
    },
    renderStart() {
      sendCommand("yellow", this);
    },
    renderError(err) {
      sendCommand("red", this);
    },
    generateBundle() {
      sendCommand("green", this);
    },
    async buildEnd(err) {
      if (err) await sendCommand("red", this);
      else await sendCommand("hollow", this);
    },
    async closeWatcher() {
      await sendCommand("hollow", this);
    }
  };

  process.once("beforeExit", async () => {
    socket.ref();
    await sendCommand("hollow");
    socket.unref();
  });

  ["SIGINT", "SIGTERM"].forEach(ev => {
    process.on(ev, async () => {
      socket.ref();
      await sendCommand("hollow");
      socket.unref();

      // TODO: 128 + signal number
      process.exit(128);
    });
  });

  return plugin;
}

export { rollupPluginAnybar as default };
