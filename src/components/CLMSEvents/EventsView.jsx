import React from 'react';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';

const EventsView = (content) => {
  return (
    <>
      <div className="ccl-container">
        <CclCard
          type={'event'}
          title={content.title}
          description={content.description}
          when={content.when}
          where={content.where}
        ></CclCard>
        <CclCard
          type={'event'}
          title={content.title}
          description={content.description}
          when={content.when}
          where={content.where}
        ></CclCard>
        <CclCard
          type={'event'}
          title={content.title}
          description={content.description}
          when={content.when}
          where={content.where}
        ></CclCard>
      </div>
    </>
  );
};

export default EventsView;
