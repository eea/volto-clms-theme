import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

function SurveyModal(props) {
  const { config } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
    >
      <ModalContent>
        <ModalDescription>
          <p>{config.text}</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          className="ccl-button ccl-button--default"
          onClick={() => {
            markSurveyAsDone();
            setOpen(false);
          }}
        >
          No, thanks
        </Button>
        <Button
          className="ccl-button ccl-button-green"
          onClick={() => {
            setOpen(false);
            markSurveyAsDone();
            //window.open(config.link, '_blank');
            window.location.replace(config.link);
          }}
        >
          Take survey
        </Button>
      </ModalActions>
    </Modal>
  );
}

const getSurveyLocalStorage = () => {
  const currentYear = new Date().getFullYear();
  const survey = `survey_${currentYear}`;
  const surveyDone = `survey_${currentYear}_done`;
  let pageviews = localStorage.getItem(survey);
  let isDone = localStorage.getItem(surveyDone);
  if (!pageviews) {
    pageviews = 0;
  } else {
    pageviews = parseInt(pageviews, 10);
  }
  if (isDone === undefined) {
    isDone = false;
  }

  // Example: { survey: 'survey_2024', surveyDone: 'survey_2024_done',
  //            pageviews: 10, isDone: false };
  return { survey, surveyDone, pageviews, isDone };
};

const incrementPageviews = (max) => {
  const { survey, pageviews } = getSurveyLocalStorage();
  if (pageviews < max) {
    localStorage.setItem(survey, pageviews + 1);
  }
};

const markSurveyAsDone = () => {
  const { surveyDone } = getSurveyLocalStorage();
  localStorage.setItem(surveyDone, true);
};

const decideToOpenModal = () => {
  const { pageviews, isDone } = getSurveyLocalStorage();
  if (pageviews > 5 && !isDone) {
    return true;
  }
  return false;
};

export const FeedbackSurvey = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = useSelector((state) => state.content);
  const surveyConfig = content.data?.['@components']?.feedback_survey;

  const location = useLocation();
  useEffect(() => {
    if (surveyConfig !== undefined) {
      if (surveyConfig.is_active === true) {
        incrementPageviews(20);
        let willOpen = decideToOpenModal();
        if (willOpen) {
          setTimeout(() => {
            setIsModalOpen(true);
          }, 5000);
        }
      }
    }
  }, [location, surveyConfig]);

  return isModalOpen ? <SurveyModal config={surveyConfig} /> : null;
};

export default FeedbackSurvey;
