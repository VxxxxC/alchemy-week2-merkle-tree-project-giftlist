const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('./MerkleTree');
const niceList = require('../utils/niceList');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  const input = body.inputName;

  // TODO: prove that a name is in the list

  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree._getRoot();
  const name = input;
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const isInTheList = false;
      // verifyProof(proof, name, root); // verify proof against the Merkle Root
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
