function toRadian(degree) {
	return degree * Math.PI / 180;
}
// Esta función construye una matriz de transfromación de 3x3 en coordenadas homogéneas 
// utilizando los parámetros de posición, rotación y escala. La estructura de datos a 
// devolver es un arreglo 1D con 9 valores en orden "column-major". Es decir, para un 
// arreglo A[] de 0 a 8, cada posición corresponderá a la siguiente matriz:
//
// | A[0] A[3] A[6] |
// | A[1] A[4] A[7] |
// | A[2] A[5] A[8] |
// 
// Se deberá aplicar primero la escala, luego la rotación y finalmente la traslación. 
// Las rotaciones vienen expresadas en grados. 
function BuildTransform( positionX, positionY, rotation, scale )
{
	const scaleMatrix = [scale,0,0,0,scale,0,0,0,1];

	const rotationMatrix = [Math.cos(toRadian(rotation)), 
							Math.sin(toRadian(rotation)),
							0,
							-Math.sin(toRadian(rotation)),
							Math.cos(toRadian(rotation)),
							0,
							0,
							0,
							1];

	const traslationMatrix = [1,0,0,0,1,0,positionX,positionY,1];

	const transformationMatrix = multiplyMatrices(multiplyMatrices(traslationMatrix,rotationMatrix),scaleMatrix);
	return transformationMatrix;
}

function productoInterno(v1,v2){
	let res = 0;
	for(let i = 0 ; i < v1.length ; i++){
		res += v1[i] * v2[i];
	}
	return res;
}
function dameFila(i, mat){
	const res = []
	for(let k = 0 ; k < 3 ; k++){
		res.push(mat[i + 3 * k]);
	}
	return res;
}
function dameColumna(i, mat){
	const res = []
	for(let k = 0; k < 3 ; k++){
		res.push(mat[k + 3*i]);
	}
	return res;
}


const multiplyMatrices = (m1,m2) => {
	const res = [];
	let fil1 = [];
	let col2 = [];
	for(let x = 0 ; x < 3 ; x++){
		for(let y = 0; y < 3 ; y++){
			col2 = dameColumna(x,m2);
			fil1 = dameFila(y,m1)
			res.push(productoInterno(fil1,col2));
		}
		
	}
	return res;
}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas 
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá 
// retornar también una matriz en orden "column-major". La composición debe aplicar 
// primero trans1 y luego trans2. 
function ComposeTransforms( trans1, trans2 )
{	
	return multiplyMatrices(trans2,trans1);
}





