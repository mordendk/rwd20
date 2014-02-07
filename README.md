Responsive Web Design 2.0
=====

Responsive breakpoints for AngularJS applications - enables/disables functionality entirely instead of the traditional show/hide.


What do we want to achieve?
------------------------------
We want to be able to build truly responsive user interfaces, without letting content and functionality targeting a specific screen size, affect the performance of another - no matter how rich it is.



What do we need to do?
----------------------
We need to lay down the basis for creating intelligent self-contained components. They will be aware of all their own prerequisites, which most likeliy will be any mix of styling, templating, data and behaviour - ie. CSS, HTML, JSON and JS. 

In addition of doing traditional RWD of scaling and moving these components, they can be bound to specific [breakpoints](http://alistapart.com/article/designing-for-breakpoints), defining on which screen sizes they are needed and which ones they're not. This is the key part in RWD2.0 as they will not linger and affect performance unless specifically a part of that user interface.



**Client side logic**
The client side logic is pretty straight forward, and is in the direction of proper [Web Components](http://css-tricks.com/modular-future-web-components/), but without the need of encapsulation and cross domain sharing.

Basically for each component we need to define:

- A JSON source (data)
- Client side template and styling (HTML & CSS)
- Functionality layer if needed (JS)
- Configurable breakpoints (To match other RWD concepts in place)


AngularJS will give us almost all we need to contain these on a per element basis in a structured way.


**Server side logic**
For common data sources like catalogs, we are close to achieving this today. On most solutions we are already serving this as JSON from just a few service endpoints.


I guess the hardest part will be turning Umbraco into a JSON source, being able to serve both content and rich elements in the bits and peices that are needed, while maintaining a proper flow for content editors. If we focus backend work on honoring this, perhaps we could also get the benefit of turning the CMS part of our solutions into single page application - as we already do on most catalog browsing - sounds like a win-win.


*But I would appreciate input on this from backend dudes so we can get closer to what needs to be done serverside*.



**Other considerations**
RWD2.0 could result in a scenario of many requests per interface rendering, and although non-blocking could defeat the whole purpose. There will be extra credits for figuring out a way to pool all pending requests for a given interface into a single one mapped to a single server endpoint.



What would be the scope for this innovation camp?
-------------------------------------------------
Getting a POC of something relevant up and running on an Umbraco CMS platform. Preferrably a mix of both editor generated content and a data source - ie. a catalog, to mimic the challenges that we usually face.


We could team up with the rewamp of vertica.dk, building something relevant to see if this approach really shines, and finally get a company website to strut our stuff!

Another candidate could be the vertica webshop as Steven proposed.

