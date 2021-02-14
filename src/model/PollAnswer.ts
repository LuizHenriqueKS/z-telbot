import {
  User
} from '../index';

class PollAnswer {
  pollId!: string;
  user!: User;
  optionIds!: number[];
}

export default PollAnswer;
