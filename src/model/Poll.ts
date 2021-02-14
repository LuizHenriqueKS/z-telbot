import {
  PollOption,
  MessageEntity
} from '../index';

class Poll {
  id!: string;
  question!: string;
  options!: PollOption[];
  totalVoterCount!: number;
  isClosed!: boolean;
  isAnonymous!: boolean;
  type!: string;
  allowsMultipleAnswers!: boolean;
  correctOptionId?: number;
  explanation?: string;
  explanationEntities?: MessageEntity[];
  openPeriod?: number;
  closeDate?: number;
}

export default Poll;
