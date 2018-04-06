/ **
 * StyleFix 1.0.3 y PrefixFree 1.0.7
* @author  Lea Verou
 * Licencia de MIT
 * /

( función () {

if ( ! window . addEventListener ) {
	regreso ;
}

var self =  ventana . StyleFix  = {
	enlace :  función ( enlace ) {
		var url =  enlace . href  ||  enlace . getAttribute ( ' data-href ' );
		prueba {
			// Ignora las hojas de estilo con el atributo data-noprefix así como las hojas de estilo alternativas o sin (data-) atributo href
			if ( ! url ||  link . rel  ! ==  ' stylesheet '  ||  link . hasAttribute ( ' data-noprefix ' )) {
				regreso ;
			}
		}
		catch (e) {
			regreso ;
		}

		var base =  url . reemplazar ( / [ ^ \ / ] + $ / , ' ' ),
		    base_scheme = ( / ^ [ az ] {3,10} : / . exec (base) || [ ' ' ]) [ 0 ],
		    base_domain = ( / ^ [ az ] {3,10} : \ / \ / [ ^ \ / ] + / . exec (base) || [ ' ' ]) [ 0 ],
		    base_query = / ^ ( [ ^ ?] * ) \? ? / . exec (url) [ 1 ], 
		    parent =  link . parentNode ,
		    xhr =  new  XMLHttpRequest (),
		    proceso ;

		xhr . onreadystatechange  =  function () {
			if ( xhr . readyState  ===  4 ) {
				proceso ();
			}
		};

		proceso  =  función () {
				var css =  xhr . responseText ;

				if (css &&  link . parentNode  && ( ! xhr . estado  ||  xhr . estado  <  400  ||  xhr . estado  >  600 )) {
					css =  auto . arreglar (css, true , link);

					// Convierte las URL relativas a absolutas, si es necesario
					if (css && base) {
						css =  css . replace ( / url \ ( \ s *? ((?: " | ') ? ) ( . +? ) \ 1 \ s *? \) / gi , función ( $ 0 , quote , url ) {
							if ( / ^ ( [ az ] {3,10} : | #) / i . test (url)) { // Absoluto y / o hash relativo
								devuelve $ 0;
							}
							else  if ( / ^ \ / \ / / . test (url)) { // Scheme-relative
								// Puede contener secuencias como /../ y /./ pero esos DO funcionan
								return  ' url (" '  + base_scheme + url +  ' ") ' ;
							}
							else  if ( / ^ \ / / . test (url)) { // Dominio-relativo
								return  ' url (" '  + base_domain + url +  ' ") ' ;
							}
							else  if ( / ^ \? / . test (url)) { // Consulta-relativo
								return  ' url (' '  + base_query + url +  ' ") ' ;
							}
							else {
								// Path-relative
								return  ' url (' '  + base + url +  ' ") ' ;
							}
						});

						// Las URL de comportamiento no deben convertirse (Problema n. ° 19)
						// base debe escaparse antes de agregarse a RegExp (Issue # 81)
						var escaped_base =  base . reemplace ( / ( [ \\\ ^ \ $ * + [ \] ? {} . =! :( |)] ) / g , " \\ $ 1 " );
						css =  css . replace ( RegExp ( ' \\ b (comportamiento: \\ s *? url \\ ( \' ? "?) '  + escaped_base, ' gi ' ), ' $ 1 ' );
						}

					var style =  document . createElement ( ' estilo ' );
					estilo . textContent  =  ' / * # sourceURL = ' + enlace . getAttribute ( ' href ' ) + ' * / \ n / * @ sourceURL = ' + enlace . getAttribute ( ' href ' ) + ' * / \ n '  + css;
					estilo . media  =  enlace . medios ;
					estilo . disabled  =  enlace . deshabilitado ;
					estilo . setAttribute ( ' data-href ' , enlace . getAttribute ( ' href ' ));

					si ( enlace . ID ) de estilo . id  =  enlace . id ;

					los padres . insertBefore (estilo, enlace);
					los padres . removeChild (enlace);

					estilo . media  =  enlace . medios ; // Duplicar es intencional. Ver el número 31
				}
		};

		prueba {
			xhr . abrir ( ' GET ' , url);
			xhr . enviar ( nulo );
		} catch (e) {
			// Retorno a XDomainRequest si está disponible
			if ( typeof XDomainRequest ! =  " undefined " ) {
				xhr =  new  XDomainRequest ();
				xhr . onerror  =  xhr . onprogress  =  function () {};
				xhr . onload  =  proceso ;
				xhr . abrir ( " GET " , url);
				xhr . enviar ( nulo );
			}
		}

		enlace . setAttribute ( ' data-inprogress ' , ' ' );
	},

	styleElement :  function ( style ) {
		if ( style . hasAttribute ( ' data-noprefix ' )) {
			regreso ;
		}
		var disabled =  estilo . deshabilitado ;

		estilo . textContent  =  self . corregir ( estilo . textContent , true , style);

		estilo . deshabilitado  = deshabilitado;
	},

	styleAttribute :  function ( element ) {
		var css =  elemento . getAttribute ( ' estilo ' );

		css =  auto . arreglar (css, false , element);

		elemento . setAttribute ( ' estilo ' , css);
	},

	proceso :  función () {
		// Hojas de estilos vinculadas
		$ ( ' link [rel = "stylesheet"]: not ([data-inprogress]) ' ). forEach ( StyleFix . enlace );

		// Hojas de estilos en línea
		$ ( ' estilo ' ). forEach ( StyleFix . styleElement );

		// Estilos en línea
		$ ( ' [estilo] ' ). forEach ( StyleFix . styleAttribute );
		
		var  evento  =  documento . createEvent ( ' Evento ' );
		evento . initEvent ( ' StyleFixProcessed ' , true , true );
		documento . dispatchEvent ( evento );

	},

	register :  function ( fijador , índice ) {
		( Auto . Fijadores  =  auto . Fijadores  || [])
			. empalme (index ===  undefined ?  self . fixers . length  : index, 0 , fixer);
	},

	fix :  function ( css , raw , element ) {
		si ( auto . fijadores ) {
		  para ( var i = 0 ; i < auto . fixers . length ; i ++ ) {
			css =  auto . arregladores [i] (css, raw, element) || css;
		  }
		}

		devolver css;
	},

	camelCase :  function ( str ) {
		volver  str . sustituir ( / - ( [ az ] ) / g , función ( $ 0 , $ 1 ) { volver  $ 1 . toUpperCase ();}). reemplazar ( ' - ' , ' ' );
	},

	deCamelCase :  function ( str ) {
		volver  str . sustituir ( / [ AZ ] / g , la función ( $ 0 ) { retorno  ' - '  +  $ 0 . toLowerCase ()});
	}
};

/ ** ************************************
 * Estilos de proceso
************************************* * /
( función () {
	setTimeout ( function () {
		$ ( ' link [rel = "stylesheet"] ' ). forEach ( StyleFix . enlace );
	}, 10 );

	documento . addEventListener ( ' DOMContentLoaded ' , StyleFix . process , falso );
}) ();

función  $ ( expr , con ) {
	devolver []. cortar . call ((con ||  document ). querySelectorAll (expr));
}

}) ();

/ **
 * PrefixFree
 * /
( función ( raíz ) {

if ( ! ventana . StyleFix  ||  ! window . getComputedStyle ) {
	regreso ;
}

// Ayudante privado
 corrección de función ( qué , antes , después , reemplazo , css ) {
	what = self [qué];

	if ( what . length ) {
		var regex =  RegExp (antes de +  ' ( '  +  what . join ( ' | ' ) +  ' ) '  + after, ' gi ' );

		css =  css . reemplazar (regex, reemplazo);
	}

	devolver css;
}

var self =  ventana . PrefixFree  = {
	prefixCSS :  function ( css , raw , element ) {
		var prefix =  self . prefijo ;

		// Revisión de ángulos de degradado
		if ( auto . funciones . indexOf ( ' linear-gradient ' ) >  - 1 ) {
			// Los degradados son compatibles con un prefijo, convertir ángulos a legado
			css =  css . reemplazar ( / ( \ s | : | ,) (repetición-) ? lineal-gradiente \ ( \ s * (- ? \ d * \. ? d * ) deg / ig , función ( $ 0 , delim , repetición , deg ) {
				return delim + ( repeat ||  ' ' ) +  ' linear-gradient ( '  + ( 90 - deg) +  ' deg ' ;
			});
		}

		css =  fix ( ' funciones ' , ' ( \\ s |: |,) ' , ' \\ s * \\ ( ' , ' $ 1 '  + prefijo +  ' $ 2 ( ' , css);
		css =  fix ( ' palabras clave ' , ' ( \\ s | :) ' , ' ( \\ s |; | \\ } | $) ' , ' $ 1 '  + prefijo +  ' $ 2 $ 3 ' , css);
		css =  fix ( ' propiedades ' , ' (^ | \\ {| \\ s |;) ' , ' \\ s *: ' , ' $ 1 '  + prefijo +  ' $ 2: ' , css);

		// Propiedades de prefijo * dentro * de valores (problema n. ° 8)
		if ( self . properties . length ) {
			var regex =  RegExp ( ' \\ b ( '  +  self . properties . join ( ' | ' ) +  ' ) (?! :) ' , ' gi ' );

			css =  fix ( ' valueProperties ' , ' \\ b ' , ' : (. +?); ' , function ( $ 0 ) {
				devuelve  $ 0 . replace (regex, prefix +  " $ 1 " )
			}, css);
		}

		if (raw) {
			css =  fix ( ' selectores ' , ' ' , ' \\ b ' , self . prefixSelector , css);
			css =  fix ( ' atrules ' , ' @ ' , ' \\ b ' , ' @ '  + prefix +  ' $ 1 ' , css);
		}

		// Fix doble prefijo
		css =  css . replace ( RegExp ( ' - '  + prefijo, ' g ' ), ' - ' );

		// comodín de prefijo
		css =  css . sustituir ( / - \ * - (=? [ az ] + ) / GI , sí . prefijo );

		devolver css;
	},

	propiedad :  función ( propiedad ) {
		return ( self . properties . indexOf (property) > = 0  ?  self . prefijo  :  ' ' ) + propiedad;
	},

	valor :  función ( valor , propiedad ) {
		value =  fix ( ' funciones ' , ' (^ | \\ s |,) ' , ' \\ s * \\ ( ' , ' $ 1 '  +  self . prefix  +  ' $ 2 ( ' , valor);
		value =  fix ( ' keywords ' , ' (^ | \\ s) ' , ' ( \\ s | $) ' , ' $ 1 '  +  self . prefix  +  ' $ 2 $ 3 ' , value);

		if ( self . valueProperties . indexOf (propiedad) > =  0 ) {
			value =  fix ( ' propiedades ' , ' (^ | \ | s |,) ' , ' ($ | \\ s |,) ' , ' $ 1 ' + self . prefix + ' $ 2 $ 3 ' , valor);
		}

		valor de retorno ;
	},

	prefixSelector :  function ( selector ) {
		regresar a  sí mismo . selectorMap [selector] || selector
	},

	// Advertencia: los prefijos no importa qué, incluso si la propiedad es compatible sin prefijo
	prefixProperty :  function ( property , camelCase ) {
		var prefijo =  self . prefijo  + propiedad;

		regresar camelCase ?  StyleFix . camelCase (prefijado) : prefijado;
	}
};

/ ** ************************************
 * Propiedades
************************************* * /
( función () {
	var prefixes = {},
		propiedades = [],
		shorthands = {},
		style =  getComputedStyle ( document . documentElement , null ),
		dummy =  documento . createElement ( ' div ' ). estilo ;

	// ¿Por qué hacemos esto en lugar de iterar sobre propiedades en un objeto .style? Porque Webkit.
	// 1. Webkit antiguo no iterará sobre esos.
	// 2. Webkit reciente lo hará, pero las propiedades con el prefijo 'Webkit' no son enumerables. El 'webkit'
	//     (minúsculas 'w') son, pero no `deCamelCase ()` en un prefijo que podemos detectar.

	var  iterate  =  function ( propiedad ) {
		if ( propiedad . charAt ( 0 ) ===  ' - ' ) {
			propiedades . push (propiedad);

			var parts =  propiedad . división ( ' - ' ),
				prefijo = partes [ 1 ];

			// El prefijo de cuenta usa
			prefijos [prefijo] =  ++ prefijos [prefijo] ||  1 ;

			// Esto ayuda a determinar los shorthands
			mientras que ( partes . longitud  >  3 ) {
				partes . pop ();

				var taquigrafía =  partes . join ( ' - ' );

				if ( soportado (abreviado) &&  properties . indexOf (taquigrafía) ===  - 1 ) {
					propiedades . empuje (taquigrafía);
				}
			}
		}
	},
	supported  =  function ( propiedad ) {
		devuelve  StyleFix . camelCase (propiedad) en dummy;
	}

	// Algunos navegadores tienen índices numéricos para las propiedades, algunos no
	if (style &&  style . length  >  0 ) {
		para ( var i = 0 ; i < estilo . longitud ; i ++ ) {
			iterar (estilo [i])
		}
	}
	else {
		para ( propiedad de var en estilo) {
			iterar ( StyleFix . deCamelCase (propiedad));
		}
	}

	// Encuentra el prefijo más utilizado
	var highest = {uses : 0 };
	para ( prefijo var en prefijos) {
		var uses = prefixes [prefix];

		if ( highest . usa  < uses) {
			highest = {prefix : prefix, uses : uses};
		}
	}

	auto . prefijo  =  ' - '  +  más alto . prefijo  +  ' - ' ;
	auto . Prefijo  =  StyleFix . camelCase ( auto . prefijo );

	auto . propiedades  = [];

	// Obtenga propiedades SÓLO compatibles con un prefijo
	para ( var i = 0 ; i < propiedades . longitud ; i ++ ) {
		var propiedad = propiedades [i];

		if ( propiedad . indexOf ( self . prefix ) ===  0 ) { // podríamos tener múltiples prefijos, como Opera
			var unprefixed =  propiedad . rebanada ( auto . prefijo . longitud );

			if ( ! supported (no prefixed)) {
				auto . propiedades . empujar (sin prefijo);
			}
		}
	}

	// IE arreglar
	if ( auto . Prefijo  ==  ' Ms '
	  &&  ! ( ' transformar '  en el maniquí)
	  &&  ! ( ' MsTransform '  en el maniquí)
	  && ( ' msTransform '  en el dummy)) {
		auto . propiedades . push ( ' transformar ' , ' transformar-origen ' );
	}

	auto . propiedades . sort ();
}) ();

/ ** ************************************
 * Valores
************************************* * /
( función () {
// Valores que pueden necesitar prefixing
var functions = {
	' gradiente lineal ' : {
		propiedad :  ' backgroundImage ' ,
		params :  ' rojo, verde azulado '
	},
	' calc ' : {
		propiedad :  ' ancho ' ,
		params :  ' 1px + 5% '
	},
	' elemento ' : {
		propiedad :  ' backgroundImage ' ,
		params :  ' #foo '
	},
	' cross-fade ' : {
		propiedad :  ' backgroundImage ' ,
		params :  ' url (a.png), url (b.png), 50% '
	},
	' conjunto de imágenes ' : {
		propiedad :  ' backgroundImage ' ,
		params :  ' url (a.png) 1x, url (b.png) 2x '
	}
};


funciones [ ' repeating-linear-gradient ' ] =
funciones [ ' repeating-radial-gradient ' ] =
funciones [ ' radial-gradient ' ] =
funciones [ ' linear-gradient ' ];

// Nota: Las propiedades asignadas son solo para * probar * soporte.
// Las palabras clave estarán prefijadas en todas partes.
var keywords = {
	' inicial ' :  ' color ' ,
	' agarrar ' :  ' cursor ' ,
	' agarrar ' :  ' cursor ' ,
	' zoom-in ' :  ' cursor ' ,
	' alejar ' :  ' cursor ' ,
	' caja ' :  ' pantalla ' ,
	' flexbox ' :  ' visualización ' ,
	' inline-flexbox ' :  ' visualización ' ,
	' flex ' :  ' visualización ' ,
	' inline-flex ' :  ' visualización ' ,
	' grid ' :  ' display ' ,
	' rejilla en línea ' :  ' visualización ' ,
	' max-content ' :  ' ancho ' ,
	' min-contenido ' :  ' ancho ' ,
	' ajuste de contenido ' :  ' ancho ' ,
	' fill-available ' :  ' ancho ' ,
	' contener-flotadores ' :  ' ancho '
};

auto . funciones  = [];
auto . palabras clave  = [];

var style =  document . createElement ( ' div ' ). estilo ;

función  soportada ( valor , propiedad ) {
	style [propiedad] =  ' ' ;
	estilo [propiedad] = valor;

	regreso  !! estilo [propiedad];
}

para ( var func en funciones) {
	var test = funciones [func],
		propiedad =  prueba . propiedad ,
		value = func +  ' ( '  +  test . params  +  ' ) ' ;

	if ( ! supported (valor, propiedad)
	  &&  supported ( self . prefix  + value, property)) {
		// Es compatible, pero con un prefijo
		auto . funciones . push (func);
	}
}

para ( palabra clave var en palabras clave) {
	var propiedad = palabras clave [palabra clave];

	if ( ! supported (palabra clave, propiedad)
	  &&  supported ( self . prefix  + keyword, property)) {
		// Es compatible, pero con un prefijo
		auto . palabras clave . push (palabra clave);
	}
}

}) ();

/ ** ************************************
 * Selectores y reglas @
************************************* * /
( función () {

var
selectores = {
	' : any-link ' :  null ,
	' :: telón de fondo ' :  nulo ,
	' : pantalla completa ' :  nulo ,
	' : pantalla completa ' :  ' : pantalla completa ' ,
	// suspiro
	' :: placeholder ' :  null ,
	' : placeholder ' :  ' :: placeholder ' ,
	' :: input-placeholder ' :  ' :: placeholder ' ,
	' : input-placeholder ' :  ' :: placeholder ' ,
	' : solo lectura ' :  nulo ,
	' : leer-escribir ' :  nulo ,
	' :: selección ' :  nulo
},

atrules = {
	' fotogramas clave ' :  ' nombre ' ,
	' viewport ' :  null ,
	' documento ' :  ' regexp (".") '
};

auto . selectores  = [];
auto . selectorMap  = {};
auto . atrules  = [];

var estilo =  raíz . appendChild ( document . createElement ( ' estilo ' ));

función  soportada ( selector ) {
	estilo . textContent  = selector +  ' {} ' ;  // Safari 4 tiene problemas con style.innerHTML

	regreso  !! estilo . la hoja . cssRules . longitud ;
}

for ( var selector en selectores) {
	var standard = selectores [selector] || selector
	var prefijo =  selector . replace ( / :: ? / , función ( $ 0 ) { return $ 0 +  self . prefix })
	if ( ! supported (estándar) &&  supported (prefixed)) {
		auto . selectores . empuje (estándar);
		auto . selectorMap [estándar] = prefijado;
	}
}

para ( var atrule in atrules) {
	var test = atrule +  '  '  + (atrules [atrule] ||  ' ' );

	if ( ! supported ( ' @ '  + test) &&  supported ( ' @ '  +  self . prefix  + test)) {
		auto . atrules . empuje (atrule);
	}
}

raíz . removeChild (estilo);

}) ();

// Propiedades que aceptan propiedades como su valor
auto . valueProperties  = [
	' transición ' ,
	' propiedad de transición ' ,
	' will-change '
]

// Agregar clase para el prefijo actual
raíz . className  + =  '  '  +  self . prefijo ;

StyleFix . registrarse ( self . prefixCSS );


}) ( document . documentElement );
