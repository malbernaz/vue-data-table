## quiz.js

```js
let Fernet = require("fernet");
let secret = new Fernet.Secret("TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=");
// Oh no! The code is going over the edge! What are you going to do?
let message =
  "gAAAAABcDyGK5VD67x7hrHFZ2Hzdvlvudv1DUybADdn20-_SEGojb5uXgCqoOZbix8KUfGXQvuGTl4CzdmHn-PV-I0IZKeiXrV-Zzmpkon-DZdfvP7Sd03dr23RtpVfUD0QqPe5-UIfCJ5hHQyErSP-rzdmcwkdRJTXAtLtQhaRMgSAom4-AwpohVJn0k-bv5rJ2OLPZTfXq";
let token = new Fernet.Token({ secret, token: message, ttl: 0 });

token.decode();
```
