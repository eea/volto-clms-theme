const views = {
  resultViews: [
    {
      id: 'technicalLibraryCards',
      title: 'Technical Library cards',
      icon: 'bars',
      render: null,
      isDefault: true,
      factories: {
        view: 'HorizontalCard.Group',
        item: 'TechnicalLibraryItem',
      },
    },
  ],
};

export default views;
