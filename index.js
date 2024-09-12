const { create } = require("domain");

/**
 * Kala Discord v1.0.0
 * - Developed by Ollie Krystella
 * - Dedicated to mihai.
 * 
 * @module KalaDiscord
 * @version 1.0.0
 */
const Kala = (function () {
  "use strict";

  // Import libraries
  require("dotenv").config();
  const { Discord, Client, GatewayIntentBits, Events } = require("discord.js");
  const fs = require("fs");
  const path = require("path");
  const Brain = require("./lib/kala-brain");

  /**
   * Creates a client
   * @returns {Client}
   * @throws {Error}
   */
  function createClient() {
    // Intents
    const intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ];

    // Client
    const client = new Client({intents: intents});

    // Return the client
    return client;
  }

  const client = createClient();

  client.on(Events.ClientReady, () => {
    console.log(Brain.generateResponse("headpats"));
  });

  client.login(process.env.BOT_TOKEN);
});
