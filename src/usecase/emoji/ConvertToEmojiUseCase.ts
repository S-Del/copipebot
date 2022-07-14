import { injectable } from 'inversify';
import { EmojiMessage } from '../../domain/model/emoji';
import { ConvertToEmojiCommand, ConvertResponse } from './';

@injectable()
export class ConvertToEmojiUseCase {
    readonly handle = (command: ConvertToEmojiCommand): ConvertResponse => {
        return { message: new EmojiMessage(command.target).toString() };
    }
}
