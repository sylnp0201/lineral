# Lineral.js
A light-weight helper to access nested properties of JavaScript objects.


## Usage
The main purpose of this library is to avoid writing protective code like this:
```es6
if (myObj && myObj.keyA && myObj.keyA.keyB && ...) {
  const valueX = myObj.keyA.keyB...;
  // move on with the presence of valueX;
} else {
  // handle it without valueX;
}
```
With `lineral` here is what you do
```es6
import L from "lineral";

const valueX = L(myObj, 'keyA.keyB.keyC...'); // returns either a value or null
```
It either returns the value by following through the keys, or returns `null` if the key-path doesn't exist or is invalid at some point.

`lineral` also works with arrays. Instead of passing the property name, you now pass the index value surrounded by `[]`:
```es6
const myObj = { foo: ['zero', 'one', { 'two': 'bar' }] };
L(myObj, 'foo.[0]'); // => 'zero'
L(myObj, 'foo.[2].two'); // => 'bar'
L(myObj, 'foo.[10].two'); // => null
```

## Currying
Yes, `lineral` supports currying.
```es6
const myObj = { foo: ['zero', 'one', { 'two': 'bar' }] };
const myL = L(myObj);

myL('foo'); // => ['zero', 'one', { 'two': 'bar' }]
myL('foo.[0]'); //=> 'zero'
```


## Install
`npm install lineral`

Bundle size: 572B


## More Examples
Assume you have a JavaScript object like this:
```es6
// object article
{
  "headline": {
    text: 'hello world',
    markup: '<strong>hello</strong> world'
  },
  "publishedAt": "2016-04-01T12:46:12"
  "authors": [
    {
      "firstName": "first0",
      "lastName": "last0",
      "images": [
        {
          "size": "1x",
          "src": "the-1x-image.png",
        },
        {
          "size": "2x",
          "src": "the-2x-image.png",
        }
      ]
      ...
    },
    {
      "firstName": "first1",
      "lastName": "last1",
      "images": undefined,
      ...
    }
  ]
}
```
Here is how can you access the nested values using `lineral`:

```es6
import L from 'lineral';

const l = L(article);
const headline = l('headline.text');
// Yes, you still have to check if headline === null before you use it.
// But it's much more concise than having to check the entire path

const authorImages = l('authors')
  .map(author => L(author, 'images.[0].src'))
  .filter(imageSrc => imageSrc != null);
// => ['the-1x-image.png']
```
