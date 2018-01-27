parse your given har files,then build a excel file based on that file
# use in app
install by npm:
```bash
npm i har-to-excel -S
```
example:
```javascript
const hte=require('har-to-excel');
let harFilePath='c:\www.baidu.com.har';
hte(harFilePath);
```
then,it successfully outputs;
#CLI
install by npm(use admin account):
```bash
npm i har-to-excel -g
```
then,run in your termial:
```bash
hte --src yourHarFilePath
```
or:
```bash
hte --help
```
for help;