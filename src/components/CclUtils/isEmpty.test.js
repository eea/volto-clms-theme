import { isEmpty } from './isEmpty';

describe('Test empty things', () => {
  it('Undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });
  it('Empty HTML P', () => {
    expect(isEmpty('<p></p>')).toBe(true);
  });
  it('Empty HTML P with br', () => {
    expect(isEmpty('<p><br/></p>')).toBe(true);
  });
  it('Empty HTML P with br and body', () => {
    expect(isEmpty('<html><body><p><br/></p></body></html>')).toBe(true);
  });
  it('Some content', () => {
    expect(isEmpty('<strong>Some content</strong>')).toBe(false);
  });
  it('Some content with spaces', () => {
    expect(isEmpty('<strong>   </strong>')).toBe(false);
  });
});
