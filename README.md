# A Basic Webpack Template

Things to be added and set up are described below. Have fun!

## Webpack Specific Setup

**Add images in HTML:**
Paste the following in the Terminal:

```
npm install --save-dev html-loader
```

Add the following object to the `modules.rules` array within `webpack.common.js`:

```
{
  test: /\.html$/i,
  loader: "html-loader",
},
```

**Add images with JavaScript:**
Add the following object to the `modules.rules` array within `webpack.common.js`:

```
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: "asset/resource",
},
```

**Load Fonts:**
Add the following object to the `modules.rules` array within `webpack.common.js`:

```
{
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: "asset/resource",
},
```

## Install ESLint

**Basic Installation:**
Paste the following in the Terminal:

```
npm install eslint --save-dev
./node_modules/.bin/eslint --init
```

> [!TIP]
> The questionnaire will let you chose the Airbnb style guide.
> You can read all the rules for the Airbnb style guide by going checking `./node_modules/eslint-config-airbnb-base/rules`

**Basic Setup:**
Add the following to the `scripts` object within `package.json`:

```
npm install eslint --save-dev
"lint": "./node_modules/.bin/eslint ./"
```

To turn off Airbnb bugging you about `console.log` statements, add the following to the `rules` object within `eslintrc.js`:

```
"no-console": "off"
```

> [!TIP]
> You can also override other rules by changing the `rules` object in within `eslintrc.js`.
> Check how to do this in the [eslint website](https://eslint.org/docs/latest/rules/)

**VSCode Setup:**

1. Once you have the eslint extension installed and go to settings ( `Cmd + ,` )
2. Go to Extensions > ESLint
3. Turn on "Eslint: Enable"
4. Turn on "Eslint: Auto Fix On Save"

## Install Prettier

**Basic Installation:**
Paste the following in the Terminal:

```
npm install --save-dev --save-exact prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

> [!TIP]
> You can tell prettier to ignore certain files by pasting the following in the terminal:
> `node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"`

**Instal ESLint config prettier:**
Paste the following in the Terminal:

```
npm install --save-dev eslint-config-prettier
```

Add `"prettier"` to the `"extends"` array in your `eslintrc.js` file. Make sure to put it **last**, so it gets the chance to override other configs

```
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

In `eslint.config.js` Import eslint-config-prettier, and put it in the configuration array – after other configs that you want to override

```
import someConfig from "some-other-config-you-use";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  someConfig,
  eslintConfigPrettier,
];
```

**Running Prettier:**
Run using this command:

```
npx prettier . --write
```

> [!TIP]
> You can tell prettier to only check certain files like so:
> `npx prettier --write fileName`
