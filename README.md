This is a basic script to generate a signed Nostr event.

I wrote this to help me understand how Nostr notes are created and signed. You can broadcast the output JSON to your favorite relay via Postman or another tool.

### Setup
Create a .env, in your root directory, that has your favorite nsec. (You can also use this random nsec: `nsec1slgfeunlur9z8jj064jzed0cveee9mzxtp3lcxh454n9u0504jgq7r5fc3`)

Your .env should look like this:
```
NSEC = 'nsec1slgfeunlur9z8jj064jzed0cveee9mzxtp3lcxh454n9u0504jgq7r5fc3'
```

### Run The Script
1. Open Terminal

1. Navigate to your root directory  
`cd /my/repos/nostr-signer`

1. Install dependencies  
`npm i`

1. Start the script  
`npm start`

1. The first prompt you will see is  
```
Enter an nsec
Press [enter] for .env nsec:
```
You can enter another nsec here, or press [enter] to use the nsec that you put into your .env file.

1. The second prompt you will see is  
```
Enter your Note Content
Use \n for line breaks:
```  
This is where you type the content of your note. Also points out that `you can include\n linebreaks \n\n like this\nOR like this.`


1. The script will then output the JSON for your signed event. Copy everything, including the square brackets.
```
[
    "EVENT",
    {
        "id": "642fb5...",
        "pubkey": "83f1cb...",
        "created_at": 1726880000,
        "kind": 1,
        "content": "copy it all",
        "tags": [],
        "sig": "e4a943e5696...."
    }
]
```

1. You can broadcast your event to your favorite relay using Postman or another tool. Some relays you can use are `wss://relay.satoshidnc.com/`, `wss://nos.lol`, or  `wss://relay.primal.net`.
