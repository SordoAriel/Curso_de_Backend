Hola profe, bueno, esta entrega se me hizo más difícil
Hay dos cosas importantes que no las pude hacer andar 

*Por un lado, la vista de cart/:cid. 
Se me ocurrió que para hacerlo podía ejecutar la función que tengo en cartsManager ya programada con .populate. 
En el products router.get("/") la misma función sí anda correctamente; sin embargo, en este lugar no, y no puedo entender por qué. 
Ya en mi view.router, solo me devuelve [Object], no el contenido del array donde deberían aparecer los objetos con {product y quantity}.
En public>cart.js hay un esbozo de intento de hacerlo de otra manera, por sí tengo que buscar un plan b, pero bueno, sigue a desarrollar también.

*Después, tampoco pude darle funcionalidad al botón de la vista de /products. 
No sé si era necesario, la consigna no es 100% clara al respecto, porque no sé bien de dónde se puede tomar a qué carrito debería agregar. 
Aún así, intenté pasándole de manera fija el _id de un carrito, pero tampoco de esa manera lo pude hacer andar. En mi public>products.js hay dos intentos, uno comentado y el otro no.
Tarde me dí cuenta que de esa manera estoy mezclando funciones del back en el front, y eso no debe estar bien. 
Lo siguiente que intenté es haciendo que el button sea un formulario con un method POST que ejecute el link de agregar al carrito. Tampoco lo pude hacer andar.
Finalmente me doy cuenta que hay que darle mucho uso al public>products.js , no? O con algo de lo que intenté antes estuve a un pasito y no me dí cuenta? Por esa duda es que no los he borrado (perdón la desprolijidad)
Independientemente de eso, y además del tema de de dónde tomar el carrito, cómo pasar los _ids de los productos se me hizo difícil de pensar. 

*Otra cosa, un poco menor pero que igual me hubiese gustado dejarlo tal cual como pide la consigna, es que no pude, en el products.router, 
en el método router.get("/"), 
limitar lo que se puede recibir por req.query a category y stock (la consigna dice que solo se puede buscar esos parámetros, 
pero tal como lo hice, puede buscarse cualquiera: 
title, description, etc.)

*Por último, la paginación de mi products.handlebars, si bien funciona, tampoco está óptima. Encuentro dos problemas:
	- Que aún cuando prevLink debería ser = null, me deja clickear (es porque estoy usando la etiqueta <a>?);
	- Que cuando hago una primera búsqueda con un limit != 10 , y después paso de página mediante el link, el limit se resetea a 10. 

Bueno, esas son las dudas y las tareas pendientes que me quedan al cabo de la segunda preentrega.
Como se ve, las más importantes tienen que ver con mi participación en el no-selecto club de detractores de handlebars :D
Quedo expectante de que me pueda ayudar con alguna de ellas! 
De todos modos en estos días seguiré mirando mi proyecto y recurriré a coderAsk, y si logro solucionar algo de lo mencionado, lo pusheo a github.

Por otra parte, ya reorganicé la carpeta dao siguiendo las correcciones del último desafío entregable.

Un saludo, que tenga buen fin de semana!