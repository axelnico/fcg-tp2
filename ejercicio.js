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
	const scaleMatrix = [[scale,0,0],[0,scale,0],[0,0,1]];

	const rotationMatrix = [[Math.cos(rotation), -Math.sin(rotation),0],[Math.sin(rotation),Math.cos(rotation),0],[0,0,1]];

	const traslationMatrix = [[1,0,positionX],[0,1,positionY],[0,0,1]];

	const transformationMatrix = multiplyMatrices(multiplyMatrices(scaleMatrix,rotationMatrix),traslationMatrix);
	return transformationMatrix.flat();
}

const multiplyMatrices = (m1,m2) => {
  const m1Rows = m1.length;
  const m1Cols = m1[0].length;
  const m2Cols = m2[0].length;
  const result = new Array(m1Rows);
  for (let row = 0; row < m1Rows; row++) {
	  result[row] = new Array(m2Cols);
	  for (let column = 0; column < m2Cols; column++) {
		  result[row][column] = 0;
	  	  for (let i = 0; i < m1Cols; i++) {
		      result[row][column] += m1[row][i] * m2[i][column]	  
	      }
	  }
  }
  return m1;
}

const matrix1DtoND = (m,cols) => {
	let i = 0;
	const l = m.length;
	const result = [];
	while (i < l) {
		result.push(new Array(cols));
		for (let c = 0; c < cols; c++) {
			result[result.length -1][c] = m[i]
			i++;
		}
	}
	return result;
}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas 
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá 
// retornar también una matriz en orden "column-major". La composición debe aplicar 
// primero trans1 y luego trans2. 
function ComposeTransforms( trans1, trans2 )
{
	const m1 = matrix1DtoND(trans1,3);
	const m2 = matrix1DtoND(trans2,3);
	const composeMatrix = multiplyMatrices(m1,m2);
	return composeMatrix.flat();
}


