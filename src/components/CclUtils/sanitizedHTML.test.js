import { sanitizedHTML } from './sanitizedHTML';

describe('Test empty things', () => {
  it('Undefined', () => {
    expect(sanitizedHTML(undefined)).toBe('');
  });
  it('Empty HTML P', () => {
    expect(sanitizedHTML('<p></p>')).toBe('');
  });
  it('Empty HTML P with br', () => {
    expect(sanitizedHTML('<p><br/></p>')).toBe('');
  });
  it('Empty HTML P with br and body', () => {
    expect(sanitizedHTML('<html><body><p><br/></p></body></html>')).toBe('');
  });
  it('Some content', () => {
    expect(sanitizedHTML('<strong>Some content</strong>')).toBe('Some content');
  });
  it('Some content with spaces', () => {
    expect(sanitizedHTML('<strong>   </strong>')).toBe('   ');
  });
});
