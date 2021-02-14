import {
  Location
} from '../index';

class Venue {
  location!: Location;
  title!: string;
  address!: string;
  foursquareId?: string;
  foursquareType?: string;
  googlePlaceId?: string;
  googlePlaceType?: string;
}

export default Venue;
