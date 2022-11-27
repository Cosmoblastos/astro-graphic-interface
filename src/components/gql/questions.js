import { gql } from "@apollo/client";

export const GET_QUESTIONNAIRES = gql`
    query {
        questionnaires {
            id
            name
            description
            instructions
            bad
            recommendationBad
            medium
            recommendationMedium
            good
            recommendationGood
            periodicity
        }
    }
`;

export const GET_QUESTIONNAIRE_BY_ID = gql`
    query getQuestionnaireById($id: ID!) {
        fullQuestionnaire(id: $id) {
            id
            name
            description
            instructions
            bad
            recommendationBad
            medium
            recommendationMedium
            good
            recommendationGood
            periodicity
            questions {
                id
                name
                auxInfo
                order
                options {
                    id
                    name
                    punctuationType
                    punctuation
                    order
                }
            }
        }
    }
`;

export default {
    GET_QUESTIONNAIRES,
    GET_QUESTIONNAIRE_BY_ID
}