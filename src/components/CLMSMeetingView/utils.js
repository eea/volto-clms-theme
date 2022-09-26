export const RegisterButtonReasons = (content) => {
  let results = [];
  if (!content.registrations_open) {
    results.push('Registrations are closed');
  } else {
    if (content.allow_anonymous_registration) {
      if (!content.anonymous_registration_form) {
        results.push('Registration form is missing');
      } else {
        if (!content.anonymous_registration_form?.published) {
          results.push('Registration form is private');
        } else if (!content.anonymous_registration_form?.email) {
          results.push('Registration form has no email');
        } else if (!content.anonymous_registration_form?.fullname) {
          results.push('Registration form has no fullname');
        }
      }
    }
  }
  return results.length > 0 ? (
    <ul>
      {results.map((result) => (
        <li style={{ color: 'red' }}>{result}</li>
      ))}
    </ul>
  ) : (
    <></>
  );
};
