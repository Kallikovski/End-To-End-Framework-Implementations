//import 'expect-puppeteer'

describe('Testing all user features!', () => {
  test('Signup', async () => {
    //Signup
    await page.goto('http://localhost:5173/signup', {
      waitUntil: 'networkidle0',
    });
    await page.type('#surname', 'Max');
    await page.type('#last_name', 'Mustermann');
    await page.type('#occupation', 'Teacher');
    await page.type('#age', '37');
    await page.type('#email', 'max.mustermann@gmail.com');
    await page.type('#password', '1234abcd');
    await page.click('#submit');
    await page.waitForSelector('.signout')
    //// console.log('signup')
    //Signout
    await page.click('.signout')
    await page.waitForSelector('.card-title')
    expect(await page.$eval('.card-title', element=>element.textContent)).toBe('Signin');
    //// console.log('signout')
    //Signin
    await page.waitForSelector('#email')
    await page.type('#email', 'max.mustermann@gmail.com');
    await page.waitForSelector('#password')
    await page.type('#password', '1234abcd');
    await page.click('#submit')
    await page.waitForSelector('.signout');
    expect(await page.$eval('#surname', element=>element.textContent)).toBe('Max');
    expect(await page.$eval('#last_name', element=>element.textContent)).toBe('Mustermann');
    expect(await page.$eval('#occupation', element=>element.textContent)).toBe('Teacher')
    expect(await page.$eval('#age', element=>element.textContent)).toBe('37');
    expect(await page.$eval('#email', element=>element.textContent)).toBe('max.mustermann@gmail.com');
    //// console.log('signin')
    //Profile Update
    await page.waitForSelector('.edit')
    await page.click('.edit')
    await page.waitForSelector('.update')
    await page.type('#surname', 'Jeff');
    await page.type('#last_name', 'Jefferson');
    await page.type('#occupation', 'Janitor');
    await page.type('#age', '53');
    await page.type('#email', 'jeff.jefferson@web.de');
    await page.click('.update')
    await page.waitForSelector('.signout');
    //// wait for value change to updated properties
    await page.waitForFunction('document.getElementById("surname").textContent == "Jeff"')
    expect(await page.$eval('#surname', element=>element.textContent)).toBe('Jeff');
    expect(await page.$eval('#last_name', element=>element.textContent)).toBe('Jefferson');
    expect(await page.$eval('#occupation', element=>element.textContent)).toBe('Janitor')
    expect(await page.$eval('#age', element=>element.textContent)).toBe('53');
    expect(await page.$eval('#email', element=>element.textContent)).toBe('jeff.jefferson@web.de');
    //// console.log('update')
    //Profile Deletion
    await page.waitForSelector('.delete')
    await page.click('.delete')
    await page.waitForSelector('.card-title')
    expect(await page.$eval('.card-title', element=>element.textContent)).toBe('Signin');
    await page.waitForSelector('#email')
    await page.type('#email', 'jeff.jefferson@web.de');
    await page.waitForSelector('#password')
    await page.type('#password', '1234abcd');
    await page.click('#submit')
    await page.waitForSelector('.card-title')
    expect(await page.$eval('.card-title', element=>element.textContent)).toBe('Signin');
    //// console.log('delete')
  });
});