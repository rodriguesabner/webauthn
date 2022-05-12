const cors = require('cors');
const express = require('express');
const cbor = require('cbor');

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/files`));
app.use(cors({ origin: '*' }));

app.use('/register', (req, res) => {
  const { clientData } = req.body;

  const decodedAttestationObj = cbor.decode(
    clientData.response.attestationObject,
  );

  const { authData } = decodedAttestationObj;

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach(
    (value, index) => dataView.setUint8(index, value),
  );
  const credentialIdLength = dataView.getUint16();

  const credentialId = authData.slice(55, 55 + credentialIdLength);

  const publicKeyBytes = authData.slice(
    55 + credentialIdLength,
  );

  const publicKeyObject = cbor.decode(
    publicKeyBytes.buffer,
  );

  res.status(200).json({
    credentialId,
    publicKeyObject,
  });
});

app.listen(8002, () => {
  console.log('Server running on port 8002');
});
