const check = (req) => {
    const word = req.body;
    const password = 'temat';

    console.log(word);

    return 'ok';
}

module.exports = {
	check: check
};