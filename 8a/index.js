function vowelCount(s) {
	var vowels = {a: 0, e: 0, i: 0, o: 0, u: 0}
	s = s.split('')
	for(var i = 0; i < s.length; i++) {
		if(s[i] == 'a') vowels.a += 1
		else if(s[i] == 'e') vowels.e += 1
		else if(s[i] == 'i') vowels.i += 1
		else if(s[i] == 'o') vowels.o += 1
		else if(s[i] == 'u') vowels.u += 1
	}
	return vowels
}

var s = "Le Tour de France"
console.log(vowelCount(s))
