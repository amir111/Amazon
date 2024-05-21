import { convertToCashFormat } from "../scripts/utils/strToCashFormat.js";

// describe() is a keyword provided by Jasmine. 
// It is a fnc that creates a test suite (test group)
// the first arg is a string, and it the name of test group (test suite)
// the sec arg is a function that we want it to do 
describe('Test Suite 1: Converting Str to Cash Format', () => {
  // inside here we will create a test, and give the test a nm
  // to create a new single test in Jasmine, we use another fnc provided by Jasmine, called it()
  // the first param of it() is the test name (also called spec name)
  it('Converts cents to dollars', () => {
    expect(convertToCashFormat('2095')).toEqual('20.95')
  });

  it('Works with just zero, (edge case N1)', () => {
    expect(convertToCashFormat('0')).toEqual('0.00')
  })

  it('Rounds up correctly to the nearest cent, (edge case N2) ', () => {
    expect(convertToCashFormat(2000.5)).toEqual('20.01')
  })
});