# Insta-Search

### What is instant serach ? 

Instant search provides Search & Re-order as you type function using only plain javascript with keeping user interface functional.  
It searches through hundreds of elements in less than 0.5s without freezing the browser and it moves the top matching elemetns to the top with the matching text highlighted.

[DEMO](http://github.com)




#### When to use instant search ? 
 Need a very fast searching function
 Realying on front-end for search

### Could Instant Search be used with a large data e.g 15K records? 
If your device browser could render the large data, Instant search will work fine! Although we recommend using Instant Search to maximum of 1000 records. 


### How to use Instant Search ? 

Instant search is just a javascript class. It takes an **object** as parameter. 

For a quick start use this example. http://github.com - automatic!
[GitHub](http://github.com)
```html 
<script src="./search.js"> </script>

	<script src="./search.js"></script>
	<body>
		<input id="find">
			<!-- container -->
			<div id="employeesList">
        <!--record-->
        <!--data-id is required and must be unique-->
				<section class="search-item" data-id="9021">
					<div class="field"> John Smoith</div>
					<div>
						<a>link to John profile</a>
					</div>
					<div class="field"> Accounting Department</div>
				</section>
        <!--record-->
        <!--data-id is required and must be unique-->
				<section class="search-item" data-id="9321">
					<div class="field">Oscar Wilde</div>
					<div>
						<a>link to Oscar profile</a>
					</div>
					<div class="field">Marketing Department </div>
        </section>

			</div>
		</body>
		<script>
  let instanceSearch = new InstantSearch({
    containerSelector: "#employeesList"
  })
</script>
