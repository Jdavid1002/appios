import React from 'react';
import {connect} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {setIsActive as setIsActiveAction} from '../../../../reducers/how_i_feel/actions';

import HowIFeelLayout from './../components/how-i-feel-layout';

import HowIFeelService from '../../../../services/how-i-feel';
import { Alert } from 'react-native';

interface HowIFeelProps {
  auth_token: string;
  user:any;
  screen:
    | 'section_home_page'
    | 'section_challenge_page'
    | 'section_challenge'
    | 'section_simulacrum_page'
    | 'section_simulacrum'
    | 'section_profile'
    | 'section_profile_statistics'
    | 'section_train_your_mind';
}

const HowIFeel = (props: HowIFeelProps) => {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [modalTab, setModalTab] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const closeModal = () => {
    setModalVisibility(false)
    // setModalTab(2)
    setStatus(null);
    dispatch(setIsActiveAction(false));
  }
  const dispatch = useDispatch();
  const isActive = useSelector(state => (state.howIFeel && state.howIFeel.is_active) ? state.howIFeel.is_active : false)

  const [responses, setResponses] = React.useState({
    question_one: null,
    question_two: null,
    section: props.screen,
    user:props.user._id,
    alliance:props.user.alliance_id
  });

  const emojis = [
    {
      value: 'emoticon_happy',
      image: require('../../../../assets/img/how-i-feel/feels/page-1-3.png'),
    },
    {
      value: 'emoticon_slightly_happy',
      image: require('../../../../assets/img/how-i-feel/feels/page-1-2.png'),
    },
    {
      value: 'emoticon_indiferent',
      image: require('../../../../assets/img/how-i-feel/feels/page-1-4.png'),
    },
    {
      value: 'emoticon_sad',
      image: require('../../../../assets/img/how-i-feel/feels/page-1-5.png'),
    },
    {
      value: 'emoticon_cry',
      image: require('../../../../assets/img/how-i-feel/feels/page-1.png'),
    },
  ];
  const activities = [
    {
      value: 'activity_family',
      image: require('../../../../assets/img/how-i-feel/activities/mother.png'),
      text: 'Familia',
    },
    {
      value: 'activity_friends',
      image: require('../../../../assets/img/how-i-feel/activities/sport-team.png'),
      text: 'Amigos',
    },
    {
      value: 'activity_relationship',
      image: require('../../../../assets/img/how-i-feel/activities/heart-1.png'),
      text: 'Cita',
    },
    {
      value: 'activity_party',
      image: require('../../../../assets/img/how-i-feel/activities/party.png'),
      text: 'Fiesta',
    },
    {
      value: 'activity_playtime',
      image: require('../../../../assets/img/how-i-feel/activities/puzzle.png'),
      text: 'Recreo',
    },
    {
      value: 'activity_hobbies',
      image: require('../../../../assets/img/how-i-feel/activities/guitar.png'),
      text: 'Hobbies',
    },
    {
      value: 'activity_school',
      image: require('../../../../assets/img/how-i-feel/activities/school.png'),
      text: 'Centro Educativo',
    },
    {
      value: 'activity_sport',
      image: require('../../../../assets/img/how-i-feel/activities/run.png'),
      text: 'Deporte',
    },
    {
      value: 'activity_watch_tv',
      image: require('../../../../assets/img/how-i-feel/activities/computer.png'),
      text: 'Películas y TV',
    },
    {
      value: 'activity_reading',
      image: require('../../../../assets/img/how-i-feel/activities/book-1.png'),
      text: 'Lectura',
    },
    {
      value: 'activity_plays',
      image: require('../../../../assets/img/how-i-feel/activities/joystick.png'),
      text: 'Juegos',
    },
    {
      value: 'activity_relax',
      image: require('../../../../assets/img/how-i-feel/activities/sofa.png'),
      text: 'Relajamiento',
    },
  ];

  const next = (question: string, response: string) => {
    setModalTab(modalTab + 1);
    setResponses({
      ...responses,
      [question]: response,
    });
  };

  const saveHowIFeel = async () => {
    setStatus('loading');
    const howIFeelService = new HowIFeelService();
    const response = await howIFeelService.save(responses, props.user.token);
    setStatus(null);
    setModalVisibility(false);
    dispatch(setIsActiveAction(false));

    if (response?.status === 200) {
      if(response?.message) Alert.alert(
        'Success',
        response.message,
        [{text: 'Cerrar'}],
      );
      
    }
  };

  React.useEffect(() => {
    if (isActive === true && props.screen !== 'section_home_page') {
      setModalVisibility(true);
      setModalTab(0)
    }
  }, [isActive]);

  React.useEffect(() => {
    if (modalVisibility === false) {
      setResponses({
        question_one: null,
        question_two: null,
        section: props.screen,
        user:props.user._id,
        alliance:props.user.alliance_id
      });
      setModalTab(0);
      setStatus(null);
    }
  }, [modalVisibility, props.screen]);

  React.useEffect(() => {
    if (modalTab === 2) {
      saveHowIFeel();
    }
  }, [modalTab]);

  return (
    <HowIFeelLayout
      setModalVisibility={setModalVisibility}
      modalVisibility={modalVisibility}
      modalTab={modalTab}
      emojis={emojis}
      activities={activities}
      next={next}
      status={status}
      onCloseModal={closeModal}
      {...props}
    />
  );
};

function mapStatesToProps(state: any = {}) {
  return {
    user:state.auth.user
  };
}

export default connect(mapStatesToProps)(HowIFeel);
