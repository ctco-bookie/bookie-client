import gql from 'graphql-tag';

const AvailableRoomsQuery = gql`
  query AvailableRoomsQuery($roomId: Int!){
    roomAvailabilityWithFloorOptions(roomId: $roomId) {
      name
      number
      busy
      availableFor
      availableFrom
      master
  }
}
`;

export {
  AvailableRoomsQuery
};
