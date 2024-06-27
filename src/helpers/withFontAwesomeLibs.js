import { injectLazyLibs } from '@plone/volto/helpers/Loadable';

export function withFontAwesomeLibs(WrappedComponent) {
  const WithFontAwesomeLibsComponent = (props) => {
    const { fontAwesomeLibrary, fontAwesomeSolid, fontAwesomeRegular } = props;
    fontAwesomeLibrary.library.add(
      fontAwesomeSolid.fas,
      fontAwesomeRegular.far,
    );

    // console.log({ fontAwesomeSolid, fontAwesomeRegular, fontAwesomeLibrary });
    return <WrappedComponent {...props} />;
  };
  return injectLazyLibs([
    'fontAwesome',
    'fontAwesomeLibrary',
    'fontAwesomeSolid',
    'fontAwesomeRegular',
  ])(WithFontAwesomeLibsComponent);
}
