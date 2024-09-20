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

1. Start the script  
`npm start`

1. The first prompt you will see is `Enter your nsec -or- press [enter] for .env: `  
You can enter another nsec here, or press [enter] to use the nsec that you put into your .env file.

1. The second prompt you will is `Enter your Note Text: `  
This is where you type the content of your note.  
(currently does not work with line breaks)

1. The script will then output the JSON for your signed event.
