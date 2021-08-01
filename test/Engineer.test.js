
const Engineer = require('../Engineer');

test('creates an Engineer object', () => {
    const engineer = new Engineer('Mayuri', 34, 'mayu04@gmail.com', 'mayuripendyala');

    expect(engineer.github).toEqual(expect.any(String));
});


test('gets engineer github value', () => {
    const engineer = new Engineer('Mayuri', 34, 'mayu04@gmail.com', 'mayuripendyala');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});



test('gets role of employee', () => {
    const engineer = new Engineer('Mayuri', 34, 'mayu04@gmail.com','mayuripendyala');
    expect(engineer.getRole()).toEqual('Engineer');
});

