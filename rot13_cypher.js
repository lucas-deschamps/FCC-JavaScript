function rot13(str) {
  return str.replace(/[A-Z]/g, 
  L => String.fromCharCode((L.charCodeAt() % 26) + 65)
  );
}

console.log(rot13("SERR YHPNF PNZC"));
