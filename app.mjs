import 'dotenv/config'

import { bytesToHex } from '@noble/hashes/utils'
import { finalizeEvent, verifyEvent, getPublicKey } from 'nostr-tools/pure'
import { bech32 } from 'bech32';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
let nsec = await rl.question('Enter an nsec\nPress [enter] for .env nsec: ');
let eventContent = await rl.question('\nEnter your Note Content\nUse \\n for line breaks: ');
rl.close();

// cleanup nsec
nsec = (!nsec) ? process.env.NSEC : nsec;
nsec = (nsec.slice(0,4) !== "nsec") ? "nsec" + nsec : nsec;
const nsecDecoded = bech32Decoder('nsec', nsec);
let nsecHex = bytesToHex(nsecDecoded);

// cleanup line breaks
eventContent = eventContent.replace(/\\n/g, '\n')

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
        "content": ${JSON.stringify(event.content)},
        "tags": [],
        "sig": "${event.sig}"
    }
]`;

  console.log(`\n### EVENT JSON ###`)
  console.log(eventJson);
  process.exit(1);
}

// bech32Decoder outputs an array of octets (Uint8array)
// from https://github.com/michaelleighstewart/nostr-client/blob/3f5c6d293c83b94860e76d32599143554f335444/src/utils/helperFunctions.ts#L50
function bech32Decoder(currPrefix, data) {
  const { prefix, words } = bech32.decode(data);
  if (prefix !== currPrefix) {
      throw Error('Invalid nsec format');
  }
  return Buffer.from(bech32.fromWords(words));
}
