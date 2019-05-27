function vowelCount(s)
{
	s = s.split("")
	var vowels = {a: 0, e: 0, i: 0, o: 0, u: 0}
	for(var i = 0; i < s.length; i++)
		if(s[i] in vowels)
			vowels[s[i]] += 1
	return vowels
}

var vowels = vowelCount('Le Tour de France')
for(v in vowels) console.log("Number of times " + v + " occurs: " + vowels[v])
