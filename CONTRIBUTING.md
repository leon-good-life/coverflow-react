
## Contributing Guide
Opening issues and code contributions are welcomed.
### Remarks
* Edit files in `src` directory, don't edit files in `lib` dircetory, they are auto generated when running `npm run build` command.
* The files in this repository don't include demo. You can use [coverflow-react-demo](https://github.com/leon-good-life/coverflow-react-demo) repository.
### Installation instructions
You will need two terminal tabs or windows.
```bash
# terminal 1:
git clone https://github.com/leon-good-life/coverflow-react.git
cd coverflow-react
npm install
npm run build
npm pack
cd ..
git clone https://github.com/leon-good-life/coverflow-react-demo.git
cd coverflow-react-demo
npm install
npm start
```
Your browser will be opened automatically and you will see `coverflow-react-demo` there.
Open in your IDE `coverflow-react` project and edit files in `src` directory. And then, run the following commands:
```bash
# terminal 2:
npm run build
cp -R ./lib ../coverflow-react-demo/node_modules/coverflow-react/lib

# terminal 1:
# Press `Ctrl` + `C` keys.
npm start
```
The page will be reloaded in your browser and you will see your changes.
