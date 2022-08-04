import { gql } from "@apollo/client";

export const COMMANDS_SUBSCRIPTION = gql`
    subscription voiceEvents {
        voiceEvents {
            type
            payload
        }
    }
`;

export default {
    COMMANDS_SUBSCRIPTION
}