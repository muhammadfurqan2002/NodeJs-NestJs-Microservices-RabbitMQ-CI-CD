//objects -> handle binary data
// file system operations, cryptography, image processing


const bufferOne=Buffer.alloc(10); // 10 bytes

console.log(bufferOne);


const bufferFromStream=Buffer.from("HELLO");
console.log(bufferFromStream);


const bufferIntegerArrayStream=Buffer.from([1,2,3,4,5]);
console.log(bufferIntegerArrayStream);



bufferOne.write("Good Morning");

console.log(bufferOne.toString())


console.log(bufferFromStream[0]);

console.log(bufferIntegerArrayStream.slice(0,2));

const concatBuffer=Buffer.concat([bufferOne,bufferFromStream]);


console.log(concatBuffer.toJSON())


