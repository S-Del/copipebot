import { inject, injectable } from 'inversify';
import { Symbols } from '../../config/';
import { IApplicationCommandRepository } from '../../domain/model/api/discord/';

@injectable()
export class GetAllCommandNameUseCase {
    constructor(
        @inject(Symbols.Infrastructure.ApplicationCommandRepository)
        private readonly applicationCommandRepository: IApplicationCommandRepository
    ) {}

    readonly handle = async (): Promise<string[]> => {
        const commands = await this.applicationCommandRepository.get();
        return commands.map(command => command.name);
    }
}
