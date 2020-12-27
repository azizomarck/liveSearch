﻿# Insta-Search

### What is instant serach ? 

Instant search provides Search & Re-order as you type function using only plain javascript with keeping user interface functional.  
It searches through hundreds of elements in less than 0.5s without freezing the browser and it moves the top matching elemetns to the top with the matching text highlighted.  


#### When to use instant search ? 
 Need a very fast searching function
 Realying on front-end for search

### Could Instant Search be used with a large data e.g 15K records? 
If your device browser could render the large data, Instant search will work fine! Although we recommend using Instant Search to maximum of 1000 records. 


### How to use Instant Search ? 

Instant search is just a javascript class. It takes a **object** as parameter. 

For a quick start use this example. http://github.com - automatic!
[GitHub](http://github.com)

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


<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #result {
            background-color: #fafbfd;
            padding: 10px;
        }

        #result .search-item {
            padding: 10px;
            background-color: white;
            margin: 10px;
            box-shadow: 3px 5px 7px -8px grey;
        }


        .flex {
            display: flex;
        }

        .flex-center {
            justify-content: center;

        }

        .mark {
            background-color: burlywood;
        }
    </style>
</head>

<body>
    <h1> </h1>

    <div class="flex flex-center">
        <input type="text" placeholder="Enter a keyword" id="find">

    </div>

    <div id="result">
        <div class="search-item" data-id="1">
            <h3 class="field">1-Year Accidental Geek Squad Protection</h3>
            <div class="field"> Made By</div>
            <div class="field">84.99 </div>
        </div>
    </div>


    <script>
        class Field {
            constructor(id, name, text) {
                this.id = id,
                    this.name = name,
                    this.text = text
            }
        }
        class InstantSearch {
            constructor({
            containerSelector = "#result",
            searchInputSelector= "#find",
            searchItemSelector = ".search-item",
            fieldSelector = ".field",
            resultCount = 10,
            highlightColor = "#ffeb3b"     
            }){
             this.searchInputSelector=searchInputSelector,
             this.containerSelector = containerSelector,
             this.searchItemSelector = searchItemSelector,
             this.fieldSelector = fieldSelector,
             this.resultCount = resultCount,
             this.highlightColor = highlightColor,
                 this._searchData = []
            console.log('begin')
            console.log(searchInputSelector)
            console.log('end')
                if (this.ValidElements()){
                    this.Init()
                }
            }

            ValidElements() {
                if (document.querySelector(this.containerSelector) == null)
                    console.error('Instant Search: invalid selector ' + this.containerSelector)

                if (document.querySelector(this.searchInputSelector) == null)
                    console.error('Instant Search: invalid selector ' + this.searchItemSelector)
                if (document.querySelector(this.searchInputSelector) == null)
                    console.error('Instant Search: invalid selector ' + this.searchInputSelector)
                return true;

            }
            FormMark(e) {
                return `<span class="mark">${e}</span>`
            }

            GetSearchData() {
                let searchItems = Array.from(document.querySelectorAll(
                    `${this.containerSelector} > ${this.searchItemSelector}`));
                searchItems.forEach((element) => {
                    let value = element.innerText;
                    let id = element.getAttribute('data-id');
                    let item = {
                        value,
                        id
                    };
                    this._searchData.push(item);
                })

            }
            _SetStyle() {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML += `
                ${this.searchInputSelector} {
                    width: 80%;
                    padding: 2.rem;
                    padding: 0.8rem;
                    outline: gray;
                    border: 1px solid #d6d4d4;
                    font-size: 1.1em;
                    margin: 10px; 
                    background: #e6eaed; 
                } `;

                style.innerHTML += `.mark{ background-color:${this.highlightColor} !important; }`;
                document.getElementsByTagName('head')[0].appendChild(style);
            }
            Find(keyword) {
                var self = this;
                Array.from(document.getElementsByClassName('mark')).forEach(e => e.classList.remove('mark'));
                let regExp = new RegExp(keyword, 'ig');
                let totalResult = self._searchData.filter(e => e.value.match(regExp)?.length > 0);
                if (!totalResult)
                    return false;
                console.log(totalResult)

                let result = totalResult.splice(0, self.resultCount);

                result.forEach(e => {
                    setTimeout(() => {
                        let element = document.querySelector(`*[data-id="${e.id}"]`);
                        let elemenText = element.textContent.match(regExp)?.[0];
                        if (elemenText == undefined || elemenText == null)
                            return false;
                        // element.innerHTML = element.innerText.replaceAll(regExp, self.FormMark( matchText));
                        // document.querySelector(this.containerSelector).prepend(element);
                        // iterate though the fields  get the matched string and replace
                        this.fields = Array.from(document.querySelectorAll(
                            `*[data-id="${e.id}"] ${this.fieldSelector}`));
                        // console.log(this.fields);
                        this.fields.forEach(e => {
                            let fieldElement = e;
                            let matchText = fieldElement.textContent.match(regExp)?.[0];
                            fieldElement.innerHTML = fieldElement.innerText.replaceAll(
                                regExp, self.FormMark(matchText));
                            document.querySelector(this.containerSelector).prepend(element);
                        });
                    }, 0)

                })

            }
            Init() {
                this._SetStyle();
                this.GetSearchData();
                // element that holds the user input
                let input = document.querySelector(this.searchInputSelector)
                var self = this;
                input.addEventListener('input', function () {
                    self.Find(this.value);
                })
            }


        }

        // let url = `https://api.bestbuy.com/v1/products?apiKey=2kM43yKgdrp9oasG2or2OhRW&sort=name.asc&show=name,modelNumber,thumbnailImage,regularPrice&format=json`;
        // fetch(url).then(e=>{
        //     console.log(e)
        // })
 let products =    [
  {
    "name": "Acer - 11.6\" Touch-Screen Chromebook - Intel Celeron - 4GB Memory - 16GB eMMC Flash Memory - Gray",
    "modelNumber": "C731TC42N",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5776/5776917_s.gif",
    "regularPrice": 279
  },
  {
    "name": "Acer - 14\" Touch-Screen Laptop - Intel Core i5 - 8GB Memory - 256GB Solid State Drive - Black",
    "modelNumber": "TMP449M516P",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5800/5800505_s.gif",
    "regularPrice": 849.99
  },
  {
    "name": "Acer - 15.6\" Chromebook - Intel Atom x5 - 4GB Memory - 16GB eMMC Flash Memory - Granite Gray",
    "modelNumber": "CB3-532-108H",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6359/6359610_s.gif",
    "regularPrice": 229
  },
  {
    "name": "Acer - 15.6\" Refurbished Chromebook - Intel Celeron - 2GB Memory - 16GB eMMC Flash Memory - Granite Gray",
    "modelNumber": "NX.GHJAA.007",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6202/6202723_s.gif",
    "regularPrice": 177
  },
  {
    "name": "Acer - 15.6\" Refurbished Chromebook - Intel Celeron N4000 - 4GB Memory - 32GB Flash Drive - Silver",
    "modelNumber": "NX.HKBAA.002",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428257_s.gif",
    "regularPrice": 199.99
  },
  {
    "name": "Acer - Aspire 5 14\" Refurbished Laptop - Intel Core i5 10210U - 8GB Memory - 512GB Solid State Drive - Black",
    "modelNumber": "NX.HLZAA.002",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428267_s.gif",
    "regularPrice": 548.99
  },
  {
    "name": "Acer - Aspire 5 15.6\" Refurbished Laptop - Intel Core i5 10210U - 8GB Memory - 512GB Solid State Drive - Black",
    "modelNumber": "NX.HN1AA.002",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428259_s.gif",
    "regularPrice": 498.99
  },
  {
    "name": "Acer - Aspire 5 Refurbished Laptop - AMD Ryzen 5 4500U - 8GB Memory - 512GB Solid State Drive - Black",
    "modelNumber": "NX.HW1AA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437198_s.gif",
    "regularPrice": 476.99
  },
  {
    "name": "Acer - Chromebook Spin 713 2-in-1 13.5\" 2K VertiView 3:2 Touch - Intel i5-10210U - 8GB Memory - 128GB SSD – Steel Gray",
    "modelNumber": "CP713-2W-5874",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6416/6416477_s.gif",
    "regularPrice": 629
  },
  {
    "name": "Acer - Chromebook Spin 713 Refurbished 13.5\" Chromebook - Intel i5 10210U - 8GB Memory 128GB Solid State Drive",
    "modelNumber": "NX.HWNAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437185_s.gif",
    "regularPrice": 579.99
  },
  {
    "name": "Acer - Geek Squad Certified Refurbished Nitro 5 15.6\" Laptop - Intel Core i5 - 8GB Memory - NVIDIA GeForce GTX 1050 - 256GB SSD - Black",
    "modelNumber": "GSRF AN515-54-54W2",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6422/6422898_s.gif",
    "regularPrice": 729.99
  },
  {
    "name": "Acer - Geek Squad Certified Refurbished Nitro 5 17.3\" Laptop - Intel Core i5 - 8GB Memory - NVIDIA GeForce GTX 1650 - 512GB SSD - Black",
    "modelNumber": "GSRF AN517-51-56YW",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6422/6422897_s.gif",
    "regularPrice": 879.99
  },
  {
    "name": "Acer - Geek Squad Certified Refurbished Spin 15 2-in-1 15.6\" Touch-Screen Chromebook - Intel Pentium - 4GB Memory - 64GB SSD - Sparkly Silver",
    "modelNumber": "GSRF CP315-1H-P1K8",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6422/6422899_s.gif",
    "regularPrice": 449.99
  },
  {
    "name": "Acer - Helios 500 17.3\" Refurbished Laptop - AMD Ryzen 7 - 16GB Memory - AMD Radeon RX Vega 10 - 256GB SSD - Obsidian Black",
    "modelNumber": "NH.Q3GAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6389/6389854_s.gif",
    "regularPrice": 1446.99
  },
  {
    "name": "Acer - Predator 21\" Laptop - Intel Core i7 - 64GB Memory - 2 x NVIDIA GeForce GTX 1080 - 1TB Hard Drive + 1TB Solid State Drive - Teal blue",
    "modelNumber": "GX217176ZF",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5901/5901706_s.gif",
    "regularPrice": 8999.99
  },
  {
    "name": "Acer - Refurbished 14\" Laptop - Intel Core i7 1065G7 - 16GB Memory - 1TB Solid State Drive - Black",
    "modelNumber": "NX.HLHAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437197_s.gif",
    "regularPrice": 930.99
  },
  {
    "name": "Acer - Refurbished 15.6\" Laptop - AMD Ryzen 5 3500U - 8GB Ram 512GB Solid State Drive",
    "modelNumber": "NX.HG8AA.005",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437182_s.gif",
    "regularPrice": 487.99
  },
  {
    "name": "Acer - Refurbished 15.6\" Laptop - AMD Ryzen 5 4600H - 8GB Memory 256GB Solid State Drive - Black",
    "modelNumber": "NH.Q9GAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437189_s.gif",
    "regularPrice": 558.99
  },
  {
    "name": "Acer - Refurbished Chromebook 315 15.6\" - Intel Celeron N4020 - 4GB Ram 64GB Solid State Drive - Black",
    "modelNumber": "NX.HKCAA.005",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437195_s.gif",
    "regularPrice": 259.99
  },
  {
    "name": "Acer - Refurbished Chromebook R 13 - MediaTek M8173C - 4GB Memory - 64GB Flash - White",
    "modelNumber": "NX.GL4AA.018",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437190_s.gif",
    "regularPrice": 248.99
  },
  {
    "name": "Acer - Refurbished Chromebook Tab - 9.7\" - Tablet - 32GB - Indigo Blue",
    "modelNumber": "NX.H0BAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6346/6346455_r.gif",
    "regularPrice": 289.99
  },
  {
    "name": "Acer - Spin 1 2-in-1 11.6\" Refurbished Touch-Screen Laptop - Intel Pentium - 4GB Memory - 64GB eMMC Flash Memory - Gray",
    "modelNumber": "NX.GRMAA.009",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6307/6307201_s.gif",
    "regularPrice": 259.99
  },
  {
    "name": "Acer - Spin 1 2-in-1 11.6\" Refurbished Touch-Screen Laptop - Intel Pentium Silver - 4GB Memory - 64GB eMMC Flash Memory - Obsidian Black",
    "modelNumber": "NX.H0UAA.008",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6402/6402656_s.gif",
    "regularPrice": 259.99
  },
  {
    "name": "Acer - Spin 11 2-in-1 11.6\" Touch-Screen Chromebook - Intel Celeron - 4GB Memory - 32GB eMMC Flash Memory - Obsidian Black",
    "modelNumber": "R751TC4XP",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6175/6175410_s.gif",
    "regularPrice": 279
  },
  {
    "name": "Acer - Spin 13 2-in-1 13.5\" Touch-Screen Chromebook - Intel Core i5 - 8GB Memory - 64GB eMMC Flash Memory - Steel Gray",
    "modelNumber": "NX.EFJAA.002",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6315/6315030_s.gif",
    "regularPrice": 890.99
  },
  {
    "name": "Acer - Spin 15 2-in-1 15.6\" Touch-Screen Chromebook - Intel Pentium - 4GB Memory - 64GB Solid State Drive - Sparkly Silver",
    "modelNumber": "CP315-1H-P1K8",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6221/6221784_s.gif",
    "regularPrice": 449
  },
  {
    "name": "Acer - Spin 3 14\" Refurbished Laptop - Intel Core i5 1035G1 - 8GB Memory - 256GB Solid State Drive - Black",
    "modelNumber": "NX.HQ7AA.009",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437186_s.gif",
    "regularPrice": 723.99
  },
  {
    "name": "Acer - Swift 15.6\" Refurbished Laptop - Intel Core i5 8265U - 8GB Memory - 256GB Solid State Drive - Silver",
    "modelNumber": "NX.H7QAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428270_s.gif",
    "regularPrice": 696.99
  },
  {
    "name": "Acer - Swift 3 14\" Laptop - Intel Core i5 - 8GB Memory - 256GB Solid State Drive - Silver",
    "modelNumber": "SF3145558P9",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394618_s.gif",
    "regularPrice": 996.99
  },
  {
    "name": "Acer - Swift 3 14\" Refurbished Laptop - AMD Ryzen 5 4500U - 8GB Memory 512GB Solid State Drive - Silver",
    "modelNumber": "NX.HSEAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437196_s.gif",
    "regularPrice": 600.99
  },
  {
    "name": "Acer - Swift 3 14\" Refurbished Laptop - AMD Ryzen 7 4700U - 8GB Memory 512GB Solid State Drive - Silver",
    "modelNumber": "NX.HSEAA.003",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437183_s.gif",
    "regularPrice": 600.99
  },
  {
    "name": "Acer - Swift 3 14\" Refurbished Laptop - Intel Core i5 1035G1 - 8GB Memory - 512GB Solid State Drive - Gray",
    "modelNumber": "NX.HJFAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428263_s.gif",
    "regularPrice": 597.99
  },
  {
    "name": "Acer - Swift 5 15.6\" Refurbished Laptop - Intel Core i5 8265U - 8GB Memory - 256GB Solid State Drive - Blue",
    "modelNumber": "NX.H69AA.002",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428258_s.gif",
    "regularPrice": 796.99
  },
  {
    "name": "Acer - Swift 7 14\" Touchscreen Notebook - i7-8500Y - 16GB Memory - UHD Graphics 615 - 512GB Solid State Drive",
    "modelNumber": "SF71452T70CE",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6393/6393993_s.gif",
    "regularPrice": 1999.99
  },
  {
    "name": "Acer - TravelMate 14\" Refurbished Laptop - Intel Core i7 8565U - 16GB Memory - 512GB Solid State Drive - Black",
    "modelNumber": "NX.VK9AA.002",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428266_s.gif",
    "regularPrice": 1095.99
  },
  {
    "name": "Acer Aspire 5 15.6\" Laptop Intel Core i7-10510U 16GB Ram 1TB HDD Windows 10 Home - Refurbished",
    "modelNumber": "NX.HN0AA.003",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6417/6417672_s.gif",
    "regularPrice": 791.99
  },
  {
    "name": "Acer Chromebook Spin 713 CP713-2W-3311",
    "modelNumber": "CP713-2W-3311",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6441/6441577_s.gif",
    "regularPrice": 529.99
  },
  {
    "name": "Acer ENDURO N3 EN31451W53RR 14\" Notebook - Full HD - 1920 x 1080",
    "modelNumber": "EN31451W53RR",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6438/6438149_s.gif",
    "regularPrice": 1099.99
  },
  {
    "name": "Acer Spin 3 - 14\" Laptop Intel Core i5-8265U 1.6GHz 8GB Ram 256GB SSD Win10Home - Refurbished",
    "modelNumber": "NX.HDCAA.001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6417/6417677_s.gif",
    "regularPrice": 671.99
  },
  {
    "name": "Acer Spin 3 SP31454N50W3 14\" Touchscreen 2 in 1 Notebook,Full HD - 1920 x 1080",
    "modelNumber": "NXHQ7AA001",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6438/6438148_s.gif",
    "regularPrice": 829.99
  },
  {
    "name": "Apple - Geek Squad Certified Refurbished MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "GSRF MWP42LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6437/6437575_s.gif",
    "regularPrice": 1799.99
  },
  {
    "name": "Apple - Geek Squad Certified Refurbished MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 128GB SSD - Space Gray",
    "modelNumber": "GSRF MUHN2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6440/6440911_s.gif",
    "regularPrice": 1499.99
  },
  {
    "name": "Apple - Geek Squad Certified Refurbished MacBook Pro - 13.3\" Retina Display - Intel Core i5 - 8GB Memory - 256GB SSD - Space Gray",
    "modelNumber": "GSRF MPXV2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430508_s.gif",
    "regularPrice": 1799.99
  },
  {
    "name": "Apple - MacBook 12\" Refurbished Laptop - Intel Core m3 - 8GB Memory - 256GB Solid State Drive - Space Gray",
    "modelNumber": "MNYF2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6348/6348976_s.gif",
    "regularPrice": 849.99
  },
  {
    "name": "Apple - MacBook 12\" Retina Display - Intel Core i5 - 8GB Memory - 512GB Flash Storage - Gold",
    "modelNumber": "MRQP2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5998/5998803_s.gif",
    "regularPrice": 1599.99
  },
  {
    "name": "Apple - MacBook Air - 13.3\" Retina Display - Intel Core i5 - 8GB Memory - 256GB Flash Storage - Gold",
    "modelNumber": "MREF2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5998/5998801_s.gif",
    "regularPrice": 1399.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i3 - 8GB Memory - 256GB Solid State Drive - Gold",
    "modelNumber": "MWTL2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366612_s.gif",
    "regularPrice": 949.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i3 - 8GB Memory - 256GB Solid State Drive - Silver",
    "modelNumber": "MWTK2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366608_s.gif",
    "regularPrice": 949.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i3 - 8GB Memory - 256GB Solid State Drive - Space Gray",
    "modelNumber": "MWTJ2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366606_s.gif",
    "regularPrice": 949.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i5 - 16GB Memory - 512GB Solid State Drive - Space Gray",
    "modelNumber": "MVH62LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6408/6408026_s.gif",
    "regularPrice": 1699.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i5 - 8GB Memory - 128GB Solid State Drive - Space Gray",
    "modelNumber": "MVFH2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6356/6356906_s.gif",
    "regularPrice": 899.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i5 - 8GB Memory - 512GB Solid State Drive - Gold",
    "modelNumber": "MVH52LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366614_s.gif",
    "regularPrice": 1249.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i5 - 8GB Memory - 512GB Solid State Drive - Silver",
    "modelNumber": "MVH42LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366609_s.gif",
    "regularPrice": 1249.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Laptop with Touch ID - Intel Core i5 - 8GB Memory - 512GB Solid State Drive - Space Gray",
    "modelNumber": "MVH22LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366607_s.gif",
    "regularPrice": 1249.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Refurbished Laptop - Intel Core i5 - 4GB Memory - 256GB Flash Storage - Silver",
    "modelNumber": "MD761LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5849/5849407_s.gif",
    "regularPrice": 699.99
  },
  {
    "name": "Apple - MacBook Air 13.3\" Refurbished Laptop - Intel Core i5 - 8GB Memory - 128GB Flash Storage - Silver",
    "modelNumber": "MMGF2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6348/6348973_s.gif",
    "regularPrice": 699.99
  },
  {
    "name": "Apple - MacBook Air® - 13.3\" Display - Intel Core i5 - 8GB Memory - 512GB Solid State Drive - Silver",
    "modelNumber": "Z0UV0001D",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6260/6260984_s.gif",
    "regularPrice": 1399.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 1TB SSD (Latest Model) - Silver",
    "modelNumber": "MWP82LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287735_s.gif",
    "regularPrice": 1999.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 1TB SSD (Latest Model) - Space Gray",
    "modelNumber": "MWP52LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287730_s.gif",
    "regularPrice": 1999.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 256GB SSD - Silver",
    "modelNumber": "13682960",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6363/6363254_s.gif",
    "regularPrice": 1999.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 512GB SSD (Latest Model) - Silver",
    "modelNumber": "MWP72LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287729_s.gif",
    "regularPrice": 1799.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 512GB SSD (Latest Model) - Space Gray",
    "modelNumber": "MWP42LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287726_s.gif",
    "regularPrice": 1799.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 16GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "13687674",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6363/6363210_s.gif",
    "regularPrice": 2199.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 256GB SSD - Silver",
    "modelNumber": "MXK62LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287719_s.gif",
    "regularPrice": 1249.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 256GB SSD - Space Gray",
    "modelNumber": "MUHP2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5998/5998701_s.gif",
    "regularPrice": 1399.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 256GB SSD - Space Gray",
    "modelNumber": "MXK32LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287705_s.gif",
    "regularPrice": 1249.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 512GB SSD - Silver",
    "modelNumber": "MV9A2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4599/4599800_s.gif",
    "regularPrice": 1899.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 512GB SSD - Silver",
    "modelNumber": "MXK72LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287723_s.gif",
    "regularPrice": 1449.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "MV972LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4599/4599901_s.gif",
    "regularPrice": 1899.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i5 - 8GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "MXK52LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287720_s.gif",
    "regularPrice": 1449.99
  },
  {
    "name": "Apple - MacBook Pro - 13\" Display with Touch Bar - Intel Core i7 - 16GB Memory - 1TB SSD - Space Gray",
    "modelNumber": "MV982LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6356/6356939_s.gif",
    "regularPrice": 2299.99
  },
  {
    "name": "Apple - MacBook Pro - 16\" Display with Touch Bar - Intel Core i7 - 16GB Memory - AMD Radeon Pro 5300M - 512GB SSD (Latest Model) - Silver",
    "modelNumber": "MVVL2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366575_s.gif",
    "regularPrice": 2399.99
  },
  {
    "name": "Apple - MacBook Pro - 16\" Display with Touch Bar - Intel Core i7 - 16GB Memory - AMD Radeon Pro 5300M - 512GB SSD (Latest Model) - Space Gray",
    "modelNumber": "MVVJ2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366564_s.gif",
    "regularPrice": 2399.99
  },
  {
    "name": "Apple - MacBook Pro - 16\" Display with Touch Bar - Intel Core i9 - 16GB Memory - AMD Radeon Pro 5500M - 1TB SSD (Latest Model) - Silver",
    "modelNumber": "MVVM2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366581_s.gif",
    "regularPrice": 2799.99
  },
  {
    "name": "Apple - MacBook Pro - 16\" Display with Touch Bar - Intel Core i9 - 16GB Memory - AMD Radeon Pro 5500M - 1TB SSD (Latest Model) - Space Gray",
    "modelNumber": "MVVK2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366572_s.gif",
    "regularPrice": 2799.99
  },
  {
    "name": "Apple - MacBook Pro 13.3\" Refurbished Laptop - Intel Core i5 (I5-8257U) Processor - 8GB Memory - 128GB SSD (2019 Model) - Silver",
    "modelNumber": "5UHQ2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6421/6421412_s.gif",
    "regularPrice": 1099.99
  },
  {
    "name": "Apple - MacBook Pro 13.3\" Refurbished Laptop - Intel Core i5 (I5-8257U) Processor - 8GB Memory - 256GB SSD (2019 Model) - Silver",
    "modelNumber": "5UHR2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6421/6421408_s.gif",
    "regularPrice": 1199.99
  },
  {
    "name": "Apple - MacBook Pro 13.3\" Refurbished Laptop - Intel Core i5 (I5-8279U) Processor - 8GB Memory - 512GB SSD (2019 Model) - Silver",
    "modelNumber": "5V9A2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6421/6421406_s.gif",
    "regularPrice": 1459.99
  },
  {
    "name": "Apple - MacBook Pro 13.3” Refurbished Laptop – Intel Core i5 (I5-8257U) Processor -  8GB Memory - 256GB SSD (2019 Model) - Space Gray",
    "modelNumber": "5UHP2LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430774_s.gif",
    "regularPrice": 1199.99
  },
  {
    "name": "Apple - MacBook Pro 15.4\" Display with Touch Bar - Intel Core i9 - 32GB Memory - AMD Radeon Pro 555X - 1TB SSD - Space Gray",
    "modelNumber": "13687572",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6363/6363240_s.gif",
    "regularPrice": 3299.99
  },
  {
    "name": "Apple - MacBook Pro 15.4\" Display with Touch Bar - Intel Core i9 - 32GB Memory - AMD Radeon Pro 560X - 1TB SSD - Space Gray",
    "modelNumber": "MV942LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6396/6396098_s.gif",
    "regularPrice": 3799.99
  },
  {
    "name": "Apple - MacBook Pro 15.4\" Display with Touch Bar - Intel Core i9 - 32GB Memory - AMD Radeon Pro Vega 20 - 1TB SSD - Space Gray",
    "modelNumber": "MV952LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6396/6396117_s.gif",
    "regularPrice": 3499.99
  },
  {
    "name": "Apple - MacBook Pro 15.4\" Laptop - Intel Core i9 - 32GB Memory - 1TB Solid State Drive - Space Gray",
    "modelNumber": "13687710",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6363/6363363_s.gif",
    "regularPrice": 3749.99
  },
  {
    "name": "Apple - MacBook Pro 15.4\" Refurbished Laptop - Intel Core i7 (I7-9750H) Processor - 16GB Memory - 256GB SSD (2019 Model) - Space Gray",
    "modelNumber": "5V902LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6421/6421401_s.gif",
    "regularPrice": 1799.99
  },
  {
    "name": "Apple - MacBook Pro 16\" Display with Touch Bar - Intel Core i7 - 32GB Memory - 1TB SSD - Space Gray",
    "modelNumber": "Z0XZ004XR",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394170_s.gif",
    "regularPrice": 3099
  },
  {
    "name": "Apple - MacBook Pro 16\" Display with Touch Bar - Intel Core i7 - 32GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "Z0XZ004R1",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394163_s.gif",
    "regularPrice": 2999
  },
  {
    "name": "Apple - MacBook Pro 16\" Display with Touch Bar - Intel Core i9 - 64GB Memory - 2TB SSD - Space Gray",
    "modelNumber": "Z0XZ0051J",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394164_s.gif",
    "regularPrice": 4199
  },
  {
    "name": "Apple - Macbook® 12\" Refurbished Laptop - Intel Core M - 8GB Memory - 512GB Solid State Drive - Space Gray",
    "modelNumber": "MJY42LL/A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5722/5722608_s.gif",
    "regularPrice": 819.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 16GB Memory - 1TB SSD - Silver",
    "modelNumber": "Z0Y80004Y",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445513_s.gif",
    "regularPrice": 2199.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 16GB Memory - 1TB SSD - Space Gray",
    "modelNumber": "Z0Y60003P",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445507_s.gif",
    "regularPrice": 2199.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 16GB Memory - 512GB SSD - Silver",
    "modelNumber": "Z0Y80003E",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445514_s.gif",
    "regularPrice": 1999.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 16GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "Z0Y60002G",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445506_s.gif",
    "regularPrice": 1999.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 32GB Memory - 1TB SSD - Silver",
    "modelNumber": "Z0Y80000T",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445508_s.gif",
    "regularPrice": 2599.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 32GB Memory - 1TB SSD - Space Gray",
    "modelNumber": "Z0Y60000V",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445510_s.gif",
    "regularPrice": 2599.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 32GB Memory - 1TB SSD - Space Gray",
    "modelNumber": "Z0Y60005R",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445515_s.gif",
    "regularPrice": 2399.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 32GB Memory - 2TB SSD - Space Gray",
    "modelNumber": "Z0Y60003A",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445509_s.gif",
    "regularPrice": 2999.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 32GB Memory - 512GB SSD - Silver",
    "modelNumber": "Z0Y80003B",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445516_s.gif",
    "regularPrice": 2399.99
  },
  {
    "name": "Apple 13\" MacBook Pro - 32GB Memory - 512GB SSD - Space Gray",
    "modelNumber": "Z0Y60003N",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6445/6445511_s.gif",
    "regularPrice": 2399.99
  },
  {
    "name": "Apple Macbook Air With Retina True Tone Display - 13.3\" - CORE i5 - 16 GB RAM - 512 GB SSD",
    "modelNumber": "14061314",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6411/6411795_s.gif",
    "regularPrice": 1499
  },
  {
    "name": "Apple Macbook Air With Retina True Tone Display - 13.3\" - Core i5 - 8 GB RAM - 256 GB SSD",
    "modelNumber": "14061320",
    "thumbnailImage": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6411/6411775_s.gif",
    "regularPrice": 1099
  }
]
        let recordCount = 15;
        // insert items 
        for (let i = 0; i < products.length; i++) {
            // let color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
            let text =
                `<div class="search-item" style="background-color:white;" data-id="${products[i].modelNumber}">
            <h3 class="field">${products[i].name}</h3>
            <div class=""> <img src="${products[i].thumbnailImage}"/> </div>
            <div class="field">${products[i].regularPrice} $</div>
        </div>`
            document.querySelector('#result').innerHTML += text;

        }

        let param = {
            containerSelector : "#result",
            searchInputSelector: "#find",
            searchItemSelector : ".search-item",
            fieldSelector : ".field",
            resultCount : 10,
            highlightColor : "#ffeb3b"
                 }
       let instantSearch = new InstantSearch(param);

    </script>
    <script>
        //     let _searchData = [];
        //     let searchItemSelector = "div";
        //     let  idSelector = "[data-id]"
        //     let searchInputSelector = "#find";
        //     let resultCount=10;
        //     let containerSelector = "#result";

        //     setTimeout(() => {
        //         let searchItems = Array.from(document.querySelectorAll(`${containerSelector} > ${searchItemSelector}`));
        //         searchItems.forEach(function(element){
        //             let value = element.innerText;
        //             let id = element.getAttribute('data-id');
        //              let item = {value,id};
        //             _searchData.push(item);
        //         })
        //     }, 3000);





        //   /** 
        //  * hightlight the search keyword by inserting it into an element
        //  * @param {string} title - The title of the book.
        //  * @param {string} author - The author of the book.
        //  */
        //         let formMark = (e) => `<span class="mark">${e}</span>`;


        //         // element that holds the user input
        //         let input = document.querySelector(searchInputSelector)


        //         input.addEventListener('input',function(){
        //         //unhighlight the found text  
        //         Array.from(document.getElementsByClassName('mark')).forEach(e=>e.classList.remove('mark'));

        //             let keyword= this.value;
        //             let regExp = new RegExp(keyword, 'ig');
        //             let totalResult = _searchData.filter(e=>e.value.match(regExp)?.length > 0);

        //             if(!totalResult)
        //             return false;

        //             let result = totalResult.splice(0,resultCount); 

        //             result.forEach(e=>{                    
        //                 setTimeout(()=>{
        //             let element = document.querySelector(`*[data-id="${e.id}"]`);
        //             let matchText = element.textContent.match(regExp)[0];
        //             element.innerHTML = element.innerText.replaceAll(regExp,formMark(matchText));
        //             $("#result").prepend(element);
        //                 },0)

        //             })
        //         })
    </script>

</body>

</html>








