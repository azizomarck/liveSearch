var dog = "dog";
class Field {
            constructor(id, name, text) {
                this.id = id,
                    this.name = name,
                    this.text = text
            }
        }
        class InstantSearch {
            constructor(
            containerSelector = "#result",
            searchInputSelector= "#find",
            searchItemSelector = ".search-item",
            fieldSelector = ".field",
            resultCount = 10,
            highlightColor = "#ffeb3b"                
            ){
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
                if(typeof this.containerSelector != 'string' ||
                 typeof this.searchInputSelector != "string" ||
                 typeof this.searchItemSelector != "string" ||
                 typeof this.fieldSelector != "string")
                 console.log('invalid type')
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