/* eslint-disable no-undef */

test('jest logic works', () => {
  expect(!!0).toEqual(false);
  expect(!0).toEqual(true);
  expect(!!0).toBeFalsy();
  expect(!0).toBeTruthy();
  expect(0).toBeFalsy();
});

export {};
