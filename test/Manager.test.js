
const Manager = require('../Manager');

test('creates an Manager object', () => {
    const manager = new Manager('Mayuri', 34, 'mayu04@gmail.com', 55);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});


test('gets role of employee', () => {
    const manager = new Manager('Mayuri', 34, 'mayu04@gmail.com',44);
    expect(manager.getRole()).toEqual('Manager');
});