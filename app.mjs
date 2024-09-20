import 'dotenv/config'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { generateSecretKey, getPublicKey, finalizeEvent, verifyEvent } from 'nostr-tools/pure'
import { bech32, bech32m } from 'bech32';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


function bech32Decoder(currPrefix, data) {
  const { prefix, words } = bech32.decode(data);
  if (prefix !== currPrefix) {
      throw Error('Invalid address format');
  }
  return Buffer.from(bech32.fromWords(words));
}

const rl = readline.createInterface({ input, output });
let nsec = await rl.question('Enter your nsec -or- press [enter] for .env: ');
const eventContent = await rl.question('Enter your Note Text: ');

nsec = (!nsec) ? process.env.NSEC : nsec;
nsec = (nsec.slice(0,4) !== "nsec") ? "nsec" + nsec : nsec;
// console.log(`NSEC: ${nsec}`)

const nsecDecoded = bech32Decoder('nsec', nsec);
let nsecHex = bytesToHex(nsecDecoded);
// console.log(`Private Hex: ${nsecHex}`)
// let pubHex = getPublicKey(nsecHex);
// console.log(`Public Hex: ${pubHex}`)

// use finalizeEvent from nostr-tools to get the event.id, event.pubkey, event.sig
const createdAt = Math.floor(Date.now() / 1000);
const event = finalizeEvent({
  kind: 1,
  created_at: createdAt,
  tags: [],
  content: eventContent,
}, nsecHex)


if (!verifyEvent(event)) {
  console.log(`Something Went Wrong !!!`)
  process.exit(1);
} else {
  // create the JSON for the EVENT that will be broadcast
  const eventJson = `[
    "EVENT",
    {
        "id": "${event.id}",
        "pubkey": "${event.pubkey}",
        "created_at": ${createdAt},
        "kind": 1,
        "content": "${eventContent}",
        "tags": [],
        "sig": "${event.sig}"
    }
  ]`;

  console.log(eventJson);
  process.exit(1);
}
