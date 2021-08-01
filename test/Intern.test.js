
const Intern = require('../Intern');

test('creates an Intern object', () => {
    const intern = new Intern('Mayuri', 34, 'mayu04@gmail.com', 'RMIT');

    expect(intern.school).toEqual(expect.any(String));
});


test('gets intern school', () => {
    const intern = new Intern('Mayuri', 34, 'mayu04@gmail.com', 'RMIT');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});



test('gets role of employee', () => {
    const intern = new Intern('Mayuri', 34, 'mayu04@gmail.com','RMIT');
    expect(intern.getRole()).toEqual('Intern');
});

