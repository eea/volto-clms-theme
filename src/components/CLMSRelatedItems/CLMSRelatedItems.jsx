import { Grid, Image } from 'semantic-ui-react';
import PlaceHolder from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-thumbnail-placeholder.jpg';

const CLMSRelatedItems = (props) => {
  const { items } = props;

  return (
    <>
      {items.map((item, key) => (
        <>
          <Grid columns="2">
            <Grid.Column width={3} key={key}>
              {item.mage_field ? (
                <Image
                  src={`${item['@id']}/@@images/image/mini`}
                  alt={item?.title || 'Placeholder'}
                />
              ) : (
                <Image
                  fluid="true"
                  src={PlaceHolder}
                  alt={item?.title || 'Placeholder'}
                />
              )}
            </Grid.Column>
            <Grid.Column width={9}>
              <a href={item['@id']}>
                <strong>{item.title}</strong>
              </a>
              {item?.description && <p>{item.description}</p>}
            </Grid.Column>
          </Grid>
        </>
      ))}
    </>
  );
};

export { CLMSRelatedItems };
