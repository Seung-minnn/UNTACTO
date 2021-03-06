import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../common/Main';
import palette from '../../lib/styles/palette';

const SurveyListBlock = styled(Main)`
  margin-top: 3rem;
  height: calc(100% - 7rem);
`;
const SurveyItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.indigo[2]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const SubInfo = styled.div`
  color: ${palette.gray[6]};

  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const Kiosk = styled.div`
  margin-top: 0.5rem;
  display: inline-block;
  color: ${palette.indigo[7]};
  text-decoration: none;
  margin-right: 0.5rem;
  &:hover {
    color: ${palette.indigo[6]};
  }
`;

const EmptyBlock = styled(SurveyItemBlock)`
  background: ${palette.indigo[1]};
  font-size: 1.5rem;
  margin-top: 1rem;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 1rem;
  font-size: 1.25rem;
  background: ${palette.gray[7]};
  color: white;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 15px;
`;

const SurveyItem = ({ survey }) => {
  const {
    createdAt,
    expiresAt,
    beginsAt,
    user,
    kiosk,
    title,
    description,
    video,
    // videoPath,
    surveyId,
  } = survey;
  return (
    <SurveyItemBlock>
      <h2>
        <Link to={`survey/${surveyId}`}>
          {title.length < 30 ? title : title.slice(0, 30)}
        </Link>
      </h2>
      <SubInfo>
        <span>
          <b>{user.companyName}</b>
        </span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </SubInfo>
      <SubInfo>
        <span>
          기간: {new Date(beginsAt).toLocaleDateString()} ~{' '}
          {new Date(expiresAt).toLocaleDateString()}
        </span>
      </SubInfo>
      <Kiosk>{kiosk.location}</Kiosk>
      <p>
        {description.length < 200 ? description : description.slice(0, 200)}
      </p>
      <p>{video}</p>
    </SurveyItemBlock>
  );
};

const SurveyList = ({ surveys, loading, error }) => {
  if (error) {
    return <SurveyListBlock>에러가 발생했습니다</SurveyListBlock>;
  }
  if (!surveys) {
    return (
      <SurveyListBlock>
        <EmptyBlock>
          <div>등록한 설문이 없습니다</div>
          <StyledLink to="/write">설문 생성하기</StyledLink>
        </EmptyBlock>
      </SurveyListBlock>
    );
  }
  return (
    <SurveyListBlock>
      {!loading && surveys && (
        <div>
          {surveys.map((survey) => (
            <SurveyItem survey={survey} key={survey.surveyId} />
          ))}
        </div>
      )}
    </SurveyListBlock>
  );
};

export default SurveyList;
