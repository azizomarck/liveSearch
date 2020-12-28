# Insta-Search

### What is instant serach ? 

Instant search provides Search & Re-order as you type function using only plain javascript with keeping user interface functional.  
It searches through hundreds of elements in less than 0.5s without freezing the browser and it moves the top matching elemetns to the top with the matching text highlighted.  


#### When to use instant search ? 
 Need a very fast searching function
 Realying on front-end for search

### Could Instant Search be used with a large data e.g 15K records? 
If your device browser could render the large data, Instant search will work fine! Although we recommend using Instant Search to maximum of 1000 records. 


### How to use Instant Search ? 

Instant search is just a javascript class. It takes an **object** as parameter. 

For a quick start use this example. http://github.com - automatic!
[GitHub](http://github.com)

```javascript
 let param = {
            containerSelector : "#yourselecotr",
            searchInputSelector: "#yoursearchipnut",          
                 }
let instantSearch = new InstantSearch(param);
```







 <table>
   <tr>
      <th>Parameter Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default Value</th>
   </tr>
   <tr>
      <td><code>containerSelector</code></td>
      <td>css selector | string</td>
      <td>selector for the element that wraps all the records</td>
      <td><code>"#result"</code></td>
   </tr>
   <tr>
      <td><code>searchInputSelector</code></td>
      <td>css selector | string</td>
      <td>selecotor for the input element where users types a keyword to search for</td>
      <td><code>"#find"</code></td>
   </tr>
   <tr>
      <td><code>searchItemSelector</code></td>
      <td>css selector | string</td>
      <td> selector for the element that contains the record </td>
      <td><code>".search-item"</code></td>
   </tr>
   <tr>
      <td><code>fieldSelector</code></td>
      <td>css selector | string</td>
      <td>selector for the element that contains the record text</td>
      <td><code>".field"</code></td>
   </tr>
   <tr>
      <td><code>resultCount</code></td>
      <td> integer</td>
      <td>number of records that will be dragged to the top if they contain the search keyword</td>
      <td><code>10</code></td>
   </tr>
   <tr>
      <td><code>highlightColor</code></td>
      <td>hexcolor | string</td>
      <td>background of the matching keyword</td>
      <td><code>"#ffeb3b"</code></td>
   </tr>
   <tr>
      <td><code>disableStyle</code></td>
      <td>bool</td>
      <td>if set to true styling will not be applied</td>
      <td><code>false</code></td>
   </tr>
</table>



